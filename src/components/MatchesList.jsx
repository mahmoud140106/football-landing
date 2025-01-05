import { Clock, MapPin } from 'lucide-react'
import { Button } from './ui/button'

export default function MatchSchedule() {
    const matches = [
        {
            homeTeam: "NY Yorks",
            awayTeam: "NY Yorks",
            homeScore: 0,
            awayScore: 0,
            status: "upcoming",
            time: "5:00 PM",
            venue: "London Stadium"
        },
        {
            homeTeam: "NY Yorks",
            awayTeam: "NY Yorks",
            homeScore: 1,
            awayScore: 2,
            status: "live",
            time: "Live",
            venue: "London Stadium"
        },
        {
            homeTeam: "NY Yorks",
            awayTeam: "NY Yorks",
            homeScore: 2,
            awayScore: 3,
            status: "ended",
            time: "End",
            venue: "London Stadium"
        },
    ]

    return (
        <div className="mt-5 space-y-2">
            {matches.map((match, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between"
                >
                    <div className="flex items-center gap-8 xl:w-full mr-5">
                        <div className="xl:flex items-center gap-4 ">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                                    alt={match.homeTeam}
                                />
                            </div>
                            <h2 className=" pt-2 text-center text-green-500 font-medium hidden xl:block">{match.homeTeam}</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-semibold">{match.homeScore}</span>
                            <span className="text-gray-400">vs</span>
                            <span className="text-xl font-semibold">{match.awayScore}</span>
                        </div>
                        <div className="xl:flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                                    alt={match.awayTeam}

                                />
                            </div>
                            <h2 className="pt-2 text-green-500 font-medium hidden xl:block">{match.awayTeam}</h2>
                        </div>
                    </div>
                    {/************************************************** */}
                    <div className="flex  items-center gap-6 w-full">
                        <div className="xl:w-1/4 w-full text-center flex xl:justify-start justify-center     items-center gap-2 text-gray-500">
                            <Clock className="hidden xl:block w-4 h-4" />
                            <span
                                className={`
                                   font-bold 
                                   ${match.status === "live"
                                        ? "text-green-500"
                                        : match.status === "ended"
                                            ? "text-red-500"
                                            : "cursor-not-allowed"}
                                `}
                            >
                                {match.time}
                            </span>
                        </div>
                        <div className="xl:w-2/4 w-full md:flex items-center gap-2 hidden  text-gray-500">
                            <MapPin className="hidden xl:block w-4 h-4" />
                            <span>{match.venue}</span>
                        </div>


                        <Button
                            variant={"outline"}
                            className={`xl:w-1/4 w-full  ${match.status === "live"
                                ? "bg-green-50 text-green-500 hover:text-green-500"
                                : match.status === "ended"
                                    ? "bg-red-50 text-red-500 hover:text-red-500"
                                    : "cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-700"
                                }`}
                        >
                            {match.status === "live"
                                ? "Watch Now"
                                : match.status === "ended"
                                    ? "End"
                                    : "Watch"}
                        </Button>
                    </div>
                </div>
            ))}
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                All Matches
            </button>
        </div>
    )
}

