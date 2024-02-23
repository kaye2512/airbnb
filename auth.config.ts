// @ts-ignore
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { z } from 'zod'
import prisma from "./lib/prismadb";


export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
};

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const {email , password} = parsedCredentials.data;
                    const user = await getUserByEmail(email)
                    if(!user || !user.hashedPassword) return null;

                    const passordsMatch = await bcrypt.compare(
                        password,
                        user.hashedPassword,
                    );

                    if (passordsMatch) return user;


                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig