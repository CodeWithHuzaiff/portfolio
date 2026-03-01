const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
  },
  githubLink: {
    type: String,
    required: [true, 'GitHub link is required'],
  },
  liveLink: {
    type: String,
    default: '',
  },
  imageURL: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
