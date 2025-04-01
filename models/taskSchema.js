const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      required: true,
    },
    operations: {
      type: [String],
      enum: ["CREATE", "EDIT"],
      required: true,
    },
  },
  { collection: "taskList" }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
