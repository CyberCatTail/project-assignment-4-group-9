import { apiInstance } from "./basic";

const API_URL = "/products";

export const getProduct = async (id) => {
  try {
    const response = await apiInstance.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProducts = async (queryParams) => {
  try {
    const response = await apiInstance.get(`${API_URL}`, { params: queryParams });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
