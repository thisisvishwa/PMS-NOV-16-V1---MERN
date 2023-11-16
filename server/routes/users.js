```javascript
const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/usersController');

// User registration
router.post('/register', usersController.registerUser);

// User authentication
router.post('/login', usersController.authenticateUser);

// Password reset
router.post('/reset-password', usersController.resetPassword);

// MFA setup
router.post('/setup-mfa', passport.authenticate('jwt', { session: false }), usersController.setupMFA);

module.exports = router;
```