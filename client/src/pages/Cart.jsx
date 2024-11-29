import * as React from "react";
import { getCart, updateCart, makePayment } from "@/api/userApi";
import PaymentCard from "@/components/PaymentCard";
import CartItem from "@/components/CartItem";
import { toast } from "sonner"


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

    const handleSubClick = async (product) => {
    if(product.quantity<1){
        handleDelClick(product);
        return;
    }
    
    try {
        const resp = await updateCart(product.product_id, product.quantity - 1);
        setProducts(resp);
    } catch(error){
        console.error("get handleSubClick error, ", error);
    }        
    };

    const handleDelClick = async (product) => {
        try {
            const resp = await updateCart(product.product_id, 0)   
            setProducts(resp);
        } catch(error){
            console.error("get handleDelClick error, ", error);
        }        
    };

    const handleAddClick = async (product) => {
        if(product.quantity>=product.stock.quantity){
            toast.error("Exceed the max stock quantity");
            return;
        }

        try {
            const resp = await updateCart(product.product_id, product.quantity + 1)   
            setProducts(resp);
        } catch(error){
            console.error("get handleAddClick error, ", error);
        }        
    };

    const handleInputQuantity = async (product, quantity) =>{
        if(quantity>=product.stock.quantity){
            toast.error("Exceed the max stock quantity!");
            return;
        }

        if(quantity<=0){
            toast.error("Quantity must be greater than 0!");
            return;
        }

        try {
            const resp = await updateCart(product.product_id, quantity)   
            setProducts(resp);
        } catch(error){
            console.error("get handleInputQuantity error, ", error);
        }   

    }

    const handlePaymentSubmit = async(values) => {
        // 1. update quantity of cart to product
        // 2. update quantity of cart to store
        // 3. cleaer cart data
        try{
            const resp = await makePayment(values);
            setProducts(resp);
        } catch(error){
            console.error("get handlePaymentSubmit error, ", error);
        }        
    }
    return (    
    <div className="font-sans max-w-6xl max-lg:max-w-2xl mx-auto bg-white p-4">
        <div className="grid lg:grid-cols-2 gap-12">
        <div>
            <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-2xl font-extrabold text-gray-800">Your Cart</h2>
                <div className="space-y-4 mt-8">
                    <div>
                        {   
                            Object.keys(products).length === 0 ? (
                                <div>No products in the cart.</div>
                              ):
                            (products.map(product => <CartItem key={product.product_id} product={product} 
                                handleSubClick={handleSubClick} handleDelClick={handleDelClick} 
                                handleAddClick={handleAddClick} handleInputQuantity={handleInputQuantity} /> ))
                        }
                        <hr className="border-gray-300" />
                    </div>   
                </div>
            </div>        
        </div>        
           <PaymentCard products={products} handlePaymentSubmit={handlePaymentSubmit} />   
        </div>
    </div>
    );
}
  
export default Cart;