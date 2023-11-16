"use client"
//import { ChartBarIcon, HomeIcon, CubeIcon, DocumentArrowDownIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

function classNames(...classes: string[]){
    return classes.filter(Boolean).join('')
}

const Sidebar = () => {

    const segment =  useSelectedLayoutSegment()

    const sidebarOptions = [
        {name:'Dashboard', href:'/dashboard', icon: 'HomeIcon', current: !segment ? true : false},
        {name:'Products', href:'/dashboard/products', icon: 'CubeIcon', current: `/${segment}` === '/products' ? true : false},
        {name:'Picking', href:'/dashboard/picking', icon: 'DocumentArrowDownIcon', current: `/${segment}` === '/picking' ? true : false},
        {name:'Warehouse', href:'/dashboard/warehouse', icon: 'Squares2X2Icon', current: `/${segment}` === '/warehouse' ? true : false}
    ]

    return (
        <div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col mt-20 ml-48">
                <div className="flex grow flex-col gapy-y-5 overflow-y-auto px-6 pb-4 border-r-2">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7 mt-6">
                            <li>
                                <ul role="list" className="mx-2 space-y-1">
                                    { sidebarOptions.map((option) => (
                                        <li key={option.name}>
                                            <Link href={option.href} className={classNames(option.current ? 'text-gray-200 bg-gray-700 ' : 'hover:text-white text-gray-500 hover:bg-gray-700 ', 'group flex gap-x-3 rounded-md p-2  leading-6 font-semibold')}>
                                                
                                                {option.name}
                                            </Link>
                                        </li>
                                    ))
                                    }
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
