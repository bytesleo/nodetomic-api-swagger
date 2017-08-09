import mongoose from 'mongoose';
import config from '../../config';

// mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
// Connect to database
// mongoose.connect(config.database.mongo.db.uri, config.database.mongo.db.options);
mongoose.connect(config.database.mongo.db.uri, { useMongoClient: true });
// Status connection
require('./status').default(mongoose.connection, config);
