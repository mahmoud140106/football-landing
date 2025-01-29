import HeroSection from '../components/HeroSection';
import Advertisement from '../components/Advertisement';
import { fetchArticle } from '../store/slices/articlesSlice.js';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
// import { fetchMatchesHero } from '../store/slices/MatchesListSlice.js';
import { fetchMatches } from '../store/slices/MatchesListSlice.js';
import { fetchVisits } from '../store/slices/visitsSlice.js';
import { Clock, MapPin, Trophy } from 'lucide-react';
import { useMediaQuery } from "react-responsive";


export default function Home() {
    const dispatch = useDispatch();

    const { article, isLoading, error } = useSelector((state) => state.article);

    const { matches, } = useSelector((state) => state.matches);



    console.log('matches', matches);

    useEffect(() => {
        dispatch(fetchVisits());
        dispatch(fetchMatches("today"));
        dispatch(fetchArticle());
    }, [dispatch]);

    const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
    const articlesToShow = isSmallScreen ? 4 : 6;



    // const todayMatches = matches.find((match) => match.status === "live");
    // const todayMatches = matches.filter((match) => match.day === "today");
    const todayMatches = matches.filter((match) => match.day === "today");

    console.log('todayMatches todayMatches', todayMatches);


    const sortedArticles = [...article].sort((a, b) => new Date(b.date) - new Date(a.date));


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
            <div className=' mt-10 grid grid-cols-12 gap-5 w-full'>
                <div className='lg:block hidden  lg:col-span-2 h-[450px]'>
                    <Advertisement adType="side" pageType={pageType} />
                </div>
                <div className='w-full lg:col-span-8 col-span-12'>
                    <HeroSection />
                    <div className='mt-5 space-y-2'>

                        {todayMatches.slice(0, 5).map((todayMatches, index) => (
                            <div key={index} className="rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between">
                                <div className="grid grid-cols-12 items-center gap-5 w-full">
                                    <div className=" md:flex md:col-span-3 space-y-2 md:space-y-0 col-span-3 items-center lg:gap-2 gap-4 ">
                                        <div className="flex items-center xl:justify-center  gap-2">
                                            <img
                                                src={todayMatches.teamOne.image}
                                                alt={todayMatches.teamOne.name}
                                                className="xl:w-12 xl:h-12 w-20 h-20"
                                                loading="lazy"
                                            />
                                            <h2 className=" text-center text-green-500 font-medium hidden xl:block">{todayMatches.teamOne.name}</h2>
                                        </div>
                                        <div className="">
                                            <span className="text-xl rounded-full flex justify-center  px-3 py-1 font-semibold">{todayMatches.goalOne}</span>
                                        </div>
                                    </div>
                                    <div className=' md:block items-center justify-center w-full md:col-span-6  col-span-6'>
                                        <div className='w-full'>
                                            <Link
                                                className='w-full '
                                                to={todayMatches.livelink}>
                                                <Button
                                                    variant={"outline"}
                                                    className='hidden md:block w-full h-16 text-green-500 hover:text-green-500'
                                                >{todayMatches ? "Watch Now" : "Pending"}</Button>
                                            </Link>
                                        </div>
                                        <div className='mt-5  md:flex  space-y-3 md:space-y-0   items-center justify-between'>
                                            <div className="  font-bold text-center md:justify-start justify-start flex items-center gap-2">
                                                <Clock className=" w-4 h-4" />
                                                <span
                                                    className={`text-sm ${todayMatches.status === "live" ? "text-green-500" : todayMatches.status === "ended" ? "text-red-500" : "cursor-not-allowed"}`}
                                                >
                                                    {todayMatches.time}
                                                </span>
                                            </div>

                                            <div className="  font-bold text-center md:justify-start justify-start flex items-center gap-2">
                                                <Trophy className=" w-4 h-4" />
                                                <span
                                                    className='text-sm '                                                >
                                                    {todayMatches.championship?.name}
                                                </span>
                                            </div>
                                            <div className=" font-bold flex md:justify-end md:mt-0 mt-2 items-center gap-2 ">
                                                <MapPin className=" w-4 h-4" />
                                                <span className='text-sm '>{todayMatches.stadium}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:flex md:col-span-3 space-y-2 md:space-y-0 col-span-3 justify-start  items-center gap-2">
                                        <div className="hidden md:block">
                                            <span className="text-xl font-semibold  rounded-full  px-3 py-1  ">{todayMatches.goalTwo}</span>
                                        </div>
                                        <h2 className=" text-green-500 font-medium hidden text-right xl:block">{todayMatches.teamTwo.name}</h2>
                                        <div className=" flex items-center justify-center">
                                            <img
                                                src={todayMatches.teamTwo.image}
                                                alt={todayMatches.teamTwo.name}
                                                loading="lazy"
                                                className="xl:w-12 xl:h-12 w-20 h-20"
                                            />
                                        </div>
                                        <div className="md:hidden flex justify-center">
                                            <span className="text-xl font-semibold  rounded-full  px-3 py-1  ">{todayMatches.goalTwo}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }

                        <Link to="/matches"> <Button className='w-full bg-green-500 hover:bg-green-600' variant={"outline"}>View all</Button></Link>
                    </div>
                </div>
                <div className='hidden lg:block col-span-2 h-[250px]'>

                    {article
                        .slice()
                        .sort((a, b) => b.visits - a.visits)
                        .slice(0, articlesToShow)
                        .map((article, index) => (
                            <div key={index} className="mb-3 drop-shadow-xl overflow-hidden sm:rounded-md ">
                                <div className="xl:flex gap-2 items-center">
                                    <div className="md:shrink-0">
                                        <img className="w-16 h-16" src={article.cover} alt={article.title} />
                                    </div>
                                    <div className="mx-1">

                                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.title}</div>
                                        <Link
                                            to={`https://matches.livefootballia.com/${article._id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                                            <p className="text-gray-500 text-xs xl:mt-2 md:mt-1">Read more</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                </div>
                <div className='w-full col-span-12 flex justify-between'>
                    <h1 className='font-semibold'>News and articles</h1>
                    <Link to="/articles">
                        <Button variant={"outline"} className='font-semibold'>View all</Button>
                    </Link>
                </div>
                <div className='w-full col-span-12 h-[250px]'>
                    <Advertisement adType="top" pageType={pageType} />
                </div>

                <div className='w-full col-span-12 gap-3'>
                    {isLoading ? (
                        <div className="text-center py-5">Loading articles...</div>
                    ) : error ? (
                        <div className="text-center py-5 text-red-500">Error: {error}</div>
                    ) : (
                        <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
                            {sortedArticles.slice(0, 16).map((item) => (
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
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardContent>

                                    <CardFooter>
                                        <Link to={`https://matches.livefootballia.com/${item._id}`}> <Button variant={"outline"}> Read more </Button></Link>
                                    </CardFooter>

                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-full col-span-12 h-[250px]'>
                    <Advertisement adType="bottom" pageType={pageType} />
                </div>
            </div>
        </>
    );
}