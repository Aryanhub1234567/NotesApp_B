const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.Controller');

const { protect } = require('../middlewares/authMiddleware'); // Your middleware

// All note routes become protected
router.use(protect);

// Base Route: /api/notes
router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
