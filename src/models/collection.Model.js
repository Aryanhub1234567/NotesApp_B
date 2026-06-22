const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A collection must have a name'],
      unique: true, // Prevents the user from creating duplicate folder names
      trim: true,
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Collection', CollectionSchema);
