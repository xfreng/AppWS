function openNewWindow(type) {
	api.openWin({
		name : type,
		url : './' + type + '.html',
		pageParam : {
			name : type
		},
		bounces : false,
		delay : 200
	});
}

function openLogin() {
	api.openWin({
		name : 'login',
		url : './login_header.html',
		bounces : false,
		delay : 200
	});
}

function showAction() {
	api.actionSheet({
		title : '上传头像',
		cancelTitle : '取消',
		buttons : ['拍照', '从手机相册选择']
	}, function(ret, err) {
		if (ret) {
			getPicture(ret.buttonIndex);
		}
	});
}

function getPicture(sourceType) {
	if (sourceType == 1) {// 拍照
		//获取一张图片
		api.getPicture({
			sourceType : 'camera',
			encodingType : 'png',
			mediaValue : 'pic',
			allowEdit : false,
			quality : 90,
			saveToPhotoAlbum : true
		}, function(ret, err) {
			// 获取拍照数据并处理
			if (ret) {
				var imgSrc = ret.data;
				if (imgSrc != "") {
					uploadFile(imgSrc);
					var ele = $api.dom('#avatar');
					$api.attr(ele, 'src', imgSrc);
				}
			}
		});
	} else if (sourceType == 2) {// 从相机中选择
		//UIMediaScanner 是一个多媒体扫描器，可扫描系统的图片、视频等多媒体资源
		var obj = api.require('UIMediaScanner');
		obj.open({
			//返回的资源种类,picture（图片）,video（视频）,all（图片和视频）
			type : 'picture',
			//（可选项）图片显示的列数，须大于1
			column : 4,
			max : 1,
			//（可选项）图片排序方式,asc（旧->新）,desc（新->旧）
			sort : {
				key : 'time',
				order : 'desc'
			},
			//（可选项）模块各部分的文字内容
			texts : {
				stateText : '已选择*项',
				cancelText : '取消',
				finishText : '完成'
			},
			styles : {
				bg : '#fff',
				mark : {
					icon : '',
					position : 'bottom_right',
					size : 20
				},
				nav : {
					bg : '#eee',
					stateColor : '#000',
					stateSize : 18,
					cancleBg : 'rgba(0,0,0,0)',
					cancelColor : '#000',
					cancelSize : 18,
					finishBg : 'rgba(0,0,0,0)',
					finishColor : '#000',
					finishSize : 18
				}
			}
		}, function(ret) {
			// 获取图片数据并处理
			if (ret) {
				if (getJsonObjLength(ret.list) != 0) {
					uploadFile(ret.list[0].path);
				}
			}
		});
	}
}

function getJsonObjLength(jsonObj) {
	var length = 0;
	for (var item in jsonObj) {
		length++;
	}
	return length;
}

function uploadFile(filePath) {
	var data = {
		transCode : "8083"
	};
	api.ajax({
		timeout : 100,
		url : fileUploadServiceUrl,
		method : 'post',
		data : {
			values : data,
			files : {
				"file" : filePath
			}
		},
		dataType : "json"
	}, function(ret, err) {
		if (ret) {
			var dataJsonEncrypt = ret.data.substring(keyLength);
			var decryptData = decryptByDES(dataJsonEncrypt, secretKey);
			var ele = $api.dom('#avatar');
			$api.attr(ele, 'src', decryptData.body.imageURL);
			api.alert({
				msg : decryptData
			});
		} else {
			var dataJsonEncrypt = err.data.substring(keyLength);
			var decryptData = decryptByDES(dataJsonEncrypt, secretKey);
			api.alert({
				msg : decryptData
			});
		}
	});
}