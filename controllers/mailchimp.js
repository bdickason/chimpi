// Mailchimp - Handles all connectivity to Mochi API

var http = require('http');
var cfg = require('../config/config.js');    // contains API keys, etc.

var chimpServer = cfg.mailchimp_key.substr(-3, 3);

Mailchimp = function(){};

// Default JSON options
var options = {
  host: chimpServer + ".api.mailchimp.com",
  port: 80,
  path: '/1.3/?output=json&apikey=' + cfg.mailchimp_key,
  method: 'GET'
};

Mailchimp.prototype.getLists = function (callback) {

    var _options = clone(options);
    
    _options.path += "&method=lists";
    
    console.log(_options);
        
    getRequest(_options, callback);
    
}

Mailchimp.prototype.getUsers = function (listId, callback) {
	
	var _options = clone(options); // local copy of options
    
    _options.path += "&method=listMembers&id="+ listId;;	// List all users in this list
	
	console.log(_options);
	
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
    var tmp = "";
	var _req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  

	  
	  res.on('data', function (chunk) {
		console.log(tmp);
		tmp += chunk;
	    // callback(chunk);
	
		// Check for chunk to be complete
		
	  });
	  
	  res.on('end', function(e) {
             console.log("reached the end");
             console.log(tmp);
             callback(tmp);

         });
      
  	});

	_req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

   
    
	_req.write('data\n');
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