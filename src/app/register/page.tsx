"use client"
import React, { FormEvent, useState } from 'react'
import axios, { AxiosError } from "axios";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleIcon from '../../../public/google-logo.png'

export default function RegisterPage() {

    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setError('');

        const fomrData = new FormData(e.currentTarget);
        
        try {
            const signupRes = await axios.post('/api/auth/signup', {
                email: fomrData.get('email'),
                password: fomrData.get('password'),
                name: fomrData.get('name'),
            });         

            if(signupRes.status === 200){
                console.log('holi')
                const res = await signIn('credentials', {
                    email: fomrData.get('email'),
                    password: fomrData.get('password'),
                    redirect: false,
                })

                if (res?.ok) return router.push('/dashboard')
            }

        } catch (error) {
            if(error instanceof AxiosError){
                setError(error.response?.data.message)
                console.log("Error: ",error.response?.data.message);
            };
        }
        
    }

    const handleGoogleLogin = async () => {
        await signIn('google', { callbackUrl: '/dashboard' });
    };


    return (
        <div className='justify-center h-[calc(100vh)] flex items-center'>
            <div className='rounded-md border-2 px-8 py-8 shadow-md '>
                <form onSubmit={handleSubmit} className=''>
                    {error && <div className='bg-red-500 text-white p-2 mb-2'>{error}</div>}
                    <h2 className='text-xl text-center font-bold mb-8'>
                        Register
                    </h2>
                    <input 
                        type="text" 
                        placeholder='User name' 
                        name='name'
                        className='dark:bg-zinc-800 px-4 py-2 block mb-2 rounded w-64'
                    />
                    <input 
                        type="text" 
                        placeholder='Email' 
                        name='email'
                        className='dark:bg-zinc-800 px-4 py-2 block mb-2 rounded w-64'
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        name='password'
                        className='dark:bg-zinc-800 px-4 py-2 block rounded w-64 mb-4'
                    />
                    <button 
                        className='px-4 py-2 block mb-2 rounded text-center w-64 border-2 hover:shadow-md hover:bg-slate-200 dark:hover:bg-slate-800'
                    >
                        Register
                    </button>
                </form>
                <div className='flex justify-between my-6 items-centers'>
                    <hr className='w-20 mt-3'/>
                    <p className='text-center'>or</p>
                    <hr className='w-20 mt-3'/>
                </div>
                <button  
                    className='px-4 py-2 block mb-2 rounded w-64 border-2 hover:shadow-md hover:bg-slate-200 dark:hover:bg-slate-800' 
                    type="button" 
                    onClick={handleGoogleLogin}
                >
                    <div className='flex justify-center items-centers'>
                        <Image src={googleIcon} alt="typescript" width={24} height={18} />
                        <p className='text-center px-4'>Login with Google</p>
                    </div>
                </button>
            </div>
        </div>
    )
}
