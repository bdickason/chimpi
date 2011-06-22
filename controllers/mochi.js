// Mochi - Handles all connectivity to the Mochi API

var cfg = require('../config/config.js');    // contains API keys, etc.
var http = require('http');

Mochi = function(){};

// Default JSON options
var options = {
  host: 'www.bloombeautylounge.com',
  port: 80,
  path: '/salon/api/users/?format=json&secret=' + cfg.mochi_key,
  method: 'GET'
};

Mochi.prototype.getUsers = function (callback) {
	
	var _options = clone(options); // local copy of options
	_options.path += "&action=list&num=5000";	// List all users
	
	getRequest(_options, callback);
}

Mochi.prototype.getUserByUid = function (uid, callback) {
	
	var _options = clone(options); // local copy of options
	_options.path += "&action=list&uid=" + uid;	// List user with id

	getRequest(_options, callback);
}

function getRequest(options, callback)
{
    var tmp = "";
    
	var _req = http.request(options, function(res) {
//	  console.log('STATUS: ' + res.statusCode);
//	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  

	  
	  res.on('data', function (chunk) {
		tmp += chunk;
		
	    // callback(chunk);
	
		// Check for chunk to be complete
		
	  });
	  
	  res.on('end', function(e) {
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

exports.Mochi = Mochi;

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}