/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.base.service.impl;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.zd.admin.base.bean.UserBean;
import com.zd.admin.base.dao.LoginDao;
import com.zd.admin.base.service.LoginService;
import com.zd.admin.core.common.Base64Util;
import com.zd.admin.core.common.Constant;
import com.zd.admin.core.common.RC4Util;
import com.zd.admin.core.common.Result;
import com.zd.admin.core.common.RetCode;

import net.sf.json.JSONObject;

/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginDao loginDao;

	@Override
	public Result toLogin(Map<String, String> map, HttpServletRequest request) throws Exception {
		Result result = new Result();
		
		byte[] info = Base64Util.decode(map.get("login"));
		String user = new String(RC4Util.getInstance().rc4(info, Constant.KEY), "utf-8");
		JSONObject jsObject = JSONObject.fromObject(user);
        UserBean userBean = (UserBean) JSONObject.toBean(jsObject, UserBean.class);
        
        UserBean validate = loginDao.validateUser(userBean.getAccount(), userBean.getPassword());
        if(null == validate){
        	result.setCode(RetCode.VALIDATE_FALSE);
        	result.setSuccess(false);
        }
        
        request.getSession().setAttribute(Constant.SESSION, validate);
		result.setCode(RetCode.SUCCESS);
		result.setSuccess(true);
		return result;
	}

}
