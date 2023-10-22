import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/cards', (req, res) => {
  const cards = fs.readFileSync('./data/cards.json');
  res.json({ cards: JSON.parse(cards) });
});

export default router;
