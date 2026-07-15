<<<<<<< HEAD
﻿const Task = require('../models/Task');
=======
const Task = require('../models/Task');
>>>>>>> 61eeb18 (Complete)

// @desc  Get all available (Open) tasks
// @route GET /api/talent/tasks/available
// @access Talent
const getAvailableTasks = async (req, res) => {
  try {
    // (loose schema allows this inconsistent state from seed data)
    const tasks = await Task.find({ status: 'Open' })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get tasks assigned to the logged-in talent
// @route GET /api/talent/tasks/mine
// @access Talent
const getMyTasks = async (req, res) => {
  try {
    // all come back mixed together with no grouping
    const tasks = await Task.find({ assignedTo: req.user._id })
      .sort({ updatedAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Claim an open task
// @route PUT /api/talent/tasks/:id/claim
// @access Talent
const claimTask = async (req, res) => {
  try {
<<<<<<< HEAD
    // Two talents can both pass the status === 'Open' check before either saves,
    // then both write Claimed. Proper fix: findOneAndUpdate({ _id, status: 'Open' })
=======
>>>>>>> 61eeb18 (Complete)
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

<<<<<<< HEAD
    if (task.status !== 'Open') {
      return res.status(400).json({ message: 'Task is no longer available' });
    }
    task.status = 'Claimed';
    task.assignedTo = req.user._id;
    await task.save();

    res.json(task);
=======
    // Atomically update task if and only if its status is 'Open'
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, status: 'Open' },
      { status: 'Claimed', assignedTo: req.user._id },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(400).json({ message: 'Task is no longer available' });
    }

    res.json(updatedTask);
>>>>>>> 61eeb18 (Complete)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAvailableTasks, getMyTasks, claimTask };
