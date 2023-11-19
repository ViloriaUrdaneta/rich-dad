import React from 'react';
import { Notebook } from '@/types';

interface NotebookProps {
    notebooks: Notebook[]
}

const NotebookComp: React.FC<NotebookProps> = ({ notebooks }) => {


    return (
        <div>
            {notebooks.map((nb) => {
                return (
                    <div key={nb.id}>
                        <div className='rounded-md border-l-8 border-l-black dark:border-l-white m-8 border-2 w-40 h-52 shadow-md flex flex-row bg-slate-200 hover:shadow-xl dark:bg-slate-950 dark:hover:bg-slate-900'>  
                            <div className=''>
                                <p className='font-bold text-lg text-left m-8'>{nb.name}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NotebookComp;

