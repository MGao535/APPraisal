const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const router = express.Router();
let appraisals = require("./db.js");
let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/details", {
  useNewUrlParser: true
});

const appraisal = mongoose.model('detail', {company: String, startDate: String, endDate: String, appraisalID: Number});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.use("/", router);

router.route("/").get(function(req, res) {
  appraisals.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route('/:id').get(function(req, res){
  let company = req.params.id;
  appraisals.findOne({company}, function(err, result) {
    res.json(result);
  });
});

router.route('/update/:id').post(function(req, res){
    if (!todo){
          res.status(404).send("data is not found");
    }
    else{
      let company = req.params.id;
      appraisals.findOne({company}, function(req, res){
        appraisals.appraisals_company = req.body.company;
        appraisals.appraisals_startDate = req.body.startDate;
        appraisals.appraisals_endDate = req.body.endDate;
        appraisals.save().then(appraisals=> {
          res.json('Appraisal updated.');
        })
      });
    }
});

router.route('/add').post(function(req, res){
  //let appraisal = { company: req.body.company, startDate: req.body.startDate, endDate: req.body.endDate};
  //let newDetail = new appraisal({ company: req.body.company, startDate: req.body.startDate, endDate: req.body.endDate});
  // newDetail.save(function (err) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  // })
  // console.log(appraisal);
  // appraisals.create({appraisal}, function(err, result){
  //   if (err) throw err;
  //   console.log("1 document inserted");
  //   // db.close();
  // });
  // appraisal.create({company: req.body.company, startDate: req.body.startDate, endDate: req.body.endDate}, function (err, small){
  //       if (err) throw err;
  //   console.log("1 document inserted");
  // });
  // let app = new Document ("company", req.body.company)
  //   .append("startDate", req.body.startDate)
  //   .append("endDate", req.body.endDate);

  // appraisals.insertOne(app);
  console.log(req.body);
  //let app = new appraisal({company: req.params.company, startDate: req.params.startDate, endDate: req.params.endDate});
  appraisals.create({company: req.body.company, startDate: req.body.startDate, endDate: req.body.endDate}, function(err, result){
    if (err) throw err;
    console.log("1 document inserted");
  });
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});