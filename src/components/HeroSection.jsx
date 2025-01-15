import { Button } from "./ui/button";
import { fetchMatches } from "../store/slices/MatchesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function HeroSection() {
    const dispatch = useDispatch();

    const { matches = [], isLoading, error } = useSelector((state) => state.matches || {});

    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    // التحقق من أن هناك مباريات وأنها ليست فارغة
    const liveMatch = matches.find((match) => match.status === "live");

    return (
        <div className='w-full h-[450px] bg-green-500 p-5 rounded-md'>
            <div className='flex justify-between'>
                <Button variant={"outline"}>Click to watch</Button>

                <img
                    className='w-32 '
                    src="https://readymadeui.com/readymadeui.svg"
                    alt=""
                />
            </div>

            {liveMatch && (
                <div key={liveMatch._id} className=" mt-10 mx-auto grid grid-cols-3 gap-4">
                    <div className="w-full grid items-center mt-10 justify-center text-center">
                        <img
                            src={liveMatch.teamOne.image}
                            alt={liveMatch.teamOne.name}
                            className="w-[200px] h-[200px] rounded-full border-orange-500 border-4"
                            loading="lazy"
                        />
                        <h1 className="mt-4 text-white text-4xl font-bold ">{liveMatch.teamOne.name}</h1>
                    </div>

                    <div className="grid text-center h-full flex-col items-center space-y-6">
                        <h1 className="text-4xl font-bold text-white">{liveMatch.stadium}</h1>
                        <span className="text-4xl font-bold text-white">VS</span>
                        <h4 className="text-xl font-semibold text-white">{liveMatch.time}</h4>
                    </div>

                    <div className="w-full grid mt-10 items-center justify-center text-center">
                        <img
                            src={liveMatch.teamTwo.image}
                            alt={liveMatch.teamTwo.name}
                            className="w-[200px] h-[200px] rounded-full border-orange-500 border-4"
                            loading="lazy" />
                        <h1 className="mt-4 text-white text-4xl font-bold ">{liveMatch.teamTwo.name}</h1>
                    </div>
                </div>
            )}
        </div>
    );
}
