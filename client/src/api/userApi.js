import { apiInstance } from "./basic";

const API_URL = "/cart/items";


export const getCart= async () => {
  try {
    const response = await apiInstance.get(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const UpdatCart = async (product_id, quantity) => {
  try {
    console.log(`product_id:${product_id}:quantity:${quantity}`);
    const response = await apiInstance.put(`${API_URL}`, {
      "productId": product_id,
      "quantity": quantity
  });
    return response.data;
  } catch (error) {
    console.error("Error Updating product data:", error);
    throw error;
  }
};
