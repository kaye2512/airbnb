import React from 'react';
import getListingById from "@/actions/get-listing-by-id";
import EmptyState from "@/components/empty-state";
import getCurrentUser from "@/actions/get-current-user";
import ListingClient from "@/app/(homepage)/(routes)/listings/[listingId]/component/listing-client";
import getReservations from "@/actions/get-reservations";

interface IParams {
    listingId?: string
}
const ListingPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser()

    if (!listing){
        return (

                <EmptyState/>
        )
    }

    return (
        <div>
            <ListingClient listing={listing} reservations={reservations} currentUser={currentUser}/>
        </div>
    );
};

export default ListingPage;