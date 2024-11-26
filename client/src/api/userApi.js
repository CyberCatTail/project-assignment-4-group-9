import { apiInstance } from "./basic";

const API_URL = "/cart/items";
const PAYMENT_API_URL = "/payment";


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
    const response = await apiInstance.put(`${API_URL}`, {
      "product_id": product_id,
      "quantity": quantity
  });
    return response.data.data;
  } catch (error) {
    console.error("Error Updating product data:", error);
    throw error;
  }
};

export const MakePayment = async (products) => {
  try {
    const response = await apiInstance.put(`${PAYMENT_API_URL}`, products);
    return response.data.data;
  } catch (error) {
    console.error("Error Updating product data:", error);
    throw error;
  }
};
