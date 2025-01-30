import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../store/slices/MatchesListSlice';
import { Button } from './ui/button';
import { Link } from 'react-router';
import PaginationComponent from './Pagination'; // استيراد كمبوننت Pagination
import { Clock, MapPin, Trophy } from 'lucide-react';

export default function MatchesList({ selectedTab }) {
    const dispatch = useDispatch();
    const { matches, isLoading, error } = useSelector((state) => state.matches);
    const [currentPage, setCurrentPage] = useState(1); // تتبع الصفحة الحالية
    const itemsPerPage = 10; // عدد المباريات في كل صفحة

    useEffect(() => {
        dispatch(fetchMatches(selectedTab));
    }, [selectedTab, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredData = matches || [];

    // تقسيم البيانات حسب الصفحة
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMatches = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    return (
        <div className="mt-5 space-y-2">
            {currentMatches.length > 0 ? (
                currentMatches.map((match, index) => (
                    <div key={index} className='rounded-lg shadow-sm border xl:p-4 p-2'>
                        <div className="flex items-center justify-between ">
                            <div className="flex items-center justify-between md:w-3/4 w-full gap-5">
                                <div className="flex items-center gap-3 w-2/5">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={match.teamOne.image}
                                            alt={match.teamOne.name}
                                            className="xl:w-20 xl:h-20 md:w-28 md:h-16 w-32 h-20"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h2 className="hidden pt-2 text-center text-green-500 font-medium md:flex items-center justify-center">
                                        {match.teamOne.name}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-4 w-1/5">
                                    <span className="text-xl font-semibold">{match.goalOne}</span>
                                    <span>vs</span>
                                    <span className="text-xl font-semibold">{match.goalTwo}</span>
                                </div>
                                <div className="flex items-center gap-3 w-2/5">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={match.teamTwo.image}
                                            alt={match.teamTwo.name}
                                            loading="lazy"
                                            className="xl:w-20 xl:h-20 md:w-28 md:h-16 w-32 h-20"
                                        />
                                    </div>
                                    <h2 className="hidden pt-2 md:flex items-center justify-center text-green-500 font-medium ">
                                        {match.teamTwo.name}
                                    </h2>
                                </div>
                            </div>


                            <div className="hidden w-1/4 md:flex items-center justify-end">
                                <div className="w-[70%]">
                                    <Link className="" to={match.livelink}>
                                        <Button
                                            variant="outline"
                                            className={`w-full md:block ${match.status === 'live'
                                                ? 'text-green-500 hover:text-green-500'
                                                : match.status === 'ended'
                                                    ? 'text-red-500 hover:text-red-500'
                                                    : ''
                                                }`}
                                        >
                                            {match.status === 'live'
                                                ? 'Watch'
                                                : match.status === 'ended'
                                                    ? 'End'
                                                    : 'Pending'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>


                        </div>
                        <div className="border-t p-3 mt-7 w-full  flex items-center justify-around gap-">
                            <div className="text-center flex xl:justify-start  items-center gap-2">
                                <span
                                    className={`flex items-center gap-2 ${match.status === 'live'
                                        ? 'text-green-500'
                                        : match.status === 'ended'
                                            ? 'text-red-500'
                                            : 'cursor-not-allowed'
                                        }`}
                                >
                                    <Clock className=" md:w-4 md:h-4 w-3 h-3" />
                                    {match.time}
                                </span>
                            </div>


                            <div className="block md:hidden w-[30%]">
                                <Link className="" to={match.livelink}>
                                    <Button
                                        variant="outline"
                                        className={`w-full md:block ${match.status === 'live'
                                            ? 'text-green-500 hover:text-green-500'
                                            : match.status === 'ended'
                                                ? 'text-red-500 hover:text-red-500'
                                                : ''
                                            }`}
                                    >
                                        {match.status === 'live'
                                            ? 'Watch'
                                            : match.status === 'ended'
                                                ? 'End'
                                                : 'Pending'}
                                    </Button>
                                </Link>
                            </div>






                            <div className=" flex items-center gap-2 ">
                                <span className="flex items-center gap-2">
                                    <Trophy className=" md:w-4 md:h-4 w-3 h-3" />
                                    {match.championship?.name}</span>
                            </div>
                            <div className="  md:flex items-center gap-2 hidden">
                                <span className="flex items-center gap-2">
                                    <MapPin className="md:w-4 md:h-4 w-3 h-3" />
                                    {match.stadium}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No matches available for this tab</div>
            )}
            {/* عرض الباجينيشن */}
            {totalPages > 1 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
