"use client"
import { signOut, useSession } from 'next-auth/react';

function NavBar() {

    const {data: session, status} = useSession();
    console.log(session)

    return (
        <div>
            <nav className='w-full bg-slate-50 shadow-md fixed top-0 left-0 right-0 z-10 h-22 border border-inherit'>
                <div className='flex justify-around  mt-3.5 '>
                    <h1 className='text-2xl text-orange-700 font-bold'>RichDad</h1> 
                    <button className='shadow-md hover:shadow-lg bg-white rounded-full border border-inherit h-11 w-96'>¿Cuándo? | ¿Dónde?</button>
                    <div>
                        <button className='hover:bg-slate-100 rounded-full h-11 w-36 mr-2'>Sign up</button>
                        <button className='shadow-md hover:shadow-lg rounded-full border border-inherit h-11 w-36'>Log in</button>
                        <button className='shadow-md hover:shadow-lg rounded-full border border-inherit h-11 w-36' onClick={() =>{signOut()}}>Log out</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
