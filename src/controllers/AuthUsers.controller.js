const User = require('../models/User');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Manejador de errores
const handleErrors = (err) => {
  const { message, code, errors } = err;
  let errorMessages = { email: '', password: '' };

  if (message === 'email incorrecto') {
    errorMessages.email = 'Este correo no está registrado';
  }

  if (message === 'contraseña incorrecta') {
    errorMessages.password = 'Esta contraseña no es correcta';
  }

  if (code === 11000) {
    errorMessages.email = 'El correo ya está registrado';
    return errorMessages;
  }

  if (message.includes('Validación de usuario fallida')) {
    Object.values(errors).forEach(({ properties }) => {
      errorMessages[properties.path] = properties.message;
    });
  }

  return errorMessages;
}

// Asignar una maxAge al token
const maxAge = 1 * 60 * 60 ; // 1 Hora
const newToken = (user) => {
  return jwt.sign({ user_id: user.user_id, email: user.user_email }, process.env.AGRO_TOKEN, {
    expiresIn: maxAge
  });
};

const UserSignup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    res.status(200).json({ user: user.user_id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const UserLogin_post = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const result = await User.login(user_email, user_password);
    if (result.auth) {
      const token = newToken(result.user);
      res.status(200).json({ user: result.user.user_id, token, message:'Bienvenido!' });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const UserLogout = (req, res) => {
  // El logout se manejará en el cliente eliminando el token del almacenamiento local
  res.status(200).json({ message: 'Logout successful' });
};

const UserGetusers = async (req, res, next) => {
  try {
    const AllUsers = await pool.query("SELECT * from users");
    res.json(AllUsers.rows);
  } catch (error) {
    next(error)
  }
};

const UserByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const UserbyID = await User.findByUserId(userId);
    res.json(UserbyID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkIsAuthenticated = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.AGRO_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log('No estás autenticado')
        res.status(401).json({ isAuthenticated: false });
      } else {
        res.status(200).json({ isAuthenticated: true, user: decodedToken.user_id });
      }
    });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
};

const UserLoggedIn = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.AGRO_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'No estás autenticado' });
      } else {
        const userId = decodedToken.user_id;
        const user = await User.findByUserId(userId);
        res.json(user);
      }
    });
  } else {
    res.status(401).json({ error: 'No estás autenticado' });
  }
};

const refreshToken = (req, res) => {
  const user = req.user;
  if (user) {
    const newToken = jwt.sign({ user_id: user.user_id }, process.env.AGRO_TOKEN, { expiresIn: '1h' });
    res.json({ token: newToken });
  } else {
    res.status(400).json({ error: 'User information is not available' });
  }
};

const testToken = (req, res) => {
  const user = req.user;
  if (user) {
    const newtestToken = jwt.sign({ user_id: user.user_id }, process.env.AGRO_TOKEN, { expiresIn: '24h' });
    res.json({ token: newtestToken, message:'Token de prueba generado' });
  } else {
    res.status(400).json({ error: 'User information is not available' });
  }
};

module.exports = {
    UserLogin_post,
    UserSignup_post,
    UserLogout,
    UserGetusers,
    UserByID,
    UserLoggedIn,
    checkIsAuthenticated,
    refreshToken,
    testToken
  }