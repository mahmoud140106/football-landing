import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchArticle } from "../store/slices/articlesSlice";
import Advertisement from "../components/Advertisement";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { Translate } from "translate-easy";
import PaginationComponent from "../components/Pagination";
import { Helmet } from "react-helmet-async";

export default function Articles() {
  const dispatch = useDispatch();
  const { article, pagination, isLoading, isError, errorMessage } = useSelector(
    (state) => state.article
  );

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 16;

  const getPageType = () => {
    const path = location.pathname;

    if (path === "/") return "main";
    if (path.startsWith("/matches")) return "matches";
    if (path.startsWith("/articles")) return "articles";
    return "default";
  };

  const pageType = getPageType();

  // const startIndex = (currentPage - 1) * limit;
  // const endIndex = startIndex + limit;
  // const paginatedArticles = article?.slice(startIndex, endIndex);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(fetchArticle({ page: currentPage, limit })).then(() => {
      setLoadingMore(false);
    });
  }, [dispatch, currentPage, limit]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

    if (
      scrollPercentage >= 0.8 &&
      !isLoading &&
      !isError &&
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
  }, [pagination, loadingMore, isLoading, isError]);
  // console.log(article);
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://livefootballia.com/Articles" />
        <meta
          name="description"
          content="Stay updated with the latest football news, in-depth match analysis, player insights, and expert opinions. Read top football articles on Live Footballia."
        />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 my-5 w-full">
        <div className="">
          <Advertisement adType="top" pageType={pageType} />
        </div>

        <div className="w-full my-5">
          {isLoading ? (
            <div className="text-center py-5"></div>
          ) : isError ? (
            <div className="text-center py-5 text-red-500">{errorMessage}</div>
          ) : (
            <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
              {article.map((item) => (
                <Link
                  key={item._id}
                  to={`https://matches.livefootballia.com/${item._id}`}
                >
                  <Card
                    title={`Read more about: ${item.title}`}
                    className="cursor-pointer transition-all duration-300 border hover:shadow-lg scale-95 hover:scale-100"
                  >
                    <CardHeader>
                      <img
                        loading="lazy"
                        className="w-full rounded-md h-[200px] object-cover"
                        src={item.cover}
                        alt={item.title}
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>
                        <Translate>{item.title}</Translate>
                      </CardTitle>
                    </CardContent>
                    {/* <CardFooter>
                      <Link
                        to={`https://matches.livefootballia.com/${item._id}`}
                      >
                        <Button variant={"outline"}>
                          <Translate>Read more</Translate>
                        </Button>
                      </Link>
                    </CardFooter> */}
                  </Card>{" "}
                </Link>
              ))}
              <Advertisement adType="btn" pageType={pageType} />
            </div>
          )}
        </div>

        {/* {!isLoading && !isError && (
          <div className="my-5 flex justify-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(article.length / limit)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )} */}

        <div className="">
          <Advertisement adType="bottom" pageType={pageType} />
        </div>
      </div>
    </>
  );
}
