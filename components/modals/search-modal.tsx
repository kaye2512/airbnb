'use client'
import React, {useCallback, useMemo, useState} from 'react';
import Rental_modal from "@/components/ui/rental_modal";
import useSearchModal from "@/hooks/use-search-modal";
import {useRouter, useSearchParams} from "next/navigation";
import { Range } from "react-date-range"
import dynamic from "next/dynamic";
import CountrySelect, {CountrySelectValue} from "@/components/country-select";
import qs from 'query-string';
import {formatISO} from "date-fns";
import Heading from "@/components/ui/heading";
import Calendar from "@/components/calendar";
import Counter from "@/components/counter";


enum STEPS {
    LOCATION,
    DATE,
    INFO
}
const SearchModal = () => {
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(() => dynamic(() => import('../map'), {
        ssr: false,
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    // on submit button
    const onSubmit = useCallback(async () => {
        if (step!== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updateQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        if (dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {skipNull: true})

        setStep(STEPS.LOCATION)
        searchModal.onClose()

        router.push(url)
    },[step,searchModal,location,router,guestCount,roomCount,bathroomCount,dateRange,onNext,params])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'Search'
        }

        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION){
            return undefined
        }

        return 'Back'
    },[step])

    let bodyContent = (
        <div className={"flex flex-col gap-8"}>
            <Heading title={"where do you go?"} subtitle={"Find the perfect location"}/>
            <CountrySelect onChange={(value) => setLocation(value as CountrySelectValue)} value={location}/>
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )

    if (step === STEPS.DATE){
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"when do you plan go?"} subtitle={"Make sure everyone is free"}/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"More information"} subtitle={"Find your perfect place"}/>
                <Counter title={"Guests"} subtitle={"How many guest are coming?"} value={guestCount} onChange={(value) => setGuestCount(value)}/>
                <Counter title={"Rooms"} subtitle={"How many rooms do you need?"} value={roomCount} onChange={(value) => setRoomCount(value)}/>
                <Counter title={"Bathrooms"} subtitle={"How many bathrooms do you need?"} value={bathroomCount} onChange={(value) => setBathroomCount(value)}/>
            </div>
        )
    }
    return (
        <Rental_modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} title={'Filters'} body={bodyContent}/>
    );
};

export default SearchModal;