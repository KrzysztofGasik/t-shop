"use client";

import { ComponentProps, ReactNode } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormStatus } from "react-dom";
import classes from "./add-product.module.css";
import Spinner from "@/components/spinner";

type FormSubmitButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function SubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      color="primary"
      variant="contained"
      className={classes.button}
      endIcon={pending ? null : <AddIcon />}
      type="submit"
      disabled={pending}
    >
      {children}
      {pending && <Spinner size={50} />}
    </Button>
  );
}
