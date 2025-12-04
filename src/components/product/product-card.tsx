'use client';

import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import ProductPrice from '@/components/product/product-price';

import classes from './product-card.module.css';
import { Chip } from '@mui/material';
import { motion } from 'framer-motion';

export interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  const { id, name, description, imageUrl, price, createdAt } = product;
  const isNewProduct =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={`products/${id}`} className={classes.link}>
      <motion.div
        className={classes.card}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isNewProduct ? <Chip label="New" className={classes.iconNew} /> : null}
        <figure>
          <Image
            src={`/${imageUrl}.jpg`}
            alt={name}
            className={classes.image}
            width={800}
            height={400}
            loading="eager"
          />
        </figure>
        <div className={classes.textWrapper}>
          <h2 className={classes.title}>{name}</h2>
          <ProductPrice price={price} className={classes.price} />
          <p className={classes.description}>{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}
