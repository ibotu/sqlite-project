// first import module
//import sqlite3

// require it in file
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('openregister.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
  
  db.serialize(() => {
    db.each(`SELECT id as id,
                    name as name
             FROM company LIMIT 10`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  