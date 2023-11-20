import React from 'react';
import { NotebookUI } from '@/types';

interface NotebookProps {
    notebooks: NotebookUI[]
    handleNotebookClik: (notebook: NotebookUI) => void
};

function classNames(...classes: string[]){
    return classes.filter(Boolean).join('')
};

const NotebookComp: React.FC<NotebookProps> = ({ notebooks, handleNotebookClik }) => {

    return (
        <div>
            {notebooks.map((nb) => {
                return (
                    <div key={nb.id}>
                        <div 
                            onClick={() => handleNotebookClik(nb)} 
                            className={classNames(nb.selected 
                                ? 'shadow-xl bg-slate-300 dark:bg-slate-700 ' 
                                : 'bg-slate-200 dark:bg-slate-950 hover:shadow-xl dark:hover:bg-slate-900', 
                                'rounded-md border-l-8 border-l-black dark:border-l-white m-8 border-2 w-40 h-52 shadow-md flex flex-row')}
                        >  
                            <p className='font-bold text-lg text-left ml-6 mt-8 text-clip overflow-hidden'>{nb.name}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NotebookComp;


// className='rounded-md border-l-8 border-l-black dark:border-l-white m-8 border-2 w-40 h-52 shadow-md flex flex-row bg-slate-200 hover:shadow-xl dark:bg-slate-950 dark:hover:bg-slate-900'