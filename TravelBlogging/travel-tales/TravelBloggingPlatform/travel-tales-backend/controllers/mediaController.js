// const Media = require('../models/Media');
// const fs = require('fs');
// // const fs = require('fs').promises;
// const path = require('path');

// // Define the absolute path for the uploads directory
// const uploadDir = path.resolve(__dirname, '..', 'uploads');

// // Ensure the upload directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // @desc    Upload a new media file
// // @route   POST /api/media
// exports.uploadMedia = async (req, res) => {
//   console.log(req)
//   try { console.log(req)
//     if (!req.file) {
//       return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     const { filename, path: filePath, mimetype } = req.file;

//     const media = new Media({
//       url: filePath,
//       description: req.body.description,
//       uploader: req.user.id // Assuming you have user authentication middleware
//     });

//     await media.save();

//     res.json(media);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // @desc    Get all media files
// // @route   GET /api/media
// exports.getAllMedia = async (req, res) => {
//   try {
//     const media = await Media.find();
//     res.json(media);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // @desc    Get media by ID
// // @route   GET /api/media/:id
// exports.getMediaById = async (req, res) => {
//   try {
//     const media = await Media.findById(req.params.id);
//     if (!media) {
//       return res.status(404).json({ msg: 'Media not found' });
//     }
  
//     res.json(media);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // @desc    Delete a media file
// // @route   DELETE /api/media/:id
// exports.deleteMedia = async (req, res) => {
//   try {
//     const media = await Media.findById(req.params.id);
//     if (!media) {
//       return res.status(404).json({ msg: 'Media not found' });
//     }

//     // Check if the authenticated user is the owner of the media
//     if (media.uploader.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }
//     console.log(media._id)

//     try {
//       // Delete the media file from the server
//       await fs.unlink(media.url);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ msg: 'Error deleting the file from server' });
//     }

//     // Delete the media document from the database
//     await media.remove();

//     res.json({ msg: 'Media removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };





const Media = require('../models/Media');
const fs = require('fs').promises; // Use the promises API of fs
const path = require('path');

// Define the absolute path for the uploads directory
const uploadDir = path.resolve(__dirname, '..', 'uploads');

// Ensure the upload directory exists
fs.mkdir(uploadDir, { recursive: true }).catch(err => console.error(err));

// @desc    Upload a new media file
// @route   POST /api/media
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const { filename, path: filePath, mimetype } = req.file;

    const media = new Media({
      url: filePath,
      description: req.body.description,
      uploader: req.user.id // Assuming you have user authentication middleware
    });

    await media.save();

    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all media files
// @route   GET /api/media
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get media by ID
// @route   GET /api/media/:id
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media not found' });
    }

    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a media file
// @route   DELETE /api/media/:id
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media not found' });
    }
    

    // Check if the authenticated user is the owner of the media
    if (media.uploader.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    try {
      // Delete the media file from the server
      await fs.unlink(media.url);
    } catch (err) {
      console.error('Error deleting the file from server:', err);
      // Proceed to remove the media document from the database
    }

    // Delete the media document from the database
    //  await media.remove();
    await Media.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Media removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};