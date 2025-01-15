import Advertisement from '../components/Advertisement'
import { Button } from '../components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchArticle } from '../store/slices/articlesSlice'

export default function Articles() {
    const dispatch = useDispatch()
    const { article, isLoading, error, pagination } = useSelector(state => state.article)

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!isFetching) return; // Avoid dispatching while already fetching
        dispatch(fetchArticle({ page: pagination.currentPage, limit: pagination.limit }));
        setIsFetching(false);
    }, [dispatch, isFetching, pagination.currentPage, pagination.limit]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        dispatch(fetchArticle({ page: newPage, limit: pagination.limit }));
    }

    // Infinite scroll handler (Optional)
    const loadMoreArticles = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setIsFetching(true);
        }
    }


    console.log('articlearticlearticlearticle', article);

    return (
        <div className=" my-5 w-full">
            <div className="h-[337px]">
                <Advertisement />
            </div>
            <div className="w-full my-5">
                {isLoading ? (
                    <div className="text-center py-5">Loading articles...</div>
                ) : error ? (
                    <div className="text-center py-5 text-red-500">Error: {error}</div>
                ) : (
                    <div>
                        <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
                            {article.map((item) => (
                                <Card key={item._id}>
                                    <CardHeader>
                                        {/* Lazy loading للصورة */}
                                        <img
                                            loading="lazy"
                                            className="w-full h-[200px] object-cover"
                                            src={item.cover} // يمكن التبديل إلى item.coverWebP في حالة دعم WebP
                                            alt={item.title}
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-5">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage <= 1}
                            >
                                Previous
                            </Button>
                            <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage >= pagination.totalPages}
                            >
                                Next
                            </Button>
                        </div>

                        {/* Infinite Scroll */}
                        <div
                            className="infinite-scroll-trigger"
                            onScroll={loadMoreArticles}
                        >
                            {isFetching && <div className="text-center py-3">Loading more...</div>}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
