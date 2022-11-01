import Icon from '@material-tailwind/react/Icon';
import { useRouter } from 'next/dist/client/router'
import { useCollection } from "react-firebase-hooks/firestore"
import { IconButton } from '../components/Buttons';
import { useState } from 'react';

function Folders(props) {
  const router = useRouter(),
    db = props.db,
    session = props.session,
    fid = props.fid ? props.fid : null,
    pid = props.pid ? props.pid : null,
    [foldersSnapshot] = useCollection(db.collection('userData').doc(
      session.user.email).collection('folders').orderBy('timestamp', 'desc')),
    [moreModalType, setMoreModalType] = useState({ func: '', datatype: '', folderName: '', fid: '' })

  const moreModal = (
    moreModalType.func == 'update' ? <UpdateModal datatype={moreModalType.datatype} fid={moreModalType.fid} folderName={moreModalType.folderName} db={db} session={session} togglerFunc={setMoreModalType} /> : null
  )

  return (
    <section className={'bg-white px-10 md:px-0'}>
      <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
        <div className='flex items-center justify-between pb=5'>
          <h2 className='text-lg flex-grow'>My Folders</h2>
          <p className='mr-12'>Date Created</p>
          <Icon name='folder' size='3xl' color='gray' />
        </div>

        {foldersSnapshot?.docs.map((doc) => (
          <div onClick={() => router.push(`/folders/${doc.id}`)} className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
            <Icon name='folder' size='3xl' color='blue' />
            <p className='flex-grow pl-5 w-10 pr-10 truncate'>{doc.data().folderName}</p>
            <p className='pr-5 text-sm'>{doc.data().timestamp?.toDate().toLocaleDateString()}</p>

            <IconButton onClickFunc={
              (e) => {
                console.log('folder moreclicked')
                setMoreModalType({ func: 'update', datatype: 'folder', folderName: doc.data().folderName, fid: doc.id })
                if (!e) var e = window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
              }
            } icon='more_vert' size='2xl' />

          </div>
        ))}

      </div>

      {moreModal}

    </section>

  )
}

////////////////////////////////////////////////////////////////////////////////

function Projects(props) {
  const router = useRouter(),
    db = props.db,
    session = props.session,
    fid = props.fid ? props.fid : null,
    pid = props.pid ? props.pid : null,
    [projectsSnapshot] = fid ? useCollection(db.collection('userData').doc(session.user.email).collection('projects').where('folder', '==', fid).orderBy('timestamp', 'desc'))
      : useCollection(db.collection('userData').doc(session.user.email).collection('projects').orderBy('timestamp', 'desc')),
    [moreModalType, setMoreModalType] = useState({ func: '', datatype: '', projectName: '', pid: '' })

  const moreModal = (
    moreModalType.func == 'update' ? <UpdateModal datatype={moreModalType.datatype} pid={moreModalType.pid} projectName={moreModalType.projectName} db={db} session={session} togglerFunc={setMoreModalType} /> : null
  )

  return (
    <section className={'bg-white px-10 md:px-0'}>
      <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
        <div className='flex items-center justify-between pb=5'>
          <h2 className='text-lg flex-grow'>My Projects</h2>
          <p className='mr-12'>Date Created</p>
          <Icon name='library_books' size='3xl' color='gray' />
        </div>

        {projectsSnapshot?.docs.map((doc) => (
          <div onClick={() => router.push(`/projects/${doc.id}`)} className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
            <Icon name='library_books' size='3xl' color='blue' />
            <p className='flex-grow pl-5 w-10 pr-10 truncate'>{doc.data().projectName}</p>
            <p className='pr-5 text-sm'>{doc.data().timestamp?.toDate().toLocaleDateString()}</p>

            <IconButton onClickFunc={
              (e) => {
                console.log('project moreclicked')
                setMoreModalType({ func: 'update', datatype: 'project', projectName: doc.data().projectName, pid: doc.id })
                if (!e) var e = window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
              }
            } icon='more_vert' size='2xl' />

          </div>
        ))}
      </div>

      {moreModal}

    </section>

  )
}

////////////////////////////////////////////////////////////////////////////////

function Documents(props) {
  const router = useRouter(),
    db = props.db,
    session = props.session,
    fid = props.fid ? props.fid : null,
    pid = props.pid ? props.pid : null,
    [documentsSnapshot] = fid ? useCollection(db.collection('userData').doc(session.user.email).collection('documents').where('folder', '==', fid).orderBy('timestamp', 'desc'))
      : pid ? useCollection(db.collection('userData').doc(session.user.email).collection('documents').where('project', '==', pid).orderBy('timestamp', 'desc'))
        : useCollection(db.collection('userData').doc(session.user.email).collection('documents').orderBy('timestamp', 'desc')),
    [moreModalType, setMoreModalType] = useState({ func: '', datatype: '', documentName: '', did: '' })

  const moreModal = (
    moreModalType.func == 'update' ? <UpdateModal datatype={moreModalType.datatype} did={moreModalType.did} documentName={moreModalType.documentName} db={db} session={session} togglerFunc={setMoreModalType} /> : null
  )

  return (
    <section className={'bg-white px-10 md:px-0'}>
      <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
        <div className='flex items-center justify-between pb=5'>
          <h2 className='text-lg flex-grow'>My Documents</h2>
          <p className='mr-12'>Date Created</p>
          <Icon name='article' size='3xl' color='gray' />
        </div>

        {documentsSnapshot?.docs.map((doc) => (
          <div onClick={() => router.push(`/documents/${doc.id}`)} className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
            <Icon name='article' size='3xl' color='blue' />
            <p className='flex-grow pl-5 w-10 pr-10 truncate'>{doc.data().documentName}</p>
            <p className='pr-5 text-sm'>{doc.data().timestamp?.toDate().toLocaleDateString()}</p>

            <IconButton onClickFunc={
              (e) => {
                console.log('document moreclicked')
                setMoreModalType({ func: 'update', datatype: 'document', documentName: doc.data().documentName, did: doc.id })
                if (!e) var e = window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
              }
            } icon='more_vert' size='2xl' />

          </div>
        ))}
      </div>

      {moreModal}

    </section>

  )
}

export { Folders, Projects, Documents }
