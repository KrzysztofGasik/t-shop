"use client";

import { useState, useTransition } from "react";
import { Button, Snackbar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import classes from "./product-add-button.module.css";
import Spinner from "@/components/spinner";

interface ProductAddButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function ProductAddButton(props: ProductAddButtonProps) {
  const { productId, incrementProductQuantity } = props;
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {isOpen ? (
        <Snackbar
          ContentProps={{
            sx: { backgroundColor: "green", color: "white", height: "100%" },
          }}
          open={isOpen}
          autoHideDuration={1000}
          message="Product successfully added to cart"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className={classes.snackbar}
          onClose={() =>
            setTimeout(() => {
              setIsOpen(false);
            }, 1000)
          }
        ></Snackbar>
      ) : null}
      <Button
        color="primary"
        variant="contained"
        endIcon={<ShoppingCartIcon />}
        className={classes.button}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
            setIsOpen(true);
          });
        }}
      >
        Add product
      </Button>
      {isPending ? <Spinner className={classes.spinner} size={50} /> : null}
    </div>
  );
}
