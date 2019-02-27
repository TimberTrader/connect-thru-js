const settings = require('./settings');
const knex = require('knex')({
  client     : 'pg',
  connection : require('./settings')
});

let firstName = process.argv[2];
let lastName = process.argv[3];
let birthdate = process.argv[4];

knex.select('*')
    .from('famous_people')
    .then(function (result) {
      knex.insert({first_name: `${firstName}`, last_name: `${lastName}`, birthdate: `${birthdate}`})
          .into('famous_people');
      console.log(result);
  }).catch((err) => { console.log( err); throw err })
    .finally(() => {
      knex.destroy();
  });



