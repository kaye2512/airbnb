import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config";

import prismadb from "./lib/prismadb";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session ({token, session}){
           if (token.sub && session.user) {
               session.user.id = token.sub;
           }

            return session
        },
        async jwt ({token}) {
            console.log(token);
            return token;
        }
    },
    adapter: PrismaAdapter(prismadb),
    session: {strategy: "jwt"},
    ...authConfig,
})