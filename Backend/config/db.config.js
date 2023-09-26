module.exports = {
    url: "mongodb://127.0.0.1:27017/willypov"
  };
  
  const mongoose = require('mongoose');
  
  const connect_db = async function (mongo_url = process.env.MONGO_URI) {
      try {
          await mongoose.connect(mongo_url);
          console.log('DB connected');
      } catch (error) {
          console.error(error);
          process.exit(1);
      }
  }
  
  module.exports = connect_db;