import HeroSection from '../components/HeroSection';
import Advertisement from '../components/Advertisement';
import { fetchArticle } from '../store/slices/articlesSlice';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { fetchMatches } from '../store/slices/MatchesListSlice';
import { Clock, MapPin } from 'lucide-react';

export default function Home() {
    const dispatch = useDispatch();

    const { article, isLoading, error } = useSelector((state) => state.article);

    const { matches = [] } = useSelector((state) => state.matches || {});

    useEffect(() => {
        dispatch(fetchMatches());
        dispatch(fetchArticle());
    }, [dispatch]);




    const liveMatch = matches.find((match) => match.status === "live");

    const sortedArticles = [...article].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <div className='mt-10 grid grid-cols-12 gap-5 w-full'>
                <div className='col-span-12 lg:col-span-2  h-[450px]'>
                    <Advertisement />
                </div>
                <div className='w-full lg:col-span-8 col-span-12'>
                    <HeroSection />
                    <div className='mt-5 space-y-2'>
                        {liveMatch && (
                            <div className="rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between">
                                <div className="grid grid-cols-12 items-center gap-5 w-full">
                                    <div className=" flex md:col-span-3  col-span-4 items-center lg:gap-2 gap-4 ">
                                        <div className="flex items-center xl:justify-center  gap-2">
                                            <img
                                                src={liveMatch.teamOne.image}
                                                alt={liveMatch.teamOne.name}
                                                className="xl:w-12 xl:h-12 w-20 h-20"
                                                loading="lazy"
                                            />
                                            <h2 className=" text-center text-green-500 font-medium hidden xl:block">{liveMatch.teamOne.name}</h2>
                                        </div>
                                        <div className="">
                                            <span className="text-xl rounded-full border-2 px-3 py-1 border-gray-200 font-semibold">{liveMatch.goalOne}</span>
                                        </div>
                                    </div>

                                    <div className=' md:block items-center justify-center w-full md:col-span-6  col-span-4'>
                                        <div className='w-full'>
                                            <Link
                                                className='w-full '
                                                to={`/match/${liveMatch._id}`}>
                                                <Button
                                                    variant={"outline"}
                                                    className='hidden md:block w-full h-16 text-green-500 hover:text-green-500'
                                                >Watch</Button>
                                            </Link>
                                        </div>
                                        <div className='mt-5  md:flex w-[90%] mx-auto  justify-between'>
                                            <div className="  font-bold text-center md:justify-start justify-center flex items-center gap-2">
                                                <Clock className="hidden md:block w-4 h-4" />
                                                <span
                                                    className={`text-sm ${liveMatch.status === "live" ? "text-green-500" : liveMatch.status === "ended" ? "text-red-500" : "cursor-not-allowed"}`}
                                                >
                                                    {liveMatch.time}
                                                </span>
                                            </div>
                                            <div className=" font-bold flex md:justify-end md:mt-0 mt-2 items-center gap-2 ">
                                                <MapPin className="hidden md:block w-4 h-4" />
                                                <span className='text-sm '>{liveMatch.stadium}</span>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="w-full flex justify-end md:col-span-3  col-span-4  items-center gap-4">
                                        <div className="">
                                            <span className="text-xl font-semibold  rounded-full border-2 px-3 py-1 border-gray-200">{liveMatch.goalOne}</span>
                                        </div>
                                        <h2 className=" text-green-500 font-medium hidden xl:block">{liveMatch.teamTwo.name}</h2>
                                        <div className=" flex items-center justify-center">
                                            <img
                                                src={liveMatch.teamTwo.image}
                                                alt={liveMatch.teamTwo.name}
                                                loading="lazy"
                                                className="xl:w-12 xl:h-12 w-20 h-20"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )
                        }
                        <Button className='w-full bg-green-500 hover:bg-green-600' variant={"outline"}>View all</Button>
                    </div>
                </div>
                <div className='hidden lg:block col-span-2 h-[450px]'>
                    <Advertisement />
                </div>
                <div className='w-full col-span-12 flex justify-between'>
                    <h1 className='font-semibold'>News and articles</h1>
                    <Link to="/articles">
                        <Button variant={"outline"} className='font-semibold'>View all</Button>
                    </Link>
                </div>
                <div className='w-full col-span-12 h-[450px]'>
                    <Advertisement />
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
                                            className="w-full h-[200px] object-cover"
                                            src={item.cover}
                                            alt={item.title}
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardContent>

                                    <CardFooter>
                                        <p>Card Footer</p>
                                    </CardFooter>

                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-full col-span-12 h-[450px]'>
                    <Advertisement />
                </div>
            </div>
        </>
    );
}