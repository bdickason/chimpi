var cfg = require('../config/chimpi.js');    // contains API keys, etc.
var http = require('http');

Mochi = function(){};

Mochi.prototype.getUsers = function (callback) {
	
	var options = {
	  host: 'www.bloombeautylounge.com',
	  port: 80,
	  path: '/salon/api/users/?action=list&format=json&num=20&secret=' + cfg.mochi_key,
	  method: 'GET'
	};

	var mochi_req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
  
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    callback(chunk);
	  });
  	});

	mochi_req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	// 

	 mochi_req.write('data\n');
	 mochi_req.end();

}

exports.Mochi = Mochi;