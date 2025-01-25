import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Button } from "./ui/button";
import PaginationComponent from "../components/Pagination";
import { useState } from "react";

export default function MatchesList({ selectedTab }) {
    const { matches = [], isLoading, error } = useSelector((state) => state.matches || {});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredMatches = matches.filter((match) => match.day === selectedTab);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMatches = filteredMatches.slice(startIndex, endIndex);

    return (
        <div className="mt-5 space-y-2">
            {paginatedMatches.length > 0 ? (
                paginatedMatches.map((match, index) => (
                    <div
                        key={index}
                        className="rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between"
                    >
                        {/* محتوى المباراة */}
                        <div className="flex items-center gap-5 xl:w-full mr-5">
                            <div className="xl:flex items-center gap-4">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={match.teamOne.image}
                                        alt={match.teamOne.name}
                                        className="xl:w-20 xl:h-20 md:w-28 md:h-16 w-32 h-20"
                                        loading="lazy"
                                    />
                                </div>
                                <h2 className="pt-2 text-center text-green-500 font-medium hidden xl:block">
                                    {match.teamOne.name}
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-semibold">{match.goalOne}</span>
                                <span>vs</span>
                                <span className="text-xl font-semibold">{match.goalTwo}</span>
                            </div>
                            <div className="xl:flex items-center gap-2">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={match.teamTwo.image}
                                        alt={match.teamTwo.name}
                                        loading="lazy"
                                        className="xl:w-20 xl:h-20 md:w-28 md:h-16 w-32 h-20"
                                    />
                                </div>
                                <h2 className="pt-2 text-green-500 font-medium hidden xl:block">
                                    {match.teamTwo.name}
                                </h2>
                            </div>
                        </div>
                        {/* تفاصيل الوقت والمكان */}
                        <div className="flex items-center gap-6 w-full">
                            <div className="xl:w-1/4 w-full text-center flex xl:justify-start justify-center items-center gap-2">
                                <span
                                    className={`${match.status === "live"
                                        ? "text-green-500"
                                        : match.status === "ended"
                                            ? "text-red-500"
                                            : "cursor-not-allowed"
                                        }`}
                                >
                                    {match.time}
                                </span>
                            </div>
                            <div className="xl:w-2/4 w-full md:flex items-center gap-2 hidden">
                                <span>{match.stadium}</span>
                            </div>
                            <Link className="xl:w-1/4 w-full" href={match.livelink}>
                                <Button
                                    variant="outline"
                                    className={`w-full md:block ${match.status === "live"
                                        ? "text-green-500 hover:text-green-500"
                                        : match.status === "ended"
                                            ? " text-red-500 hover:text-red-500  "
                                            : ""
                                        }`}
                                >
                                    {match.status === "live"
                                        ? "Watch"
                                        : match.status === "ended"
                                            ? "End"
                                            : "Pending"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div>No matches available for this tab</div>
            )}

            {/* إضافة المكون الخاص بالـ Pagination */}
            {filteredMatches.length > itemsPerPage && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredMatches.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
}
