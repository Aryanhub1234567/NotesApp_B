const router = express.Router();
const imagekitController = require('../controllers/imagekit.Controller');
const protect = require('../middleware/authMiddleware'); // Adjust path if needed

// Since we will mount this router at '/api/imagekit', the path here is just '/auth'
router.get('/auth', protect, imagekitController.getAuth);

module.exports = router;
