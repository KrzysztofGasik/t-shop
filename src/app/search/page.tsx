import { prisma } from "@/lib/db/prisma";
import { Typography } from "@mui/material";
import ProductCard from "@/components/product/product-card";
import { Metadata } from "next";
import classes from "./search.module.css";

interface SearchPageProps {
  searchParams: {
    query: string;
  };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `T-shop | Search: ${query}`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: query, mode: "insensitive" },
        },
        {
          description: { contains: query, mode: "insensitive" },
        },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return (
      <Typography variant="body1" className={classes.noMatch}>
        No products found
      </Typography>
    );
  }

  return (
    <div className={classes.results}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
