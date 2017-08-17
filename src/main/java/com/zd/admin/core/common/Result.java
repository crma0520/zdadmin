/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.core.common;

import java.util.HashMap;
import java.util.Map;

/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
public class Result {
	
    public static final int ARRAY_SIZE = 10;
    
    private Map<String, Object> result = new HashMap<String, Object>(ARRAY_SIZE);
    
    public void setCode(String code){
    	this.result.put("code", code);
    }
    
    public String getCode(){
    	Object code = this.result.get("code");
    	if(null == code){
    		return null;
    	}else{
    		return String.valueOf(code);
    	}
    }
    
    public void setSuccess(Boolean success){
    	this.result.put("success", success);
    }
    
    public Boolean getSuccess(){
    	Object success = this.result.get("success");
    	if(null == success){
    		return false;
    	}else{
    		return (Boolean)success;
    	}
    }
    
    public void setObject(String key,Object o){
    	this.result.put(key, o);
    }
    
    public Object getObject(String key){
    	return this.result.get(key);
    }
    
    public Map<String, Object> returnResult(){
    	return this.result;
    }

}
