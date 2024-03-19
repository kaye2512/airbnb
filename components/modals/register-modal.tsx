"use client"
import React, {useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Modal} from "@/components/ui/modal";
import useRegisterModal from "@/hooks/use-register-modal";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {LoginSchema, RegisterSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import useLoginModal from "@/hooks/use-login-modal";

const RegisterModal = () => {

    const [loading, setLoading] = useState(false)
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password:"",
        }
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        // TODO: faire en methode fetch aussi

        setLoading(true);

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
                setLoading(false);
            })
    }


    return (
        <div>
            <Modal title={"CONNEXION"} description={"connectez-vous"} isOpen={registerModal.isOpen} onClose={registerModal.onClose}>
                <div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name={"name"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder={"Name"}
                                                    type={"text"}
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"email"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder={"Email"}
                                                    type={"email"}
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
                                                    disabled={loading}
                                                    placeholder={"Password"}
                                                    type={"password"}
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>

                                    )}
                                />
                                <div className={"pt-6 space-x-2 flex items-center justify-end w-full"}>

                                    <Button disabled={loading}  type={"submit"}>Connexion</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default RegisterModal;