import { Button } from "./ui/button";
import {
  fetchMatchesHero,
  getImportantMatch,
} from "../store/slices/MatchesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router";
import backGround from "../assets/HeroBG.png";
import { Translate } from "translate-easy";
import { motion } from "framer-motion";

export default function HeroSection() {
  const dispatch = useDispatch();
  const { importantMatch = [], isLoading, error } = useSelector(
    (state) => state.matches || {}
  );

  useEffect(() => {
    dispatch(getImportantMatch());
  }, [dispatch]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      style={{ backgroundImage: `url(${backGround})`, backgroundSize: "cover" }}
      className="w-full p-5 pt-0 rounded-md hidden sm:block"
    >
      {importantMatch && (
        <div
          key={importantMatch?._id}
          className="  mx-auto grid grid-cols-3 gap-4"
        >
          <div className="w-full grid md:mt-5 items-center justify-center text-center">
            <img
              src={importantMatch?.teamOne?.image}
              alt={importantMatch?.teamOne?.name}
              className="mx-auto w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]"
              loading="lazy"
            />
            <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold text-center">
              <Translate>{importantMatch?.teamOne?.name}</Translate>
            </h1>
            <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold text-center">
              <Translate>{importantMatch?.goalOne}</Translate>
            </h1>
          </div>

          <div className="grid text-center items-center">
            <h1 className="xl:text-4xl text-xl font-bold text-white">
              <Translate>{importantMatch?.championship?.name || ""}</Translate>
            </h1>

            <Link to={importantMatch?.livelink}>
              <Button
                variant="outline"
                className="hidden lg:block w-full h-16 text-green-500 hover:text-green-500"
              >
                <Translate>Watch Now</Translate>
              </Button>
            </Link>

            <h4 className="text-xl font-semibold text-white">
              <Translate>{importantMatch?.time}</Translate>
            </h4>
          </div>

          <div className="w-full grid md:mt-5 items-center justify-center text-center">
            <img
              src={importantMatch?.teamTwo?.image}
              alt={importantMatch?.teamTwo?.name}
              className="mx-auto w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]"
              loading="lazy"
            />
            <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold text-center">
              <Translate>{importantMatch?.teamTwo?.name}</Translate>
            </h1>
            <h1 className="mt-4 text-white lg:text-4xl text-xl font-bold text-center">
              <Translate>{importantMatch?.goalTwo}</Translate>
            </h1>
          </div>
        </div>
      )}

      <div className="mt-10 block lg:hidden">
        <Button
          variant="outline"
          className="w-full h-16 text-green-500 hover:text-green-500"
        >
          <Translate>Watch Now </Translate>
        </Button>
      </div>
    </motion.div>
  );
}
