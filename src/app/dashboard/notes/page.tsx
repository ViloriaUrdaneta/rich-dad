"use client"
import { useCreateNotebookMutation, useGetNotebooksQuery } from '@/redux/services/apiSlice';
import NotebookComp from '@/components/Notebook';
import { Notebook } from '@/types';
import { useState, useEffect  } from 'react';
import NotebookModal from '@/components/modals/NotebookModal';
import { createPortal } from "react-dom";



export default function NotesPage() {

    const { data, error, isLoading } = useGetNotebooksQuery(null);
    const [ createNotebook ] = useCreateNotebookMutation();
    const [ notebookModalOpen, setNotebookModalOpen ] = useState(false)
    const [ portalElement, setPortalElement ] = useState<Element | null>(null);

    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, []);

    const notebookModalHandler = () => {
        setNotebookModalOpen(!notebookModalOpen)
    }

    const addNotebook =  async (name: string) => {
        try {
            await createNotebook({name});
        } catch (error) {
            console.log(error)
        };
        notebookModalHandler();
    }

    return (
        <main className="flex justify-between min-h-screen pt-20">
            { notebookModalOpen && portalElement 
                ? createPortal(<NotebookModal notebookModalHandler={notebookModalHandler} newNotebookHandler={addNotebook}/>, portalElement ) 
                : null
            }
            <nav className="w-72 border-l-2 order-last mr-48">
                <h4 className='text-2xl mt-6 self-center text-center'>Your notebooks</h4>
                <hr className='mx-6 my-3 shadow'/>
                { data && ( <NotebookComp notebooks={data.result}/> )}
                <button 
                    className='m-6 hover:shadow-xl dark:hover:bg-slate-800 rounded p-3 font-semibold'
                    onClick={notebookModalHandler}
                >   
                    Add new notebook
                </button>
            </nav>
            <div className="w-72 ml-48"></div>
            <div className="m-12">
                <h2 className='text-5xl font-light font-sans self-center text-center'>Notes</h2>
            </div>
        </main>
    )
}
