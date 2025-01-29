import { useState } from "react";
import HeroSection from "../components/HeroSection";
import MatchesList from '../components/MatchesList';
import TabButton from "../components/TapsButton";
import Advertisement from '../components/Advertisement';
import { useLocation } from "react-router-dom";
export default function Matches() {
    const [selectedTab, setSelectedTab] = useState("today");

    const location = useLocation();

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
            <div className="grid grid-cols-12">
                <div className="col-span-10">
                    <TabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                </div>
            </div>
            <div className="max-w-[1300px] mx-auto mt-10 grid grid-cols-12 gap-5 w-full">
                <div className='col-span-12 lg:col-span-2 h-[450px]'>
                    <Advertisement adType="side" pageType={pageType} />
                </div>
                <div className="col-span-12 xl:col-span-8">
                    <HeroSection />

                    <div className="xl:flex block gap-5">
                        <div className='w-full mb-5'>
                            <MatchesList selectedTab={selectedTab} pageType={pageType} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full col-span-12 h-[250px]'>
                <Advertisement adType="top" pageType={pageType} />
            </div>
        </div>
    );
}

