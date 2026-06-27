const Note = require('../models/note.Model');

// CREATE a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, collectionId, attachments } = req.body;

    const newNote = new Note({
      title,
      content,
      // If collectionId is empty or not provided, it defaults to null (Uncategorized)
      collectionId: collectionId || null,
      attachments,
      // Bind the note to the authenticated user
      userId: req.user._id
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
    const { collectionId } = req.query;

    // Always restrict the baseline query to the logged-in user's ID
    let filter = { userId: req.user._id };

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
    // findOneAndUpdate ensures we match BOTH the note ID and the user's ID
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body }, // Allows updating title, content, OR moving it to a new collectionId
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ message: 'Note not found or unauthorized' });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a note
exports.deleteNote = async (req, res) => {
  try {
    // findOneAndDelete prevents deleting notes that belong to someone else
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!deletedNote) return res.status(404).json({ message: 'Note not found or unauthorized' });
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
