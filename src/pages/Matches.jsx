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



            <div className="xl:flex block gap-5">
                <div className='hidden xl:block w-1/4 h-[450px]'>
                    <Advertisement />
                </div>

                <div className='xl:w-3/4 w-full h-[450px]'>
                    <MatchesList selectedTab={selectedTab} />
                </div>
            </div>

            <div className="w-full h-[450px]">
                <Advertisement />
            </div>
        </div>
    );
}
