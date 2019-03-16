'use strict';

const fs = require('fs'); // Require the fs library to read files

var html; // Set a variable outside of function in order to reuse

const getHtml = () => {console.log('hit');
  if (html) return html;
  return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/../static/index.html`, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
  });
};


module.exports.handler = async (context, req) => {console.log(process.version);
  try {
    const htmlcontent = await getHtml(); // Get the content
    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlcontent,
    };
    context.done();
  } catch (err) {
    context.log.error(err);
    context.done(err);
  }
};