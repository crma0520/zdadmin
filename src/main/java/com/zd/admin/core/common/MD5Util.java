/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.core.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

/**
 * 采用MD5加密解密
 * @author guxinxin
 * @datetime 2015-9-8
 */
public class MD5Util {

    /**
     * 日志
     */
    private static final Logger LOG = Logger.getLogger(MD5Util.class);

    private static final int BUFF_SIZE = 10240;

    private static final int MD5_BYTE_LEN = 16;

    private MessageDigest md5Impl;

    /**
     * 
     * //TODO 添加类/接口功能描述
     * @author crma
     * 创建日期 : 2016-3-11
     */
    private static class SingletonClassInstance {
        private static final MD5Util INSTANCE = new MD5Util();
    }

    private MD5Util() {
        try {
            md5Impl = MessageDigest.getInstance("MD5");
        } catch (Exception e) {
            LOG.error("初始化MD5失败", e);
        }
    }

    public static MD5Util getInstance() {
        return SingletonClassInstance.INSTANCE;
    }

    /**
     * 
     * md5加密
     * @param file 文件
     * @return
     *@author crma
     *创建日期 : 2015-9-8
     */
    public String md5(File file) {

        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(file);
            byte[] buffer = new byte[BUFF_SIZE];
            int length;
            while ((length = fileInputStream.read(buffer)) != -1) {
                md5Impl.update(buffer, 0, length);
            }

            return bin2Hex(md5Impl.digest());
        } catch (Exception e) {
            return null;
        } finally {
            try {
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 
     * MD5加密
     * @param in 输入流
     * @return
     *@author crma
     *创建日期 : 2015-9-8
     */
    public String md5(InputStream in) {

        try {
            byte[] buffer = new byte[BUFF_SIZE];
            int length;
            while ((length = in.read(buffer)) != -1) {
                md5Impl.update(buffer, 0, length);
            }

            return bin2Hex(md5Impl.digest());
        } catch (Exception e) {
            return null;
        } finally {
            IOUtils.closeQuietly(in);
        }
    }

    /**
     * 
     * MD5加密
     * @param in 输入流
     * @return
     *@author crma
     *创建日期 : 2015-9-8
     */
    public String md5(byte[] buff) {

        byte[] md5Bytes = md5Impl.digest(buff);
        return bin2Hex(md5Bytes);
    }

    /**
     * 
     * MD5加密
     * @param str 字符串
     * @return
     *@author crma
     *创建日期 : 2015-9-8
     */
    public String md5(String str) throws Exception {
        // 统一使用UTF-8编码
        byte[] md5Bytes = md5Impl.digest(str.getBytes("utf-8"));
        return bin2Hex(md5Bytes);
    }

    private String bin2Hex(byte[] md5Bytes) {
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++) {
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < MD5_BYTE_LEN) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();
    }
}
