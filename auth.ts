import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config";

import prisma from "./lib/prismadb"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    ...authConfig,
})