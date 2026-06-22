const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A collection must have a name'],
      trim: true,
    },
    // Foreign key linking the collection/folder to its owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A collection must belong to an authenticated user'],
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Compound index to guarantee folder name uniqueness ONLY within an individual user's account
CollectionSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Collection', CollectionSchema);
