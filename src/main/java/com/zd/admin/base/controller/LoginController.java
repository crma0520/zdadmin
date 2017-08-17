/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.base.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.zd.admin.base.service.LoginService;
import com.zd.admin.core.common.Result;
import com.zd.admin.core.common.RetCode;

/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
@RestController
public class LoginController {
	
	private static final Logger LOG = Logger.getLogger(LoginController.class);
	
	@Autowired
	private LoginService loginService;
	/**
	 * 系统登录
	 * @author machengrong
	 * @createTime 2017年8月15日
	 * @param map
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/sys/login",method=RequestMethod.POST)
	public Map<String, Object> toLogin(@RequestBody Map<String, String> map,
			HttpServletRequest request){
		Result result = new Result();
		try{
			result = loginService.toLogin(map, request);
		}catch(Exception e){
			result.setCode(RetCode.FALSE);
			result.setSuccess(false);
			LOG.error("登录失败", e);
		}
		return result.returnResult();
	}
	
	
	@RequestMapping(value="/{main}")
	public ModelAndView toMain(@PathVariable("main")String main){
		ModelAndView view = new ModelAndView();
		view.setViewName("main/" + main);
		return view;
	}

}
