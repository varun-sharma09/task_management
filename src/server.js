const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// MongoDB connection
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ code: 500, status: 'Error', message: 'Internal server error' });
  });
  
  // 404 Not Found handler
  app.use((req, res) => {
    res.status(404).json({ code: 404, status: 'Error', message: 'Not Found' });
  });

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
