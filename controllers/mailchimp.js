// Mailchimp - Handles all connectivity to Mochi API

var http = require('http');
var cfg = require('../config/config.js');    // contains API keys, etc.

Mailchimp = function(){};

// Default JSON options
var options = {
  host: 'www.mailchimp.com',
  port: 80,
  path: '/salon/api/users/?format=json&secret=' + cfg.mailchimp_key,
  method: 'GET'
};

Mailchimp.prototype.getUsers = function (callback) {
	
	var _options = clone(options); // local copy of options
    // Update with Mailchimp API path
    // _options.path += "&action=list&num=20";	// List 20 users
	
	getRequest(_options, callback);
}

Mailchimp.prototype.getUserByUid = function (uid, callback) {
	
	var _options = clone(options); // local copy of options
	// Update with Mailchimp API path
    // _options.path += "&action=list&uid=" + uid;	// List user with id

	getRequest(_options, callback);
}

function getRequest(options, callback)
{
	var _req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
		console.log(options.path);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		console.log(chunk);
	    callback(chunk);
	
		// Check for chunk to be complete
		
	  });
  	});

	_req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	_req.write('data\n');
	_req.end();
}

exports.Mailchimp = Mailchimp;

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}