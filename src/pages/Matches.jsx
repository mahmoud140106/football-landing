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

        <div className="mt-10">
            <TabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="max-w-[1300px] mx-auto mt-10 grid grid-cols-12 gap-5 w-full">
                <div className='col-span-12 lg:col-span-2 h-[450px]'>
                    <Advertisement adType="side" pageType={pageType} />
                </div>
                <div className="col-span-12 xl:col-span-8">
                    <HeroSection />

                    <div className="xl:flex block gap-5">
                        <div className=' w-full h-[450px]'>
                            <MatchesList selectedTab={selectedTab} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full h-[450px] mt-20">
                <Advertisement adType="bottom" pageType={pageType} />
            </div>
        </div>
    );
}
