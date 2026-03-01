const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);
    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify token
// @route   GET /api/auth/verify
// @access  Private
exports.verifyToken = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};
