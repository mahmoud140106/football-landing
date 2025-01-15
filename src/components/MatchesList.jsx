import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { fetchMatches } from "../store/slices/MatchesListSlice";
import { Link } from "react-router";

export default function MatchSchedule() {
    const dispatch = useDispatch();
    const { matches = [], isLoading, error } = useSelector((state) => state.matches || {});


    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log('matches', matches);

    return (
        <div className="mt-5 space-y-2">
            {Array.isArray(matches) && matches.length > 0 ? (
                matches.map((match, index) => (
                    <div key={index} className="rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between">
                        {/* محتوى المباراة */}
                        <div className="flex items-center gap-12 xl:w-full mr-5">
                            <div className="xl:flex items-center gap-4">
                                <div className=" flex items-center justify-center">
                                    <img
                                        src={match.teamOne.image}
                                        alt={match.teamOne.name}
                                        className="w-10 h-10 rounded-full border-2 border-orange-400"
                                        loading="lazy"
                                    />
                                </div>
                                <h2 className="pt-2 text-center text-green-500 font-medium hidden xl:block">{match.teamOne.name}</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-semibold">{match.goalOne}</span>
                                <span>vs</span>
                                <span className="text-xl font-semibold">{match.goalTwo}</span>
                            </div>
                            <div className="xl:flex items-center gap-4">
                                <div className=" flex items-center justify-center">
                                    <img
                                        src={match.teamTwo.image}
                                        alt={match.teamTwo.name}
                                        loading="lazy"
                                        className="w-10 h-10 rounded-full border-2 border-orange-400"
                                    />
                                </div>
                                <h2 className="pt-2 text-green-500 font-medium hidden xl:block">{match.teamTwo.name}</h2>
                            </div>
                        </div>
                        {/* تفاصيل الوقت والمكان */}
                        <div className="flex items-center gap-6 w-full">
                            <div className="xl:w-1/4 w-full text-center flex xl:justify-start justify-center items-center gap-2">
                                <Clock className="hidden xl:block w-4 h-4" />
                                <span
                                    className={`${match.status === "live" ? "text-green-500" : match.status === "ended" ? "text-red-500" : "cursor-not-allowed"}`}
                                >
                                    {match.time}
                                </span>
                            </div>
                            <div className="xl:w-2/4 w-full md:flex items-center gap-2 hidden">
                                <MapPin className="hidden xl:block w-4 h-4" />
                                <span>{match.stadium}</span>
                            </div>
                            <Link className="xl:w-1/4 w-full" to={match.livelink}>
                                <Button
                                    variant="outline"
                                    className={` w-full md:block ${match.status === "live" ? "text-green-500 hover:text-green-500" : match.status === "ended" ? "bg-red-50 text-red-500 hover:text-red-500" : "cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-700"}`}
                                >
                                    {match.status === "live" ? "Watch" : match.status === "ended" ? "End" : "Pending"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div>No matches available</div>
            )
            }

            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                All Matches
            </button>
        </div >
    );

}
