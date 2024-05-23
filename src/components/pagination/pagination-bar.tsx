import Link from "next/link";
import classes from "./pagination-bar.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    const element = (
      <Link
        href={`?page=${page}`}
        key={page}
        className={`${currentPage === page ? classes.activePage : classes.page}`}
      >
        {page}
      </Link>
    );
    numberedPageItems.push(element);
  }

  return <div className={classes.bar}>{numberedPageItems}</div>;
}
