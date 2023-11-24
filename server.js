const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Use your MongoDB Atlas connection string here
const atlasConnectionUri = 'mongodb+srv://mukesh:1234@cluster0.uxmvbz7.mongodb.net/1st';

// Set 'strictQuery' to false to address the deprecation warning
mongoose.set('strictQuery', false);

mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/cars', require('./routes/car'));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ... (other routes and middleware can be added as needed)
