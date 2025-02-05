import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

import { useState } from "react"; // إضافة useState
import PaginationComponent from "../components/Pagination";
import { Helmet } from "react-helmet-async";

export default function Articles() {
  const dispatch = useDispatch();
  const { article, isLoading, isError, errorMessage } = useSelector(
    (state) => state.article
  );

  const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  const itemsPerPage = 16; // عدد المقالات في كل صفحة

  useEffect(() => {
    dispatch(fetchArticle());
  }, [dispatch]);

  const getPageType = () => {
    const path = location.pathname;

    if (path === "/") return "main";
    if (path.startsWith("/matches")) return "matches";
    if (path.startsWith("/articles")) return "articles";
    return "default";
  };

  const pageType = getPageType();

  // حساب المقالات الظاهرة بناءً على الصفحة الحالية
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = article.slice(startIndex, endIndex);

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
            <div className="text-center py-5">Loading articles...</div>
          ) : isError ? (
            <div className="text-center py-5 text-red-500">
              Error: {errorMessage}
            </div>
          ) : (
            <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
              {paginatedArticles.map((item) => (
                <Card key={item._id}>
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
                  <CardFooter>
                    <Link to={`https://matches.livefootballia.com/${item._id}`}>
                      <Button variant={"outline"}>
                        <Translate>Read more</Translate>
                      </Button>
                      {/* <div className="hidden xl:block col-span-12 lg:col-span-2 h-[100px]"> */}
                        <Advertisement adType="btn" pageType={pageType} />
                      {/* </div> */}
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {!isLoading && !isError && (
          <div className="my-5 flex justify-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(article.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

         <div className="">
          <Advertisement adType="bottom" pageType={pageType} />
         </div>
      </div>
    </>
  );
}
