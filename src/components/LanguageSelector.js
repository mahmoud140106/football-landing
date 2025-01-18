import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/slices/translateText.js";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover.tsx";
import { Globe } from "lucide-react";
import { Button } from "./ui/button.tsx";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const handleChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div>
      <select value={language} onChange={handleChange} className="p-2 border">
        <option value="en">English</option>
        <option value="ar">العربية</option>
        <option value="fr">Français</option>
      </select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Globe />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <select
            value={language}
            onChange={handleChange}
            className="p-2 border">
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
          </select>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
