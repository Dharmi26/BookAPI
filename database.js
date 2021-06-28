const books = [
{
  ISBN: "12345Book",
  title: "Getting started with MERN",
  pubDate: "2021-07-07",
  language: "en",
  numPage: "250",
  author: [1, 2],
  publications: [1],
  category: ["tech", "programming", "education", "thriller"]
 },
];

const authors = [
 {
  id: 1,
  name: "Dharmi",
  books: ["12345Book"]
 },
 {
   id: 2,
   name: "Elon Musk",
   books: ["12345Book"]
 },
];

const publications = [
  {
    id: 1,
    name: "writex",
    books: ["12345Book"]
  },
];

module.exports = {books, authors, publications};
