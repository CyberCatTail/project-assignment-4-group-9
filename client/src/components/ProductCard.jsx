import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParsePrice } from "@/lib/utils";
import { Link } from "react-router-dom";

function ProductCard({ product, ...props }) {
  return (
    <Card {...props}>
      <Link to={`/product/${product.product_id}`}>
        <CardHeader></CardHeader>
        <CardContent className="flex justify-center items-center h-[150px]">
          
            <img
              src={product.img}
              alt={`${product.brand} ${product.model}`}
              className="max-h-full max-w-full object-contain"
            />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p>{`${product.brand} ${product.model}`}</p>
          <p>{ParsePrice(product.price)}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}

export default ProductCard;

