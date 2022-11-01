import { serverTimestamp } from "firebase/firestore";

function createArtData(props) {
  const db = props.db;
  const session = props.session;
  const prompt = props.prompt;
  const style = props.style;
  const generatedImgUrls = props.generatedImgUrls;
  const timestamp = serverTimestamp();

  db.collection('userData').doc(session.user.email).collection('artGenerations').add({
    prompt: prompt,
    style: style,
    generatedImgUrls: generatedImgUrls,
    timestamp: timestamp
  })
  
};

function createLiteratureData(props) {
  const db = props.db;
  const session = props.session;
  const prompt = props.prompt;
  const writingType = props.writingType;
  const generatedText = props.generatedText;
  const timestamp = serverTimestamp();

  db.collection('userData').doc(session.user.email).collection('literatureGenerations').add({
    prompt: prompt,
    writingType: writingType,
    generatedText: generatedText,
    timestamp: timestamp
  })
  
};

export { createArtData, createLiteratureData }