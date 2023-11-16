```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        getPasswords();
    }, []);

    const getPasswords = async () => {
        try {
            const res = await axios.get('/api/passwords');
            setPasswords(res.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h2>Your Passwords</h2>
            <table>
                <thead>
                    <tr>
                        <th>Password</th>
                        <th>Date of Creation</th>
                        <th>Date of Last Update</th>
                        <th>Password Strength</th>
                    </tr>
                </thead>
                <tbody>
                    {passwords.map(password => (
                        <tr key={password._id}>
                            <td>{password.password}</td>
                            <td>{new Date(password.dateOfCreation).toLocaleDateString()}</td>
                            <td>{new Date(password.dateOfLastUpdate).toLocaleDateString()}</td>
                            <td>{password.passwordStrength}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
```