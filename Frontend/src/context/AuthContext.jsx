import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, loading: true });

  useEffect(() => {
    const userId = Cookies.get("user_id");
    if (userId) {
      // Simulate fetching user data, replace with actual data fetching if necessary
      setAuth({ user: { id: userId }, loading: false });
    } else {
      setAuth({ user: null, loading: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add prop types validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
