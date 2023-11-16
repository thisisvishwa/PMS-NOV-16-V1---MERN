```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordsManagementPage = () => {
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        fetchPasswords();
    }, []);

    const fetchPasswords = async () => {
        const res = await axios.get('/api/passwords');
        setPasswords(res.data);
    };

    const deletePassword = async (id) => {
        await axios.delete(`/api/passwords/${id}`);
        fetchPasswords();
    };

    return (
        <div>
            <h1>Passwords Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Password</th>
                        <th>Date of Creation</th>
                        <th>Date of Last Update</th>
                        <th>Password Strength</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {passwords.map(password => (
                        <tr key={password._id}>
                            <td>{password.userId}</td>
                            <td>{password.password}</td>
                            <td>{new Date(password.dateOfCreation).toLocaleDateString()}</td>
                            <td>{new Date(password.dateOfLastUpdate).toLocaleDateString()}</td>
                            <td>{password.passwordStrength}</td>
                            <td>
                                <button onClick={() => deletePassword(password._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PasswordsManagementPage;
```