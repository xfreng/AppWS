function postInfo(){
    var transCode = "1001";
    var data = {
        "header":{"transcode":transCode},
        "body":{
            "device":device,
            "appKey":transCode,
            "machineCode":machineCode,
            "uid":"9",
            "token":"jBm5Ev9g",
            "userName": "苏先生",
            "card": "450521199808084949",
            "income": "100",
            "userEmail": "123456@qq.com",
            "area": "湖南省,长沙市",
            "contact": "18977999999",
            "relation": "2",
            "userMarriage": "2",
            "userChsi": "2"
        }
    };
    var md5key = encryptByMd5(JSON.stringify(data)+transCode).toUpperCase();
    api.ajax({
        url: serviceUrl,
        method: 'post',
        data: {
            values: {
                "data": md5key+encryptByDES(JSON.stringify(data),secretKey)
            }
        },
        dataType: "json"
    }, function(ret, err) {
        if (ret) {
            var dataJsonEncrypt = ret.data.substring(keyLength);
            var decryptData = decryptByDES(dataJsonEncrypt,secretKey);
            api.alert({ msg: decryptData });
        } else {
            api.alert({msg:'错误信息：' + err.msg});
        }
    });
}

apiready = function () {
    
}

//mui
mui.init({
    swipeBack:true //启用右滑关闭功能
});
mui.ready(function() {
    var dataBanner = {"banners":[
        {"bannerImageUrl":"../../image/banner/banner4.jpg"},
        {"bannerImageUrl":"../../image/banner/banner1.jpg"},
        {"bannerImageUrl":"../../image/banner/banner2.jpg"},
        {"bannerImageUrl":"../../image/banner/banner3.jpg"},
        {"bannerImageUrl":"../../image/banner/banner4.jpg"},
        {"bannerImageUrl":"../../image/banner/banner1.jpg"}
    ]};
    var bannerText = doT.template($api.byId('bannerTmpl').innerHTML);
    $api.byId('slider').innerHTML = bannerText(dataBanner);

    var slider = document.getElementById('gallery');
    var group = slider.querySelector('.mui-slider-group');
    var items = mui('.mui-slider-item', group);
    // 克隆第一个节点
    var first = items[0].cloneNode(true);
    first.classList.add('mui-slider-item-duplicate');
    // 克隆最后一个节点
    var last = items[items.length - 1].cloneNode(true);
    last.classList.add('mui-slider-item-duplicate');
    // 支持循环
    var sliderApi = mui(slider).slider();
    group.classList.add('mui-slider-loop');
    group.insertBefore(last, group.firstChild);
    group.appendChild(first);
    sliderApi.refresh();
    sliderApi.gotoItem(0);
    // 轮播图片定时
    var slider = mui("#slider");
    slider.slider({
        interval : 5000 //每隔5秒调用一次
    }); 
});