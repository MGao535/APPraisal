const mongoose = require('mongoose');

// let db = mongoose.connect("mongodb://192.168.1.71:27017/reactcrud", function(err, response){
// 	if(err){console.log('Failed to connect to ' + db);}
// 	else{
// 		console.log('Connected to ' + db, ' + ', response);
// 	}
// });

const User = new mongoose.Schema({

});

mongoose.model("User", User);

const details = new mongoose.Schema({
	ID: Number,
	appraisalID: Number,
	company: String,
	startDate: String,
	endDate: String,
	maturityLevel: Number,
	location: String,
	contactName: String,
	contactInfo: String,
	preAppraisalStart: String,
	preAppraisalFinish: String,
	readinessReviewStart: String,
	readinessReviewFinish: String,
	appraisalTrainingStart: String,
	appraisalTrainingFinish: String,
	confirmed: Boolean,
	note: String

});

module.exports = mongoose.model("details", details);

// module.exports =db;  