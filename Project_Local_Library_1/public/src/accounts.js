const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id  === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((firstAccount,secondAccount) => firstAccount.name.last.toLowerCase() > secondAccount.name.last.toLowerCase()? 1 : -1);
}

function numberOfBorrows(account, books) {
  let num = 0;
  books.forEach(function (book){
    book.borrows.reduce((total, borrow) => {
    console.log(borrow.id);
    if (borrow.id == account.id){
      num++;
    }
  })
  }, {});
  return num; 
}
//helper function
function getAuthorByPossessed(id, authors) { 
  return authors.find((author) => author.id == id); };

function getBooksPossessedByAccount(account, books, authors) {
  // const output = [];

  // books.filter((book)=> {
  //   book.borrows.forEach(function(borrow){
  //     if (borrow.id === account.id && borrow.returned == false){
  //       const temp = Object.assign(book, {author :getAuthorByPossessed(book.authorId, authors)});
  //       output.push(temp);
  //     }
  //   });
  // });
  // return output;

  let booksByAccount = [];
  for (let book of books){
    if (book.borrows[0].id === account.id && book.borrows[0].returned === false){
      booksByAccount.push({title: book.title, author: {name: book.authorId}});
    };
  };
  booksByAccount.map((bookObj) => {
    bookObj.author.name = findAuthorById(authors, bookObj.author.name).name;
    return bookObj;
  });
  return booksByAccount;
};
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
