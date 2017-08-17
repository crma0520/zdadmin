/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.base.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zd.admin.core.common.Result;

/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
public interface LoginService {
	
	/**
	 * 登录系统
	 * @author machengrong
	 * @createTime 2017年8月15日
	 * @param map
	 * @param request
	 * @return
	 * @throws Exception
	 */
	Result toLogin(Map<String, String> map,HttpServletRequest request) throws Exception;

}
