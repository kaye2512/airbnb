import React from 'react';
import getCurrentUser from "@/actions/get-current-user";
import EmptyState from "@/components/empty-state";
import getReservations from "@/actions/get-reservations";
import ReservationsClient from "@/app/(homepage)/(routes)/reservations/component/reservations-client";

const ReservationPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title={"Unauthorized"} subtitle={"Please login"}/>
        )
    }

    const reservations = await getReservations({authorId: currentUser.id})

    if (reservations.length === 0){
        return (
            <EmptyState title={'No reservations found'} subtitle={"Looks like you have no reservations on your properties"}/>
        )
    }
    return (
        <ReservationsClient reservations={reservations} currentUser={currentUser} />


    );
};

export default ReservationPage;