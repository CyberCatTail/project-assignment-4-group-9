import { apiInstance } from "./basic";

const API_URL = "/login";

export const login = async (email, password) => {
  try {
    const response = await apiInstance.post(`${API_URL}`, {
        email,
        password,
    });
    return true;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
