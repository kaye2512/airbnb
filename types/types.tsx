import {FieldError,  UseFormRegister} from "react-hook-form";


export type FormData = {
    name: string
    email: string
    password: string
}

export type InputProps = {
    id: string;
    label: ValidFieldNames;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    register: UseFormRegister<FormData>;
    errors: FieldError | undefined
}

export type ValidFieldNames =
    | "name"
    | "email"
    | "password";


