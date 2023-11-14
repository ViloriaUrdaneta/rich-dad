"use client"
import React, { FormEvent, useState } from 'react'
import axios, { AxiosError } from "axios";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
                console.log('res: ', res)
                if (res?.ok) return router.push('/dashboard')
            }
            //

        } catch (error) {
            if(error instanceof AxiosError){
                setError(error.response?.data.message)
                console.log("Error: ",error.response?.data.message);
            };
        }
        
    }


    return (
        <div className='justify-center h-[calc(100vh)] flex items-center'>
            <form onSubmit={handleSubmit} className=' px-8 py-10'>
                {error && <div className='bg-red-500 text-white p-2 mb-2'>{error}</div>}
                <h2 className='text-xl font-bold mb-5'>
                    Register
                </h2>
                <input 
                    type="text" 
                    placeholder='User name' 
                    name='name'
                    className='bg-zinc-800 px-4 py-2 block mb-2 rounded'
                />
                <input 
                    type="text" 
                    placeholder='Email' 
                    name='email'
                    className='bg-zinc-800 px-4 py-2 block mb-2 rounded'
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    name='password'
                    className='bg-zinc-800 px-4 py-2 block mb-2 rounded'
                />
                <button className='bg-sky-300 px-4 py-2 block mb-2 rounded'>Register</button>
            </form>
        </div>
    )
}
