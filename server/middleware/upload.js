<<<<<<< HEAD
﻿const multer = require('multer');
=======
const multer = require('multer');
>>>>>>> 61eeb18 (Complete)
const path = require('path');

// Store files locally on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // uploaded at the same millisecond will overwrite each other
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
<<<<<<< HEAD
const upload = multer({ storage });
=======
const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  const dangerousExts = [
    '.exe', '.dll', '.sys', '.bat', '.cmd', '.sh', '.bash', '.js', '.jsx',
    '.ts', '.tsx', '.py', '.pl', '.rb', '.php', '.asp', '.aspx', '.jsp',
    '.msi', '.jar', '.com', '.vbs', '.vbe', '.js', '.jse', '.wsf', '.wsh',
    '.msc', '.scr', '.bin', '.elf', '.out', '.app'
  ];

  if (dangerousExts.includes(fileExt)) {
    return cb(new Error('File upload rejected: Executable and script files are not allowed for security reasons.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB file size limit
  }
});
>>>>>>> 61eeb18 (Complete)

module.exports = upload;
