import { serverTimestamp } from "firebase/firestore";

function createData(props) {
  const datatype = props.datatype;
  const db = props.db;
  const session = props.session;
  const input = props.input;
  const pid = props.pid ? props.pid : null;
  const fid = props.fid ? props.fid : null;
  const documentName = props.documentName;
  const editorState = props.editorState;
  const playgroundState = props.playgroundState;
  if (!input) return;

  if (datatype === 'folder') {
    db.collection('userData').doc(
      session.user.email).collection('folders').add({
        folderName: input,
        timestamp: serverTimestamp(),
      })
  }

  if (datatype === 'project') {
    db.collection('userData').doc(
      session.user.email).collection('projects').add({
        projectName: input,
        timestamp: serverTimestamp(),
        folder: fid
      })
  }

  if (datatype === 'document') {
    db.collection('userData').doc(
      session.user.email).collection('documents')
      .add({
        documentName: input,
        project: pid,
        folder: fid,
        timestamp: serverTimestamp(),
      })
  }

  if (datatype === 'snapshot') {
    db.collection('userData').doc(
      session.user.email).collection('documents')
      .add({
        documentName: input ? input : documentName + "*",
        project: pid,
        timestamp: serverTimestamp(),
        editorState: convertToRaw(editorState.getCurrentContent()),
        playgroundState: convertToRaw(playgroundState.getCurrentContent())
      }).then(function (docRef) {
        router.push(`/documents/${docRef.id}`)
        setShowSnapshotModal(false)
      })
  }
};

///////////////////////////////////////////////////////////////////////////////

function updateData(props) {
  console.log('updatedata')
  const datatype = props.datatype,
    db = props.db,
    session = props.session,
    id = props.id,
    newDataName = props.newDataName;

  datatype == 'document' ? db.collection('userData').doc(
    session.user.email).collection('documents').doc(id)
    .update({
      documentName: newDataName,
    }) : null
  datatype == 'project' ? db.collection('userData').doc(
    session.user.email).collection('projects').doc(id)
    .update({
      projectName: newDataName,
    }) : null
  datatype == 'folder' ? db.collection('userData').doc(
    session.user.email).collection('folders').doc(id)
    .update({
      folderName: newDataName,
    }) : null

}

///////////////////////////////////////////////////////////////////////////////

function deleteData(props) {
  console.log('deletedata')
  const datatype = props.datatype,
    db = props.db,
    session = props.session,
    id = props.id;

  if (datatype != 'all') {
    db.collection('userData').doc(
      session.user.email).collection(String(datatype) + 's').doc(id).delete()
  }

  if (datatype === 'all') {
    console.log('deleting all')
    db.collection('userData').doc(session.user.email).collection('folders').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
    db.collection('userData').doc(session.user.email).collection('projects').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
    db.collection('userData').doc(session.user.email).collection('documents').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
  }
}

///////////////////////////////////////////////////////////////////////////////

function branchData(props) {
  const datatype = props.datatype,
    db = props.db,
    session = props.session,
    [inDataSnapshot] = [props.inDataSnapshot],
    pid = inDataSnapshot?.data()?.project ? inDataSnapshot?.data()?.project : null,
    fid = inDataSnapshot?.data()?.folder ? inDataSnapshot?.data()?.folder : null,
    dataName = props.dataName,
    newDataName = props.newDataName;

  // Doesn't actually copy the contents of the folder / project -> fix later
  if (datatype === 'folder') {
    db.collection('userData').doc(
      session.user.email).collection('folders').add({
        folderName: newDataName ? newDataName : dataName,
        timestamp: serverTimestamp(),
      })
  }

  if (datatype === 'project') {
    db.collection('userData').doc(
      session.user.email).collection('projects').add({
        projectName: newDataName ? newDataName : dataName,
        folder: fid,
        timestamp: serverTimestamp(),
      })
  }

  if (datatype === 'document') {
    db.collection('userData').doc(
      session.user.email).collection('documents').add({
        documentName: newDataName ? newDataName : dataName,
        project: pid,
        folder: fid,
        editorState: inDataSnapshot?.data()?.editorState ? inDataSnapshot?.data()?.editorState : null,
        playgroundState: inDataSnapshot?.data()?.playgroundState ? inDataSnapshot?.data()?.playgroundState : null,
        timestamp: serverTimestamp(),
      })
  }
};

export { createData, updateData, deleteData, branchData }