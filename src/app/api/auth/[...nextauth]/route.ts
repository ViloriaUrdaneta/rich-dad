import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { User } from "@/types";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label:"Password", type: "password" }
            },
            async authorize(credentials, req){
                console.log('credentials?.email: ', credentials?.email)
                const trimmedEmail = credentials?.email?.trim();
                const userFound = await sql`SELECT * FROM users WHERE email = ${trimmedEmail};`;
                if (!userFound.rows[0]){
                    throw new Error('Invalid credentials');
                } 
                const user: User = {
                    id: userFound.rows[0].user_id,
                    email: userFound.rows[0].email,
                    username: userFound.rows[0].user_name,
                    password: userFound.rows[0].password
                };
                const passwordMatch = await bcrypt.compare(credentials!.password, user.password);
                if (!passwordMatch) throw new Error('Invalid credentials');
                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile){
                console.log('-----------> profile en Google Provider: ', profile)
                const user: User = {
                    id: profile.sub,
                    email: profile.email,
                    username: profile.name,
                    password: profile.aud
                };
                console.log('-----------> user en Google Provider: ', user)
                return user;
            }
        })
    ],
    callbacks: {
        jwt({token, user}){
            if (user) token.user = user;
            return token
        },
        session({session, token}){
            session.user = token.user as any;
            return session
        }
    },
    pages: {
        signIn: "/login"
    }
})

export { handler as GET, handler as POST}