const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  return !!user; // Retorna true si las credenciales coinciden, false si no.
};

public_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Nombre de usuario y contraseña son requeridos." });
  }

  if (!authenticatedUser(username, password)) {
      return res.status(401).json({ message: "Credenciales inválidas." });
  }

  // Generar el token JWT
  const token = jwt.sign({ username }, "clave_secreta", { expiresIn: "1h" });

  // Almacenar token en la sesión
  req.session.token = token;

  return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
});


//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.username;

  if (!username) {
      return res.status(401).json({ message: "Usuario no autenticado. Inicia sesión para agregar/modificar reseñas." });
  }

  if (!review) {
      return res.status(400).json({ message: "Debe proporcionar una reseña." });
  }

  // Verificar si el libro con el ISBN dado existe
  if (!books.hasOwnProperty(isbn)) {
      return res.status(404).json({ message: "Libro no encontrado." });
  }

  // Si el usuario ya ha publicado una reseña, modificarla; si no, agregar una nueva
  if (books[isbn].reviews.hasOwnProperty(username)) {
      books[isbn].reviews[username] = review;
  } else {
      books[isbn].reviews[username] = review;
  }

  return res.status(200).json({ message: "Reseña agregada/modificada exitosamente.", reviews: books[isbn].reviews });
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.username;

  if (!username) {
      return res.status(401).json({ message: "Usuario no autenticado. Inicia sesión para eliminar una reseña." });
  }

  // Verificar si el libro con el ISBN dado existe
  if (!books.hasOwnProperty(isbn)) {
      return res.status(404).json({ message: "Libro no encontrado." });
  }

  // Verificar si el usuario ha publicado una reseña para este libro
  if (!books[isbn].reviews.hasOwnProperty(username)) {
      return res.status(404).json({ message: "No se encontró una reseña para eliminar." });
  }

  // Eliminar la reseña del usuario
  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Reseña eliminada exitosamente.", reviews: books[isbn].reviews });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
