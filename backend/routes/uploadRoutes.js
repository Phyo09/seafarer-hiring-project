const multer = require('multer');
const path = require('path');

// Use diskStorage to customize filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }); // <--- now using custom storage

const router = require('express').Router();
const { uploadDocument } = require('../controllers/uploadController');

router.post('/document', upload.single('file'), uploadDocument);

module.exports = router;
