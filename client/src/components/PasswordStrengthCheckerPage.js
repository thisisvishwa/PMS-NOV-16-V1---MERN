```javascript
import React, { useState } from 'react';
import axios from 'axios';

const PasswordStrengthCheckerPage = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordStrengthCheck = async () => {
        try {
            const response = await axios.post('/api/passwords/checkStrength', { password });
            setStrength(response.data.strength);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Password Strength Checker</h2>
            <input
                type="password"
                id="passwordField"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
            />
            <button id="passwordStrengthCheckButton" onClick={handlePasswordStrengthCheck}>
                Check Password Strength
            </button>
            {strength && <p>Your password strength: {strength}</p>}
        </div>
    );
}

export default PasswordStrengthCheckerPage;
```