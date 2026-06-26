// imagekit.Controller.js
const ImageKit = require('imagekit');

// Initialize ImageKit with your environment variables
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Generate the auth parameters required by the frontend
exports.getAuth = (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate ImageKit auth signature', error: error.message });
  }
};
