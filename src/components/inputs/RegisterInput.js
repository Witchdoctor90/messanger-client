import React, {useState} from 'react';

const RegisterInput = (props) =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        props.register(username, password);
    }

        const onUsernameUpdate = (e) => {
            setUsername(e.target.value);
        }

        const onPasswordUpdate = (e) => {
            setPassword(e.target.value);
        }

        return (
            <form
                onSubmit={onSubmit}>
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
                <button>Register!</button>

            </form>
        )

}

export default RegisterInput