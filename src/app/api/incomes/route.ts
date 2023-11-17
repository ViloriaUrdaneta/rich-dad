import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function GET(req: Request){

    try {
        const result = await sql`
            SELECT * FROM income;        
        `;

        if(result.rows.length < 1){
            return NextResponse.json({
                message: "Expenses not found",
            },{
                status: 404
            })
        };

        return NextResponse.json(
            { message: 'Expenses succefully founded', result: result.rows }, 
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

    const { description, amount, category_id, date } = await req.json();

    try {
        const result = await sql`
            INSERT INTO income (description, amount, category_id, date)    
                VALUES (${description}, ${amount}, ${category_id}, ${date});        
        `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};