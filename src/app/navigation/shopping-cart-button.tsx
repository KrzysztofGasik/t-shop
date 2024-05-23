"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@/lib/db/cart";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import classes from "./shopping-cart-button.module.css";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const cartSize = cart?.size ?? 0;
  return (
    <>
      <Tooltip title="View cart" arrow>
        <IconButton
          aria-label="cart"
          onClick={() => setOpen(true)}
          sx={{ margin: "0 .5rem" }}
        >
          <Badge badgeContent={cartSize} color="info">
            <ShoppingCartIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <>
        <Dialog open={open}>
          <DialogTitle className={classes.dialogTitle}>
            Your cart{" "}
            <ShoppingCartCheckoutIcon className={classes.dialogTitleIcon} />
          </DialogTitle>
          <IconButton
            aria-label="close"
            style={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography variant="h5">
              {cartSize} item{cartSize > 1 ? "s" : null}
            </Typography>
            <Typography variant="body1">
              Subtotal: {formatPrice(cart?.subtotal || 0)}
            </Typography>
            <DialogActions>
              <Link
                href={`/cart`}
                className={classes.goToCartButton}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Button variant="text">View cart</Button>
              </Link>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}
