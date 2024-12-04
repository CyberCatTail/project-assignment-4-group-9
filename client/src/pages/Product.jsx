import { useParams } from "react-router-dom";
import * as React from "react";
import { getProduct } from "@/api/productApi";
import { addToCart } from "@/api/userApi";
import { Button } from "@/components/ui/button"
import { ParsePrice } from "@/lib/utils"
import ReviewStar from "@/components/ReviewStar"
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const column = [
  {
    type: 'Brand',
    key: 'brand'
  },
  {
    type: 'Model',
    key: 'model'
  },
  {
    type: 'Category',
    key: 'category'
  },
  {
    type: 'Inches',
    key: 'inches'
  },
  {
    type: 'Screen Resoluton',
    key: 'screen_resolution'
  },
  {
    type: 'CPU',
    key: 'cpu'
  },
  {
    type: 'Ram',
    key: 'ram'
  },
  {
    type: 'Memory',
    key: 'memory'
  },
  {
    type: 'GPU',
    key: 'gpu'
  },
  {
    type: 'Operation System',
    key: 'op'
  },
  {
    type: 'Weight',
    key: 'weight'
  },
]

function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
      });
  }, []);


  if (!product) {
    return <div>Product not found.</div>;
  }

  const AddToCart = async () => {
    await addToCart(id, 1)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row items-start m-6">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              {product.imgs.map((productImg, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img src={productImg}></img>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">{product.model}</h1>
          <div className="flex space-x-2 items-center">
            <ReviewStar rating={Math.floor(product.review / 10)} className="flex" />
            <p className={`font-serif text-2xl`}>{(product.review / 10).toFixed(1)}</p>
          </div>
          <p className="text-2xl text-green-500 font-semibold">{ParsePrice(product.price)}</p>
          <Button className="px-6 py-3 w-[160px] bg-black text-white rounded hover:bg-gray-800" onClick={AddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
      <Table className='sm:w-1/2 sm:ml-32 mb-8'>
        <TableHeader>
          <TableRow>
            <TableHead>Specification</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            product && (
              column.map(v => {
                return (<TableRow key={v.key}>
                <TableCell className="font-medium">{v.type}</TableCell>
                <TableCell>{product[v.key]}</TableCell>
              </TableRow>)
              })
            )
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default Product;
