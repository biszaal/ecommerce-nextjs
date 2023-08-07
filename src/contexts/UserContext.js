import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(Cookies.get("user") || null);
  });

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user));
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  const loginUser = async (email, password) => {
    try {
      const response = await axios
        .get("/api/auth", {
          params: {
            email,
            password,
          },
        })
        .then((data) => {
          setUser(data.data.data.user);
          return { success: true };
        })
        .catch((error) => {
          return {
            success: false,
            error: error.message || "Error logging in.",
          };
        });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Error logging in.",
      };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Error registering.",
      };
    }
  };

  const logoutUser = () => {
    console.log("Logged out");
    setUser(null);
    Cookies.remove("user");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
