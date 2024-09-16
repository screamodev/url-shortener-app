import React from "react";
import Form from "../../components/Form/Form";
import {useAuth} from "../../hooks/useAuth";

const Register = () => {
    const { register } = useAuth();

    return (
        <Form title="Sign up" buttonTitle="Sign up" onSubmit={register}/>
    );
};

export default Register;