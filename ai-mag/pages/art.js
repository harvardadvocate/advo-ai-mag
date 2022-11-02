import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client';
import Login from '../components/Login';
import AccessError from '../components/AccessError'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Select, MenuItem, Button } from "@mui/material";
import axios from 'axios';
import { createArtData } from '../components/handleData';
import { checkLanguage, checkAccount } from '../components/check';
import { useCollection } from "react-firebase-hooks/firestore"
import { Sidenav, Nav } from 'rsuite';
import Icon from '@material-tailwind/react/Icon';

export default function Art() {

  const [session] = useSession();
  if (!session) return <Login />
  if (!session.user.email.endsWith("college.harvard.edu")) return <AccessError />

  const [inputData, setInputData] = useState({
    inputText: null,
    inputCategory: null,
  })
  const emptyArray = ["https://www.kurin.com/wp-content/uploads/placeholder-square.jpg", "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg", "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg", "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"]
  const loadingArray = ["https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif"]
  const [imgArray, setImgArray] = useState(emptyArray);
  const baseURL = "https://ai-mag.ngrok.io/generate-image";
  const [showModal, setShowModal] = useState(false);

  const [artGenerationsSnapshot] = useCollection(db.collection('userData').doc(
    session.user.email).collection('artGenerations').orderBy('timestamp', 'desc'))
  const [literatureGenerationsSnapshot] = useCollection(db.collection('userData').doc(
    session.user.email).collection('literatureGenerations').orderBy('timestamp', 'desc'))

  useEffect(() => {
    console.log("GenerateImg useEffect")
}, [imgArray]);

  const handleInputChange = (event) => {
    console.log("setting inputData: ", event.target.name, event.target.value);
    setInputData({ ...inputData, [event.target.name]: event.target.value })
    console.log("new inputData: ", inputData);
    
  }

  async function handleSubmit(event) {
    console.log("inputData", inputData)

    if (inputData.inputText && inputData.inputCategory) {
      if (checkAccount({artGenerationsSnapshot: artGenerationsSnapshot, literatureGenerationsSnapshot: literatureGenerationsSnapshot}) && checkLanguage({prompt: inputData.inputText})) {

      setImgArray(loadingArray);

      const timestamp = Math.round(Date.now() / 1000)

      const data = JSON.stringify({ "prompt": inputData.inputText, "style": inputData.inputCategory, "alias": session.user.email + "_" + timestamp });
      const response = await axios.post(baseURL, data,
      {
      headers: {
        'Content-Type': 'application/json'
      }
      });
      console.log("response", response.data);
      setImgArray(response.data.generatedImgUrls)

      createArtData({prompt: inputData.inputText, style: inputData.inputCategory, generatedImgUrls: response.data.generatedImgUrls, db: db, session: session});
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
                        {artGenerationsSnapshot?.docs.map((doc) => (
                                    <Nav.Item eventKey={doc.id}
                                        onClick={() => {setImgArray(doc.data().generatedImgUrls), setInputData({inputText: doc.data().prompt, inputCategory: doc.data().style})}}
                                    >
                                        <div className="relative flex justify-center items-center flex-grow py-2 pr-8">
                                          <img src={ doc.data().generatedImgUrls[0] } className="w-16 h-auto mx-1" alt="" />
                                          <img src={ doc.data().generatedImgUrls[1] } className="w-16 h-auto mx-1" alt="" /> 
                                          <img src={ doc.data().generatedImgUrls[2] } className="w-16 h-auto mx-1" alt="" />
                                          <img src={ doc.data().generatedImgUrls[3] } className="w-16 h-auto mx-1" alt="" /> 
                                      </div>
                                    </Nav.Item>
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
                <MenuItem value="realistic">realistic</MenuItem>
                <MenuItem value="abstract">abstract</MenuItem>
                <MenuItem value="modern">modern</MenuItem>
              </Select>
              <input
                name="inputText"
                className=" w-2/3 mx-5 p-4 text-sm rounded-lg border border-gray-300 shadow-sm font-medium font-extrabold bg-base-gray"
                placeholder="Enter art prompt"
                onChange={ handleInputChange }
                value={ inputData.inputText }
              />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>

            
              </div>

            </div>
        </fieldset>
      </form>

      <div className="relative flex justify-center items-center flex-grow pt-12 mx-[10%]">
          <img src={ imgArray[0] } className="w-1/4 h-auto mx-4" alt="" />
          <img src={ imgArray[1] } className="w-1/4 h-auto mx-4" alt="" /> 
          <img src={ imgArray[2] } className="w-1/4 h-auto mx-4" alt="" />
          <img src={ imgArray[3] } className="w-1/4 h-auto mx-4" alt="" /> 
          
      </div>

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
