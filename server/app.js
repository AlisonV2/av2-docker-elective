const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const Goal = require('./models/goal');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/goals', async (req, res) => {
  console.log('Trying to fetch goals...');
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log('Goals fetched!');
  } catch (err) {
    console.error('Oops... something went wrong');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load goals.' });
  }
});

app.post('/goals', async (req, res) => {
  console.log('Trying to store goals');
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log('Your input is invalid');
    return res.status(422).json({ message: 'Invalid goal text.' });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } });
    console.log('Stored a new goal successfully!');
  } catch (err) {
    console.error('Nope... That didn\'t work');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save goal.' });
  }
});

app.delete('/goals/:id', async (req, res) => {
  console.log('Trying to delete a goal...');
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Goal deleted!!' });
    console.log('Goal deleted');
  } catch (err) {
    console.error('Something went wrong');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
});

mongoose.connect(
  'mongodb://av2:secret@mongodb:27017/admin?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('MongoDB does not want you!');
      console.error(err);
    } else {
      console.log('Now, Mongo and you can be great friends!');
      app.listen(80);
    }
  }
);
