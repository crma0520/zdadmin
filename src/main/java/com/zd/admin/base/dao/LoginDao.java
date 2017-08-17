/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.base.dao;

import org.apache.ibatis.annotations.Param;

import com.zd.admin.base.bean.UserBean;

/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
public interface LoginDao {
	
	/**
	 * 验证用户是否存在
	 * @author machengrong
	 * @createTime 2017年8月15日
	 * @param account
	 * @param password
	 * @return
	 * @throws Exception
	 */
	UserBean validateUser(@Param("account")String account,@Param("password")String password) throws Exception;

}
