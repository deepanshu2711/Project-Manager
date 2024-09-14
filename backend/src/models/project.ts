import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  progress: {
    type: Number,
    default: 0,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const Project = mongoose.model("Project", projectSchema);
