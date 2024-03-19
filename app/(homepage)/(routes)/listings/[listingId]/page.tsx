import React from 'react';
import getListingById from "@/actions/get-listing-by-id";
import EmptyState from "@/components/empty-state";
import getCurrentUser from "@/actions/get-current-user";
import ListingClient from "@/app/(homepage)/(routes)/listings/[listingId]/component/listing-client";

interface IParams {
    listingId?: string
}
const ListingPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

    if (!listing){
        return (

                <EmptyState/>
        )
    }

    return (
        <div>
            <ListingClient listing={listing} currentUser={currentUser}/>
        </div>
    );
};

export default ListingPage;