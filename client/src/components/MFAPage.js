```javascript
import React, { useState } from 'react';
import axios from 'axios';

const MFAPage = () => {
    const [mfaCode, setMfaCode] = useState('');
    const [mfaSetupSuccess, setMfaSetupSuccess] = useState(false);
    const [mfaSetupError, setMfaSetupError] = useState('');

    const handleMFASetup = async () => {
        try {
            const response = await axios.post('/api/users/setupMFA', { mfaCode });
            setMfaSetupSuccess(true);
            setMfaSetupError('');
        } catch (error) {
            setMfaSetupSuccess(false);
            setMfaSetupError('Failed to setup MFA. Please try again.');
        }
    };

    return (
        <div>
            <h2>Multi-factor Authentication Setup</h2>
            <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="Enter your MFA code"
            />
            <button onClick={handleMFASetup}>Setup MFA</button>
            {mfaSetupSuccess && <p>MFA setup successful!</p>}
            {mfaSetupError && <p>{mfaSetupError}</p>}
        </div>
    );
};

export default MFAPage;
```