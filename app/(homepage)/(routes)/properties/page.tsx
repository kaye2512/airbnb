import React from 'react';
import getCurrentUser from "@/actions/get-current-user";
import EmptyState from "@/components/empty-state";
import PropertiesClient from "@/app/(homepage)/(routes)/properties/component/properties-client";
import getListings from "@/actions/get-listings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title={"Unauthorized"} subtitle={"Please login"}/>
        )
    }


    const listings = await getListings({userId: currentUser.id})

    if (listings.length === 0) {
        return (
            <EmptyState title={"No properties found"} subtitle={"Look like you have no properties"}/>
        )
    }
    return (
        <div>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </div>
    );
};

export default PropertiesPage;