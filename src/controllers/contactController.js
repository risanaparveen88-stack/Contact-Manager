import Contact from '../models/Contact.js';

export const getContacts = async (req, res, next) => {
  try {
    // Fetches all contacts sorted by newest first and favorites at the top
    const contacts = await Contact.find({ userId: req.user._id })
      .sort({ isFavorite: -1, createdAt: -1 });
    res.json({ success: true, count: contacts.length, contacts });
  } catch (error) { next(error); }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact || contact.userId.toString() !== req.user._id.toString()) {
      res.status(404); throw new Error('Contact not found');
    }
    res.json({ success: true, contact });
  } catch (error) { next(error); }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = { ...req.body, userId: req.user._id };
    const contact = await Contact.create(newContact);
    res.status(201).json({ success: true, contact });
  } catch (error) { next(error); }
};

export const updateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact || contact.userId.toString() !== req.user._id.toString()) {
      res.status(404); throw new Error('Contact not found');
    }
    
    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, contact });
  } catch (error) { next(error); }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact || contact.userId.toString() !== req.user._id.toString()) {
      res.status(404); throw new Error('Contact not found');
    }
    await contact.deleteOne();
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) { next(error); }
};

// ✨ Enhanced Search Feature
export const searchContacts = async (req, res, next) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      res.status(400); throw new Error('Search term is required');
    }
    const contacts = await Contact.find({
      userId: req.user._id,
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: contacts.length, contacts });
  } catch (error) { next(error); }
};

// ✨ Toggle Favorite Status Feature
export const toggleFavorite = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact || contact.userId.toString() !== req.user._id.toString()) {
      res.status(404); throw new Error('Contact not found');
    }
    contact.isFavorite = !contact.isFavorite;
    await contact.save();
    res.json({ success: true, message: contact.isFavorite ? 'Added to favorites' : 'Removed from favorites', contact });
  } catch (error) { next(error); }
};