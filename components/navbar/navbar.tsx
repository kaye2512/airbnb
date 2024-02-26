"use client"
import React from 'react';
import Container from "../../../airbnb/components/ui/container";
import Logo from "./logo";
import SearchFilter from "./search-filter";
import UserMenu from "./user-menu";
import {User} from "@prisma/client";
import Categories from "@/components/navbar/categories";

interface NavbarProps {
    currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    console.log(currentUser)
    return (
        <div className={"fixed w-full bg-white z-10 shadow-sm"}>
            <div className={"py-4 border-b-[1px]"}>
                <Container>
                    <div className={"flex flex-row items-center justify-between gap-3 md:gap-0"}>
                        <Logo/>
                        <SearchFilter />
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

export default Navbar;