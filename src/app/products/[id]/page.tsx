'use server';

import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import classes from './product-detail.module.css';
import ProductPrice from '@/components/product/product-price';
import { Metadata } from 'next';
import { cache } from 'react';
import ProductAddButton from '@/app/products/[id]/product-add-button';
import { incrementProductQuantity } from '@/actions/action';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: `T-shop | ${product.name}`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  const { id: productId, name, description, imageUrl, price } = product;
  return (
    <div className={classes.product}>
      <figure>
        <Image
          src={`/${imageUrl}.jpg`}
          alt={name}
          width={500}
          height={500}
          className={classes.image}
          priority
          loading="eager"
        />
      </figure>
      <div>
        <h1 className={classes.title}>{name}</h1>
        <ProductPrice price={price} className={classes.price} />
        <p className={classes.description}>{description}</p>
        <ProductAddButton
          productId={productId}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
