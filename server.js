// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors =require('cors')
require('dotenv').config();

// Initialize app and middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User and Report schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const reportSchema = new mongoose.Schema({
  description: String,
  location: String,
  file: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model('User', userSchema);
const Report = mongoose.model('Report', reportSchema);

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Authentication routes
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = generateToken(user);
    res.json({ id: user._id, token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send('Username already exists');
    } else {
      console.error('Error registering:', error);
      res.status(500).send('Error registering');
    }
  }
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = generateToken(user);
    res.json({ id: user._id, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

// Report routes
app.post('/report', upload.single('file'), async (req, res) => {
  const { description, location, userId } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    const report = new Report({ description, location, file, userId });
    await report.save();
    res.status(201).send('Report submitted');
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).send('Error submitting report');
  }
});

app.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().populate('userId','username');
    res.json(reports);
  } catch (error) {
    console.error('Error loading reports:', error);
    res.status(500).send('Error loading reports');
  }
});

app.delete('/report/:id', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).send('Report deleted');
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).send('Error deleting report');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
