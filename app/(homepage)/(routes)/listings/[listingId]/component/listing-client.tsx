'use client'
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeListing, SafeReservation, SafeUser} from "@/types";
import {categories} from "@/components/navbar/categories";
import Container from "@/components/ui/container";
import ListingHead from "@/components/listings/listing-head";
import ListingInfo from "@/components/listings/listing-info";
import useLoginModal from "@/hooks/use-login-modal";
import {useRouter} from "next/navigation";
import {differenceInCalendarDays,  eachDayOfInterval} from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/components/listings/listing-reservation";
import {Range} from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[]
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
                                                     }) => {

    const loginModal = useLoginModal()
    const router = useRouter()

    const disableDates = useMemo(() => {
        let dates : Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })
    return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true)

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success('Listing reserved!')
            setDateRange(initialDateRange);
            router.push('/trips')
            router.refresh()
        }).catch(() => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })

    },[totalPrice, dateRange, listing?.id, currentUser, loginModal, router])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])
    
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])


    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser}/>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className={"order-first mb-10 md:order-last md:col-span-3"}>
                            <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disableDates} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;