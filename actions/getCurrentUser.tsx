
import {auth} from "@/auth";
import prisma from "@/lib/prismadb";

export default async function GetCurrentUser () {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser){
            return null
        }

        return currentUser
    }catch (error: any) {
        return null;
    }

};

