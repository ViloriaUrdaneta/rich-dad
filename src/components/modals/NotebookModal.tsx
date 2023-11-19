"use client";
import React from 'react';


interface NotebookModalProps {
    notebookModalHandler: () => void,
    newNotebookHandler: (name: string) => void
};

const NotebookModal = ({notebookModalHandler, newNotebookHandler}: NotebookModalProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fomrData = new FormData(e.currentTarget);
        if (fomrData.get('title')) newNotebookHandler(fomrData.get('title') as string);
    };

    return (
        <div>
            <div className="fixed inset-0 z-20 bg-opacity-50 h-screen w-screen bg-black flex justify-center items-center">
                <div className="px-8 pb-8 rounded-md border-2 dark:border-white bg-neutral-200 shadow-md dark:bg-black">
                    <div className='grid justify-items-stretch'>
                        <button 
                            className='mt-2 p-2 font-bold justify-self-end hover:shadow-xl dark:hover:bg-slate-800 '
                            onClick={notebookModalHandler}
                        >
                            X
                        </button>
                    </div>
                    <h1 className='my-4 text-center font-semibold text-xl'>New notebook</h1>
                    <form onSubmit={handleSubmit} className=''>
                        <input 
                            type="text" 
                            placeholder='Notebook title' 
                            name='title'
                            required
                            className='dark:bg-zinc-800 px-4 py-2 block mb-6 rounded w-64 shadow'
                        />
                        <button 
                            className='px-4 py-2 block mb-2 rounded text-center w-64 border-2 mb-2 shadow-md hover:shadow-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800'
                        >
                            Add
                        </button>
                    </form>
                    <button 
                        className='px-4 py-2 block mb-2 rounded text-center w-64 border-2 mb-2 shadow-md hover:shadow-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-900  dark:hover:bg-slate-800'
                        onClick={notebookModalHandler}
                    >   
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotebookModal;





/**
 * "use client";

import * as React from "react";
import { createPortal } from "react-dom";

export default function Modal() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return mounted ? createPortal(<div>
        <div>
            <div className="h-screen w-screen bg-hero bg-black bg-cover flex justify-center items-center">
                <div className="bg-white px-52 py-24 -mt-20 rounded border-8 border-black text-black">
                    <h1>Modal</h1>
                </div>
            </div>
        </div>
    </div>, document.body) : null;
} 

 */