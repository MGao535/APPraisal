const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const server = require("./app"); // load up the web server
const port = 4000; // the port to listen to for incoming requests
// call express's listen function to start listening to the port
app.use(cors());mongoose.connect('mongodb://127.0.0.1:27017/appraisals', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function(){
	console.log("MongoDB connection established.")
}) app.listen(PORT, function(){
	console.log(`Server running on port: ${port}`);
})

const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});
// a function to stop listening to the port
const close = () => {
  listener.close();
};
module.exports = {
  close: close,
};