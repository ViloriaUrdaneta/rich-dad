import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function GET(req: Request){

    try {
        const result = await sql`
            SELECT * FROM expenses;        
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


export async function POST(request: Request) {

    const { description, amount, category_id, date } = await request.json();

    try {
        const result = await sql`
            INSERT INTO expenses (description, amount, category_id, date)    
                VALUES (${description}, ${amount}, ${category_id}, ${date});        
        `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};