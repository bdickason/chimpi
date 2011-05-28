var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/chimpi');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var Stylist = new Schema({
	name	: { type: String }
});


var User = new Schema({
	email 		: { type: String, required: true },
	firstname	: { type: String },
	lastname	: { type: String },
	date_added	: { type: Date, required: true },
	stylists : [Stylist]
});

mongoose.model('User', User);
var User = mongoose.model('User');

Users = function(){};

// Get all Users
Users.prototype.findAll = function (callback) {
	User.find({}, function (err, users) {
		callback(null, users);
	});
}; 

// Get a user by ID
Users.prototype.findById = function (id, callback) {
  User.findById(id, function (err, user) {
      if (!err) {
        callback(null, user);
      }
  });
};

// Get all users by Stylist

// Add a user

exports.Users = Users;