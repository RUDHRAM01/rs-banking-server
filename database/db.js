const mongoose = require('mongoose');
const logger = require('pino')()

const connect = () => {

      const url = process.env.MONGO_STRING || 'url';

      mongoose.connect(url, { useNewUrlParser:true,useUnifiedTopology:true});

      mongoose.connection.once("open", async () => {
          logger.info("Connected to database");
      });

      mongoose.connection.on("error", (err) => {
          logger.error("Error connecting to database  ", err);
      });
    
}

  const disconnect = () => {

      if (!mongoose.connection) {
        return;
      }

      mongoose.disconnect();

      mongoose.once("close", async () => {
        logger.info("Diconnected  to database");
      });

  };

  module.exports = {
      connect,
      disconnect
  }
