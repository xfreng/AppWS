function goback() {
	api.closeWin({
		name: 'login'
	});
}

apiready = function () {
	var header = $api.byId('header');
	fixAndroidIos('#d81e06');
	var headerPos = $api.offset(header);
	api.openFrame({
		name: 'login_body',
		url: './login.html',
		rect: {
			x: 0,
			y: headerPos.h,
			w: 'auto',
			h: 'auto'
		},
		pageParam: {
			name: 200
		},
		bounces: false,
		opaque: false,
		delay: 200
	});
};