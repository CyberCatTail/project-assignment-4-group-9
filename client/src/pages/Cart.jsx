import * as React from "react";
import { getCart } from "@/api/userApi";
import PaymentCard from "@/components/PaymentCard";
import CartItem from "@/components/CartItem";

function Cart() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getCart();
            setProducts(data);
          } catch (error) {
            console.error("get getCart error, ", error)
          }
        };
        fetchProducts();
      }, []);
    
    return (

        

    <div className="font-sans max-w-6xl max-lg:max-w-2xl mx-auto bg-white p-4">
        <div className="grid lg:grid-cols-2 gap-12">
        <div>
            <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-2xl font-extrabold text-gray-800">Your Cart</h2>
                <div className="space-y-4 mt-8">

                    <div>
                        {products.map(product => <CartItem key={product.product_id} product={product} /> )}
                        <hr className="border-gray-300" />
                    </div>   
                </div>
            </div>        
        </div>

        <PaymentCard products={products} />
    </div>
    </div>
    );
}
  
export default Cart;