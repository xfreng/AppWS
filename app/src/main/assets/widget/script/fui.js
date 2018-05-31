function encryptByMd5(message) {
	return CryptoJS.MD5(message).toString();
}

function encryptByDES(message, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}

function decryptByDES(ciphertext, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var decrypted = CryptoJS.TripleDES.decrypt({
		ciphertext : CryptoJS.enc.Base64.parse(ciphertext)
	}, keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}