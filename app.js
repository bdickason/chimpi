var http = require('http');
var express = require('express');
var app = express.createServer();

app.configure(function(){    
    app.set('views', __dirname + '/views');
    app.register('.html', require('jade'));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router); 
});

// Initialize controllers
var Mochi = new (require('./controllers/mochi.js').Mochi);  // Connections to Mochi API
var Mailchimp = new (require('./controllers/mailchimp.js').Mailchimp)   // Connections to Mailchimp API
var Chimpi = new (require('./controllers/chimpi.js').Chimpi);   // Core app functionality (login, etc)

// Initialize models
var Users = new (require('./models/user').Users);

// Start route handling

// Homepage - Ask user to login
app.get('/', function(req, res) {
    
});

/* CHIMPI */
// Show all Chimpi users
app.get('/users', function(req, res) {
	Users.getUsers(function(json) {
		res.send(json);
	});
});

// Find a Chimpi user by E-mail
app.get('/users/email/:email?', function(req, res) {
    var email = req.params.email;
    if(email) {
    	Users.findByEmail(req.params.email, function(json) {
    		res.send(json);
    	});
	}
});


// Add a user to Chimpi
app.get('/users/add/:email?', function(req, res) {
    var email = req.params.email;
    if(email) {
        Users.add(email, function(json) {
            res.send(json);
        });
    }
});

// Check if Mochi users are in the DB
app.get('/compare', function(req, res) {
   // Stub Mochi Data
   fakeMochiUsers = {
       "active":1,
       "email":"blah@blah.com",
       "firstname":"Jane",
       "lastname":"Doe",
       "date_added":"2011-06-09T14:46:45.144Z"
    };
   
   Users.compare(fakeMochiUsers, function(json) {
        res.send(json);
    });
});

/* MOCHI */

// Show all Mochi users
app.get('/users/mochi', function(req, res) {
	Mochi.getUsers(function(json) {
		res.send(json);
	});
});

// Show a specific user by ID
app.get('/users/mochi/:uid?', function(req, res, next) {
    var uid = req.params.uid;
    if (uid) {
		Mochi.getUserByUid(uid, function(json) {
			res.send(json);
		});
    } else {
		// Display error msg and show all users
        
    }
}); 

/* MAILCHIMP */

// Show all Mailchimp users
app.get('/users/mailchimp', function(req, res) {
	Mailchimp.getUsers(function(json) {
		res.send(json);
	});
});

// Show a specific Mailchimp user by ID
app.get('/users/mailchimp/:uid?', function(req, res, next) {
    var uid = req.params.uid;
    if (uid) {
		Mailchimp.getUserByUid(uid, function(json) {
			res.send(json);
		});
    } else {
		// Display error msg and show all users
        
    }
});

// Show all Mailchimp users
app.get('')

app.listen(3000);