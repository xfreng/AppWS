function openLoginmore() {
    api.openFrame({
        name: 'loginmore',
        url: './loginmore.html',
        rect: {
            x: 0,
            y: headerHeight,
            w: 'auto',
            h: 'auto'
        },
        bounces: false,
        delay: 200
    });
}

apiready = function () {
    // 可以运行，但是会有明显卡顿
    var bottomHeight = $api.dom('.bottom').offsetHeight;
    var formHeight = $api.dom('form').offsetHeight;
    var loginmore = $api.dom('.loginmore').offsetHeight;

    headerHeight = api.pageParam.name;

    var bottomdivider = $api.dom('#bottomdivider');
    bottomdivider.style.height = api.frameHeight - bottomHeight - formHeight - loginmore - 43 + 'px';

    $api.attr($api.byId("loginBtn"), "disabled", true);
};