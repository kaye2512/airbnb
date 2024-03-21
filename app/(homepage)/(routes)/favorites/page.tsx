import EmptyState from "@/components/empty-state";

import React from 'react';
import getFavorites from "@/actions/get-favorites";
import getCurrentUser from "@/actions/get-current-user";
import FavoritesClient from "@/app/(homepage)/(routes)/favorites/component/favorites-client";

const FavoritesPage = async () => {
    const favorites = await getFavorites()
    const currentUser = await getCurrentUser()

    if (favorites.length === 0) {
        return (
            <EmptyState title={"No favorites found"} subtitle={"Looks like you have no favorites listings"}/>
        );
    }

    return (
        <>
            <FavoritesClient listings={favorites} currentUser={currentUser}/>
        </>
    )
};

export default FavoritesPage;