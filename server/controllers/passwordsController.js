```javascript
const Password = require('../models/Password');
const User = require('../models/User');

// Store Password
exports.storePassword = async (req, res) => {
    const { userId, password } = req.body;
    const newPassword = new Password({ userId, password });
    await newPassword.save();
    res.status(200).json({ message: 'passwordStoreSuccess' });
};

// Retrieve Password
exports.retrievePassword = async (req, res) => {
    const { userId } = req.body;
    const password = await Password.findOne({ userId });
    res.status(200).json({ password });
};

// Update Password
exports.updatePassword = async (req, res) => {
    const { userId, password } = req.body;
    await Password.findOneAndUpdate({ userId }, { password });
    res.status(200).json({ message: 'passwordUpdateSuccess' });
};

// Delete Password
exports.deletePassword = async (req, res) => {
    const { userId } = req.body;
    await Password.findOneAndDelete({ userId });
    res.status(200).json({ message: 'passwordDeleteSuccess' });
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'passwordResetSuccess' });
};

// Share Password
exports.sharePassword = async (req, res) => {
    const { userId, sharedUserId } = req.body;
    const password = await Password.findOne({ userId });
    const sharedPassword = new Password({ userId: sharedUserId, password: password.password });
    await sharedPassword.save();
    res.status(200).json({ message: 'passwordShareSuccess' });
};

// Check Password Strength
exports.checkPasswordStrength = (req, res) => {
    const { password } = req.body;
    const strength = password.length >= 8 ? 'Strong' : 'Weak';
    res.status(200).json({ strength });
};

// Notify Password Expiry
exports.notifyPasswordExpiry = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const passwordExpiryDate = user.passwordExpiryDate;
    const currentDate = new Date();
    if (currentDate >= passwordExpiryDate) {
        res.status(200).json({ message: 'passwordExpiryNotificationSuccess' });
    } else {
        res.status(200).json({ message: 'Password has not expired' });
    }
};
```