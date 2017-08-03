import chalk from 'chalk';

export default (db, config) => {

  const uri = config.database.mongo.db.uri;

  // When successfully connected
  db.on('connected', (err) => {
    console.log(chalk.greenBright(`-------\nMongoDB-> connected on ${uri}\n-------`));
  });

  // When Open connection
  db.once('open', () => {
    // Plant seed
    require('./seed').default(db, config);
  });

  // If the connection throws an error
  db.on('error', err => {
    console.log(chalk.redBright(`MongoDB-> connection error: ${uri} details->${err}`));
    process.exit(-1);
  });

  // When the connection is disconnected
  db.on('disconnected', err => {
    console.log(chalk.redBright(`MongoDB-> disconnected: ${uri}`));
  });

};
