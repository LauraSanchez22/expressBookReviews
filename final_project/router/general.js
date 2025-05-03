const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({ books: JSON.stringify(books, null, 2) });});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

    // Verificar si el ISBN existe en el objeto de libros
    if (books.hasOwnProperty(isbn)) {
        return res.status(200).json({ book: books[isbn] });
    } else {
        return res.status(404).json({ message: "Libro no encontrado." });
    }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
    const matchingBooks = Object.values(books).filter(book => book.author === author);

    if (matchingBooks.length > 0) {
        return res.status(200).json({ books: matchingBooks });
    } else {
        return res.status(404).json({ message: "No se encontraron libros de este autor." });
    }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const matchingBooks = Object.values(books).filter(book => book.title === title);

  if (matchingBooks.length > 0) {
      return res.status(200).json({ books: matchingBooks });
  } else {
      return res.status(404).json({ message: "No se encontraron libros con este título." });
  }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

    // Verificar si el libro con el ISBN dado existe
    if (books.hasOwnProperty(isbn)) {
        return res.status(200).json({ reviews: books[isbn].reviews });
    } else {
        return res.status(404).json({ message: "No se encontraron reseñas para este ISBN." });
    }

});


const axios = require('axios');

async function getBooks() {
    try {
        const response = await axios.get('https://web.postman.co/workspace/My-Workspace~6a0bc69d-28cd-4853-83c0-42e69328475c/request/44647415-84043eca-f47d-475d-855d-e750b8e353ce/api/books');
        console.log("Lista de libros:", response.data);
    } catch (error) {
        console.error("Error al obtener los libros:", error.message);
    }
}

async function getBookByISBN(isbn) {
  try {
      const response = await axios.get(`https://web.postman.co/workspace/My-Workspace~6a0bc69d-28cd-4853-83c0-42e69328475c/request/44647415-84043eca-f47d-475d-855d-e750b8e353ce/api/books/isbn/${isbn}`);
      console.log("Detalles del libro:", response.data);
  } catch (error) {
      console.error("Error al obtener el libro:", error.message);
  }
}

async function getBooksByAuthor(author) {
  try {
      const response = await axios.get(`https://web.postman.co/workspace/My-Workspace~6a0bc69d-28cd-4853-83c0-42e69328475c/request/44647415-84043eca-f47d-475d-855d-e750b8e353ce/api/books/author/${author}`);
      console.log("Libros encontrados:", response.data);
  } catch (error) {
      console.error("Error al obtener los libros:", error.message);
  }
}

async function getBooksByTitle(title) {
  try {
      const response = await axios.get(`https://web.postman.co/workspace/My-Workspace~6a0bc69d-28cd-4853-83c0-42e69328475c/request/44647415-84043eca-f47d-475d-855d-e750b8e353ce/api/books/title/${title}`);
      console.log("Detalles del libro:", response.data);
  } catch (error) {
      console.error("Error al obtener el libro:", error.message);
  }
}

getBooks();
getBookByISBN("1234567890");
getBooksByAuthor("Jane Austen");
getBooksByTitle("One Thousand and One Nights");
module.exports.general = public_users;
