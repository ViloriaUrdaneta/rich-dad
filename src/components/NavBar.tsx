"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import rdIcon from '../../public/monopoly-icon.png'

function NavBar() {

    const {data: session, status} = useSession();
    console.log(session)

    return (
        <div>
            <nav className='w-full shadow-md fixed top-0 left-0 right-0 z-10 h-20 align-middle border-b '>
                <div className='flex justify-around align-middle mt-3.5 '>
                    <Link href={'/'}>
                        <div className='flex'>
                            <Image src={rdIcon} alt="typescript" width={50} height={50} />
                            <h1 className='text-3xl font-bold font-mono self-center ml-4'>Rich Dad</h1> 
                        </div>   
                    </Link>
                    <div>
                        {session ? (
                            <>
                                <Link href={'/balance'}>
                                    <button 
                                        className='hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg h-11 w-36 mr-2'
                                    >
                                        Balance sheet
                                    </button>
                                </Link>
                                <button 
                                    className='shadow-md hover:shadow-lg dark:hover:bg-slate-800 rounded-lg border border-inherit h-11 w-36' 
                                    onClick={() =>{signOut()}}
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href={'/register'}>
                                    <button 
                                        className='hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg h-11 w-36 mr-2'
                                    >
                                        Sign up
                                    </button>
                                </Link>
                                <Link href={'/login'}>
                                    <button 
                                        className='shadow-md hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-inherit h-11 w-36'
                                    >
                                        Log in
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
