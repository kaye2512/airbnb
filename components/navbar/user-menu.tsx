"use client"

import {Menu} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {useCallback, useState} from "react";
import MenuItem from "./menu-item";
import useRegisterModal from "../../../airbnb/hooks/use-register-modal";
import useLoginModal from "../../../airbnb/hooks/use-login-modal";
import {User} from "@prisma/client";
import {signOut, useSession} from "next-auth/react";
import useRentModal from "@/hooks/use-rent-modal";
import {SafeUser} from "@/types";


interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {

    const [isOpen, setIsOpen] = useState(false)
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser) {
           return loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

    const session = useSession()
    const onCLick = () => {
        signOut();
    }


    return (
        <div className={"relative"}>
            <div className={"flex flex-row items-center gap-3"}>
                <div
                    onClick={onRent}
                    className={"hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer "}
                >
                    Mettre mon logement sur Airbnb
                </div>
                <div
                    onClick={toggleOpen}
                    className={"p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"}
                >
                    <Menu />
                    <div className={"hidden md:block"}>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />

                        </Avatar>
                    </div>
                </div>
            </div>
            {/*si on clique sur le menu on toggle une liste*/}
            {isOpen && (
                <div className={"absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"}>
                    <div className={"flex flex-col cursor-pointer"}>
                        {/*condition si l'utilisateur est connecté show l'utilisateur menu if not show login and sign up*/}
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {}} label={"My trips"}/>
                                <MenuItem onClick={() => {}} label={"My favorites"}/>
                                <MenuItem onClick={() => {}} label={"My reservations"}/>
                                <MenuItem onClick={() => {}} label={"My properties"}/>
                                <MenuItem onClick={rentModal.onOpen} label={"Airbnb my home"}/>
                                <hr/>
                                <MenuItem onClick={onCLick} label={"Deconnexion"}/>
                            </>
                        ): (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label={"Login"}/>
                                <MenuItem onClick={registerModal.onOpen} label={"Sign up"}/>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;