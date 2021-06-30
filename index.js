const express = require("express");
const mongoose = require("mongoose");
// Database
const database = require("./database");

//change
// Initialization
const booky = express();

//Configuration
booky.use(express.json());

//Establish connection for Database
mongoose.connect(
  "mongodb+srv://Dharmi:yqnHL8G5@kvysbB@mydata.p4vcm.mongodb.net/Booky?retryWrites=true&w=majority",
  {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
  }
).then(() => console.log("connection established!!"));
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /language
Description     Get specific books based on category
Access          PUBLIC
Parameter       language
Methods         GET
*/
booky.get("/l/:language", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.language.includes(req.params.language));

    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No book found for the language of ${req.params.language}`,
      });
    }

    return res.json({ book: getSpecificBook });
});

/*
Route           /authors
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/authors", (req, res) => {
  return res.json({ authors: database.authors });
});

/*
Route           /author
Description     get specific author based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/author/:name", (req, res) => {
  const getSpecificAuthor = database.authors.filter(
    (author) => author.name.includes(req.params.name));

    if (getSpecificAuthor.length === 0) {
      return res.json({
        error: `No Author found for the name of ${req.params.name}`,
      });
    }

    return res.json({ authors: getSpecificAuthor });
});

/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publications });
});

/*
Route           /publication
Description     get specific Publications
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/publication/:name", (req, res) => {
  const getSpecificPublication = database.publications.filter(
    (publication) => publication.name.includes(req.params.name));

    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No Publication found for the name of ${req.params.name}`,
      });
    }

    return res.json({ publications: getSpecificPublication });
});

/*
Route           /publication/book
Description     get all publications based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
  const getSpecificPublication = database.publications.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No publication found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ publications: getSpecificPublication });
});

/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", (req, res) =>{
  const { newBook } = req.body;
  database.books.push(newBook)
  return res.json({ books: database.books });
});

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req, res) =>{
  const { newAuthor } = req.body;
  database.authors.push(newAuthor)
  return res.json({ authors: database.authors });
});

/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add", (req, res) =>{
  const { newPublication } = req.body;
  database.publications.push(newPublication)
  return res.json({ publications: database.publications });
});

/*
Route           /book/update/title
Description     update book title
Access          PUBLIC
Parameter       NONE
Methods         PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      book.title = req.body.newBookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorsId", (req, res) => {
 //update book Database
 database.books.forEach((book) => {
   if(book.ISBN === req.params.isbn){
     return book.author.push(parseInt(req.params.authorsId));
   }
 });

 //update author Database

 database.books.forEach((author) => {
   if(author.id === parseInt(req.params.authorsId)){
     return author.books.push(req.params.isbn)
   }
 });

 return res.json({books: database.books, authors: database.authors});
});

/*
Route           /book/update/author
Description     update author name
Access          PUBLIC
Parameter       name
Methods         PUT
*/

booky.put("/book/update/author/:name", (req, res) => {
  database.authors.forEach((author) => {
    if(author.name === req.params.name){
      author.name = req.body.newAuthorName;
      return;
    }
  });

  return res.json({ authors: database.authors });
});

/*
Route           /book/update/publication
Description     update publication name
Access          PUBLIC
Parameter       name
Methods         PUT
*/

booky.put("/book/update/publication/:name", (req, res) => {
  database.publications.forEach((publication) => {
    if(publication.name === req.params.name){
      publication.name = req.body.newPublicationName;
      return;
    }
  });

  return res.json({ publications: database.publications });
});

/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {

 //update the publication Database
 database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });

  return res.json ({
    books: database.books,
    publications: database.publications,
  });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );

  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.authors = newAuthorList;
      return;
    }
  });

  // update the author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      const newBooksList = author.books.filter(
        (book) => book !== req.params.isbn
      );

      author.books = newBooksList;
      return;
    }
  });

  return res.json({
    message: "author was deleted!!!!!!😪",
    book: database.books,
    author: database.authors,
  });
});

/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});

booky.listen(2000, () => console.log("HEy server is running! 😎"));
