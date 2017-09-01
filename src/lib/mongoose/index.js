import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../../config';

const uri = config.mongoose.uri;
const opts = config.mongoose.options;

mongoose.Promise = global.Promise;

export async function connect() {

    try {
        let conn = await mongoose.connect(uri, opts);

        // Events
        conn.on('disconnected', (err) => {
            console.log(chalk.redBright(`MongoDB-> disconnected: ${uri}`));
            connect();
        });

        conn.on('reconnected', (err) => {
            console.log(chalk.greenBright(`MongoDB-> reconnected: ${uri}`));
        });

        // Success
        console.log(chalk.greenBright(`-------\nMongoDB-> connected on ${uri}\n-------`));

        // Plant seed
        require('./seed').default(conn, config);

    } catch (err) {
        console.log(chalk.redBright(`MongoDB-> connection error: ${uri} details->${err}`));
        process.exit(-1);
    }

}