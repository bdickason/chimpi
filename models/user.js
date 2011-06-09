var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/chimpi');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var Stylist = new Schema({
	name	: { type: String }
});


var User = new Schema({
	email 		: { type: String, required: true, unique: true },
	firstname	: { type: String },
	lastname	: { type: String },
	date_added	: { type: Date, required: true },
	active      : { type: Number, default: 1 },
	stylists : [Stylist]    // A user can have up to 2 stylists
});

mongoose.model('User', User);
var User = mongoose.model('User');

Users = function(){};

// Get all Users
Users.prototype.getUsers = function (callback) {
	User.find({}, function (err, users) {
	    if (!err) {
		    callback(users);
	    }
	});
}; 

// Get a user by ID
Users.prototype.findById = function (id, callback) {
  User.findById(id, function (err, user) {
      if (!err) {
        callback(user);
      }
  });
};

// Get a user by E-mail
Users.prototype.findByEmail = function (email, callback) {
  User.find({ 'email': email }, function (err, user) {
      if (!err) {
        callback(user);
      }
  });
};

// Create a test user
Users.prototype.add = function (email, callback) {
  myUser = new User({ 
      'email': email,
      'firstname': 'Jane',
      'lastname': 'Doe',
      'date_added': new Date().getTime(),
      'active': '1'
      });

  myUser.save(function (err) {
      if (!err) callback('Success!');
  });
};

// Check if each user in JSON is in DB
Users.prototype.compare = function(json, callback) {
// Find a user that matches
  User.find({'email': json.email, 'firstname': json.firstname, 'lastname': json.lastname}, function(err, user) {
      console.log(json);
      if (!err) {
          callback(user);
      }
  });
};

// Get all users by Stylist
/* Users.prototype.findByStylist = function (stylist, callback) {
    User.find({'stylists.name': stylist, function (err, users) {
       if(!err) {
           callback(null, users);
       }
    });
}; */

// Check if users exist, add any that don't
/* Users.prototype.addUsers = function (json, callback) {
    
}; */

// Add a user

exports.Users = Users;