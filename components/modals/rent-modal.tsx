"use client"
import React, {useMemo, useState} from 'react';
import {Modal} from "@/components/ui/modal";
import useRentModal from "@/hooks/use-rent-modal";
import {Button} from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { categories } from "@/components/navbar/categories";
import CategoryInput from "@/components/category-input";
import {FieldValues, useForm} from "react-hook-form";
import CountrySelect from "@/components/country-select";
import dynamic from "next/dynamic";


enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE

}

const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {register, handleSubmit, setValue,watch,formState:{
        errors,
    }, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')
    const location = watch('location')

    const Map = useMemo(() => dynamic(() => import('../map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    // const actionLabel = useMemo(() => {
    //     if (step === STEPS.PRICE) {
    //         return 'Create'
    //     }
    //
    //     return 'Next'
    // }, [step]);
    //
    // const secondaryActionLabel = useMemo(() => {
    //     if (step === STEPS.CATEGORY) {
    //         return undefined
    //     }
    //
    //     return 'Back'
    // }, [step]);

    let bodyContent = (
        <div>
            <Heading title={"Which of these best describes your place?"} subtitle={"Pick a category"}/>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"}>
                {categories.map((item) => (
                    <div key={item.label} className={"col-span-1"}>
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"Where is your place located"} subtitle={"Help guests find you!"}/>
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"Share some basics about your place"} subtitle={"Help guests find you!"}/>

            </div>
        )
    }


    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            description={"Rent your new home"}
            title={"Airbnb your home"}
        >
            <div>
                {bodyContent}

                <div className={"pt-6 space-x-2 flex items-center w-full"}>
                    {step !== STEPS.CATEGORY && <Button variant={'destructive'} className={'border-2 border-black w-full'} onClick={onBack}>Back</Button>}
                        {step !== STEPS.PRICE && <Button variant={'destructive'} className={'bg-red-400 w-full'} onClick={onNext}>Next</Button>}
                        {step === STEPS.PRICE && <Button variant={'destructive'} className={'bg-red-400 w-full'}>Finish</Button>}
                    </div>
            </div>
        </Modal>


);
};

export default RentModal;