import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ParsePrice} from "@/lib/utils"
import { Link } from "react-router-dom";

function ProductCard({product, ...props}) {
  return (
    <Card {...props}>
      <CardHeader>
      </CardHeader>
      <CardContent>
        <Link to={`/product/${product.product_id}`} ><img src={product.img} /></Link>
      </CardContent>
      <CardFooter className='flex flex-col items-start'>
        <p>{`${product.brand} ${product.model}`}</p>
        <p>{ParsePrice(product.price)}</p>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
