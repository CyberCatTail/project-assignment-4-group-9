import { API_BASE_URL } from "./basic";
import axios from "axios";

const API_URL = API_BASE_URL + "/products";

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
