const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection.Controller');

const { protect } = require('../middlewares/authMiddleware'); // Your middleware

// All note routes become protected
router.use(protect);


// Base Route: /api/collections
router.post('/', collectionController.createCollection);
router.get('/', collectionController.getCollections);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;
