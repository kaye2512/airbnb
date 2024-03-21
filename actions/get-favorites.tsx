import prismadb from "@/lib/prismadb";

import getCurrentUser from "@/actions/get-current-user";

export default async function getFavorites() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return []
        }

        const favorites = await prismadb.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));
        return safeFavorites
    }catch (error: any){
        throw new Error(error)
    }
}