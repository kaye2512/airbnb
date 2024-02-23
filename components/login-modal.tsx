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
import {useState, useTransition} from "react";
import {login} from "@/actions/login";
import {FormError} from "@/components/ui/form-error";
import {FormSuccess} from "@/components/ui/form-success";

const LoginModal = () => {


    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const loginModal = useLoginModal()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password:"",
        }
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
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


    return (
        <>
            <Modal title={"CONNEXION"} description={"connectez-vous"} isOpen={loginModal.isOpen} onClose={loginModal.onClose}>
                <div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name={"email"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder={"Email"}
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"password"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder={"Password"}
                                                    type={"password"}
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>

                                    )}
                                />
                                <FormError message={error}/>
                                <FormSuccess message={success}/>
                                <div className={"pt-6 space-x-2 flex items-center justify-end w-full"}>

                                    <Button disabled={isPending}  type={"submit"}>Connexion</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

            </Modal>
        </>
    );
};

export default LoginModal;