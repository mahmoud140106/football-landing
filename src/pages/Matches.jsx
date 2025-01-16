import HeroSection from "../components/HeroSection";
import MatchesList from '../components/MatchesList';
import TabButton from "../components/TapsButton";
import Advertisement from '../components/Advertisement';
import { useState } from "react";

export default function Matches() {
    const [selectedTab, setSelectedTab] = useState("today"); // الحالة لتحديد التاب الحالي

    return (
        <div className="mx-auto mt-10 grid gap-5 w-full">
            <TabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <HeroSection />
            <MatchesList selectedTab={selectedTab} />
            <Advertisement />
        </div>
    );
}
