// Consulta para registrar un nuevo usuario
export const registerQuery = `
  INSERT INTO users (user_name, user_email, user_password)
  VALUES ($1, $2, $3)
  RETURNING *
`;

// Consulta para verificar si un usuario ya existe con el mismo correo electrónico
export const isRegistered = `
  SELECT * FROM users
  WHERE user_email = $1
`;