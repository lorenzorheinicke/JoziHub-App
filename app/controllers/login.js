var args = arguments[0] || {};

function parseFBLogin(callback){
	myApp.parse.setupFacebook(myApp.facebook.appid);
	
	myApp.parse.facebookLogin({
		permissions: ['email']
	}, function(data){
		if(data.user){
			Ti.API.info('data.user: ' + JSON.stringify(data.user));
		}
		
		Ti.API.info('parse.currentUser: ' + myApp.parse.currentUser);
		console.log('callback: ' + typeof callback);
		
		if(typeof callback === 'undefined'){
			alert('hello');
			return;
		} else {
		//	callback();	
		}
		
	});
}

function parseRESTFBLogin(callback){
	var client = Ti.Network.createHTTPClient({timeout:5000});
	
	client.onload = function(e){
		Ti.API.info('onload: ' + this.responseText);
		Ti.API.info('status: ' + this.status + '\nstatustext: ' + this.statusText);
		
		Ti.API.info('parse.currentUser: ' + myApp.parse.currentUser);
		console.log('callback: ' + typeof callback);
		
		if(typeof callback === 'undefined'){
			alert('hello');
			return;
		} else {
		//	callback();	
		}
		
		callback();
	};
	
	client.onerror = function(e){
		Ti.API.info("onerror: " + JSON.strinigfy(e));
	};
	
	client.open('POST','https://api.parse.com/1/users');
	
	var authData = {authData: {
			"facebook": {
				id: myApp.facebook.uid,
				access_token: myApp.facebook.accessToken,
				expiration_date: myApp.facebook.expirationDate	
			}
		}
	};
	
	client.setRequestHeader("X-Parse-Application-Id","5J3HfUVCwzRgCLSNYI86fLmSLowAxKJhiBj2xqWO");
	client.setRequestHeader("X-Parse-REST-API-Key", "cskMYRCr6TCdRWfYL1PFHmzA4yYTTluAipAz2w2F");
	client.setRequestHeader("Content-Type", "application/json");
	
	client.send(JSON.stringify(authData));
}

$.fbButton.style = myApp.facebook.BUTTON_STYLE_WIDE;

Ti.API.info('Login screen...');

myApp.facebook.addEventListener('login', function(e){
	Ti.API.info('login event: ' + JSON.stringify(e));
	
	if(e.success){
		//Login Parse and Link Facebook with currentuser
		/*parseFBLogin(function(){
			var menuView = Alloy.createController('menu').getView();
			menuView.open({
				animated: true,
				fullscreen: true
			});	
		});  */
		
		parseRESTFBLogin();
		
	} else if(e.error){
		alert(e.error);
	} else if(e.cancelled){
		alert('Cancelled');
	}
});

$.login.addEventListener('app:closelogin', function(e){
	$.login.close();
});
