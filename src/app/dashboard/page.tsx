"use client"
import { useSession } from 'next-auth/react'


function DashboardPage() {

    const {data: session, status} = useSession();
    console.log(session, status)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        </main>
    )
}

export default DashboardPage
