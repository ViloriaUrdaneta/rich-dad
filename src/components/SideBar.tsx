"use client"
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { usePathname } from "next/navigation";

function classNames(...classes: string[]){
    return classes.filter(Boolean).join('')
}

const Sidebar = () => {

    const {data: session, status} = useSession();
    const pathname =  usePathname();

    const sidebarUserOptions = [
        {name:'Book', href:'/book', current: `${pathname}` === '/book' ? true : false},
        {name:'Dashboard', href:'/dashboard', current: `${pathname}` === '/dashboard' ? true : false},
        {name:'Balance', href:'/dashboard/balance', current: `${pathname}` === '/dashboard/balance' ? true : false},
        {name:'Budget', href:'/dashboard/budget', current: `${pathname}` === '/dashboard/budget' ? true : false},
        {name:'Shopping list', href:'/dashboard/shoppinglist', current: `${pathname}` === '/dashboard/shoppinglist' ? true : false},
        {name:'Notes', href:'/dashboard/notes', current: `${pathname}` === '/dashboard/notes' ? true : false},
    ]

    const sidebarOptions = [
        {name:'Book', href:'/dashboard', current: `${pathname}` === '/book'  ? true : false},
    ]

    const generateSidebarOptions = (options: any[]) => {
        return (
            options.map((option) => (
                <li key={option.name}>
                    <Link 
                        href={option.href} 
                        className={classNames(option.current ? 'text-gray-200 bg-gray-500 font-semibold' : 'hover:bg-gray-300 dark:hover:bg-slate-800 hover:text-black', 'group flex gap-x-3 rounded-md p-2 leading-6')}
                    >
                        {option.name}
                    </Link>
                </li>
            ))
        );
    };


    return (
        <div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col mt-20 ml-48">
                <div className="flex grow flex-col gapy-y-5 overflow-y-auto px-6 pb-4 border-r-2">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7 mt-6">
                            <li>
                                <ul role="list" className="mx-2 space-y-1">
                                    { session ? generateSidebarOptions(sidebarUserOptions) : generateSidebarOptions(sidebarOptions)}
                                </ul> 
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
