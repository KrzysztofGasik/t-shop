import { CircularProgress } from "@mui/material";

interface SpinnerProps {
  size: number;
  className?: string;
}

export default function Spinner({ size, className }: SpinnerProps) {
  return <CircularProgress className={className} size={size} />;
}
