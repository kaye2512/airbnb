"use client"


import {Modal} from "@/components/ui/modal";
import useLoginModal from "@/hooks/use-login-modal";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {LoginSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from 'zod'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useCallback, useState, useTransition} from "react";
import {login} from "@/actions/login";
import {FormError} from "@/components/ui/form-error";
import {FormSuccess} from "@/components/ui/form-success";
import Rental_modal from "@/components/ui/rental_modal";
import Heading from "@/components/ui/heading";
import Rental_button from "@/components/ui/rental_button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import useRegisterModal from "@/hooks/use-register-modal";
import {useRouter} from "next/navigation";
import {FormData} from "@/types/types";
import InputRent from "@/components/ui/input-rent";

const LoginModal = () => {


    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const loginModal = useLoginModal()
    const  {
        register,
        handleSubmit,
        formState: {
            errors,
        },
            } = useForm<FormData>({
                resolver: zodResolver(LoginSchema),
                defaultValues: {
                    email: "",
                    password:"",
        }
    });

    const onSubmit = async (values: FormData) => {
        // TODO: faire en methode fetch aussi
        setError("")
        setSuccess("")
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })

    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
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
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                actionLabel="Continue"
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    );
};

export default LoginModal;