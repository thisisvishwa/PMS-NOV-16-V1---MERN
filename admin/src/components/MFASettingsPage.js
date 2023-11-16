```javascript
import React, { useState } from 'react';
import axios from 'axios';

const MFASettingsPage = () => {
    const [mfaStatus, setMfaStatus] = useState(false);
    const [message, setMessage] = useState('');

    const handleMFASetup = async () => {
        try {
            const response = await axios.post('/api/mfa/setup', { mfaStatus });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>MFA Settings</h2>
            <form onSubmit={handleMFASetup}>
                <label>
                    Enable MFA:
                    <input
                        type="checkbox"
                        checked={mfaStatus}
                        onChange={() => setMfaStatus(!mfaStatus)}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MFASettingsPage;
```