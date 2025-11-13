const API_URL = import.meta.env.VITE_BACKEND_URL;


// User Register
export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Error to Register");
    }

    return data;
  } catch (error) {
    console.error("Error to register:", error);
    throw error;
  }
};

// Login de usuario
export const login = async (email, password, dispatch) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Error to login");
    }


    if (!data.token || !data.user?.id) {
      throw new Error("invalid login response");
    }


    localStorage.setItem("token", data.token);
    dispatch({
      type: "set_Logged",
      payload: true
    });
    return data; 
  } catch (error) {
    console.error("Error en login:", error);
    throw error; 
  }
};

//Obtener perfil

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("user_id");

    if (!token || !userID) { throw new Error("No token or user ID found"); }

    const response = await fetch (`${API_URL}/api/user/${userID}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error fetching profile");
    }
    
    return data;
  } catch (error) {
    console.error("Error in getProfile:", error);
    throw error;
  }
};