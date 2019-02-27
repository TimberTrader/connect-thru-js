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

knex.select('*')
    .from('famous_people')
    .then(function (result) {
      knex.insert({first_name: 'Tim', last_name: 'Bowes', birthdate: '1961-06-25'})
          .into('famous_people');
      console.log(result);
  }).catch((err) => { console.log( err); throw err })
    .finally(() => {
      knex.destroy();
  });



