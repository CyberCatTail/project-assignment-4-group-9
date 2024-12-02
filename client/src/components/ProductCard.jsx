import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParsePrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { addToCart } from "@/api/userApi";

function ProductCard({ product, ...props }) {

  const AddToCart = async () => {
    await addToCart(product.product_id, 1)
  }

  return (
    <Card {...props}>
      <Link to={`/product/${product.product_id}`}>
        <CardContent className="items-center h-[150px]">
            <img
              src={product.img}
              alt={`${product.brand} ${product.model}`}
              className="h-full w-full"
            />
        </CardContent>
        
        <CardFooter className="flex space-y-4 flex-col items-start">
          <div className = "w-full h-22">
            <p>{`${product.brand} ${product.model}`}</p>
            <p className = "font-bold">{ParsePrice(product.price)}</p>
          </div>

             
        </CardFooter>
      </Link>
      <div className = "w-full justify-items-center ">
          <Button  className = "mx-auto block mb-2" onClick={AddToCart}>
              Add to Cart
          </Button>
      </div>    
    </Card>
  );
}

export default ProductCard;

