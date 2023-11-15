import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';


interface Params {
    params: { type: string };
}

export async function GET(req: Request, { params }: Params){

    try {
        const result = await sql`
            SELECT * FROM categories WHERE type = ${params.type};        
        `;

        if(result.rows.length < 1){
            return NextResponse.json({
                message: "Categories not found",
            },{
                status: 404
            })
        };

        return NextResponse.json(
            { message: 'Categories succefully founded', result: result.rows }, 
            { status: 200 }
        );
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message: error.message},{status: 500})
        }
    }
};