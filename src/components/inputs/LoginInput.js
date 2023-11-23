import React, {useState} from "react";
import axios from "axios";

const LoginInput = (props) => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();

        let isUsernameProvided = username && username !== '';
        let isPasswordProvided = password && password !== '';

        if(!isUsernameProvided) alert("Please, enter valid username!");
        if(!isPasswordProvided) alert("Please, enter valid password");

        props.login(username, password);
    }

    const onUsernameUpdate = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordUpdate = (e) => {
        setPassword(e.target.value);
    }

    return (
        <form
            onSubmit={onLogin}>
            <label htmlFor="username">Username:</label>
            <br/>
            <input type="text"
                   id='username'
                   name='username'
                   onChange={onUsernameUpdate}
            />

            <br/>

            <label htmlFor="Password:">Password:</label>
            <br/>

            <input type="password"
                   id='password'
                   name='password'
                   onChange={onPasswordUpdate}/>

            <br/>
            <button>Login!</button>

        </form>
    )

}

export default LoginInput;