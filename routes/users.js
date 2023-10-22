import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/users', (req, res) => {
  const users = fs.readFileSync('./data/users.json');
  res.json({ users: JSON.parse(users) });
});

router.get('/users/:id', (req, res) => {
  const users = fs.readFileSync('./data/users.json');
  const { id } = req.params;
  const user = JSON.parse(users).find((item) => item._id === id);
  if (!user) {
    res.status(404).json({ message: 'ID de usuario no encontrado' });
  } else {
    res.json({ user });
  }
});

export default router;
