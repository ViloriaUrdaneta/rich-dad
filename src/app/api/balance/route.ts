import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    try {
        const result = await sql`
            SELECT NOW();        
        `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
};


