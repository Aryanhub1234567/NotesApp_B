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
    // We set required to false so users can optionally create "Uncategorized" notes
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      default: null,
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Add an index on collectionId for faster queries when filtering notes by folder
NoteSchema.index({ collectionId: 1 });

const NoteModel = mongoose.model('Note', NoteSchema);
module.exports = NoteModel
