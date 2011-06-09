var http = require('http');
var express = require('express');
var app = express.createServer();
var Mochi = new (require('./controllers/mochi.js').Mochi);

app.configure(function(){    
    app.set('views', __dirname + '/views');
    app.register('.html', require('jade'));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router); 
});

// Initialize the models

var Users = new (require('./models/user').Users);

/*
// Add a user
app.post('/users/add', function(req, res) {
    var id = req.params.id;
    if (id) {
        res.send('Adding user with ID:' + id);
    } else {
        res.send('Sorry you didn\'t pass an ID.');
    }
});
*/

// Show all users
app.get('/users', function(req, res){
	Mochi.getUsers(function(json) {
		res.send(json);
	});
});

// Show a specific user by ID
app.get('/users/:uid?', function(req, res, next){
    var uid = req.params.uid;
    if (uid) {
		Mochi.getUserByUid(uid, function(json) {
			res.send(json);
		});
    } else {
		// Display error msg and show all users
        
    }
}); 




app.listen(3000);