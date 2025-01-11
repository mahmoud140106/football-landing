import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMatches } from '../store/slices/MatchesListSlice'

export default function MatchSchedule() {
    const dispatch = useDispatch()
    const selectedTab = useSelector((state) => state.matches?.selectedTab)
    const { matches = [], isLoading, error, pagination } = useSelector(state => state.matches || {})

    const [currentPage, setCurrentPage] = useState(1)
    const [matchesPerPage] = useState(5) // عدد المباريات في كل صفحة

    useEffect(() => {
        dispatch(fetchMatches())
    }, [dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    // دالة لتصفية المباريات حسب التاريخ المحدد في التاب
    const filterMatchesByDate = (matches, selectedTab) => {
        const today = new Date().toLocaleDateString()
        const yesterday = new Date(Date.now() - 86400000).toLocaleDateString() // الأمس
        const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString() // الغد

        return matches.filter((match) => {
            const matchDate = new Date(match.date).toLocaleDateString()
            if (selectedTab === 'today') return matchDate === today
            if (selectedTab === 'yesterday') return matchDate === yesterday
            if (selectedTab === 'tomorrow') return matchDate === tomorrow
            return true
        })
    }

    // تصفية المباريات وفقًا للتاب
    const filteredMatches = filterMatchesByDate(matches, selectedTab)

    // حساب بداية ونهاية المباريات في الصفحة الحالية
    const indexOfLastMatch = currentPage * matchesPerPage
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
    const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch)

    // دالة لتغيير الصفحة
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    console.log('currentMatches ', currentMatches);

    return (
        <div className="mt-5 space-y-2">
            {currentMatches.length === 0 ? (
                <div>No matches available for this date</div>
            ) : (
                currentMatches.map((match, index) => (
                    <div key={index} className="rounded-lg shadow-sm border xl:p-4 p-2 flex items-center justify-between">
                        {/* محتوى المباراة */}
                        <div className="flex items-center gap-8 xl:w-full mr-5">
                            <div className="xl:flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                                        alt={match.teamOne}
                                    />
                                </div>
                                <h2 className="pt-2 text-center text-green-500 font-medium hidden xl:block">{match.homeTeam}</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-semibold">{match?.teamOne}</span>
                                <span>vs</span>
                                <span className="text-xl font-semibold">{match.awayScore}</span>
                            </div>
                            <div className="xl:flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                                        alt={match.awayTeam}
                                    />
                                </div>
                                <h2 className="pt-2 text-green-500 font-medium hidden xl:block">{match.awayTeam}</h2>
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
                                <span>{match.venue}</span>
                            </div>
                            <Button
                                variant="outline"
                                className={`xl:w-1/4 w-full md:block ${match.status === "live" ? "text-green-500 hover:text-green-500" : match.status === "ended" ? "bg-red-50 text-red-500 hover:text-red-500" : "cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-700"}`}
                            >
                                {match.status === "live" ? "Watch Now" : match.status === "ended" ? "End" : "Watch"}
                            </Button>
                        </div>
                    </div>
                ))
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {pagination?.numberOfPages > 1 && (
                    <div className="flex gap-2">
                        {Array.from({ length: pagination.numberOfPages }, (_, index) => (
                            <Button
                                key={index + 1}
                                variant="outline"
                                className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                All Matches
            </button>
        </div>
    )
}
