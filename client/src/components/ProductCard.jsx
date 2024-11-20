import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductCard({product, className}) {
  return (
    <Card className={className}>
      <CardHeader>
      </CardHeader>
      <CardContent>
        <p>{`${product.brand} ${product.model}`}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
