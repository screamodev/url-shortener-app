import {AuthRequest, RegistrationRequest} from "../../config/types/types";

const AUTH_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/users`;

export const registerFetch = async (data: RegistrationRequest) => {
    try {
        const response = await fetch(`${AUTH_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, role: "User" }),
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export const loginFetch = async (data: AuthRequest) => {
    try {
        const response = await fetch(`${AUTH_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
