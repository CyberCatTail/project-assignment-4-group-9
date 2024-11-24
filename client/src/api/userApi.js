import { apiInstance } from "./basic";

const API_URL = "/cart/items";

// export const getCart = async (id) => {
//   try {
//     const response = await apiInstance.get(`${API_URL}/${id}`);
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     throw error;
//   }
// };

export const getCart= async () => {
  try {
    const response = await apiInstance.get(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
