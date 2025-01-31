import { Button } from "./ui/button";
import { fetchMatchesHero } from "../store/slices/MatchesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router";
import backGround from "../assets/HeroBG.png";
import { Translate } from 'translate-easy';


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
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold "><Translate>{liveMatch.teamOne.name}</Translate> </h1>
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold  ">
                            <Translate>{liveMatch.goalOne}</Translate>
                        </h1>
                    </div>

                    <div className="grid text-center items-center">
                        <h1 className="xl:text-4xl text-xl font-bold text-white"><Translate>{liveMatch.championship?.name || "..."}</Translate></h1>

                        <Link to={liveMatch.livelink}>
                            <Button
                                variant="outline"
                                className='hidden lg:block w-full h-16 text-green-500 hover:text-green-500'
                            >
                                <Translate>{liveMatch.status === "live" ? "Watch Now" : liveMatch.status === "Pending" ? "Pending" : "Ended"}</Translate></Button>
                        </Link>

                        <h4 className="text-xl font-semibold text-white"><Translate>{liveMatch.time}</Translate></h4>
                    </div>

                    <div className="w-full grid mt-10 items-center justify-center text-center">
                        <img
                            src={liveMatch.teamTwo.image}
                            alt={liveMatch.teamTwo.name}
                            className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
                            loading="lazy"
                        />
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold "><Translate>{liveMatch.teamTwo.name}</Translate></h1>
                        <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold "><Translate>{liveMatch.goalTwo}</Translate></h1>

                    </div>
                </div>
            )}

            <div className="mt-10 block lg:hidden">
                <Button
                    variant="outline"
                    className='w-full h-16 text-green-500 hover:text-green-500'
                ><Translate>{liveMatch ? "Watch Now" : "Pending"}</Translate></Button>
            </div>
        </div>
    );
}
