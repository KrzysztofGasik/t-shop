import { formatPrice } from "@/lib/utils";
import { Chip } from "@mui/material";

interface PriceProps {
  price: number;
  className?: string;
}

export default function ProductPrice({ price, className }: PriceProps) {
  return <Chip label={formatPrice(price)} className={className} />;
}
