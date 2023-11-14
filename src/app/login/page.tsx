"use client";
import React, { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const fomrData = new FormData(e.currentTarget);
        
        const signInRes = await signIn("credentials", {
            email: fomrData.get("email"),
            password: fomrData.get("password"),
            redirect: false,
        })

        if (signInRes?.error) return setError(signInRes.error)
        if (signInRes?.ok) return router.push("/dashboard");
        
    }

    return (
        <div className='justify-center h-[calc(100vh)] flex items-center'>
            <form onSubmit={handleSubmit} className='px-8 py-10'>
                {error && <div className='bg-red-500 text-white p-2 mb-2'>{error}</div>}
                <h2 className='text-xl font-bold mb-5'>
                    Login
                </h2>
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
                <button className='bg-sky-300 px-4 py-2 block mb-2 rounded'>Login</button>
            </form>
        </div>
    )
}
