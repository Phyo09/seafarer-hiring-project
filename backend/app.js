const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/home', (req, res) => {
  res.json({ welcome_message: 'Hi Frontend, Welcome to the backend!',
    people: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' }
    ]
  });
});
app.use('/api/profile', profileRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/application', applicationRoutes);

module.exports = app;
