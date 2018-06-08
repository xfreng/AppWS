var keyLength = $api.getStorage('keyLength');
var secretKey = $api.getStorage('secretKey');
var serviceUrl = $api.getStorage('serviceUrl');
var fileUploadServiceUrl = $api.getStorage('fileUploadServiceUrl');
var machineCode = $api.getStorage('machineCode');
var device = $api.getStorage('device');

function fnReady() {
    fnReadyKeyback();
    fnReadyHeader();
    fnReadyNav();
}

function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function() {
            api.closeWin();
        };
    }

    api.parseTapmode();
}

function fixAndroidIos(color) {
    switch (color) {
        case 'darkgray':
            color = "#303247"
            break;
        case 'black':
            color = "#000000"
            break;
        case 'white':
            color = "#FFFFFF"
            break;
        case 'green':
            color = "#01b980"
            break;
        default:
            color = color
    }
    api.setStatusBarStyle({
        style: 'light',
        color: color
    });
    var header = document.querySelector('header');
    $api.fixIos7Bar(header);
    $api.fixStatusBar(header);
}

function fnOpenNewWin(elId) {
    var target = document.getElementById(elId);
    var winName = $api.attr(target, 'win'),
        winUrl = $api.attr(target, 'url'),
        isNeedLogin = $api.attr(target, 'login'),
        param = $api.attr(target, 'param');

    if (isNeedLogin && !$api.getStorage('accessToken')) {
        winName = 'login';
    }

    if (param) {
        param = JSON.parse(param);
    }
    api.openWin({
        name: winName,
        url: winUrl,
        pageParam: param,
        bounces: false,
        delay: 200
    });
}

function fnReadyOpenWin() {
    var buttons = $api.domAll('.open-win');
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'highlight');
        buttons[i].onclick = function() {
            var target = $api.closest(event.target, '.open-win');
            var winName = $api.attr(target, 'win'),
                winUrl = $api.attr(target, 'url'),
                isNeedLogin = $api.attr(target, 'login'),
                param = $api.attr(target, 'param');

            if (isNeedLogin && !$api.getStorage('accessToken')) {
                winName = 'login';
            }

            if (param) {
                param = JSON.parse(param);
            }

            api.openWin({
                name: winName,
                url: winUrl,
                pageParam: param,
                bounces: false,
                delay: 200
            });
        };
    }
    api.parseTapmode();
}

var header, headerHeight = 0;
function fnReadyHeader() {
    header = $api.byId('header');
    if (header) {
        $api.fixIos7Bar(header);
        headerHeight = $api.offset(header).h;
    }
}

var nav, navHeight = 0;
function fnReadyNav() {
    nav = $api.byId('nav');
    if (nav) {
        navHeight = $api.offset(nav).h;
    }
}