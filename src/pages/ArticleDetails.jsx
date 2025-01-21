import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleDetails } from "../store/slices/articlesSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useParams } from "react-router-dom";

export default function ArticleDetails() {
    const { _id } = useParams();
    const dispatch = useDispatch();

    const { articleDetails, isLoading, isError, errorMessage } = useSelector((state) => state.article);

    console.log('articleDetailsarticleDetails', articleDetails);

    useEffect(() => {
        console.log("Fetched ID:", _id);
        if (_id) {
            dispatch(fetchArticleDetails(_id));
        }
    }, [dispatch, _id]);


    if (isLoading) {
        return <div className="text-center py-5">Loading article details...</div>;
    }

    if (isError) {
        return <div className="text-center py-5 text-red-500">Error: {errorMessage}</div>;
    }

    if (!articleDetails) {
        return <div className="text-center py-5">Article not found</div>;
    }

    return (
        <div className="my-10 w-full">
            <div className="max-w-md m-auto my-5 shadow-md shadow-gray-300/30">
                <Card>
                    <CardHeader>
                        <img
                            src={articleDetails.cover}
                            alt={articleDetails.title}
                            className="w-full h-64 rounded-t-lg"
                        />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl font-bold">
                            {articleDetails.title}
                        </CardTitle>
                        <CardDescription className=" mt-3">
                            {articleDetails.details}
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
