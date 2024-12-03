import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ParsePrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { addToCart } from "@/api/userApi";
import ReviewStar from "@/components/ReviewStar"

function ProductCard({ product, ...props }) {

  const AddToCart = async () => {
    await addToCart(product.product_id, 1)
  }

  return (
    <Card {...props}>
      <CardContent className="m-3 p-0">
        <Link to={`/product/${product.product_id}`} className="flex justify-self-center">

          <img
            src={product.img}
            alt={`${product.brand} ${product.model}`}
            className="w-[320px] h-[320px]"
          />
        </Link>

      </CardContent>

      <CardFooter className="flex space-y-4 flex-col items-start">
        <div className="w-full h-22">
          <Link to={`/product/${product.product_id}`}>

            <p>{`${product.brand} ${product.model}`}</p>
            <ReviewStar rating={Math.floor(product.review/10)} className="flex" />
            <p className="font-bold">{ParsePrice(product.price)}</p>
          </Link>

        </div>

      </CardFooter>
      <div className="w-full justify-items-center ">
        <Button className="mx-auto block mb-2" onClick={AddToCart}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;

