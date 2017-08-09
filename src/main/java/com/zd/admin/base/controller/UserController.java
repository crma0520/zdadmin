/**
 * 
 */
package com.zd.admin.base.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.admin.base.service.UserService;

/**
 * 
 * @author machengrong
 * @createtime 2017Äê8ÔÂ7ÈÕ
 */
@RestController
@RequestMapping("/base/user")
public class UserController {
	
	private static final Logger LOG = Logger.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	

}
