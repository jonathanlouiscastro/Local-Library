const {sortAndSlice} = require('./helper');
const {findAuthorById} = require('./books');

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let count = 0;
  books.filter((book) => {
    book.borrows.forEach((borrow) =>{
      if (borrow.returned == false) {
        count++;
      }
    });
  });
  return count;
}

function getMostCommonGenres(books) {
  const genres = [];
  let bookObj = {};
  books.forEach((book) => {
    if(bookObj[book.genre]){
      bookObj[book.genre]++;
    } else {
      bookObj[book.genre] = 1;
    }
  });
  
  for (let i = 0; i < Object.keys(bookObj).length; i++){
    genres[i] = {name: Object.keys(bookObj)[i], count: Object.values(bookObj)[i]};
    //console.log(genres);
  }
  return sortAndSlice(genres, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = [];
  for (let i = 0; i < books.length; i++){
    popularBooks[i] = {name: books[i].title, count: books[i].borrows.length};
  }
  return sortAndSlice(popularBooks, 5);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];
  for (let i = 0; i < books.length; i++) {
    const author = findAuthorById(authors, books[i].authorId);
    let authorFullName = [author.name.first, author.name.last];
    popularAuthors[i] = {name: `${authorFullName.join(' ')}`, count: books[i].borrows.length};
  }
  return sortAndSlice(popularAuthors, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
