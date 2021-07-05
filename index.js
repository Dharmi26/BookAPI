require("dotenv").config();

//Frame work
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database");

//Models
const BookModel = require("./book");
const AuthorModel = require("./author");
const PublicationModel = require("./publication");

//change
// Initialization
const booky = express();

//Configuration
booky.use(express.json());

//Establish connection for Database
mongoose
  .connect( process.env.MONGO_URL,{
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
booky.get("/", async(req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json({ books: getAllBooks });
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", async(req, res) => {

const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  };

  return res.json({ books: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category", async(req, res) => {

const getspecificBooks = await BookModel.findOne({
  category:  req.params.category,
});

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBook });
});

/*
Route           /language
Description     Get specific books based on category
Access          PUBLIC
Parameter       language
Methods         GET
*/
booky.get("/l/:language", async(req, res) => {
  const getspecificBooks = await BookModel.findOne({
    language:  req.params.language,
  });

    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No book found for the language of ${req.params.language}`,
      });
    }

    return res.json({ books: getSpecificBook });
});

/*
Route           /authors
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/authors", async(req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});

/*
Route           /author
Description     get specific author based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/author/:name", async(req, res) => {
  const getspecificAuthor = await BookModel.findOne({
    name:  req.params.name,
  });

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
booky.get("/author/book/:isbn", async(req, res) => {
  const getspecificAuthor = await BookModel.findOne({
    isbn:  req.params.isbn,
  });

    if (getSpecificAuthor.length === 0) {
      return res.json({
        error: `No author found for the book isbn of ${req.params.isbn}`,
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
booky.get("/publications", async(req, res) => {
  const getAllPublications = await BookModel.find();
  return res.json({ publications: getAllPublications });
});

/*
Route           /publication
Description     get specific Publications
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/publication/:name", async(req, res) => {
  const getSpecificPublication = await BookModel.findOne({
    name:  req.params.name,
  });

    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No publication found for the name of ${req.params.name}`,
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
booky.get("/publication/book/:isbn", async(req, res) => {
  const getSpecificPublication = await BookModel.findOne({
    isbn:  req.params.isbn,
  });

    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No publication found for the isbn of ${req.params.isbn}`,
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

   BookModel.create(newBook);

    return res.json({ message: "book was added!" });
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

  AuthorModel.create(newAuthor);

    return res.json({ message: "author was added!" });
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

  PublicationModel.create(newPublication);

    return res.json({ message: "publication was added!" });
});

/*
Route           /book/update/title
Description     update book title
Access          PUBLIC
Parameter       NONE
Methods         PUT
*/
booky.put("/book/update/title/:isbn", async(req, res) => {
 const updateBook = await BookModel.findOneAndUpdate(
   {
     ISBN: req.params.isbn,
   },
   {
     title: req.body.newBookTitle,
   },
   {
     new: true,
   }
 );

  return res.json({ books: updateBook });
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorsId", async(req, res) => {
 //update book Database

const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn,
  },
  {
    $addToSet: {
      authors: req.body.newAuthor,
    },
  },
  {
    new: true,
  },
);

 // database.books.forEach((book) => {
 //   if(book.ISBN === req.params.isbn){
 //     return book.author.push(parseInt(req.params.authorsId));
 //   }
 // });

 //update author Database

 const updatedAuthor = await BookModel.findOneAndUpdate(
   {
     id: req.params.newAuthor,
   },
   {
     $addToSet: {
       books: req.body.isbn,
     },
   },
   {
     new: true,
   },
 );

 // database.books.forEach((author) => {
 //   if(author.id === parseInt(req.params.authorsId)){
 //     return author.books.push(req.params.isbn)
 //   }
 // });

 return res.json({books: updatedBook, authors: updatedAuthor});
});

/*
Route           /book/update/author
Description     update author name
Access          PUBLIC
Parameter       name
Methods         PUT
*/

booky.put("/book/update/author/:name", async(req, res) => {
  const updateAuthor = await BookModel.findOneAndUpdate(
    {
      name: req.params.name,
    },
    {
      $addToSet: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

   return res.json({ books: updateAuthor});
});

/*
Route           /book/update/publication
Description     update publication name
Access          PUBLIC
Parameter       name
Methods         PUT
*/

booky.put("/book/update/publication/:name", async(req, res) => {
  const updatePublication = await BookModel.findOneAndUpdate(
    {
      name: req.params.name,
    },
    {
      $addToSet: {
        publications: req.body.newPublication,
      },
    },
    {
      new: true,
    }
  );

   return res.json({ books: updatePublication});
});

/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn", async(req, res) => {

 //update the publication Database

 const updatedBook = await BookModel.findOneAndUpdate(
   {
     isbn: req.params.isbn,
   },
   {
     $addToSet: {
       publications: req.body.newBook,
     },
   },
   {
     new: true,
   }
 );

  // update the book database

  const updatedPublication = await BookModel.findOneAndUpdate(
    {
      name: req.params.newBook,
    },
    {
      $addToSet: {
        books: req.body.isbn,
      },
    },
    {
      new: true,
    }
  );

   return res.json({ books: updatedBook, publications: updatedPublication});
  });

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
booky.delete("/book/delete/:isbn", async (req, res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });
  return res.json({ books: updatedBookDatabase });
 });
/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", async(req, res) => {
  // update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          authors: parseInt(req.params.authorId),
        },
      },
      {
        new: true
      }
    );
  // update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: parseInt(req.params.authorId),
      },
      {
        $pull: {
          books: req.params.isbn,
        },
      },
      {
         new: true
      }
    );
  return res.json({
    message: "author was deleted!!!!!!😪",
    book: updatedBook,
      author: updatedAuthor,
  });
});

/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", async(req, res) => {
  // update publication database

  const updatedPublication = await BookModel.findOneAndDelete(
    {
      isbn: req.params.isbn,
    },
    {
      $pull: {
        publications: parseInt(req.params.pubId),
      },
    },
    {
      new: true,
    }
  );

  // update book database
  const updatedBook = await BookModel.findOneAndDelete(
    {
      name: parseInt(req.params.newBook),
    },
    {
      $pull: {
        books: req.body.isbn,
      },
    },
    {
      new: true,
    }
  );

   return res.json({ books: updatedBook, publications: updatedPublication});
});

booky.listen(2000, () => console.log("HEy server is running! 😎"));
