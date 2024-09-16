import {Route, Routes} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import UrlDetails from "../pages/UrlDetails/UrlDetails";
import React from "react";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";

export const AppRouter = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {user ?
                    <Route path="/urlDetails/:id" element={<UrlDetails />} />
                :
               <>
                   <Route path="/login" element={<Login />} />
                   <Route path="/register" element={<Register />} />
               </>
            }
            <Route path="/" element={<Dashboard />} />
            <Route path="/*" element={<div>Page Not Found</div>} />
        </Routes>
    );
};