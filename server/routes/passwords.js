```javascript
const express = require('express');
const router = express.Router();
const passwordsController = require('../controllers/passwordsController');
const auth = require('../middleware/auth');

// Route to store password
router.post('/store', auth, passwordsController.storePassword);

// Route to retrieve password
router.get('/retrieve/:id', auth, passwordsController.retrievePassword);

// Route to update password
router.put('/update/:id', auth, passwordsController.updatePassword);

// Route to delete password
router.delete('/delete/:id', auth, passwordsController.deletePassword);

// Route to reset password
router.post('/reset', auth, passwordsController.resetPassword);

// Route to share password
router.post('/share', auth, passwordsController.sharePassword);

// Route to generate password
router.get('/generate', auth, passwordsController.generatePassword);

// Route to check password strength
router.get('/check-strength/:id', auth, passwordsController.checkPasswordStrength);

// Route to set password expiry notification
router.post('/expiry-notification', auth, passwordsController.notifyPasswordExpiry);

module.exports = router;
```