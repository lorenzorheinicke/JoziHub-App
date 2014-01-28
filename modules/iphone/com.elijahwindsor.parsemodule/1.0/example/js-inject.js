var tiSocket = require('ti-socket-io');	
var io;
var contexts = [];
var contextsToAdd = [];

exports.connect = function(config, defaultCallback) {
	var server = config.server; 
	var port = config.port; 

	io = tiSocket.connect('http://' + server + ':' + port + '/');

	var evalJs = function(js) {
		eval(js);
	}

	var reconnect = false;
	io.on('connect', function() {
		// if this is a reconnect, tell the server which contexts already exist
		if(reconnect) {
			for(var i = 0; i < contexts.length; i++) {
				var curContext = contexts[i]; 

				io.emit('context added', curContext);
			}
		} else {
			for(var i = 0; i < contextsToAdd.length; i++) {
				var curContextToAdd = contextsToAdd[i];

				exports.addContext(curContextToAdd.contextName, curContextToAdd.callback);
			}
		}
		reconnect = true;
	});
	io.on('default javascript', function(js) {
		try {
			//evalJs(js);
			//evalJs.call(defaultContextObject, js);
			defaultCallback(filterJs(js), io);
		} catch(err) {
			exports.log(err);
		}
	});

	//io.emit('ready');
} 

// replace console.log with io.emit
function filterJs(js) {	
	js = 'var io = arguments[1]; var console = { log: function(data) { io.emit("log", data); } };' + js;
//	js = js.replace(/console\.log\(/g, "arguments[1].emit('log',");

	return js;
}

exports.addContext = function(contextName, callback) {
	if(!io) {
		contextsToAdd.push({
			contextName: contextName, 
			callback: callback
		});
		return;
	}

	contexts.push(contextName);

	io.emit('context added', contextName);

	io.on(contextName + ' javascript', function(js) {
		try {
			callback(filterJs(js), io);
		} catch(err) {
			exports.log(err);
		}
	});
}

exports.log = function(data) {
	io.emit('log', data);		
}
