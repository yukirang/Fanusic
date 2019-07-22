const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/* returns a promise, can use then and catch method */
// mongoose.connect(db);

/* while async/await makes it cleaner */
const connnectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connnectDB;
