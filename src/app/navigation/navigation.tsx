import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import classes from './navigation.module.css';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from '@/app/navigation/shopping-cart-button';
import UserMenuButton from '@/app/navigation/user-menu-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

async function searchProducts(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navigation() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <header className={classes.wrapper}>
      <nav className={classes.navigation}>
        <p className={classes.title}>
          <Link href="/" className={classes.logo}>
            <Image
              src="/logo.png"
              height={90}
              width={70}
              alt={'t-shop logo'}
              className={classes.logoImage}
              loading="eager"
            />
            <span className={classes.logoText}>T-shop</span>
          </Link>
        </p>
        <form className={classes.formSearch} action={searchProducts}>
          <TextField
            placeholder="Search..."
            className={classes.searchInput}
            aria-label="search"
            name="searchQuery"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              ),
            }}
          />
        </form>
        <div className={classes.buttonContainer}>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </nav>
    </header>
  );
}
