import React from 'react';
import EmptyState from "@/components/empty-state";

import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import TripsClient from "@/app/(homepage)/(routes)/trips/component/trips-client";


const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title={"Unauthorized"} subtitle={"Please login"}/>
        )
    }


    const reservations = await getReservations({userId: currentUser.id})

    if (reservations.length === 0) {
        return (
            <EmptyState title={"No trips found"} subtitle={"Look like you havent reserved any trips"}/>
        )
    }
    return (
        <div>
            <TripsClient reservations={reservations} currentUser={currentUser} />
        </div>
    );
};

export default TripsPage;