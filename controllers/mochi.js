var cfg = require('../config/chimpi.js');    // contains API keys, etc.
var http = require('http');

Mochi = function(){};

// Default JSON options
var options = {
  host: 'www.bloombeautylounge.com',
  port: 80,
  path: '/salon/api/users/?format=json&secret=' + cfg.mochi_key,
  method: 'GET'
};

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

Mochi.prototype.getUsers = function (callback) {
	
	var _options = clone(options); // local copy of options
	_options.path += "&action=list&num=20";	// List 20 users
	
	getRequest(_options, callback);
}

Mochi.prototype.getUserByUid = function (uid, callback) {
	
	var _options = clone(options); // local copy of options
	_options.path += "&action=list&uid=" + uid;	// List user with id

	getRequest(_options, callback);
}

function getRequest(options, callback)
{
	var mochi_req = http.request(options, function(res) {
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

	mochi_req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	 mochi_req.write('data\n');
	 mochi_req.end();
}

exports.Mochi = Mochi;