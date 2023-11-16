```javascript
import React, { useState } from 'react';
import axios from 'axios';

const PasswordManagementPage = () => {
    const [passwords, setPasswords] = useState([]);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    const fetchPasswords = async () => {
        const response = await axios.get('/api/passwords');
        setPasswords(response.data);
    };

    const handlePasswordUpdate = async () => {
        if (selectedPassword) {
            await axios.put(`/api/passwords/${selectedPassword._id}`, { password: newPassword });
            fetchPasswords();
        }
    };

    const handlePasswordDelete = async () => {
        if (selectedPassword) {
            await axios.delete(`/api/passwords/${selectedPassword._id}`);
            fetchPasswords();
        }
    };

    return (
        <div>
            <h1>Password Management</h1>
            <div>
                <h2>Your Passwords</h2>
                <button onClick={fetchPasswords}>Refresh</button>
                <ul>
                    {passwords.map(password => (
                        <li key={password._id} onClick={() => setSelectedPassword(password)}>
                            {password.password}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedPassword && (
                <div>
                    <h2>Selected Password</h2>
                    <p>{selectedPassword.password}</p>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordUpdate}>Update</button>
                    <button onClick={handlePasswordDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default PasswordManagementPage;
```