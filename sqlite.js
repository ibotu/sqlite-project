const sqlite3 = require('sqlite3').verbose();
const axios = require('axios')

let db = new sqlite3.Database('openregister.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
  
let sql = `SELECT id as id, name as name from company limit 10`;

let headers = {

}

db.each( sql,(err, row) => {
    if (err) {
        throw err
    }
    let data = []
    data = {
        'id': row.id,
        'name': row.name
    }
    console.log(data)

    //axios.put('http://localhost:9200/test')
    let url = 'http://localhost:9200/test/_doc/'+row.id
    console.log(url);
    axios.put(url , data, {headers: {'content-type': 'application/json'}} )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });    
});


  
db.close()
