const Collection = require('../models/collection.Model');
const Note = require('../models/note.Model'); // Required to update notes when a collection is deleted

// CREATE a new collection
exports.createCollection = async (req, res) => {
  try {
    const newCollection = new Collection({ name: req.body.name });
    const savedCollection = await newCollection.save();
    res.status(201).json(savedCollection);
  } catch (error) {
    // Handle duplicate name error (Mongoose unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A collection with this name already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// READ all collections
exports.getCollections = async (req, res) => {
  try {
    // Sort collections by newest first
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a collection (Rename)
exports.updateCollection = async (req, res) => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!updatedCollection) return res.status(404).json({ message: 'Collection not found' });
    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a collection
exports.deleteCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const collection = await Collection.findById(collectionId);

    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    // UX decision: When deleting a folder, we don't delete the user's notes.
    // Instead, we move all notes inside this folder to "Uncategorized" (collectionId = null)
    await Note.updateMany({ collectionId: collectionId }, { $set: { collectionId: null } });

    // Delete the actual collection
    await Collection.findByIdAndDelete(collectionId);

    res.status(200).json({ message: 'Collection deleted and notes moved to Uncategorized.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
