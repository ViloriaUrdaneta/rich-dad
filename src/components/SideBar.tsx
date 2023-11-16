"use client"
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useSelectedLayoutSegment, usePathname } from "next/navigation";

function classNames(...classes: string[]){
    return classes.filter(Boolean).join('')
}

const Sidebar = () => {

    const segment =  useSelectedLayoutSegment()
    const {data: session, status} = useSession();
    const pathname =  usePathname()

    console.log('segment: ', segment)
    console.log('pathname: ', pathname)


    const sidebarUserOptions = [
        {name:'Book', href:'/book', current: `/${pathname}` === `/${segment}` ? true : false},
        {name:'Dashboard', href:'/dashboard', current: `/${pathname}` === `/${segment}` ? true : false},
        {name:'Balance', href:'/dashboard/balance', current: `/${pathname}` === `/${segment}/balance` ? true : false},
        {name:'Budget', href:'/dashboard/budget', current: `/${pathname}` === `/${segment}/budget` ? true : false},
        {name:'Shopping list', href:'/dashboard/shoppinglist', current: `/${pathname}` === `/${segment}/shoppinglist` ? true : false},
        {name:'Notes', href:'/dashboard/notes', current: `/${pathname}` === `/${segment}/notes` ? true : false},
    ]

    const sidebarOptions = [
        {name:'Book', href:'/dashboard', current: `/${pathname}` === `/${segment}`  ? true : false},
    ]

    return (
        <div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col mt-20 ml-48">
                <div className="flex grow flex-col gapy-y-5 overflow-y-auto px-6 pb-4 border-r-2">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7 mt-6">
                            <li>
                                { session ? (
                                    <ul role="list" className="mx-2 space-y-1">
                                        { sidebarUserOptions.map((option) => (
                                            <li key={option.name}>
                                                <Link href={option.href} className={classNames(option.current ? 'text-gray-200 bg-gray-700 ' : 'hover:text-white text-gray-500 hover:bg-gray-700 ', 'group flex gap-x-3 rounded-md p-2  leading-6 font-semibold')}>
                                                    
                                                    {option.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul> 
                                ) : (
                                    <ul role="list" className="mx-2 space-y-1">
                                        { sidebarOptions.map((option) => (
                                            <li key={option.name}>
                                                <Link href={option.href} className={classNames(option.current ? 'text-gray-200 bg-gray-700 ' : 'hover:text-white text-gray-500 hover:bg-gray-700 ', 'group flex gap-x-3 rounded-md p-2  leading-6 font-semibold')}>
                                                    {option.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul> 
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
