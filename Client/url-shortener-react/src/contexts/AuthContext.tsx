import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContextProps, AuthRequest, RegistrationRequest, User} from "../config/types/types";
import {loginFetch, registerFetch} from "../api/auth/authApi";

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    let storedUser = localStorage.getItem("user");
    let parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const [user, setUser] = useState<User | null>(parsedUser);
    const [token, setToken] = useState<string | null>(localStorage.getItem("site"));
    const navigate = useNavigate();

    const register = async (data: RegistrationRequest) => {
        try {
            const res = await registerFetch(data);

            setUser({ id: res.id, email: res.email, role: res.role });
            setToken(res.token);

            localStorage.setItem("user", JSON.stringify({ id: res.id, email: res.email, role: res.role }));
            localStorage.setItem("site", res.token);

            navigate("/");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    const login = async (data: AuthRequest) => {
        try {
            const res = await loginFetch(data);

            setUser({ id: res.id, email: res.email, role: res.role });
            setToken(res.token);

            localStorage.setItem("user", JSON.stringify({ id: res.id, email: res.email, role: res.role }));
            localStorage.setItem("site", res.token);

            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("site");

        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logOut }}>
    {children}
     </AuthContext.Provider>
);
};
