"use client"
import { useCreateNotebookMutation, useGetNotebooksQuery } from '@/redux/services/apiSlice';
import { Notebook } from '@/types';


export default function NotesPage() {

    const { data, error, isLoading } = useGetNotebooksQuery(null);
    const [ createNotebook ] = useCreateNotebookMutation();

    return (
        <main className="flex min-h-screen flex-col items-center  p-24">
            <h1 className='text-5xl font-light font-sans ml-4 mt-8 text-center'>Notes</h1>
            { data && (
                <ul>
                    {data.result.map((nb) => {
                        return (
                            <li key={nb.id}>
                                <p>{nb.name}</p>
                            </li>
                        )
                    })}
                </ul>
            )}
        </main>
    )
}
