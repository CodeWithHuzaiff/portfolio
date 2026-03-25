const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const sendContactNotification = require('../utils/sendEmail');

// @desc    Submit contact message
// @route   POST /api/contacts
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message });

    // Send email notification (non-blocking)
    sendContactNotification({ name, email, message });

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Admin
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/contacts/:id/read
// @access  Admin
exports.markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Admin
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
