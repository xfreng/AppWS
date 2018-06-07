var keyLength = $api.getStorage('keyLength');
var secretKey = $api.getStorage('secretKey');
var serviceUrl = $api.getStorage('serviceUrl');
var fileUploadServiceUrl = $api.getStorage('fileUploadServiceUrl');
var machineCode = $api.getStorage('machineCode');
var device = $api.getStorage('device');

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