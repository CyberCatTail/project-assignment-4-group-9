import { apiInstance } from "./basic";

const API_URL = "/admin/products";

export const getProduct = async (id) => {
  try {
    const response = await apiInstance.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProducts = async (offset, limit) => {
  if (offset < 0 || limit < 0) {
    return [];
  }
  try {
    const response = await apiInstance.get(`${API_URL}?offset=${offset}&limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const updateProduct = async (id, updateData) => {
  if (id < 0) {
    return;
  }
  try {
    const response = await apiInstance.put(`${API_URL}/${id}`, updateData);
    return response.data.data;
  } catch (error) {
    console.error("Error update product data:", error);
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const response = await apiInstance.post(`${API_URL}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error create product data:", error);
    throw error;
  }
};