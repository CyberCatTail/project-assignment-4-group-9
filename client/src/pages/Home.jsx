import * as React from "react";
import { getProducts } from "@/api/productApi";
import ProductCard from "@/components/ProductCard";

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
        <>
            {products.map(product => <ProductCard product={product}/>)}
        </>
    );
}
  
  export default Home;