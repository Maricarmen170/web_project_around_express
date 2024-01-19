import User from '../models/users.js';

export const getUsers = async (req, res) => {
  try {
    const userList = await User.find();
    res.send({ data: userList });
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const getUser = await User.findById(userId).orFail();
    res.send({ data: getUser });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado un usuario con ese ID' });
    }
  }
  return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
};

export const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.send({ data: newUser });
  } catch (err) {
    if (err.name === 'ValidatorError') {
      return res.status(400).send({ message: 'se pasaron datos incorrectos' });
    }
  }
  return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
};

export const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updateUser = await User
      .findByIdAndUpdate(req.user._id, { name, about }, { new: true }).orFail();
    return res.send({ data: updateUser });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado un usuario con ese ID' });
    }
  }
  return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User
      .findByIdAndUpdate(req.user._id, { avatar }, { new: true }).orFail();
    return res.send({ data: updateAvatar });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado un usuario con ese ID' });
    }
  }
  return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
};
