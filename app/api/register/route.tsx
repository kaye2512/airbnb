// @ts-ignore
import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import {RegisterSchema} from "@/schemas";


export async function POST(request: Request){
    try {
        const body = await request.json();


        const result = RegisterSchema.safeParse(body)


        if (result.success) {
            const {
                email,
                name,
                password,
            } = body;

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await prismadb.user.create({
                data: {
                    email,
                    name,
                    hashedPassword,
                }
            });
            return NextResponse.json(user);
        }

        const serverErrors = Object.fromEntries(
            result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || [] || []
        )

        return NextResponse.json({ errors: serverErrors });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.error
    }
}