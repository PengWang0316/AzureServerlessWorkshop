'use strict';

const fs = require('fs'); // Require the fs library to read files
const axios = require('axios');
const Mustache = require('mustache'); // Template library.

var html; // Set a variable outside of function in order to reuse

const getHtml = () => {
  if (html) return html;
  return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/../static/index.html`, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
  });
};

const fetchBooks = () => axios.get(process.env.FETCH_BOOKS_API);

module.exports.handler = async (context, req) => {
  try {
    const htmlcontent = await getHtml(); // Get the content
    const books = await fetchBooks();

    const returnHtml = Mustache.render(htmlcontent, {
      books: books.data,
      searchAPI: process.env.SEARCH_BOOKS_API,
    });

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
      body: returnHtml,
    };
    context.done();
  } catch (err) {
    context.log.error(err);
    context.done(err);
  }
};
