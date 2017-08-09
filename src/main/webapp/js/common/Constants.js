/**
 * 存放js文件需要使用的全局常量定义
 */
 
// 语种切换，默认1中文，可选2“英文”
var DGS_CONSTANTS_LANGUAGE = 1;

//登录用户权限,后台为0，前台为
var DGS_CONSTANTS_BACKGROUND_USER = 0;

var DGS_CONSTANTS_FOREGROUND_USER = 1;

//RC4加密密钥，与后台保持一致
var DGS_CONSTANTS_ENCRYPTEDKEY="B560B456-0CBB-4014-8A17-8926487A5FE4";

/*****************DM操作模块区分 start********************/
//表示分类文档库操作
var DM_CONSTANTS_CLASSIC_DOCUMENT = 1;
//表示工作文档（个人文档库）操作
var DM_CONSTANTS_WORK_DOCUMENT = 2;
/*****************DM操作模块区分 start********************/

/*****************操作前后台区分 start********************/
var CONSTANTS_OP_BACKGROUND = 1;//后台操作
var CONSTANTS_OP_FOREGROUND = 2;//前台操作
/*****************操作前后台区分 start********************/

/*****************DM类型区分 start********************/
//表示文件夹类型
var DM_CONSTANTS_FOLDER_TYPE = 1;
//表示文件类型
var DM_CONSTANTS_DOC_TYPE = 2;
/*****************DM类型区分 start********************/

/*****************策略模板区分 start********************/
var CONSTANTS_TEMPLATE_DG = 1;//加密策略模板
var CONSTANTS_TEMPLATE_FD = 2;//外发策略模板
var CONSTANTS_TEMPLATE_WORKFLOW = 3;//工作流
/*****************策略模板区分 start********************/

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
//组织机构有下级组织机构
var CONSTANTS_STATE_HAS_CHILD = '1010';
//部门下面有用户
var CONSTANTS_STATE_HAS_USER = '1011';
//删除用户的时候删的是自己
var CONSTANTS_STATE_DELETE_SELF = '1012';
//文件夹不能移动到子文件夹下
var CONSTANTS_STATE_MOVE_ERROR = '1014';
//文件未转换成功
var CONSTANTS_STATE_NO_PREVIEW_DOC= '1017';

var CONSTANTS_STATE_NO_LIC = '1018';
//存在实体文件
var CONSTANTS_STATE_EXIST_FILE = '1019';
//不存在实体文件
var CONSTANTS_STATE_NO_FILE = '1020';
//存在session
var CONSTANTS_STATE_EXIST_SESSION = '1021';
//不存在session
var CONSTANTS_STATE_NO_SESSION = '1022';
//用于判断文件级数有没有超出限制
var CONSTANTS_STATE_OUT_OF_LIMIT = '1023';
//连接出错,无法同步
var CONSTANTS_STATE_NO_CONNECTION = '1024';
//基础DN不存在,无需同步
var CONSTANTS_STATE_NO_EXISTS = '1025';
//授权数超过上限
var CONSTANTS_ACC_OUT_OF_MAX = '1027';
//每级节点超过上限（控制树节点）
var CONSTANTS_STATE_OUT_OF_LEVEL = '1028';
//存在工作流节点
var CONSTANTS_STATE_EXISTS_WORKFLOW_NODE = '1029';
//模板被应用
var CONSTANTS_STATE_TEMPLATE_USED = '1030';
//被使用
var CONSTANTS_STATE_USED = '1031';
//已存在元数据名称
var CONSTANTS_STATE_EXIST_META_NAME = '1032';
//超过图片最大值
var CONSTANTS_STATE_MAX_IMAGE_SIZE = '1033';
//有子节点
var CONSTANTS_STATE_HAVE_CHILDREN_NODE = '1034';
//没有子节点
var CONSTANTS_STATE_NO_CHILDREN_NODE = '1035';
//不允许撤销
var CONSTANTS_STATE_DO_NOT_AGREE_REVOKE = '1038';
//不存在硬件码
var CONSTANTS_STATE_NOT_EXIST_SERIALNUM = '1039';

var CONSTANTS_STATE_NOT_EXIST_DM_DATE = '1040';

var CONSTANTS_STATE_NOT_EXIST_DG_DATE = '1041';

var CONSTANTS_STATE_NOT_EXIST_MDM_DATE = '1042';

var CONSTANTS_STATE_NOT_EXIST_DGPHONE_DATE = '1043';

var CONSTANTS_STATE_LOGIN_VALIDATE_ERROR = '1044';

var CONSTANTS_STATE_LOGIN_PASSWORD_COUNT_ERROR = '1045';
//设备已被模板应用
var CONSTANTS_STATE_DEVICE_USED = '1046';

var CONSTANTS_STATE_DM_OVERDUE = '1047';

var CONSTANTS_STATE_DG_OVERDUE = '1048';

var CONSTANTS_STATE_DGPHONE_OVERDUE = '1049';

var CONSTANTS_STATE_MDM_OVERDUE = '1050';
//浏览器白名单已存在
var CONSTANTS_STATE_WHITEURL_EXIST = '1051';

var CONSTANTS_ACC_LIC_HADRDID_ERROR = '1052';

var CONSTANTS_ACC_LIC_NO_DM = '1053';

var CONSTANTS_ACC_LIC_NO_DG = '1054';

var CONSTANTS_ACC_LIC_NO_DGPHONE = '1055';

var CONSTANTS_ACC_LIC_NO_MDM = '1056';
//没有psm权限
var CONSTANTS_ACC_LIC_NO_PSM = '1057';
//不存在PSM试用开始日期
var CONSTANTS_STATE_NOT_EXIST_PSM_DATE = '1058';
//PSM试用号过期
var CONSTANTS_STATE_PSM_OVERDUE = '1059';
//没有BAK权限
var CONSTANTS_ACC_LIC_NO_BAK = '1062';
//不存在BAK试用开始日期
var CONSTANTS_STATE_NOT_EXIST_BAK_DATE = '1060';
//BAK试用号过期
var CONSTANTS_STATE_BAK_OVERDUE = '1061';
/*****************请求返回状态码 end********************/

/*****************DM前台模块类型 start********************/
//分类文件库
var CONSTANTS_MODULE_CLASSIC_DOCUMENT = 'classicDocument';
//热门标签
var CONSTANTS_MODULE_TOP_LABEL = 'topLabel';
//个人收藏夹
var CONSTANTS_MODULE_PERSONAL_FAVORITES = 'personalFavorites';
//工作文档
var CONSTANTS_MODULE_WORK_DOCUMENT = 'workDocument';
//回收站
var CONSTANTS_MODULE_RECYCLE = 'recycle';
//归档记录
var CONSTANTS_MODULE_FILE_RECORD = 'fileRecord';
//申请记录
var CONSTANTS_MODULE_APPLICATION_RECORD = 'applicationRecord';
/*****************DM前台模块类型 end********************/

/*****************安全控制权限名称 start********************/
var CONSTANTS_ACL_AUTHORIZE = 'authorize';
var CONSTANTS_ACL_CREATE = 'create';
var CONSTANTS_ACL_EDIT = 'edit';
var CONSTANTS_ACL_DELETE = 'delete';
var CONSTANTS_ACL_VERSION_UPDATE = 'versionUpdate';
var CONSTANTS_ACL_PERVIEW = 'perview';
var CONSTANTS_ACL_DOWNLOAD = 'download';
var CONSTANTS_ACL_AUTOARCHIVE = 'autoArchive';
/*****************安全控制权限名称 end********************/
