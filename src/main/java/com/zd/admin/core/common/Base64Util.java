/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.core.common;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * BASE64 工具类
 * @author crma
 *
 */
public final class Base64Util {

    /** 
     * base64加密字符串. 
     *  
     * @param oldStr 
     * @return 
     */
    
    public static String encode(byte[] oldStr) throws Exception{
        return new BASE64Encoder().encode(oldStr);
        //return encoder.encode(oldStr); // 统一使用utf-8编码
    }
    
    public static String encode(String oldStr) throws Exception{
        return new BASE64Encoder().encode(oldStr.getBytes("utf-8")); // 统一使用utf-8编码
    }
    
    public static byte[] decode(String s) throws Exception{
    	return new BASE64Decoder().decodeBuffer(s);
    	
    }
    
    public static byte[] decode(InputStream in) throws Exception{
        return new BASE64Decoder().decodeBuffer(in);
        
    }


    /** 
     * base64编码输入流. 
     * @param inputStream 输入流 
     * @param outputStream 输出流 
     * @throws IOException 
     */
    public static void encode(InputStream inputStream, OutputStream outputStream) throws IOException {
        new BASE64Encoder().encode(inputStream, outputStream);
        inputStream.close();
        outputStream.close();
    }

    /** 
     * base64解密输入流. 
     * @param inputStream 
     * @param outputStream 
     * @throws IOException 
     */
    public static void decode(InputStream inputStream, OutputStream outputStream) throws IOException {
        new BASE64Decoder().decodeBuffer(inputStream, outputStream);
        inputStream.close();
        outputStream.close();
    }
}
