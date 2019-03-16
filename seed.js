'use strict';

require('dotenv').config();

const cosmos = require('@azure/cosmos');
const client = new cosmos.CosmosClient({ endpoint: process.env.endpoint, auth: { masterKey: process.env.masterKey } });

async function addItems() {
  const dbItems = client.database('ToDoList').container('Items').items;
  const items = [
    { id: '1',
      name: 'Data Wrangling with JavaScript',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422702/others/Data-Wrangling-with-JavaScript.jpg',
      topics: ['javascript', 'data'],
    },
    { id: '2',
      name: 'Amazon Web Services in Action, 2nd Edition',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422795/others/Amazon-Web-Services-in-Action-2nd-Edition.jpg',
      topics: ['AWS', 'Cloud'],
    },
    { id: '3',
      name: 'Scaling Your Node.js Apps',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422878/others/Scaling-Your-Node.js-Apps.jpg',
      topics: ['javascript', 'node'],
    },
    { id: '4',
      name: 'Data Analysis and Visualization Using Python',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422943/others/Data-Analysis-and-Visualization-Using-Python.jpg',
      topics: ['data', 'python'],
    },
    { id: '5',
      name: 'Think Like a Data Scientist',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423012/others/Think-Like-a-Data-Scientist.jpg',
      topics: ['data'],
    },
    { id: '6',
      name: 'PHP, MySQL, JavaScript & HTML5 All-in-One For Dummies',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423090/others/PHP-MySQL-JavaScript-HTML5-All-in-One-For-Dummies.jpg',
      topics: ['php', 'mysql', 'javascript', 'html'],
    },
    { id: '7',
      name: 'Ruby Data Processing',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423188/others/1484234731.jpg',
      topics: ['ruby', 'data'],
    },
    { id: '8',
      name: 'Effective Java, 2nd Edition',
      image: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423294/others/68554c5efe76419.jpg',
      topics: ['java'],
    },
  ];
  const promises = items.map(item => dbItems.create(item));
  try {
    await Promise.all(promises);
    console.log('success');
  } catch(err) {
    console.log(err);
  }
  
}

addItems();
