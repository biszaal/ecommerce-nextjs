import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(Cookies.get("user") || null);
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user));
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  const loginUser = async (email, password) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth", {
        name,
        email,
        password,
      });

      if (response.data.status === "success") {
        const loginResponse = await loginUser(email, password);
        if (loginResponse.success) {
          return { success: true };
        } else {
          throw new Error(loginResponse.error);
        }
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Error registering.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    console.log("Logged out");
    setUser(null);
    Cookies.remove("user");
  };

  return (
    <UserContext.Provider
      value={{ user, loading, loginUser, registerUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
