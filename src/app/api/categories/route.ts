import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {

    const { name, type } = await request.json();

    try {
        const result = await sql`
            INSERT INTO categories (name, type) 
                VALUES (${name}, ${type});        
        `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};