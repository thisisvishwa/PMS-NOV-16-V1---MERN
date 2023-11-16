```javascript
import React, { useState } from 'react';
import axios from 'axios';

const PasswordGenerationPage = () => {
    const [password, setPassword] = useState('');

    const handlePasswordGenerate = async () => {
        try {
            const response = await axios.get('/api/passwords/generate');
            setPassword(response.data.password);
        } catch (error) {
            console.error('Error generating password', error);
        }
    };

    return (
        <div>
            <h2>Password Generation</h2>
            <button id="passwordGenerateButton" onClick={handlePasswordGenerate}>Generate Password</button>
            {password && <p>Your generated password is: {password}</p>}
        </div>
    );
};

export default PasswordGenerationPage;
```