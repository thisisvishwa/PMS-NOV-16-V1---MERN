```javascript
const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    dateOfLastUpdate: {
        type: Date,
        default: Date.now
    },
    passwordStrength: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Password', PasswordSchema);
```