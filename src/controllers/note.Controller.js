const Note = require('../models/note.Model');

// CREATE a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, collectionId } = req.body;

    const newNote = new Note({
      title,
      content,
      // If collectionId is empty or not provided, it defaults to null (Uncategorized)
      collectionId: collectionId || null
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ notes (Fetch all, or filter by collection)
exports.getNotes = async (req, res) => {
  try {
    // Check if the frontend is asking for a specific folder's notes via query
    // e.g., /api/notes?collectionId=64f1a... or /api/notes?collectionId=null
    const { collectionId } = req.query;
    let filter = {};

    if (collectionId !== undefined) {
      // Handle the string 'null' sent from frontend query params
      filter.collectionId = collectionId === 'null' ? null : collectionId;
    }

    // Fetch notes matching the filter, newest first
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a note
exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Allows updating title, content, OR moving it to a new collectionId
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
