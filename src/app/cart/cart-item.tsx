'use client';

import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { CartItemWithProduct } from '@/lib/db/cart';
import Image from 'next/image';
import Link from 'next/link';
import classes from './cart-item.module.css';
import { formatPrice } from '@/lib/utils';
import { useTransition } from 'react';
import Spinner from '@/components/spinner';

interface CartItemProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const quantityOptions = Array.from({ length: 99 }, (_, i) => i + 1);

export default function CartItem(props: CartItemProps) {
  const { cartItem, setProductQuantity } = props;
  const { product, quantity } = cartItem;
  const { id, name, imageUrl, price } = product;
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <div className={classes.item}>
        <Image
          src={`/${imageUrl}.jpg`}
          alt={name}
          width={200}
          height={200}
          className={classes.image}
          loading="eager"
        />
        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
          <Typography>
            <Link href={`/products/${id}`} className={classes.detailsLink}>
              {name}
            </Link>
          </Typography>
          <p>Price: {formatPrice(price)}</p>
          <FormControl className={classes.select}>
            <InputLabel id="quantity-select-label">Quantity</InputLabel>
            <Select
              value={quantity}
              labelId="quantity-select-label"
              id="quantity-select"
              label="Quantity"
              onChange={async (e) => {
                startTransition(async () => {
                  await setProductQuantity(id, Number(e.target.value));
                });
              }}
              sx={{ width: 300 }}
            >
              <MenuItem value={0}>0 (remove)</MenuItem>
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p className={classes.price}>
            Total: {formatPrice(price * quantity)}{' '}
            {isPending ? (
              <Spinner size={20} className={classes.spinner} />
            ) : null}
          </p>
        </Box>
      </div>
      <Divider sx={{ margin: '1rem auto 1rem auto', width: '100%' }} />
    </>
  );
}
