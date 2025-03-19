const API_URL = "https://fitapp-backend.onrender.com";

export const loginUser = async (email, password) => {
  console.log("Login function called with:", email, password);
  try {
    const response = await fetch(`${API_URL}/login`, {// request to server
      method: "POST",//sending data to server
      headers: { "Content-Type": "application/json" },//format data, what we send. Content-Type - format data. application/json - send data JSON
      body: JSON.stringify({ email, password })//transforms into the JSON format
    });

      console.log("Response received:", response);
      
      const data = await response.json();//getting answer 
      console.log("Parsed response data:", data); // Log data
      
      if (!response.ok) throw new Error(data.message || "Login failed");
      
      localStorage.setItem("user", JSON.stringify(data));
      return data;
  }
    
    catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch profile");
    return data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

getProfile()
  .then(userData => console.log("User Profile:", userData))
  .catch(error => console.error("Error fetching profile:", error));


export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
