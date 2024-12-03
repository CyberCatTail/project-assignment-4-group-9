import { useParams } from "react-router-dom";
import * as React from "react";
import { getProduct } from "@/api/productApi";
import { addToCart } from "@/api/userApi";
import { Button } from "@/components/ui/button"
import { ParsePrice } from "@/lib/utils"
import ReviewStar from "@/components/ReviewStar"

function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedColor, setSelectedColor] = React.useState("black"); 

  React.useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const AddToCart = async () => {
    await addToCart(id, 1)
  }

  return (
    <div className="flex flex-col lg:flex-row items-start p-6 gap-10">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={product.img || "/placeholder-image.png"}
          alt={product.model}
          className="max-w-full max-h-[500px] object-contain"
          style={{ backgroundColor: selectedColor }} 
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-between" style={{ minHeight: "500px" }}>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.model}</h1>
          <div className="flex space-x-2 items-center">
              <ReviewStar rating={Math.floor(product.review/10)} className="flex" />
              <p className={`font-serif text-2xl`}>{product.review/10}</p>
          </div>
          <p className="text-2xl text-green-500 font-semibold">{ParsePrice(product.price)}</p>
          <p className="text-gray-700">{product.description || "No description available."}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded">
            <button className="px-4 py-2">-</button>
            <span className="px-4">1</span>
            <button className="px-4 py-2">+</button>
          </div>
          <Button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800" onClick={AddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
