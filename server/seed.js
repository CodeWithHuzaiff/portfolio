require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Admin = require('./models/Admin');

const projects = [
  {
    title: 'StayNest – Accommodation Booking Platform',
    description: 'A full-stack accommodation booking platform inspired by Airbnb. Features include user authentication, property listings with search and filter, booking management, interactive maps, image uploads, and responsive design. Built with the MERN stack following MVC architecture.',
    techStack: ['MongoDB', 'Express.js', 'Node.js', 'EJS', 'Mapbox', 'Cloudinary'],
    githubLink: 'https://github.com/codewithhuzaiff',
    liveLink: '',
    imageURL: '',
    featured: true,
  },
  {
    title: 'Spotify Clone Web Application',
    description: 'A pixel-perfect frontend clone of Spotify featuring a modern music player UI, responsive sidebar navigation, playlist browsing, and playback controls. Demonstrates strong CSS and JavaScript skills with attention to UI/UX detail.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/codewithhuzaiff',
    liveLink: '',
    imageURL: '',
    featured: true,
  },
  {
    title: 'MongoChats – Real-Time Chat Application',
    description: 'A real-time messaging application with instant message delivery, user presence indicators, and chat rooms. Built with Socket.io for WebSocket communication and MongoDB for message persistence.',
    techStack: ['MongoDB', 'Express.js', 'Node.js', 'Socket.io', 'React.js'],
    githubLink: 'https://github.com/codewithhuzaiff',
    liveLink: '',
    imageURL: '',
    featured: true,
  },
  {
    title: 'Currency Exchange Web App',
    description: 'A dynamic currency converter application that fetches real-time exchange rates from an external API. Features include multi-currency support, swap functionality, and a clean, responsive interface.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    githubLink: 'https://github.com/codewithhuzaiff',
    liveLink: '',
    imageURL: '',
    featured: false,
  },
  {
    title: 'Starbucks & Tesla Frontend Clones',
    description: 'Pixel-perfect frontend clones of Starbucks and Tesla landing pages. These projects showcase advanced CSS layout techniques, responsive design patterns, and modern web design principles.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/codewithhuzaiff',
    liveLink: '',
    imageURL: '',
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Admin.deleteMany({});

    // Seed projects
    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    // Seed admin
    await Admin.create({
      email: 'admin@huzaifa.dev',
      password: 'admin123456',
    });
    console.log('Admin account created: admin@huzaifa.dev / admin123456');

    console.log('\nSeeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
