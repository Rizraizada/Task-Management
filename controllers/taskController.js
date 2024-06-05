const Task = require('../models/task');

exports.addTaskForm = async (req, res) => {
  try {
    const tasks = await Task.find() || [];
    res.render('articles_add', { tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = new Task({ title, description, status, dueDate });
    await task.save();
    res.render('articles_add');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find() || [];
    console.log(tasks); // Log the tasks to verify data fetching
    res.render('articles_add', { tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, status, dueDate });
    res.render('articles_add');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.render('articles_add');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
