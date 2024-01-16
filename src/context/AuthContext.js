import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const user = localStorage.getItem("user");
    const [isAuthenticated, setIsAuthenticated] = useState(user?true:false);

    const login = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsAuthenticated(true);
        }
    }

    const logout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };