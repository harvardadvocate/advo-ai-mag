import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client';
import Login from '../components/Login';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Select, MenuItem, Button } from "@mui/material";
import axios from 'axios';
import { Tooltip } from '@mui/material';

export default function Art() {

  const [session] = useSession();
  if (!session) return <Login />

  const [inputData, setInputData] = useState({
    inputText: null,
    inputCategory: null,
  })
  const emptyArray = ["https://www.kurin.com/wp-content/uploads/placeholder-square.jpg", "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg", "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg", "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"]
  const loadingArray = ["https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif", "https://gistalt.s3.us-west-1.amazonaws.com/loading.gif"]
  const [imgArray, setImgArray] = useState(emptyArray);
  const [URL, setURL] = useState(null);
  const baseURL = "https://ai-mag.ngrok.io/generate-image";

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
    setImgArray(loadingArray);
    if (inputData.inputText && inputData.inputCategory) {

      const data = JSON.stringify({ "prompt": inputData.inputText, "style": inputData.inputCategory, "alias": "testAlias" });
      const response = await axios.post(baseURL, data,
      {
      headers: {
        'Content-Type': 'application/json'
      }
      });
      console.log("response", response.data);
      setImgArray(response.data.generatedImgUrls)

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

      {/* <div className="component-style">
      <form onSubmit={handleSubmit}>
        <fieldset>
              <div className="flex items-center w-full px-0">
                <input onChange={handleInputChange} value={prompt} type="search" className=" form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-light-gray bg-base-gray bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-light-gray focus:bg-mid-gray focus:border-blue-600 focus:outline-none" placeholder="Enter prompt" aria-label="Enter prompt" aria-describedby="button-addon3"/>
                <Tooltip title="Generate image">
                <div className="p-3">
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
                </div>
                </Tooltip>
          </div>
        </fieldset>
      </form>


      <div className="grid grid-cols-4 gap-4 py-4 flex items-center">
        <label className="mb-4 cursor-pointer">
          <input type="radio" name="test" value={0} onClick={handleImgChange} readOnly=""/>
          <img src={ imgArray[0] } className="max-w-full h-auto hover:scale-90 transform transition duration-200" alt="" />
        </label>
        <label className="mb-4 cursor-pointer">
          <input type="radio" name="test" value={1} onClick={handleImgChange} readOnly=""/>
          <img src={ imgArray[1] } className="max-w-full h-auto hover:scale-90 transform transition duration-200" alt="" />
        </label>
        <label className="mb-4 cursor-pointer">
          <input type="radio" name="test" value={2} onClick={handleImgChange} readOnly=""/>
          <img src={ imgArray[2] } className="max-w-full h-auto hover:scale-90 transform transition duration-200" alt="" />
        </label>
        <label className="mb-4 cursor-pointer">
          <input type="radio" name="test" value={3} onClick={handleImgChange} readOnly=""/>
          <img src={ imgArray[3] } className="max-w-full h-auto hover:scale-90 transform transition duration-200" alt="" />
        </label>      
      </div>

    </div> */}

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

      <div className="relative flex justify-center items-center flex-grow pt-12 mx-52">
          <img src={ imgArray[0] } className="w-1/2 h-auto mx-4" alt="" />
          <img src={ imgArray[1] } className="w-1/2 h-auto mx-4" alt="" /> 
      </div>
      <div className="relative flex justify-center items-center flex-grow pt-8 pb-16 mx-52">
          <img src={ imgArray[2] } className="w-1/2 h-auto mx-4" alt="" />
          <img src={ imgArray[3] } className="w-1/2 h-auto mx-4" alt="" /> 
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
