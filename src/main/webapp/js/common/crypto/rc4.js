/**
 * RC4加密算法
 * @param {} data 所需加密的数据 array utf-8编码
 * @param {} key 密钥
 * @return {}
 */
rc4 = function(data, key){
	var seq = Array(256);//int
	var das = Array(data.length);//code of data

	for (var i=0; i<256; i++){
		seq[i] = i;
	}
	var j=0;
	for (var i=0; i<256; i++){
		var j=(j+seq[i]+key.charCodeAt(i % key.length)) % 256;
		var temp = seq[i];
		seq[i] = seq[j];
		seq[j] = temp;
	}
	
	for(var i=0; i<data.length; i++){
	   //das[i] = data.charCodeAt(i);
		das[i] = data[i];
	}
	var i=0;
	var j=0;
	for(var x = 0; x < das.length; x++){
		var i = (i+1) % 256;
		var j = (j+seq[i]) % 256;
		var temp = seq[i];
		seq[i] = seq[j];
		seq[j] = temp;
		var k = (seq[i] + (seq[j] % 256)) % 256;
		das[x] =(das[x] ^ seq[k]) ;
	}
	//return das.join('');
	return das;
}