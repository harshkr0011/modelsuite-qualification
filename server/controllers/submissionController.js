<<<<<<< HEAD
﻿const Submission = require('../models/Submission');
=======
const Submission = require('../models/Submission');
>>>>>>> 61eeb18 (Complete)
const Task = require('../models/Task');

// @desc  Submit a task with a file upload
// @route POST /api/submissions/:taskId
// @access Talent (protect middleware only — no role check)
const submitTask = async (req, res) => {
  const { taskId } = req.params;
  const { notes } = req.body;

  try {
    // — any authenticated user can submit for any task
    // — a talent can "submit" an Open or Approved task

    // Build the file URL from multer's saved file
    // with a different PORT or base URL
    const fileUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : req.body.fileUrl || null;
    // — no audit trail of re-submissions
    let submission = await Submission.findOne({ taskId, talentId: req.user._id });

    if (submission) {
      // Overwrite: update in place
      submission.fileUrl = fileUrl;
      submission.notes = notes;
      await submission.save();
    } else {
      submission = await Submission.create({
        taskId,
        talentId: req.user._id,
        fileUrl,
        notes,
      });
    }

    // Update task status to Submitted
    await Task.findByIdAndUpdate(taskId, { status: 'Submitted' });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get submission for a specific task (admin use)
// @route GET /api/submissions/:taskId
// @access Protect only — no admin guard
const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({ taskId: req.params.taskId })
      .populate('talentId', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'No submission found for this task' });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get ALL submissions (for Admin review queue)
// @route GET /api/submissions/admin/all
// @access Admin
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({})
      .populate('taskId', 'title dueDate status')
      .populate('talentId', 'name email')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Approve or Reject a submission
// @route PUT /api/submissions/:id/review
// @access Admin
const reviewSubmission = async (req, res) => {
  const { reviewStatus } = req.body;

  try {
    // — any string is accepted and stored
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { reviewStatus },
      { new: true }
    )
      .populate('taskId', 'title status')
      .populate('talentId', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
<<<<<<< HEAD
    // — task stays 'Submitted' even after the submission is Approved/Rejected
    // Proper flow: also update Task.status to 'Approved'/'Rejected'
=======
    
    // Also update Task.status to 'Approved'/'Rejected'
    if (submission.taskId) {
      await Task.findByIdAndUpdate(submission.taskId._id || submission.taskId, { status: reviewStatus });
    }
>>>>>>> 61eeb18 (Complete)

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
module.exports = { submitTask, getSubmission, getAllSubmissions, reviewSubmission };
=======
// @desc  Get logged-in talent's submissions
// @route GET /api/submissions/talent/mine
// @access Talent
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ talentId: req.user._id })
      .populate('taskId', 'title description status dueDate')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitTask, getSubmission, getAllSubmissions, reviewSubmission, getMySubmissions };
>>>>>>> 61eeb18 (Complete)
