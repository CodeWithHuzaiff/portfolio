const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getContacts, markAsRead, deleteContact } = require('../controllers/contactController');
const protect = require('../middleware/auth');

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  submitContact
);

router.get('/', protect, getContacts);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContact);

module.exports = router;
