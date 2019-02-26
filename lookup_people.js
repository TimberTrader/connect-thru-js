const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client( {
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  // client.query(`SELECT * FROM famous_people`, (err, result) => {
    const queryPerson = `SELECT id, first_name, last_name, birthdate
                          FROM famous_people
                            WHERE first_name = '${process.argv[2]}';`
  client.query(queryPerson, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach(function(person) {
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`);
      });
    client.end();
  });
});


