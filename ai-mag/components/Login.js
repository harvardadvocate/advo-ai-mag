import { signIn } from 'next-auth/client';
import Button from '@material-tailwind/react/Button';
import Image from 'next/image';

export default function Login() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-20'>
            <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Harvard_advocate_seal.png/220px-Harvard_advocate_seal.png"
            height='300'
            width='550'
            objectFit='contain'
            />
            <Button
                className='w-44 mt-10'
                color='gray'
                buttonType='filled'
                ripple='dark'
                onClick={signIn}
            >
                Login
            </Button>

        </div>
    );
}
