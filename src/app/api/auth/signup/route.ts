import { NextResponse, NextRequest } from "next/server";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(req:NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if(password.length < 6) return NextResponse.json(
            {message: 'Password must be al least 6 characters'},
            {status: 409}
        )

        const userFound = await sql`SELECT * 
            FROM users 
            WHERE email = ${email}`;
        if(userFound.rows.length > 0){
            return NextResponse.json(
                {message: 'User already exists'},
                {status: 409}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await sql`INSERT INTO users 
            (user_name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

        return NextResponse.json(
            {message: `New user ${name} succesfully created`, result},
            {status: 200},
        )

    } catch (error) {
        return NextResponse.json(
            {message: 'Error'},
            {status: 401}
        )
    }
};


