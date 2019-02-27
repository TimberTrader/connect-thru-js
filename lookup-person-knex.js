const settings = require('./settings');
const knex = require('knex')({
  client     : 'pg',
  connection : {
    host    : settings.hostname,
    user    : settings.user,
    password: settings.password,
    database: settings.database,
    port    : settings.port,
    ssl     : settings.ssl
  }
});

let input = process.argv[2];

knex.from('famous_people').select()
    .where('first_name', 'LIKE', `${input}`)
    .then((rows) => {
        for (person of rows) {
            console.log(`${person['id']}: ${person['first_name']} ${person['last_name']}, born "${person['birthdate']}"`);
        }
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        knex.destroy();
    });


// result.forEach(person => {
  //  .where(process.argv[2]);
  // });