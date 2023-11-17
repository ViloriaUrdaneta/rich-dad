"use client"
import { useCreateNotebookMutation, useGetNotebooksQuery } from '@/redux/services/apiSlice';
import NotebookComp from '@/components/Notebook';
import { Notebook } from '@/types';


export default function NotesPage() {

    const { data, error, isLoading } = useGetNotebooksQuery(null);
    const [ createNotebook ] = useCreateNotebookMutation();

    return (
        <main className="flex justify-between min-h-screen mt-20">
            <nav className="w-72 border-l-2 order-last mr-48">
                <h4 className='text-2xl mt-6 self-center text-center'>Your notebooks</h4>
                <hr className='mx-6 my-3 shadow'/>
                { data && ( <NotebookComp notebooks={data.result} />)}
                <button className='m-6 hover:shadow-xl dark:hover:bg-slate-800 rounded p-3 font-semibold'>Add new notebook</button>
            </nav>
            <div className="w-72 ml-48"></div>
            <div className="m-12">
                <h2 className='text-5xl font-light font-sans self-center text-center'>Notes</h2>
            </div>
        </main>
    )
}


