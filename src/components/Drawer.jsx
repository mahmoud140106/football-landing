"use client"

import * as React from "react"
import { AlignJustify, Minus, Plus } from "lucide-react"

import { Button } from "./ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Link } from "react-router"




const links = [
    {
        name: "Main",
        href: "/"
    },
    {
        name: "Matches",
        href: "/matches"
    },
    {
        name: "Article And Lives",
        href: "/articles"
    },

    {
        name: "AboutUS",
        href: "/aboutUs"
    },


    {
        name: "Contact US",
        href: "/contactUs"
    },

    {
        name: "Privacy",
        href: "/privacy"
    },
]

export default function DrawerDemo() {


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline"><AlignJustify /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">

                    <div>
                        <ul
                            className='lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed  max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>

                            <li className='mb-6 hidden max-lg:block'>
                                <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                                </a>
                            </li>
                            {links.map((link) => (
                                <li className="max-lg:border-b max-lg:py-3 px-3" key={link.name}>
                                    <Link className=' block text-[15px]' to={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
