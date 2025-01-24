import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchArticle } from "../store/slices/articlesSlice";
import Advertisement from "../components/Advertisement";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export default function Articles() {
    const dispatch = useDispatch();
    const { article, isLoading, isError, errorMessage } = useSelector(
        (state) => state.article
    );

    useEffect(() => {
        dispatch(fetchArticle());
    }, [dispatch]);

    console.log('articlearticle', article);

    return (
        <div className="my-5 w-full">
            <div className="h-[337px]">
                <Advertisement adType="top" pageType="articles" />
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
                        {article.map((item) => (
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
                                    <CardTitle>{item.title}</CardTitle>
                                </CardContent>
                                <CardFooter>
                                    <Link to={"https://matches.livefootballia.com/:id"}> <Button variant={"outline"}> Read more </Button></Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-[337px]">
                <Advertisement adType="bottom" pageType="articles" />
            </div>
        </div>
    );
}
