import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: [true, 'Please add a contact name'], trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  
  // ✨ Custom Pro Features Added Here
  company: { type: String, trim: true, default: "" },
  jobTitle: { type: String, trim: true, default: "" },
  profileImage: { type: String, default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  isFavorite: { type: Boolean, default: false },
  
  tags: { type: [String], default: [] },
  notes: { type: String, trim: true, default: "" }
}, { timestamps: true });

// Indexes for super-fast search
contactSchema.index({ userId: 1, name: 1, company: 1 });

export default mongoose.model('Contact', contactSchema);