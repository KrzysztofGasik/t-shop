"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "@/components/product/product-price";

import classes from "./product-card-featured.module.css";
import { Button, Chip } from "@mui/material";
import { motion } from "framer-motion";

export interface ProductProps {
  product: Product;
}

export default function ProductCardFeatured({ product }: ProductProps) {
  const { id, name, description, imageUrl, price, createdAt } = product;
  const isNewProduct =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
  return (
    <motion.div
      className={classes.card}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      {isNewProduct ? <Chip label="New" className={classes.iconNew} /> : null}
      <figure>
        <Image
          src={`/${imageUrl}.jpg`}
          alt={name}
          className={classes.image}
          width={800}
          height={400}
        />
      </figure>

      <div className={classes.textWrapper}>
        <h2 className={classes.title}>{name}</h2>
        <p className={classes.description}>{description}</p>
        <ProductPrice price={price} className={classes.price} />
      </div>
      <Link href={`products/${id}`} className={classes.link}>
        <Button variant="outlined" color="primary">
          Check out our new t-shirt
        </Button>
      </Link>
    </motion.div>
  );
}
