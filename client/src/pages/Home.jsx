import * as React from "react";
import { getProducts } from "@/api/productApi";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Home() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("get products error, ", error)
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex">
      <div className="basis-1/4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brand</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mx-8 flex flex-wrap">
        {products.map(product => <ProductCard key={product.product_id} product={product} className='w-full lg:w-1/5 mx-3 mb-6'/>)}
      </div>
    </div>
  );
}

export default Home;