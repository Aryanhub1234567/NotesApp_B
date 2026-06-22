const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A note must have a title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'A note must have content'],
    },
    // Reference to the Collection model
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      default: null,
    },
    // Foreign key linking the note to its owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A note must belong to an authenticated user'],
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Compound index for faster queries when filtering a specific user's notes by folder
NoteSchema.index({ userId: 1, collectionId: 1 });

const NoteModel = mongoose.model('Note', NoteSchema);
module.exports = NoteModel;
