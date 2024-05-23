import { Product } from "@prisma/client";
import ProductCard from "@/components/product/product-card";
import classes from "./products.module.css";
import ProductCardFeatured from "@/components/product/product-card-featured";

type ProductsProps = {
  products: Product[];
  currentPage: number;
};

export default function Products({ products, currentPage }: ProductsProps) {
  const productList = currentPage === 1 ? products.splice(1) : products;
  return (
    <div className={classes.wrapper}>
      {currentPage === 1 && (
        <ProductCardFeatured key={products[0].id} product={products[0]} />
      )}
      <div className={classes.list}>
        {productList.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
