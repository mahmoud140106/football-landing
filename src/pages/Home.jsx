import HeroSection from "../components/HeroSection";
import Advertisement from "../components/Advertisement";
import { fetchArticle } from "../store/slices/articlesSlice.js";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
// import { fetchMatchesHero } from '../store/slices/MatchesListSlice.js';
import { fetchMatches } from "../store/slices/MatchesListSlice.js";
import { fetchVisits } from "../store/slices/visitsSlice.js";
import { Clock, MapPin, Trophy } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Translate } from "translate-easy";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const dispatch = useDispatch();
  const { article, isLoading, error } = useSelector((state) => state.article);
  const { matches } = useSelector((state) => state.matches);
  //   console.log("matches", matches);
  useEffect(() => {
    dispatch(fetchVisits());
    dispatch(fetchMatches("today"));
    dispatch(fetchArticle());
  }, [dispatch]);

  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const articlesToShow = isSmallScreen ? 4 : 5;

  const todayMatches = matches.filter((match) => match.day === "today");

  // console.log("todayMatches todayMatches", todayMatches);

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

  return (
    <>
      <Helmet>
        <title>Live Footballia</title>
        <link rel="canonical" href="https://livefootballia.com" />
        <meta
          name="description"
          content="Watch live football matches, follow real-time scores, and stay updated with the latest football news, articles, and match highlights on Live Footballia."
        />
      </Helmet>
      <div className=" mt-5 grid grid-cols-12 gap-5 w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-8 my-5 ">
      <Advertisement adType="top" pageType={pageType} />

        <div className="w-full lg:col-span-8 col-span-12">
          <HeroSection />
          <div className="mt-5 space-y-4">
            {/* <div className="w-full col-span-12 h-[100px] md:h-[150px] lg:h-[200px]"> */}
              <Advertisement adType="btn" pageType={pageType} />
            {/* </div> */}
            {todayMatches
              .slice(0, 5)
              .reverse()
              .map((todayMatches, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-sm border xl:p-4 p-2 "
                >
                  <div className="  flex items-center justify-between">
                    <div className="grid grid-cols-12 items-center gap-5 w-full">
                      <div className=" md:flex md:col-span-3 space-y-2 md:space-y-0 col-span-3 items-center lg:gap-2 gap-4 ">
                        <div className="flex flex-col items-center justify-center md:flex-row md:justify-center">
                          <img
                            src={todayMatches.teamOne.image}
                            alt={todayMatches.teamOne.name}
                            className="w-12 h-12  md:mr-2"
                            loading="lazy"
                          />
                          <h2 className="text-center text-green-500 font-medium hidden xl:block">
                            <Translate>{todayMatches.teamOne.name}</Translate>
                          </h2>
                        </div>
                        <div className="">
                          <span className="text-xl rounded-full flex justify-center  px-3 py-1 font-semibold">
                            <Translate>{todayMatches.goalOne}</Translate>
                          </span>
                        </div>
                      </div>
                      <div className=" md:block items-center justify-center w-full md:col-span-6  col-span-6">
                        <div className="w-full">
                          <Link className="w-full " to={todayMatches.livelink}>
                            <Button
                              variant={"outline"}
                              className="w-full h-16 text-green-500 hover:text-green-500"
                            >
                              <Translate>Watch Now</Translate>
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="w-full md:flex md:col-span-3 space-y-2 md:space-y-0 col-span-3 justify-end  items-center gap-2">
                        <div className="hidden md:block">
                          <span className="text-xl font-semibold  rounded-full  px-3 py-1  ">
                            <Translate>{todayMatches.goalTwo}</Translate>
                          </span>
                        </div>
                        <h2 className=" text-green-500 font-medium hidden text-right xl:block">
                          <Translate>{todayMatches.teamTwo.name}</Translate>
                        </h2>
                        <div className=" flex items-center justify-center">
                          <img
                            src={todayMatches.teamTwo.image}
                            alt={todayMatches.teamTwo.name}
                            loading="lazy"
                            className="w-12 h-12"
                          />
                        </div>
                        <div className="md:hidden flex justify-center">
                          <span className="text-xl font-semibold  rounded-full  px-3 py-1  ">
                            <Translate>{todayMatches.goalTwo}</Translate>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-1 mt-3 flex items-center justify-around">
                    <div className="  font-bold text-right">
                      <span
                        className={`text-sm flex items-center gap-2 ${
                          todayMatches.status === "live"
                            ? "text-green-500"
                            : todayMatches.status === "ended"
                            ? "text-red-500"
                            : "cursor-not-allowed"
                        }`}
                      >
                        <Clock className=" md:block md:w-4 md:h-4 w-3 h-3" />
                        <Translate>{todayMatches.time}</Translate>
                      </span>
                    </div>

                    <div className="  font-bold text-center md:justify-start justify-start flex items-center gap-2">
                      <span className="text-sm flex items-center gap-2">
                        <Trophy className=" md:block md:w-4 md:h-4 w-3 h-3" />
                        <Translate>{todayMatches.championship?.name}</Translate>
                      </span>
                    </div>

                    <div className=" flex  font-bold  md:justify-end md:mt-0 mt-2 items-center gap-2 ">
                      <MapPin className=" w-4 h-4" />
                      <span className="text-sm ">
                        <Translate>{todayMatches.stadium}</Translate>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            <Link to="/matches">
              {" "}
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                variant={"outline"}
              >
                <Translate>View all</Translate>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* <div className="lg:block hidden  lg:col-span-2 h-[450px]"> */}
        <Advertisement adType="side" pageType={pageType} />
        {/* </div> */}
        <div className="hidden lg:block col-span-2 ">
          {article
            .slice()
            .sort((a, b) => b.visits - a.visits)
            .slice(0, articlesToShow)
            .map((article, index) => (
              <div
                key={index}
                className="mb-3 drop-shadow-xl overflow-hidden sm:rounded-md "
              >
                <div className="xl:flex gap-2 items-center">
                  <div className="md:shrink-0">
                    <img
                      className="w-16 h-16"
                      src={article.cover}
                      alt={article.title}
                    />
                  </div>
                  <div className="mx-1">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      <Translate>{article.title}</Translate>
                    </div>
                    <Link
                      to={`https://matches.livefootballia.com/${article._id}`}
                      className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                    >
                      <p className="text-gray-500 text-xs xl:mt-2 md:mt-1">
                        <Translate>Read more</Translate>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full col-span-12 flex justify-between">
          <h1 className="font-semibold">
            <Translate>News and articles </Translate>
          </h1>
        </div>
        {/* <div className="w-full col-span-12 h-[100px] md:h-[150px] lg:h-[200px]">
          <Advertisement adType="top" pageType={pageType} />
        </div> */}
        <Link to="/articles">
          <Button variant={"outline"} className="font-semibold">
            <Translate>View all</Translate>
          </Button>
        </Link>
        <div className="w-full col-span-12 gap-3 ">
          {isLoading ? (
            <div className="text-center py-5">Loading articles...</div>
          ) : error ? (
            <div className="text-center py-5 text-red-500">Error: {error}</div>
          ) : (
            <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
              {sortedArticles.slice(0, 4).map((item) => (
                <Card key={item._id}>
                  <CardHeader>
                    <img
                      loading="lazy"
                      className="w-full rounded-md h-[200px] object-cover"
                      src={item.cover}
                      alt={item.title}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      <Translate>{item.title}</Translate>
                    </CardTitle>
                  </CardContent>

                  <CardFooter>
                    <Link to={`https://matches.livefootballia.com/${item._id}`}>
                      {" "}
                      <Button variant={"outline"}>
                        <Translate> Read more</Translate>{" "}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* <div className="w-full col-span-12 h-[100px] md:h-[150px] lg:h-[200px] "> */}
          <Advertisement adType="bottom" pageType={pageType} />
        {/* </div> */}
      </div>
    </>
  );
}
