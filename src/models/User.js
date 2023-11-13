const pool = require('../db');
const bcrypt = require('bcryptjs')

const User = {
    async create(user){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.user_password, salt);
        const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *';
        const values = [user.user_name, user.user_email, hashedPassword];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async login(user_email, user_password) {
        const query = 'SELECT * FROM users WHERE user_email = $1';
        const values = [user_email];
        const result = await pool.query(query, values);
        const user = result.rows[0];
        if (user){
            const auth = await bcrypt.compare(user_password, user.user_password);
            if (auth){
                return { auth: true, user };
            }
            return { auth: false, message: 'Contraseña incorrecta' };
        }
        return { auth: false, message: 'Email incorrecto' };
    },

    async findByUserId(user_id) {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [user_id];
        const result = await pool.query(query, values);
        return result.rows[0];
      },
};

module.exports = User;