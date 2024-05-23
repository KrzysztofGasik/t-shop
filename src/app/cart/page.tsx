import { getCart } from "@/lib/db/cart";
import { Button, List, Typography } from "@mui/material";
import CartItem from "@/app/cart/cart-item";
import { setProductQuantity } from "@/actions/action";
import { formatPrice } from "@/lib/utils";
import classes from "./cart.module.css";

export const metadata = {
  title: "T-shop | Your cart",
};

export default async function CartPage() {
  const cart = await getCart();
  const cartItems = cart?.items;
  return (
    <div>
      <Typography variant="h3">Shopping cart</Typography>
      <List>
        {cartItems && cartItems.length > 0 ? (
          cart?.items.map((item) => (
            <CartItem
              cartItem={item}
              key={item.id}
              setProductQuantity={setProductQuantity}
            />
          ))
        ) : (
          <Typography variant="body1">
            Your cart is empty. You should fill it with our great t-shirts :)
          </Typography>
        )}
      </List>
      <div className={classes.checkout}>
        <Typography variant="h6">
          Total: {formatPrice(cart?.subtotal ?? 0)}
        </Typography>
        <Button
          variant="contained"
          color="warning"
          className={classes.checkoutButton}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
