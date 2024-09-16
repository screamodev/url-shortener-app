import React from "react";
import Form from "../../components/Form/Form";
import {useAuth} from "../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();

    return (
        <Form title="Sign in" buttonTitle="Sign in" onSubmit={login}/>
    );
};

export default Login;