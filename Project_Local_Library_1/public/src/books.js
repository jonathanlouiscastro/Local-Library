function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id);
}

function findBookById(books, id) {
  return books.find((book) => book.id ==id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];

  const returned = books.filter((book) => {
    if (book.borrows[0].returned == false) {
    borrowed.push(book);
    } else {
      return book;
    }
  });

  return [borrowed, returned];
};

function getBorrowersForBook(book, accounts) {
  let count = 0; 
  const output = [];
  accounts.map((account) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id && count < 10) {
        (borrow.returned === true) ? Object.assign(account, {returned: true}) : null
        count++;
        output.push(account);
      }});
  });
  return output; 
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
