import Card from '../models/cards.js';

export const getCards = async (req, res) => {
  try {
    const cardsList = await Card.find();
    return res.send({ data: cardsList });
  } catch (err) {
    return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const postCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    return res.send({ data: newCard });
  } catch (err) {
    if (err.name === 'ValidatorError') {
      return res.status(400).send({ message: 'se pasaron datos incorrectos' });
    }
    return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const cardId = req.params._id;
    const selectedCard = await Card.findById(cardId).orFail();
    if (selectedCard.owner.valueOf() === req.user._id) {
      const deletedCard = await Card.findByIdAndRemove(cardId);
      return res.send({ data: deletedCard });
    }
    return res.status(403).send({ message: 'No tienes permiso para borrar esta carta' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado la carta' });
    }
    return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send({ data: likedCard });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado la carta' });
    }
    return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const dislikedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send({ data: dislikedCard });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado la carta' });
    }
    return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};
