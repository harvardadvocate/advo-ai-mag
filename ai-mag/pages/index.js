import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client';
import Login from '../components/Login';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {

  const [session] = useSession();
  if (!session) return <Login />

  return (
    <div>
      <Head>
        <title>Advo AI Mag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

  <div className="py-40 px-36">
        <TypeAnimation
      sequence={['The Advo AI Mag is the first AI-generated literary magazine created by students...', 1000]}
      speed={75} 
      wrapper="h4"
      repeat={false}
    />
  </div>

    </div>
  )
}

// not sure what this is for?
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  }
}
