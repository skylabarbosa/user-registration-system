const db = require("../database/db");

// Find a user using their email
async function findUserByEmail(email) {
  const query = `
    SELECT id
    FROM users
    WHERE email = ?
  `;

  const [rows] = await db.execute(query, [email]);

  return rows[0];
}

// Save a new user in the database
async function createUser(userData) {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    pincode,
  } = userData;

  const query = `
    INSERT INTO users
    (first_name, last_name, email, phone, password, pincode)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    firstName,
    lastName,
    email,
    phone,
    password,
    pincode,
  ];

  const [result] = await db.execute(query, values);

  return result;
}

// Find a user by id without exposing the hashed password
async function findUserById(id) {
  const query = `
    SELECT
      id,
      first_name AS firstName,
      last_name AS lastName,
      email,
      phone,
      pincode,
      created_at AS createdAt
    FROM users
    WHERE id = ?
  `;

  const [rows] = await db.execute(query, [id]);

  return rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
