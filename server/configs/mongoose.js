/**
 * Mongoose configuration
 *
 * @author Oscar Elf
 * @version 1.0.0
 */

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Establishes a connection to a database
 *
 * @returns {Promise} - Resolves to this if connection succeeded
 */
module.exports.connect = async () => {
  try {
    // Bind connection to events (to get notifications)
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connection is open.');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected.');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log(
          'Mongoose connection is disconnected due to application termination.'
        );
        process.exit(0);
      });
    });

    // Connect to the server
    return mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    mongoose.connection.on('error', (error) => {
      console.error(`Mongoose connection error has occurred: ${error}`);
    });
  }
};
