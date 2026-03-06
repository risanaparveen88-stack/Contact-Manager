import express from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact, searchContacts, toggleFavorite } from '../controllers/contactController.js';
import authentication from '../middleware/authMiddleware.js';
import { contactValidation } from '../utility/validators.js';
import validate from '../middleware/validation.js';

const router = express.Router();

router.get('/search', authentication, searchContacts);

router.route('/')
  .get(authentication, getContacts)
  .post(authentication, contactValidation, validate, createContact);

router.route('/:id')
  .get(authentication, getContactById)
  .put(authentication, updateContact)
  .delete(authentication, deleteContact);

// Custom route for the favorite feature
router.patch('/:id/favorite', authentication, toggleFavorite);

export default router;