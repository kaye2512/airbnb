'use client'
import React from 'react';
import {SafeUser} from "@/types";
import {IconType} from "react-icons";
import useCountries from "@/hooks/use-countries";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import ListingCategory from "@/components/listings/listing-category";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../map'), {
    ssr: false
})

interface ListingInfoProps {
    user: SafeUser
    description: string
    guestCount: number
    roomCount: number
    bathroomCount: number
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    locationValue: string
}
const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
                                                 }) => {
    const {getByValue} = useCountries();

    const coordinates = getByValue(locationValue)?.latlng


    return (
        <div className={'col-span-4 flex flex-col gap-8'}>
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>
                        Posté par {user?.name}
                    </div>
                    <Avatar>
                        <AvatarImage src={`${user.image}`}/>
                    </Avatar>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        {guestCount} Voyageur
                    </div>
                    <div>
                        {roomCount} Chambres
                    </div>
                    <div>
                        {bathroomCount} Toilets
                    </div>
                </div>
            </div>
            <hr/>
            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description}/>
            )}
            <hr/>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    );
};

export default ListingInfo;