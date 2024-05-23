import { TextareaAutosize, TextField } from "@mui/material";
import { addProduct } from "@/actions/action";
import SubmitButton from "@/app/add-product/submit-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import error from "./error";
import classes from "./add-product.module.css";

export const metadata = {
  title: "T-shop | Add product",
};

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    error();
  }

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div>
      <h1 className={classes.title}>Add Product</h1>
      <form className={classes.form} action={addProduct}>
        <TextField
          required
          name="name"
          label="Enter product name"
          variant="outlined"
          className={classes.input}
        />
        <TextareaAutosize
          required
          name="description"
          placeholder="Enter product description"
          className={classes.input}
          minRows={20}
        />
        <TextField
          required
          name="image"
          label="Enter image URL"
          variant="outlined"
          className={classes.input}
        />
        <TextField
          required
          name="price"
          label="Enter price"
          variant="outlined"
          className={classes.input}
        />
        <SubmitButton>Add</SubmitButton>
      </form>
    </div>
  );
}
