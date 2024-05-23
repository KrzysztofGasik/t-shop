import { CircularProgress } from "@mui/material";
import classes from "./loading.module.css";

export default function LoadingPage({ size = 100 }: { size: number }) {
  return (
    <div className={classes.wrapper}>
      <CircularProgress size={size} />
    </div>
  );
}
