import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "../store/slices/MatchesListSlice";
import { Button } from "./ui/button";
import { Link } from "react-router";
import PaginationComponent from "./Pagination";
import { Clock, MapPin, Trophy } from "lucide-react";
import { Translate } from "translate-easy";
import Loading from "./ui/Loading";
import { AnimatePresence, motion } from "framer-motion";

export default function MatchesList({ selectedTab }) {
  const dispatch = useDispatch();
  const { matches, pagination, isLoading, error } = useSelector(
    (state) => state.matches
  );
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  useEffect(() => {
    dispatch(fetchMatches({ page: currentPage, limit, day: selectedTab })).then(
      () => {
        setLoadingMore(false);
      }
    );
  }, [dispatch, currentPage, limit, selectedTab]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

    if (
      scrollPercentage >= 0.8 &&
      !isLoading &&
      !error &&
      !loadingMore &&
      pagination?.currentPage < pagination?.numberOfPages
    ) {
      setLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagination, loadingMore, isLoading, error]);

  // const filteredData = matches || [];

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentMatches = filteredData.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center py-5">
        <Loading />
      </div>
    );
  }

  if (error || !matches ) {
    return (
      <div className="text-center text-red-500 font-semibold text-lg p-5">
        <Translate>No Available Matches For This Day</Translate>
      </div>
    );
  }
  return (
    <div className="mt-5 space-y-4  max-sm:mt-3 max-sm:space-y-1">
      <AnimatePresence mode="wait">
        {matches.length > 0 &&
          matches.map((match, index) => (
            <motion.div
              key={match._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              layout
              className="rounded-lg shadow-sm border xl:p-4 p-2"
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center justify-between md:w-3/4 w-full gap-5">
                  <div className="flex items-center justify-center md:justify-start p-2 gap-3 w-2/5">
                    <div className="flex items-center ">
                      <img
                        src={match.teamOne.image}
                        alt={match.teamOne.name}
                        className="w-12 h-12  min-w-12 min-h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h2 className="hidden text-center w-[4rem] max-w-[4rem] mx-4 text-green-500 font-medium md:flex items-center justify-center">
                      <Translate>{match.teamOne.name}</Translate>
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 w-1/5">
                    <span className="text-xl font-semibold">
                      <Translate>{match.goalOne}</Translate>
                    </span>
                    <span>
                      <Translate>vs</Translate>
                    </span>
                    <span className="text-xl font-semibold">
                      {" "}
                      <Translate>{match.goalTwo}</Translate>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 w-2/5 justify-center">
                    <div className="flex items-center ">
                      <img
                        src={match.teamTwo.image}
                        alt={match.teamTwo.name}
                        loading="lazy"
                        className="w-12 h-12  min-w-12 min-h-12 object-contain"
                      />
                    </div>
                    <h2 className="hidden md:flex items-center w-[4rem] max-w-[4rem] mx-4 justify-center text-green-500 font-medium ">
                      <Translate>{match.teamTwo.name}</Translate>
                    </h2>
                  </div>
                </div>

                <div className="hidden w-1/4 md:flex items-center justify-end">
                  <div className="w-[70%]">
                    <Link className="" to={match.livelink}>
                      <Button
                        variant="outline"
                        className={`w-full md:block text-green-500`}
                      >
                        <Translate>Watch Now</Translate>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-t pt-1 mt-3 w-full  flex items-center justify-around gap-">
                <div className="text-center flex xl:justify-start  items-center gap-2">
                  <span
                    className={`flex items-center gap-2 ${
                      match.status === "live"
                        ? "text-green-500"
                        : match.status === "ended"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    <Clock className=" md:w-4 md:h-4 w-3 h-3" />
                    <Translate>{match.time}</Translate>
                  </span>
                </div>

                <div className="block md:hidden w-[30%]">
                  <Link className="" to={match.livelink}>
                    <Button
                      variant="outline"
                      className={`w-full md:block text-green-500`}
                    >
                      <Translate>Watch Now</Translate>
                    </Button>
                  </Link>
                </div>
                <div className=" flex items-center gap-2 ">
                  <span className="flex items-center gap-2">
                    <Trophy className=" md:w-4 md:h-4 w-3 h-3" />
                    <Translate>{match.championship?.name}</Translate>
                  </span>
                </div>
                <div className="  md:flex items-center gap-2 hidden">
                  <span className="flex items-center gap-2 w-[1rem] max-w-min">
                    <MapPin className="md:w-4 md:h-4 w-3 h-3" />
                    <Translate>{match.stadium}</Translate>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
