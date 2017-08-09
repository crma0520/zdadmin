/**  
*  
*  Base64 encode / decode  
*  
*  @author guxinxin  
*  
*/   
      
function Base64() {   
      
    // private property   
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";   
	
	//解码，传入的参数的Array类型，对字符串编码时，先将字符串编码为utf8数组
	 // public method for encoding   
    this.encode = function (input) {   
        var output = "";   
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;   
        var i = 0;   
        while (i < input.length) {   
            chr1 = input[i++];   
            chr2 = input[i++];   
            chr3 = input[i++];   
            enc1 = chr1 >> 2;   
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);   
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);   
            enc4 = chr3 & 63;   
            if (isNaN(chr2)) {   
                enc3 = enc4 = 64;   
            } else if (isNaN(chr3)) {   
                enc4 = 64;   
            }   
            output = output +   
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +   
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);   
        }   
        return output;   
    }   
      
    // public method for decoding   
    this.decode = function (input) {   
        var output = [ ]; 
        var chr1, chr2, chr3;   
        var enc1, enc2, enc3, enc4;   
        var i = 0;   
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");   
        while (i < input.length) {   
            enc1 = _keyStr.indexOf(input.charAt(i++));   
            enc2 = _keyStr.indexOf(input.charAt(i++));   
            enc3 = _keyStr.indexOf(input.charAt(i++));   
            enc4 = _keyStr.indexOf(input.charAt(i++));   
            chr1 = (enc1 << 2) | (enc2 >> 4);   
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);   
            chr3 = ((enc3 & 3) << 6) | enc4;   
            output.push(String.fromCharCode(chr1));   
            if (enc3 != 64) {   
                output.push(String.fromCharCode(chr2));  
            }   
            if (enc4 != 64) {   
                output.push(String.fromCharCode(chr3));   
            }   
        }   
        return output;   
    }   
}