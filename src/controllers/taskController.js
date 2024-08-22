const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validations/taskValidation');

// Create a new task
const createTask = async (req, res) => {
  try {
    // Validate the request body
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ code: 400, status: 'Error', message: error.details[0].message });
    }

    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user._id });
    await task.save();
    res.status(201).json({ code: 201, status: 'Success', data: task });
  } catch (err) {
    res.status(500).json({ code: 500, status: 'Error', message: err.message });
  }
};

// Get all tasks for the logged user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json({ code: 200, status: 'Success', data: tasks });
  } catch (err) {
    res.status(500).json({ code: 500, status: 'Error', message: err.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the request body
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ code: 400, status: 'Error', message: error.details[0].message });
    }

    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    res.json({ code: 200, status: 'Success', data: task });
  } catch (err) {
    res.status(500).json({ code: 500, status: 'Error', message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ code: 200, status: 'Success', message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ code: 500, status: 'Error', message: err.message });
  }
};

module.exports = {
   createTask, getTasks, updateTask, deleteTask
};
