import HeroSection from "../components/HeroSection";
import Advertisement from "../components/Advertisement";
import {Card, CardContent, CardHeader, CardTitle,} from "../components/ui/card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button} from "../components/ui/button";
import {Link} from "react-router";
import {fetchMatches} from "../store/slices/MatchesListSlice.js";
import {fetchVisits} from "../store/slices/visitsSlice.js";
import {Clock, MapPin, Trophy} from "lucide-react";
import {useMediaQuery} from "react-responsive";
import {Translate} from "translate-easy";
import {Helmet} from "react-helmet-async";
import TabButton from "../components/TapsButton.jsx";
import Loading from "./../components/ui/Loading";
import NotificationCard from "../components/NotificationCard.jsx";
import {motion} from "framer-motion";
import {fetchArticle} from "./../store/slices/articlesSlice";
import {saveSubscription} from "../store/slices/notificationsSlice.js";
import VideoAdPlayer from "../components/VideoAdPlayer.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("today");
  const {article, isLoading, isError, errorMessage} = useSelector(
    (state) => state.article
  );

  const {matches, loading: loadingMaches, error: errorMaches} = useSelector(
    (state) => state.matches
  );

  useEffect(() => {
    dispatch(fetchVisits());
    dispatch(fetchMatches({day: selectedTab}));
  }, [dispatch, selectedTab]);

  useEffect(() => {
    dispatch(fetchArticle({page: "1", limit: "10"}));
  }, [dispatch]);

  const isSmallScreen = useMediaQuery({maxWidth: 1024});
  const articlesToShow = isSmallScreen ? 4 : 5;

  const sortedArticles = [...article].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getPageType = () => {
    const path = location.pathname;

    if (path === "/") return "main";
    if (path.startsWith("/matches")) return "matches";
    if (path.startsWith("/articles")) return "articles";
    return "default";
  };

  const pageType = getPageType();

  const matchCardVariants = {
    hidden: {opacity: 0, y: 30},
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {delay: index * 0.1, duration: 0.5},
    }),
  };

  const articleVariants = {
    hidden: {opacity: 0, scale: 0.9},
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {delay: index * 0.15, duration: 0.5},
    }),
  };
  const [showAskNotification, setShowAskNotification] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (typeof Notification === "undefined") {
      console.warn("Notifications are not supported on this browser.");
      return;
    }
    const notificationDismissed = localStorage.getItem("notificationDismissed");

    if (Notification.permission === "granted") {
      setIsSubscribed(true);
      setShowAskNotification(false);
    } else if (Notification.permission === "denied") {
      setShowAskNotification(<meta
        name="keywords"
        content={keywords?.keywords?.map((keyword) => keyword)}
      />);
      setIsSubscribed(false);
      localStorage.setItem("notificationDismissed", "false");
    } else if (notificationDismissed === "true") {
      setIsSubscribed(false);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) =>
          console.log("Service Worker registered:", registration)
        )
        .catch((error) =>
          console.error("Service Worker registration failed:", error)
        );
    }
  }, []);

  const handleDismiss = () => {
    setIsSubscribed(false);
    setShowAskNotification(false);
    localStorage.setItem("notificationDismissed", "true");
  };

  const handleAllow = async () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission denied");
          setShowAskNotification(false);
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            "BDHiWm_PUn4DghehBLMR69Z6yVAHqbq6nmVhZ1YoQHjOxQNyjvBudexWS-9h_VsD1KhtJJW_ljyrkfgOQnp3JGE",
        });

        dispatch(saveSubscription(subscription.toJSON()));

        setIsSubscribed(true);
        setShowAskNotification(false);
        localStorage.setItem("notificationDismissed", "false");
      } catch (error) {
        console.error("Error subscribing to notifications:", error);
      }
    }
  };
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://livefootballia.com"/>
        <meta
          name="description"
          content="Watch live football matches, follow real-time scores, and stay updated with the latest football news, articles, and match highlights on Live Footballia."
        />
      </Helmet>

      {showAskNotification && (
        <div
          className=" fixed flex justify-center items-center top-5 left-1/2 transform -translate-x-1/2 w-fit max-sm:w-full z-50">
          <NotificationCard onDismiss={handleDismiss} onAllow={handleAllow}/>
        </div>
      )}
      <div className=" mt-2 grid grid-cols-12 gap-2 w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-8 my-5  ">
        <div className="w-full  max-w-[63.4rem] max-sm:max-w-fit lg:col-span-12 col-span-12">
          <div className=" flex justify-end items-center">
            <TabButton
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
        </div>
        <div className="lg:block hidden  lg:col-span-2">
          <Advertisement adType="side" pageType={pageType}/>
        </div>
        <div className="w-full lg:col-span-8 col-span-12">
          <HeroSection/>
          <div className="mt-5 space-y-4 max-sm:mt-0 max-sm:space-y-1">
            {loadingMaches ? (
              <Loading height="h-40"/>
            ) : errorMaches ? (
              <div className="text-center text-red-500 font-semibold text-lg p-5">
                <Translate>No Available Matches For This Day</Translate>
              </div>
            ) : (
              matches.slice(0, 5).map((match, index) => (
                <motion.div
                  key={`${selectedTab}-${index}`}
                  variants={matchCardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="rounded-lg shadow-sm border xl:p-4 p-2"
                >
                  <div className="  flex items-center justify-between">
                    <div className="grid grid-cols-12 items-center gap-5 w-full">
                      <div
                        className=" md:flex md:col-span-3 space-y-2 md:space-y-0 col-span-3 items-center lg:gap-2 gap-4 ">
                        <div className="flex flex-col items-center justify-center md:flex-row md:justify-center">
                          <img
                            src={match.teamOne.image}
                            alt={match.teamOne.name}
                            className="w-12 h-12  md:mr-2 min-w-12 min-h-12 object-contain"
                            loading="lazy"
                          />
                          <h2 className="text-center text-green-500 font-medium hidden xl:block">
                            <Translate>{match.teamOne.name}</Translate>
                          </h2>
                        </div>
                        <div className="">
                          <span className="text-xl rounded-full flex justify-center  px-3 py-1 font-semibold">
                            <Translate>{match.goalOne}</Translate>
                          </span>
                        </div>
                      </div>
                      <div className=" md:block items-center justify-center w-full md:col-span-6  col-span-6">
                        <div className="w-full">
                          <Link className="w-full " to={match.livelink}>
                            <Button
                              variant={"outline"}
                              className="w-full h-16 text-green-500 hover:text-green-500"
                            >
                              <Translate>Watch Now</Translate>
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div
                        className="w-full md:flex md:col-span-3 space-y-2 md:space-y-0 col-span-3 justify-end  items-center gap-2">
                        <div className="hidden md:block">
                          <span className="text-xl font-semibold  rounded-full  px-3 py-1  ">
                            <Translate>{match.goalTwo}</Translate>
                          </span>
                        </div>
                        <h2 className=" text-green-500 font-medium hidden text-right xl:block">
                          <Translate>{match.teamTwo.name}</Translate>
                        </h2>
                        <div className=" flex items-center justify-center">
                          <img
                            src={match.teamTwo.image}
                            alt={match.teamTwo.name}
                            loading="lazy"
                            className="w-12 h-12 min-w-12 min-h-12 object-contain"
                          />
                        </div>
                        <div className="md:hidden flex justify-center">
                          <span className="text-xl font-semibold  rounded-full  px-3 py-1  ">
                            <Translate>{match.goalTwo}</Translate>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-1 mt-3 flex items-center justify-around">
                    <div className="  font-bold text-right">
                      <span
                        className={`text-sm flex items-center gap-2 ${
                          match.status === "live"
                            ? "text-green-500"
                            : match.status === "ended"
                              ? "text-red-500"
                              : "cursor-not-allowed"
                        }`}
                      >
                        <Clock className=" md:block md:w-4 md:h-4 w-3 h-3"/>
                        <Translate>{match.time}</Translate>
                      </span>
                    </div>

                    <div className="  font-bold text-center md:justify-start justify-start flex items-center gap-2">
                      <span className="text-sm flex items-center gap-2">
                        <Trophy className=" md:block md:w-4 md:h-4 w-3 h-3"/>
                        <Translate>{match.championship?.name}</Translate>
                      </span>
                    </div>

                    <div className=" flex  font-bold  md:justify-end md:mt-0 mt-2 items-center gap-2 ">
                      <MapPin className=" w-4 h-4"/>
                      <span className="text-sm ">
                        <Translate>{match.stadium}</Translate>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            <a href="/matches">
              {" "}
              <Button
                className="w-full bg-green-500 hover:bg-green-600 my-4"
                variant={"outline"}
              >
                <Translate>View all</Translate>
              </Button>
            </a>
          </div>
        </div>
        <div className="hidden lg:block col-span-2 ">
          {/* <Advertisement adType="videoAd" pageType={pageType} /> */}
          <VideoAdPlayer/>
        </div>
        <div className="w-full col-span-12 flex justify-between">
          <h1 className="font-semibold">
            <Translate>News and articles </Translate>
          </h1>
        </div>
        <div className="w-full col-span-12">
          <Advertisement adType="top" pageType={pageType}/>
        </div>
        <a href="/articles">
          <Button variant={"outline"} className="font-semibold">
            <Translate>View all</Translate>
          </Button>
        </a>
        <div className="w-full col-span-12 gap-3 ">
          {isLoading ? (
            <Loading/>
          ) : isError ? (
            <div className="text-center py-5 text-red-500">
              Error: {isError}
            </div>
          ) : (
            <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
              {sortedArticles.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={articleVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Link
                    // key={item._id}
                    to={`https://matches.livefootballia.com/${item._id}`}
                  >
                    <Card
                      title={`Read more about: ${item.title}`}
                      className="cursor-pointer transition-all border-none duration-300 scale-95 hover:scale-100"
                    >
                      <CardHeader className="p-2">
                        <img
                          loading="lazy"
                          className="w-full rounded-md h-[200px] object-cover"
                          src={item.cover}
                          alt={item.title}
                        />
                      </CardHeader>
                      <CardContent className="p-2 pb-4">
                        <CardTitle
                          className="text-lg font-semibold transition-all duration-300 "
                        >
                          <Translate>{item.title}</Translate>
                        </CardTitle>
                      </CardContent>

                    </Card>
                  </Link>{" "}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/*<VideoAdPlayer/>*/}
        <div className="w-full col-span-12">
          <Advertisement adType="bottom" pageType={pageType}/>
        </div>
        <Advertisement adType="popupAd" pageType={pageType}/>
        <Advertisement adType="btn" pageType={pageType}/>
      </div>
    </>
  );
}
