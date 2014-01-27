var args = arguments[0] || {};

$.fbButton.style = myApp.facebook.BUTTON_STYLE_WIDE;

Ti.API.info('Login screen...');

myApp.facebook.addEventListener('login', function(e){
	Ti.API.info('login event: ' + JSON.stringify(e));
});
