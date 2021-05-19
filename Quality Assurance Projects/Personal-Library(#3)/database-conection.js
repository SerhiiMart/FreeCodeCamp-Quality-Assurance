require('dotenv').config();
const mongoose = require('mongoose');

await mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", (error) => console.log("Database is unable to connect: ", error));
db.on("connected", () => console.log("Database is successfuly connected"));

module.exports = db;