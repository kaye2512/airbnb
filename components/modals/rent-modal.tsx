"use client"
import React, {useMemo, useState} from 'react';
import useRentModal from "@/hooks/use-rent-modal";
import Heading from "@/components/ui/heading";
import { categories } from "@/components/navbar/categories";
import CategoryInput from "@/components/category-input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import CountrySelect from "@/components/country-select";
import dynamic from "next/dynamic";
import Counter from "@/components/counter";
import ImageUpload from "@/components/image-upload";
import RentalModal from "@/components/ui/rental_modal";
import InputRent from "@/components/ui/input-rent";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


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
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
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
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')


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

    const onSubmit: SubmitHandler<FieldValues>= (data) => {
        if (step != STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true)
        axios.post('/api/listings', data)
            .then(()=> {
                toast.success('Listing Created')
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(()=> {
                toast.error('Something went wrong')
            }).finally(() => {
                setIsLoading(false)
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step]);

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
                <Heading title={"Share some basics about your place"} subtitle={"what amenities do you have?"}/>
                <Counter
                    title={"Guest"}
                    subtitle={"How many guest do you allow?"}
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr/>
                <Counter
                    title={"Rooms"}
                    subtitle={"How many rooms do you have?"}
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title={"Bathrooms"}
                    subtitle={"How many Bathrooms do you have?"}
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"Add a photo of your place"} subtitle={"Show guest what your place looks like"}/>
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"How would you describe your place"} subtitle={"Short ond sweet works best!"}/>
                <InputRent id={"title"} label={"Title"} disabled={isLoading} register={register} errors={errors} required/>
                <hr/>
                <InputRent id={"description"} label={"Description"} disabled={isLoading} register={register} errors={errors} required/>
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className={"flex flex-col gap-8"}>
                <Heading title={"Now, set your price"} subtitle={"How much do you charge per night?"}/>
                <InputRent id={"price"} formatPrice label={"Price"} type={"number"} disabled={isLoading} register={register} errors={errors} required/>
            </div>
        )
    }


    return (
        <RentalModal
            isOpen={rentModal.isOpen}
            title="Airbnb your home!"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            onClose={rentModal.onClose}
            body={bodyContent}
        />

    );
};

export default RentModal;