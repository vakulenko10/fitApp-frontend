const API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const getWeightHistory = async (token) => {
    try {
      if (!token) throw new Error("User not authenticated");
  
      const response = await fetch(`${API_URL}/weight/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      console.log("Weight history data:", data);
  
      if (!response.ok) throw new Error(data.message || "Failed to fetch weight history");
  
      return data;
    } catch (error) {
      console.error("Weight history fetch error:", error);
      throw error;
    }
  };