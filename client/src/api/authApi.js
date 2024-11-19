import { apiInstance } from "./basic";

const API_URL = "/login";

export const login = async (username, password) => {
  try {
    const response = await apiInstance.post(`${API_URL}`, {
        username,
        password,
    });
    return true;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
