import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users.js';
import cards from './routes/cards.js';

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(`error connecting  ${err}`);
  });
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65a8c9d24e594e2a88899015',
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.get('/', (req, res) => {
  res.status(500).send({ message: 'An error has ocurred on the server' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
