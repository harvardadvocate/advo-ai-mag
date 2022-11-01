import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import 'rsuite/dist/rsuite.min.css';
import Image from 'next/image';

export default function Header() {
    const [session] = useSession(),
        router = useRouter();

    return (
        <div>

            <header className='sticky z-50 items-center px-5 py-1 shadow-md bg-white'>
            <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Harvard_advocate_seal.png/220px-Harvard_advocate_seal.png"
            height='20'
            width='20'
            objectFit='contain'
            />
                <h1 className='hidden md:inline-flex ml-5 py-1 text-gray-700 text-lg font-bold'>Advo AI Mag</h1>
                <img
                    onClick={signOut}
                    // loading='lazy'
                    className='float-right cursor-pointer mr-3 h-8 w-8 rounded-full ml-2'
                    src={session?.user?.image}
                    // src="https://static.wixstatic.com/media/51fb1a_995dc68a3bd046389fc42220e99574c4~mv2.jpg/v1/crop/x_0,y_173,w_3006,h_2909/fill/w_694,h_672,al_c,q_85,usm_0.66_1.00_0.01/Portrait_JPG.webp"
                    alt={session?.user?.email}
                />
                <h1 className='cursor-pointer float-right hidden md:inline-flex ml-5 mr-5 px-1 py-1 text-gray-700 text-lg font-bold'
                onClick={() => router.push('/art')}
                >Art</h1>
                <h1 className='cursor-pointer float-right hidden md:inline-flex ml-5 px-1 py-1 text-gray-700 text-lg font-bold'
                onClick={() => router.push('/literature')}
                >Literature</h1>
            </header>
        </div>
    );
}

{/* <div className='cursor-pointer'>
<Icon onClick={() => router.push('/')} name='description' size='4xl' color='blue' />
</div> */}