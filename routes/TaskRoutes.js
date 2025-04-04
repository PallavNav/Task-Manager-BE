const express = require("express");
const router = express.Router();
const Task = require("../models/taskSchema");

router.get("/isLive", async (req, res) => {
  try {
    res.send("App is live!!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const { status, priority } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const { id, title, description, dueDate, priority, status, operations } = req.body;
    const newTask = new Task({ id, title, description, dueDate, priority, status, operations });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ id });

    if (!task) {
      return res.status(404).json({ message: 'Task Not found' })
    }
    console.log("Found Task:", task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskToBeDeleted = await Task.findOneAndDelete({ id });

    if (!taskToBeDeleted) {
      return res.status(404).json({ message: 'Task Not found' })
    }
    console.log("Deleted Task:", taskToBeDeleted);
    res.status(200).json({ message: "Task deleted successfully", task: taskToBeDeleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/tasks', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({ message: 'Invalid request. Provide array of tasks IDs' });
    }

    const deletedTasks = await Task.deleteMany({ id: { $in: ids } });
    if (deletedTasks.deletedCount === 0) {
      res.status(400).json({ message: 'No task found to delete!' });
    }

    res.status(200).json({ message: 'Tasks deleted successfully!', deletedCount: deletedTasks.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const taskToBeUpdated = await Task.findOneAndUpdate({ id }, updatedData, { new: true });

    if (!taskToBeUpdated) {
      return res.status(404).json({ message: 'Task Not found' })
    }
    console.log("Updated Task:", taskToBeUpdated);
    res.status(200).json({ message: "Task updated successfully", task: taskToBeUpdated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
