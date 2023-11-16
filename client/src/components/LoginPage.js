```javascript
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, password });
            setLoginSuccess(response.data.message);
        } catch (error) {
            setLoginSuccess(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="emailField">Email:</label>
                <input type="email" id="emailField" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="passwordField">Password:</label>
                <input type="password" id="passwordField" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" id="loginButton">Login</button>
            </form>
            {loginSuccess && <p>{loginSuccess}</p>}
        </div>
    );
};

export default LoginPage;
```