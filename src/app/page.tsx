import { prisma } from "@/lib/db/prisma";
import Products from "@/components/products/products";
import PaginationBar from "@/components/pagination/pagination-bar";
import classes from "./home.module.css";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({
  searchParams,
}: HomeProps) {
  const { page = "1" } = await searchParams;
  const totalItemCount = await prisma.product.count();
  const currentPage = Number(page);
  const pageSize = 4;
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div className={classes.home}>
      <Products products={products} currentPage={currentPage} />
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
