import { signIn } from 'next-auth/client';
import Button from '@material-tailwind/react/Button';
import Image from 'next/image';

export default function AccessError() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-20'>
            <Image 
            src="https://media.istockphoto.com/vectors/attention-icon-black-minimalist-icon-isolated-on-white-background-vector-id855073700?k=20&m=855073700&s=612x612&w=0&h=lODStSwVUe3dpz-Vi_19N4DzpNwWbmfZch8ZuleoOLU="
            height='300'
            width='300'
            objectFit='contain'
            />
            <h4 className="pt-3">Access Error. You must have a college.harvard.edu email to access this page.</h4>
            <Button
                className=' mt-10'
                color='gray'
                buttonType='filled'
                ripple='dark'
                onClick={signIn}
            >
                Login with a different email
            </Button>

        </div>
    );
}
