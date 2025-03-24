const API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const getWeightHistory = async (token) => {
  try {
    if (!token) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}/weight/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Weight history data:", data);

    if (!response.ok)
      throw new Error(data.message || "Failed to fetch weight history");

    return data;
  } catch (error) {
    console.error("Weight history fetch error:", error);
    throw error;
  }
};

export const updateWeight = async (token, weightData) => {

    console.log(typeof(weightData))
  const response = await fetch(`${API_URL}/weight/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        weight: weightData,
      }),
    },
  );

  if (!response.ok) {
    console.log(JSON.stringify(response))
    
    throw new Error(response.status);
  }

  return await response.json();
};
export const updateUserProfile = async (token, profileData) => {
  if (!token) {
    throw new Error("User not authenticated");
  }
  console.log("profileData inside updateUserProfile:", profileData);
  try {
    // Filter out undefined or null values from profileData to avoid sending unnecessary data
    const payload = Object.fromEntries(
      Object.entries(profileData).filter(([key, value]) => value != null)
    );
    console.log("payload:", payload);
    // If no fields are provided for update, do not make the request
    if (Object.keys(payload).length === 0) {
      throw new Error("No data to update");
    }

    const response = await fetch(`${API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    console.log("Profile updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
