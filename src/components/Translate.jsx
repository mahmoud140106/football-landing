import { Languages } from "lucide-react";
import { Button } from "../components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import translate from "easy-translate";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setLanguage } from "../store/slices/translateText.js"

export default function DropdownMenuDemo({ }) {
    const dispatch = useDispatch();

    const handleLanguageChange = (lang) => {
        dispatch(setLanguage(lang));  // تحديث اللغة في الـ Redux store
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Languages className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
                        العربية
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
                        Français
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("de")}>
                        Deutsch
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
