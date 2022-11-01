import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client';
import Login from '../components/Login';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Select, MenuItem, Button, TextField  } from "@mui/material";
import axios from 'axios';
import Box from '@mui/material/Box';

export default function Literature() {

  const [session] = useSession();
  if (!session) return <Login />

  const [inputData, setInputData] = useState({
    inputText: null,
    inputCategory: null,
  })
  const emptyArray = ["https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png", "https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png", "https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png", "https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png"]
  const loadingArray = ["https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif"]
  const [imgArray, setImgArray] = useState(emptyArray);
  const [URL, setURL] = useState(null);
  const baseURL = "https://ai-mag.ngrok.io/generate-text";
  const [generatedText, setGeneratedText] = useState(null);

  useEffect(() => {
    console.log("GenerateImg useEffect")
}, [imgArray]);

  // useEffect(() => { 
  //   // setURL(`${baseURL}?inputText=${inputData.inputText}&inputCategory=${inputData.inputCategory}`)
  // }, [inputData]);

  const handleInputChange = (event) => {
    console.log("setting inputData: ", event.target.name, event.target.value);
    setInputData({ ...inputData, [event.target.name]: event.target.value })
    console.log("new inputData: ", inputData);
    
  }

  async function handleSubmit(event) {
    console.log("inputData", inputData)
    if (inputData.inputText && inputData.inputCategory) {

      const data = JSON.stringify({ "prompt": inputData.inputText, "writingType": inputData.inputCategory });
      const response = await axios.post(baseURL, data,
      {
      headers: {
        'Content-Type': 'application/json'
      }
      });
      console.log("response", response.data);
      setGeneratedText(response.data.generatedText);
      

      // try {
      //   console.log("URL: ", URL)
      //   const { response } = await axios.post(URL)
      //   console.log("response", response)
      //   setImgArray(response)
      // } catch (error) {
      //   alert("Error generating image. Please try again.")
      //   setImgArray(emptyArray)
      // }
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
                className=" w-1/2 mx-5 p-4 text-sm rounded-lg border border-gray-300 shadow-sm font-medium font-extrabold bg-base-gray"
                placeholder="Enter art prompt"
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
