import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest){

    const token = await getToken({ req })
    if (!token) return NextResponse.json({ message: 'No auth token' }, { status: 400 });

    const user: any = token.user

    try {

        const result = await sql`
            SELECT * FROM notebooks
            WHERE user_id = ${user.id};        
        `;

        if(result.rows.length < 1){
            const result = await sql`
            INSERT INTO notebooks (name, user_id)    
                VALUES ('Notes', ${user.id})
                RETURNING *;        
            `;
            return NextResponse.json({
                message: "Notebook notes created",
                result: result.rows
            },{
                status: 200
            })
        };

        return NextResponse.json(
            { message: 'Notebooks succefully founded', result: result.rows }, 
            { status: 200 }
        );
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message: error.message},{status: 500})
        }
    }
};


export async function POST(req: NextRequest) {

    const token = await getToken({ req })
    if (!token) return NextResponse.json({ message: 'No auth token' }, { status: 400 });

    const user: any = token.user
    const { name } = await req.json();

    try {
        const result = await sql`
            INSERT INTO notebooks (name, user_id)    
                VALUES (${name}, ${user.id});        
        `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};