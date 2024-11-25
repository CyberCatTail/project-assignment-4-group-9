import { useParams } from "react-router-dom";
import * as React from "react";
import { getProduct} from "@/api/productApi";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    getProduct(id).then(data => setProduct(data))
}, []);

  return <div>{product?.model}</div>;
}

export default Product;
