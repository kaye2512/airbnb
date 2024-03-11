"use client"
import React, {useState} from 'react';
import {Modal} from "@/components/ui/modal";
import useRentModal from "@/hooks/use-rent-modal";
import {Button} from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { categories } from "@/components/navbar/categories";
import CategoryInput from "@/components/category-input";
import {FieldValues, useForm} from "react-hook-form";


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


    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            description={"Rent your new home"}
            title={"Airbnb your home"}
        >
            <div>
                <div>
                        <form >
                            <Heading title={"which of these best describes your place?"} subtitle={"Pick a category"}/>

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
                            <div className={"pt-6 space-x-2 flex items-center w-full"}>
                                <Button variant={"destructive"} className={"bg-red-400 w-full"} type={"submit"}>Next</Button>
                            </div>
                        </form>
                </div>
            </div>
        </Modal>


    );
};

export default RentModal;