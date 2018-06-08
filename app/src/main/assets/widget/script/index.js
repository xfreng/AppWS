var homeHeader = $api.byId('homeHeader');
var choiceHeader = $api.byId('choiceHeader');
var discoverHeader = $api.byId('discoverHeader');
var myHeader = $api.byId('myHeader');
var firstHeaderOffset;

var main = $api.byId('main');
var mainPos = $api.offset(main);

var footer = $api.byId('footer');
var footerPos = $api.offset(footer);

var isFirstOpen = false;
var isSecondOpen = false;
var isThirdOpen = false;
var isForthOpen = false;

function fnInitParams() {
	var keyLength = 32;
	var secretKey = "A1B2C3D4E5F6G7H8I9J0K1L2";
	var serviceUrl = "http://192.168.52.106:8034/interface/app/service";
	var fileUploadServiceUrl = "http://192.168.52.106:8034/interface/app/upload";
	var device = api.systemType;
	var machineCode = api.deviceId;
	$api.setStorage('keyLength', keyLength);
	$api.setStorage('secretKey', secretKey);
	$api.setStorage('serviceUrl', serviceUrl);
	$api.setStorage('fileUploadServiceUrl', fileUploadServiceUrl);
	$api.setStorage('device', device);
	$api.setStorage('machineCode', machineCode);
}

apiready = function () {
	homeHeader = $api.byId('homeHeader');
	choiceHeader = $api.byId('choiceHeader');
	discoverHeader = $api.byId('discoverHeader');
	myHeader = $api.byId('myHeader');

	$api.fixStatusBar($api.dom('.titlebar.activebar .topbar'));
	firstHeaderOffset = $api.offset(homeHeader);

	fixAndroidIos('#d81e06');

	var main = $api.byId('main');
	var mainPos = $api.offset(main);

	var footer = $api.byId('footer');
	var footerPos = $api.offset(footer);

	fnInitHome();
	fnInitParams();
	fnInitListener();
}

// 展示指定的frame
function showFrame(type) {
	api.setFrameAttr({
		name: type,
		hidden: false
	});
}

// ===================================
// 响应底部按钮的切换frame
// ===================================
function switchFrame(tag, type) {
	switch (type) {
		case 'home_frame':
			randomSwitchBtn(tag, 0);
			hideAllFrame();
			if (isFirstOpen) {
				showFrame('home_frame');
			} else {
				openFrameInstance('home_frame', firstHeaderOffset.h, false);
				isFirstOpen = true;
			}
			break;
		case 'choice_frame':
			randomSwitchBtn(tag, 1);
			hideAllFrame();
			if (isSecondOpen) {
				showFrame('choice_frame');
			} else {
				openFrameInstance('choice_frame', firstHeaderOffset.h, false);
				isSecondOpen = true;
			}
			break;
		case 'discover_frame':
			randomSwitchBtn(tag, 2);
			hideAllFrame();
			if (isThirdOpen) {
				showFrame('discover_frame');
			} else {
				openFrameInstance('discover_frame', firstHeaderOffset.h, false);
				isThirdOpen = true;
			}
			break;
		case 'my_frame':
			randomSwitchBtn(tag, 3);
			hideAllFrame();
			if (isForthOpen) {
				showFrame('my_frame');
			} else {
				openFrameInstance('my_frame', firstHeaderOffset.h, false);
				isForthOpen = true;
			}
			break;
		default:
			break;
	}
}

function fnInitHome() {
	isFirstOpen = true;
	// 第一次进入打开 首页
	api.openFrame({
		name: 'home_frame',
		url: './html/home_frame/home_frame_body.html',
		rect: {
			x: 0,
			y: firstHeaderOffset.h,
			w: 'auto',
			h: api.frameHeight - firstHeaderOffset.h - footerPos.h
		},
		bounces: false,
		opaque: false
	});
}

// 随意切换按钮
function randomSwitchBtn(tag, index) {
	if (tag == $api.dom('#footer li.active'))
		return;
	var eFootLis = $api.domAll('#footer li'), index = 0;
	for (var i = 0, len = eFootLis.length; i < len; i++) {
		if (tag == eFootLis[i]) {
			index = i;
		} else {
			$api.removeCls(eFootLis[i], 'active');
		}
	}
	$api.addCls(eFootLis[index], 'active');

	// 切换头部
	var lis = $api.domAll('.titlebar');
	var i = 0, len = lis.length;
	var curLi = lis[index];

	for (i; i < len; i++) {
		var thisLi = lis[i];
		if (thisLi === curLi) {
			$api.addCls(thisLi, 'activebar');
			$api.addCls(thisLi, 'activebar' + index);
			continue;
		} else {
			if ($api.hasCls(thisLi, 'activebar')) {
				$api.removeCls(thisLi, 'activebar');
				$api.removeCls(thisLi, 'activebar' + i);
			}
		}
	}

	$api.fixStatusBar($api.dom('.titlebar.activebar .topbar'));
}

function openFrameInstance(frame, marginTop, isBounce) {
	api.openFrame({
		name: frame,
		url: './html/' + frame + '/' + frame + '_body.html',
		rect: {
			x: 0,
			y: marginTop,
			w: 'auto',
			h: api.frameHeight - marginTop - footerPos.h
		},
		bounces: isBounce,
		vScrollBarEnabled: false,
		hScrollBarEnabled: false,
		delay: 200
	});
}

// 隐藏所有的一级frame
function hideAllFrame() {
	api.setFrameAttr({
		name: 'home_frame',
		hidden: true
	});
	api.setFrameAttr({
		name: 'choice_frame',
		hidden: true
	});
	api.setFrameAttr({
		name: 'discover_frame',
		hidden: true
	});
	api.setFrameAttr({
		name: 'my_frame',
		hidden: true
	});
}

function fnInitListener() {
	var flag = false;
	api.addEventListener({
		name: 'keyback'
	}, function (ret, err) {
		if (false == flag) {
			api.toast({
				msg: '再按一次返回键退出' + api.appName,
				duration: 2000,
				location: 'bottom'
			});
			flag = true;
			setTimeout(function () {
				flag = false;
			}, 2000);
		} else {
			api.closeWidget({
				silent: true
			});
		}
	});
}

function openfindmusic(){
	api.alert({msg:"in...*******123123123"});
}