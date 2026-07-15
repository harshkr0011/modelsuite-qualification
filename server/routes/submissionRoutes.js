<<<<<<< HEAD
﻿const express = require('express');
const router = express.Router();
const { submitTask, getSubmission, getAllSubmissions, reviewSubmission } = require('../controllers/submissionController');
=======
const express = require('express');
const router = express.Router();
const { submitTask, getSubmission, getAllSubmissions, reviewSubmission, getMySubmissions } = require('../controllers/submissionController');
>>>>>>> 61eeb18 (Complete)
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// ── Admin routes (defined FIRST — must come before /:taskId to avoid shadowing) ──
router.get('/admin/all', protect, adminOnly, getAllSubmissions);
router.put('/:id/review', protect, adminOnly, reviewSubmission);

// ── Talent routes ──
<<<<<<< HEAD
=======
router.get('/talent/mine', protect, getMySubmissions);
>>>>>>> 61eeb18 (Complete)
// so the file is saved to disk even if the request is later rejected
router.post('/:taskId', protect, upload.single('file'), submitTask);
router.get('/:taskId', protect, getSubmission);

module.exports = router;
