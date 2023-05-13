const axios = require('axios');
const Book = require('../models/bookModel');
 const addbook = async (book) => {
  const existingBook = await Book.findOne({ googleBooksId: book.bookId });
  if (existingBook) {
    return;
  } else {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book.bookId}?key=AIzaSyC1QE3wf2PHJeyxKkri7C3d68OC5379ksg`);

    const bookdata = response.data;

    const newbook = new Book({
      googleBooksId: bookdata.id,
      title: bookdata.volumeInfo.title,
      author: bookdata.volumeInfo.authors ? bookdata.volumeInfo.authors.join(', ') : 'N/A',
      publicationDate: bookdata.volumeInfo.publishedDate,
      isbn: bookdata.volumeInfo.industryIdentifiers ? bookdata.volumeInfo.industryIdentifiers[0].identifier : 'N/A',
      description: bookdata.volumeInfo.description ? bookdata.volumeInfo.description : '',
      genre: bookdata.volumeInfo.categories ? bookdata.volumeInfo.categories.join(', ') : 'N/A',
      coverImage: bookdata.volumeInfo.imageLinks && bookdata.volumeInfo.imageLinks.thumbnail,
      downloadLink: bookdata.accessInfo && bookdata.accessInfo.epub && bookdata.accessInfo.epub.acsTokenLink ? bookdata.accessInfo.epub.acsTokenLink : '',
      buyLink: bookdata.saleInfo && bookdata.saleInfo.buyLink ? bookdata.saleInfo.buyLink : '',
      averageRating: bookdata.volumeInfo.averageRating,
      ratingsCount: bookdata.volumeInfo.ratingsCount
    });

    await newbook.save();
    return newbook;
  }
};
module.exports =addbook