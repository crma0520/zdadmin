/**
 * 存放js文件需要使用的全局常量定义
 */
 
// 语种切换，默认1中文，可选2“英文”
var COM_CONSTANTS_LANGUAGE = 1;

//RC4加密密钥，与后台保持一致
var COM_CONSTANTS_ENCRYPTEDKEY="B560B456-0CBB-4014-8A17-8926487A5FE4";

/*****************请求返回状态码 start********************/
//登录成功
var CONSTANTS_STATE_LOGIN_SUCCESS = '1000';
//账号锁定
var CONSTANTS_STATE_LOGIN_LOCK = '1001';
//账号注销
var CONSTANTS_STATE_LOGIN_LOGOUT = '1002';
//账号过期
var CONSTANTS_STATE_LOGIN_OVERDUE = '1003';
//密码错误
var CONSTANTS_STATE_LOGIN_PWD_ERROR = '1004';
//没有权限登录
var CONSTANTS_STATE_LOGIN_NO_ANTHORITY = '1005';
//操作成功
var CONSTANTS_STATE_SUCCESS = '1006';
//用户名或者密码不存在
var CONSTANTS_STATE_LOGIN_NOT_EXIST = '1007';
//已存在
var CONSTANTS_STATE_EXIST = '1008';
//系统错误
var CONSTANTS_STATE_ERROR = '1009';