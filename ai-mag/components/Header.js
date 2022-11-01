import React from 'react';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
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
                    alt={session?.user?.image}
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
