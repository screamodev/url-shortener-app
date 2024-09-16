import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {AuthContextProps} from "../config/types/types";

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};