"use client"
import React from 'react';
import {Search} from "lucide-react";



const SearchFilter = () => {
    return (
        <div className={"border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"}>
           <div className={"flex flex-row items-center justify-between"}>
            <div className={"text-sm font-semibold px-6"}>
                <p>N'importe ou</p>
            </div>
               <div className={"hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center"}>
                   <p>une semaine</p>
               </div>
               <div className={"text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3"}>
                   <div className={"hidden sm:block"}>
                       <p>Ajouter des voyageur</p>
                   </div>
                   <div className={"p-2 bg-rose-500 rounded-full text-white"}>
                       <Search size={18} />
                   </div>
               </div>
           </div>
        </div>
    );
};

export default SearchFilter;