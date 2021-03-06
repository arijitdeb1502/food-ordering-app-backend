const mongoose = require('mongoose');

module.exports = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, 
          {
              useNewUrlParser: true,
              useCreateIndex: true,
              useFindAndModify: false
          }
      );
    } catch (error) {
      console.log('Database Connectivity Error', error);
      throw new Error(error);
    }
  }