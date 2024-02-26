const insertNewUser = "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";

export default {
    insertNewUser,
    getUserById,
    getUserByEmail
}