var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/chimpi');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var Stylist = new Schema({
	name	: { type: String }
});


var User = new Schema({
    mochi_uid   : { type: Number, required: true, unique: true },
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

// take mochi user json and stick it into mongo
Users.prototype.add = function (mochi_json, callback) {
    // Split first + last names, only go once to prevent:  [Nick, Van, Dusseldorfer]
    _json = JSON.parse(mochi_json);
    
    var errors = ""
    
    _json.forEach(function(user) {
        
        name = user.name.split(" ", 2); // Separate first/last names
        console.log(name[0] + " " + name[1]);
   
        var myUser = new User({ 
            'mochi_uid': user.uid, 
            'email': user.email,
            'firstname': name[0],
            'lastname': name[1],
            'date_added': new Date().getTime(),   // Date_added is now.
            'active': '1' // All Mochi users are active unless deactivated by Mailchimp
            });
        
        myUser.save(function (err) {
            console.log("Saving: " + myUser.firstname + + " " + myUser.lastname + "\n");
            
            if (!err) {
               errors += "Success! Added: " + myUser.firstname + " " + myUser.lastname + "\n";
           }
           else {
               // Handle errors
               errors += "Error! Couldn't add: " + myUser.firstname + " " + myUser.lastname + " " + err + "\n";              
           }
        }); 
    
      });
      

      callback(errors);
           
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