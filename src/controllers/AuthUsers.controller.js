const User = require('../models/User');
const jwt = require('jsonwebtoken');
const pool = require('../db');

//Manejador de errores
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

//* Primero comenzaremos asignando una maxAge a nuestro token para luego generarlo y asignarlo a un usuario
const maxAge = 3 * 24 * 60 * 60;
const newToken = (user) => {
  return jwt.sign({ user_id: user.user_id, email: user.user_email }, process.env.AGRO_TOKEN, {
    expiresIn: maxAge
  });
};

//* Renderizamos el login
const UserLogin_get = (req, res) => {
    res.render('login')
    console.log('Renderizando Login')
};

//* Renderizamos el signup
const UserSignup_get = (req, res) => {
    res.render('register')
    console.log('Renderizando Register')
};


const UserSignup_post = async (req, res) => {
  try {
      const user = await User.create(req.body);
      const token = newToken(user);
      res.cookie('MyToken', token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user.user_id });
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
          res.cookie('MyToken', token, { httpOnly: false, maxAge: maxAge * 1000 });
          res.status(200).json({ user: result.user.user_id, token: token});
      } else {
          res.status(400).json({ message: result.message });
      }
  } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
  }
};


const UserLogout = (req, res) => {
    res.cookie('MyToken', '', { maxAge: 1 });
    res.redirect('/');
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
    const userId = req.params.id; // Obtener el ID del usuario de la solicitud
    const UserbyID = await User.findByUserId(userId);
    res.json(UserbyID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkIsAuthenticated = (req, res) => {
  const token = req.cookies.MyToken;
  if (token) {
    jwt.verify(token, process.env.AGRO_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log('No estás autenticado')
        res.status(401).json({ isAuthenticated: false });
      } else {
        res.status(200).json({ isAuthenticated: true });
      }
    });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
};

const UserLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.MyToken;
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    UserLogin_get,
    UserLogin_post,
    UserSignup_get,
    UserSignup_post,
    UserLogout,
    UserGetusers,
    UserByID,
    UserLoggedIn,
    checkIsAuthenticated
}