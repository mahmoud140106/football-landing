import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MatchesList from '../components/MatchesList';
import TabButton from "../components/TapsButton";
import Advertisement from '../components/Advertisement';
import { useLocation } from "react-router-dom"; // للحصول على المسار الحالي

export default function Matches() {
    const [selectedTab, setSelectedTab] = useState("today"); // الحالة لتحديد التاب الحالي
    const location = useLocation(); // المسار الحالي

    const getPageType = () => {
        const path = location.pathname;

        if (path === "/") return "main";
        if (path.startsWith("/matches")) return "matches";
        if (path.startsWith("/articles")) return "articles";
        return "default";
    };

    const pageType = getPageType();

    return (
        <div className="mx-auto mt-10 grid gap-5 w-full">
            <TabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <HeroSection />
            <div className="xl:flex block gap-5">
                <div className='hidden xl:block w-1/4 h-[450px]'>
                    <Advertisement adType="side" pageType={pageType} />
                </div>
                <div className='xl:w-3/4 w-full h-[450px]'>
                    <MatchesList selectedTab={selectedTab} />
                </div>
            </div>

            <div className="w-full h-[450px] mt-20">
                <Advertisement adType="bottom" pageType={pageType} />
            </div>
        </div>
    );
}
