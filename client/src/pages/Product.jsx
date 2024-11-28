import { useParams } from "react-router-dom";
import * as React from "react";
import { getProduct } from "@/api/productApi";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState("black"); 

  React.useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const formattedPrice = (product.price / 100).toFixed(2);

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
          <p className="text-2xl text-green-500 font-semibold">${formattedPrice}</p>
          <p className="text-gray-700">{product.description || "No description available."}</p>
          <div className="space-y-2">
            <p className="text-lg font-medium">Select Colors</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedColor("black")}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === "black" ? "border-blue-500" : "border-gray-300"
                }`}
                style={{ backgroundColor: "black" }}
              ></button>
              <button
                onClick={() => setSelectedColor("white")}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === "white" ? "border-blue-500" : "border-gray-300"
                }`}
                style={{ backgroundColor: "white" }}
              ></button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded">
            <button className="px-4 py-2">-</button>
            <span className="px-4">1</span>
            <button className="px-4 py-2">+</button>
          </div>
          <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
