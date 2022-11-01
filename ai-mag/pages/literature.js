import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client';
import Login from '../components/Login';
import React, { useState } from 'react';
import { db } from '../firebase';
import { Select, MenuItem, Button  } from "@mui/material";
import axios from 'axios';
import Box from '@mui/material/Box';
import { createLiteratureData } from '../components/handleData';
import { checkLanguage, checkAccount } from '../components/check';
import { useCollection } from "react-firebase-hooks/firestore"
import { Sidenav, Nav } from 'rsuite';
import Icon from '@material-tailwind/react/Icon';

export default function Literature() {

  const [session] = useSession();
  if (!session) return <Login />

  const [inputData, setInputData] = useState({
    inputText: null,
    inputCategory: null,
  })
  const baseURL = "https://ai-mag.ngrok.io/generate-text";
  const [generatedText, setGeneratedText] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [artGenerationsSnapshot] = useCollection(db.collection('userData').doc(
    session.user.email).collection('artGenerations').orderBy('timestamp', 'desc'))
  const [literatureGenerationsSnapshot] = useCollection(db.collection('userData').doc(
    session.user.email).collection('literatureGenerations').orderBy('timestamp', 'desc'))

  const handleInputChange = (event) => {
    console.log("setting inputData: ", event.target.name, event.target.value);
    setInputData({ ...inputData, [event.target.name]: event.target.value })
    console.log("new inputData: ", inputData);
    
  }

  async function handleSubmit(event) {
    console.log("inputData", inputData)
    if (inputData.inputText && inputData.inputCategory) {
      if (checkAccount({artGenerationsSnapshot: artGenerationsSnapshot, literatureGenerationsSnapshot: literatureGenerationsSnapshot}) && checkLanguage({prompt: inputData.inputText})) {
        setGeneratedText("generating text...");

      const data = JSON.stringify({ "prompt": inputData.inputText, "writingType": inputData.inputCategory });
      const response = await axios.post(baseURL, data,
      {
      headers: {
        'Content-Type': 'application/json'
      }
      });
      console.log("response", response.data);
      setGeneratedText(response.data.generatedText);

      createLiteratureData({prompt: inputData.inputText, writingType: inputData.inputCategory, generatedText: response.data.generatedText, db: db, session: session});
    }
    }
    else {
      alert("Please fill out all fields")
    }
  }

  return (
    <div>
      <Head>
        <title>Advo AI Mag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
      {showModal ? 
      (
        <div className='fixed right-0 z-10 top-[40px] h-full'>
            <div className='h-full w-[340px]'>
                <Sidenav className='h-full' defaultOpenKeys={['3', '4']} >
                    <Sidenav.Body >
                      <div className='cursor-pointer pl-72 pt-4'>
                    <Icon name="close" size='3xl' onClick={() => setShowModal(false)} />
                    </div>
                    <h4 className="relative flex justify-center pt-4">Past Generations</h4>
                        <Nav >
                        {literatureGenerationsSnapshot?.docs.map((doc) => (
                                    <Nav.Item eventKey={doc.id}
                                        onClick={() => {setGeneratedText(doc.data().generatedText), setInputData({inputText: doc.data().prompt, inputCategory: doc.data().writingType})}}
                                    >{doc.data().prompt}</Nav.Item>
                                ))}

                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        </div>
      )
      : null
      }
        <div className='cursor-pointer float-right pr-4 pt-4'>
        <Icon name="dehaze" size='3xl' onClick={() => setShowModal(true)} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset>
          
          <div>

            <div className="relative flex justify-center items-center flex-grow pt-16">
            <Select
                name="inputCategory"
                labelId="inputCategory"
                id="inputCategory"
                value={inputData.inputCategory}
                label="inputCategory"
                onChange={handleInputChange}
              >
                <MenuItem value="poetry">poetry</MenuItem>
                <MenuItem value="fiction">fiction</MenuItem>
                <MenuItem value="nonfiction">nonfiction</MenuItem>
              </Select>
              <input
                name="inputText"
                className=" w-2/3 mx-5 p-4 text-sm rounded-lg border border-gray-300 shadow-sm font-medium font-extrabold bg-base-gray"
                placeholder="Enter literature prompt"
                onChange={ handleInputChange }
                value={ inputData.inputText }
              />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>

            
              </div>

            </div>
        </fieldset>
      </form>
    {generatedText ? 
    (<div className="relative flex justify-center items-center flex-grow pt-4 pb-12 px-24">
      <Box
        component="div"
        sx={{
          whiteSpace: 'pre-line',
          my: 2,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        {generatedText}
      </Box>
      </div>)
      : null
    }
      
          

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  }
}
