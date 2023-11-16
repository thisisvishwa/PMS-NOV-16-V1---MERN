```javascript
import React, { useState } from 'react';
import axios from 'axios';

const PasswordExpiryNotificationsPage = () => {
    const [email, setEmail] = useState('');
    const [passwordExpiryNotificationSuccess, setPasswordExpiryNotificationSuccess] = useState(null);

    const handlePasswordExpiryNotification = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/passwords/expiry-notification', { email });
            setPasswordExpiryNotificationSuccess(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Password Expiry Notifications</h2>
            <form onSubmit={handlePasswordExpiryNotification}>
                <label htmlFor="emailField">Email:</label>
                <input
                    id="emailField"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" id="passwordExpiryNotificationButton">Set Expiry Notification</button>
            </form>
            {passwordExpiryNotificationSuccess && <p>{passwordExpiryNotificationSuccess}</p>}
        </div>
    );
};

export default PasswordExpiryNotificationsPage;
```