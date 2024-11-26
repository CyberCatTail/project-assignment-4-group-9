import * as React from "react";
import { getCart, UpdatCart, MakePayment } from "@/api/userApi";
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

    const handleSubClick = async (product) => {
    if(product.quantity<1){
        handleDelClick(product);
        return;
    }
    
    product.quantity = product.quantity - 1;
    try {
        const resp = await UpdatCart(product.product_id, product.quantity);
        setProducts(resp);
    } catch(error){
        console.error("get handleSubClick error, ", error);
    }        
    };

    const handleDelClick = async (product) => {
        product.quantity = 0;
        try {
            const resp = await UpdatCart(product.product_id, product.quantity)   
            setProducts(resp);
        } catch(error){
            console.error("get handleDelClick error, ", error);
        }        
    };

    const handleAddClick = async (product) => {
        if(product.quantity>=product.stock.quantity){
            // window.alert("Exceed the max stock quantity");            
            // toast.error(error.response.data.notice.message);
            toast.error("Exceed the max stock quantity");
        }
        product.quantity = product.quantity + 1;
        try {
            const resp = await UpdatCart(product.product_id, product.quantity)   
            setProducts(resp);
        } catch(error){
            console.error("get handleAddClick error, ", error);
        }        
    };

    const handlePaymentSubmit = async(values) => {
        // 1. update quantity of cart to product
        // 2. update quantity of cart to store
        // 3. cleaer cart data
        try{
            const resp = await MakePayment(values);
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
                            (products.map(product => <CartItem key={product.product_id} product={product} handleSubClick={handleSubClick} handleDelClick={handleDelClick} handleAddClick={handleAddClick} /> ))
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