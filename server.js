import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/dbConfig/dbConfig.js';
import { errorHandler, notFound } from './src/middleware/errorHandling.js';
import authRoute from './src/routes/authRoutes.js';
import contactRoute from './src/routes/contactRoutes.js';

dotenv.config();

// Connect to Database (Will execute when you add your MongoDB URL later)
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/contacts', contactRoute);

// Welcome / Health Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ConnectHub API. Server is live!' });
});

// Middleware for handling errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});