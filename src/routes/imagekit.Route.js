const express = require('express');
const router = express.Router();
const imagekitController = require('../controllers/imagekit.Controller');
const protect = require('../middlewares/authMiddleware'); // Adjust path if needed
//router.use(protect);
// Since we will mount this router at '/api/imagekit', the path here is just '/auth'
router.get('/auth', imagekitController.getAuth);

module.exports = router;
