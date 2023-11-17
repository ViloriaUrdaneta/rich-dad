import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
import { User } from '@/types';

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    let user: any;

    try {
        if(token){
            user = token.user
            console.log(user.id)
            const result = await sql`
            SELECT NOW();        
            `;
            return NextResponse.json({ result }, { status: 200 });
        } else{
            return NextResponse.json({ message: 'No auth token' }, { status: 400 });
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
};


