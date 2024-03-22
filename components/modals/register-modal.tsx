"use client"
import React, {useCallback, useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Modal} from "@/components/ui/modal";
import useRegisterModal from "@/hooks/use-register-modal";
import {SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {LoginSchema, RegisterSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import useLoginModal from "@/hooks/use-login-modal";
import Rental_modal from "@/components/ui/rental_modal";
import Heading from "@/components/ui/heading";
import InputRent from "@/components/ui/input-rent";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import Rental_button from "@/components/ui/rental_button";
import {FormData, ValidFieldNames} from "@/types/types";

const RegisterModal = () => {


    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit = async (values: FormData) =>
    {
        // TODO: faire en methode fetch aussi


        setIsLoading(true);

        axios.post('/api/register', values)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })


    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <InputRent
                id="name"
                label="name"
                disabled={isLoading}
                register={register}
                errors={errors.name}

            />
            <InputRent
                id="email"
                label="email"
                disabled={isLoading}
                register={register}
                errors={errors.email}

            />
            <InputRent
                id="password"
                label="password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors.password}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Rental_button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {
                }}
            />
            <Rental_button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {
                }}
            />
            <div
                className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
            >
                <p>Already have an account?
                    <span
                        onClick={onToggle}
                        className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
                    > Log in</span>
                </p>
            </div>
        </div>
    )


    return (
        <div>
            <Rental_modal
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                actionLabel={"Continuez"}
                isOpen={registerModal.isOpen}
                disabled={isLoading}
                title={"Créez un compte"}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    );
};

export default RegisterModal;