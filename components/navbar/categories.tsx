'use client'
import React from 'react';
import Container from "@/components/ui/container";
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill
} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md";
import CategoryBox from "@/components/category-box";
import {usePathname, useSearchParams} from "next/navigation";
import {FaSkiing} from "react-icons/fa";
import {BsSnow} from "react-icons/bs";
import {IoDiamond} from "react-icons/io5";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'cette propriété est proche de la mer'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'cette propriété est moderne'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'cette propriété a une piscine'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: "cette propriété est proche d'un village"
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'cette propriété a une piscine'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'cette propriété est dans une ile'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: "cette propriété est proche d'un lac"
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: "cette propriété a une activé de sky"
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: "cette propriété est dans un chateau"
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: "cette propriété a une activé de camping"
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: "cette propriété a une activé de camping"
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: "cette propriété est dans un cave"
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: "cette propriété est dans un desert"
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: "cette propriété est un choix"
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: "cette propriété est luxueux"
    },

]
const Categories = () => {
    const params = useSearchParams()

    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/'

    if (!isMainPage) {
        return null
    }
    return (
        <Container>
            <div className={"pt-4 flex flex-row items-center justify-between overflow-x-auto"}>
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;