// components/Pagination.jsx
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    />
                </PaginationItem>
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() =>
                            onPageChange(Math.min(currentPage + 1, totalPages))
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
