import { Button } from "./ui/button";
import { fetchMatchesHero } from "../store/slices/MatchesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router";
import backGround from "../assets/HeroBG.png";

export default function HeroSection() {
    const dispatch = useDispatch();

    // احصل على البيانات من الـ Redux
    const { matches = [], isLoading, error } = useSelector((state) => state.matches || {});

    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        dispatch(fetchMatchesHero());
    }, [dispatch]);


    const liveMatch = matches.find((match) => match.status === "live") || matches.find((match) => match.status === "pending" || matches.find((match) => match.status === "ended"));

    console.log('liveMatch', liveMatch);

    return (
        <div style={{ backgroundImage: `url(${backGround})`, backgroundSize: 'cover' }} className='w-full p-5 rounded-md'>
            {liveMatch && (
                <div key={liveMatch._id} className="  mx-auto grid grid-cols-3 gap-4">
                    <div className="w-full grid items-center mt-10 justify-center text-center">
                        <img
                            src={liveMatch.teamOne.image}
                            alt={liveMatch.teamOne.name}
                            className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
                            loading="lazy"
                        />
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold ">{liveMatch.teamOne.name}</h1>
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold  ">{liveMatch.goalOne}</h1>
                    </div>

                    <div className="grid text-center items-center">
                        <h1 className="xl:text-4xl text-xl font-bold text-white">{liveMatch.championship?.name || "..."}</h1>

                        <Link to={liveMatch.livelink}>
                            <Button
                                variant="outline"
                                className='hidden lg:block w-full h-16 text-green-500 hover:text-green-500'
                            >{liveMatch.status === "live" ? "Watch Now" : liveMatch.status === "Pending" ? "Pending" : "Ended"}</Button>
                        </Link>

                        <h4 className="text-xl font-semibold text-white">{liveMatch.time}</h4>
                    </div>

                    <div className="w-full grid mt-10 items-center justify-center text-center">
                        <img
                            src={liveMatch.teamTwo.image}
                            alt={liveMatch.teamTwo.name}
                            className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
                            loading="lazy"
                        />
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold ">{liveMatch.teamTwo.name}</h1>
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold ">{liveMatch.goalTwo}</h1>

                    </div>
                </div>
            )}

            <div className="mt-10 block lg:hidden">
                <Button
                    variant="outline"
                    className='w-full h-16 text-green-500 hover:text-green-500'
                >{liveMatch ? "Watch Now" : "Pending"}</Button>
            </div>
        </div>
    );
}
