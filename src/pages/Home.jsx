import HeroSection from '../components/HeroSection';
import Advertisement from '../components/Advertisement';
import { fetchArticle } from '../store/slices/articlesSlice';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { fetchMatches } from '../store/slices/MatchesListSlice';
import { Clock, MapPin } from 'lucide-react';

export default function Home() {
    const dispatch = useDispatch();
    const { article, isLoading, error } = useSelector((state) => state.article);

    console.log('article', article);

    const { matches = [] } = useSelector((state) => state.matches || {});

    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    // التحقق من أن هناك مباريات وأنها ليست فارغة
    const liveMatch = matches.find((match) => match.status === "live");
    return (
        <>
            <div className='mt-10 grid grid-cols-12 gap-5 w-full'>
                <div className='hidden md:block col-span-2 h-[450px]'>
                    <Advertisement />
                </div>
                <div className='w-full md:col-span-8 col-span-12'>
                    <HeroSection />
                    <div className='mt-5 space-y-2'>
                        {liveMatch && (
                            <div className="rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between">
                                {/* محتوى المباراة */}
                                <div className="grid grid-cols-12 items-center gap-5 w-full">
                                    <div className="flex col-span-3 items-center gap-4">
                                        <div className="flex items-center xl:justify-center  gap-2">
                                            <img
                                                src={liveMatch.teamOne.image}
                                                alt={liveMatch.teamOne.name}
                                                className="w-10 h-10 rounded-full border-2 border-orange-400"
                                                loading="lazy"
                                            />
                                            <h2 className=" text-center text-green-500 font-medium">{liveMatch.teamOne.name}</h2>
                                        </div>
                                        <div className="">
                                            <span className="text-xl rounded-full border-2 px-3 py-1 border-gray-200 font-semibold">{liveMatch.goalOne}</span>
                                        </div>
                                    </div>

                                    <div className='justify-center w-full col-span-6'>
                                        <div className='w-full'>
                                            <Link
                                                className='w-full '
                                                to={`/match/${liveMatch._id}`}>
                                                <Button
                                                    variant={"outline"}
                                                    className='w-full h-16 text-green-500 hover:text-green-500 bg-green-50'
                                                >Watch</Button>
                                            </Link>
                                        </div>
                                        <div className='mt-5 w-[90%] mx-auto flex justify-between'>
                                            <div className=" w-full font-bold text-center flex   items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span
                                                    className={`${liveMatch.status === "live" ? "text-green-500" : liveMatch.status === "ended" ? "text-red-500" : "cursor-not-allowed"}`}
                                                >
                                                    {liveMatch.time}
                                                </span>
                                            </div>
                                            <div className=" w-full font-bold flex justify-end items-center gap-2 ">
                                                <MapPin className=" w-4 h-4" />
                                                <span>{liveMatch.stadium}</span>
                                            </div>

                                        </div>
                                    </div>



                                    <div className="w-full flex justify-end col-span-3  items-center gap-4">
                                        <div className="">
                                            <span className="text-xl font-semibold  rounded-full border-2 px-3 py-1 border-gray-200">{liveMatch.goalOne}</span>
                                        </div>
                                        <h2 className=" text-green-500 font-medium hidden xl:block">{liveMatch.teamTwo.name}</h2>
                                        <div className=" flex items-center justify-center">
                                            <img
                                                src={liveMatch.teamTwo.image}
                                                alt={liveMatch.teamTwo.name}
                                                loading="lazy"
                                                className="w-10 h-10 rounded-full border-2 border-orange-400"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )
                        }
                    </div>
                </div>
                <div className='hidden md:block col-span-2 h-[450px]'>
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
                            {article.slice(0, 10).map((item) => (
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

