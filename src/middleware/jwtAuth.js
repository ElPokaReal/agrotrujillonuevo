import jwt from 'jsonwebtoken'
import {jwtSecretAg} from '../config.js'

function jwtAuth(req, res, next) {
  const token = req.headers.authorization; // Obtén el token del encabezado de la solicitud

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const authHeader = token.split(' ')[1];
    const decodedToken = jwt.verify(authHeader, jwtSecretAg); // Verifica y decodifica el token

    // Realiza cualquier acción adicional con los datos del token decodificado
    req.userId = decodedToken.userId;

    next(); // Pasa al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default jwtAuth;