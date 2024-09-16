export interface AuthContextProps {
    token: string | null;
    user: User | null;
    login: (data: AuthRequest) => Promise<void>;
    register: (data: RegistrationRequest) => Promise<void>;
    logOut: () => void;
}

export interface User {
    id: string;
    email: string;
    role: string;
}

export interface ShortUrlModel {
    id: number;
    originalUrl: string;
    shortenedUrl: string;
    userId: string;
    createdDate: string;
}

export interface AuthRequest {
    id: string;
    email: string;
    password: string;
}

export interface RegistrationRequest {
    id: string;
    email: string;
    password: string;
}