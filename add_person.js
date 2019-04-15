const settings = require('./settings');
const knex = require('knex')({
  client     : 'pg',
  connection : require('./settings')
});

let firstName = process.argv[2];
let lastName = process.argv[3];
let birthdate = process.argv[4];

knex('famous_people')
    .insert({first_name: `${firstName}`, last_name: `${lastName}`, birthdate: `${birthdate}`})
    .then(function (result) {
      return knex('famous_people').select()
    }).then((response) => {
      console.log(response)
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
      knex.destroy();
  });