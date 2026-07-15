<<<<<<< HEAD
﻿require('dotenv').config();
=======
require('dotenv').config();
>>>>>>> 61eeb18 (Complete)
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const talentRoutes = require('./routes/talentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const path = require('path');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// anyone who knows the filename can download any submission file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/submissions', submissionRoutes);

<<<<<<< HEAD
// Health check
app.get('/', (req, res) => res.send('Task Pipeline API is running...'));
=======
// Global error handler
app.use((err, req, res, next) => {
  const isUploadRejection = err.message && err.message.includes('File upload rejected');
  const status = isUploadRejection ? 400 : (err.status || 500);
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});
>>>>>>> 61eeb18 (Complete)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/* test pr 2*/