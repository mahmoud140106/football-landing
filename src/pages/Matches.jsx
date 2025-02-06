import {useState} from "react";
import HeroSection from "../components/HeroSection";
import MatchesList from "../components/MatchesList";
import TabButton from "../components/TapsButton";
import Advertisement from "../components/Advertisement";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet-async";

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
    <>
      <Helmet>
        <link rel="canonical" href="https://livefootballia.com/matches"/>
        <meta
          name="description"
          content="Watch live football matches, follow real-time scores, and get the latest updates on today’s games. Stay updated with Live Footballia!"
        />
      </Helmet>
      <div className="mt-5 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 my-5 w-full">
        <div className="grid grid-cols-12">
          <div className="col-span-10">
            <TabButton
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-2">
          <Advertisement adType="btn" pageType={pageType}/>
        </div>
        <div className="max-w-[1300px] mx-auto mt-1 grid grid-cols-12 gap-5 w-full">
          <div className="hidden xl:block col-span-12 lg:col-span-2">
            <Advertisement adType="side" pageType={pageType}/>
          </div>
          <div className="col-span-12 xl:col-span-8">
            <HeroSection/>

            <div className="xl:flex block gap-5">
              <div className="w-full mb-5">
                <MatchesList selectedTab={selectedTab} pageType={pageType}/>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full col-span-12">
          <Advertisement adType="bottom" pageType={pageType}/>
        </div>
      </div>
    </>
  );
}
