/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.core.common;

import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * 
 * AES加密工具类
 * @author crma
 */
@Component
public final class AESUtil {
    /**
     * 加密方式
     */
    private static final String ALGORITHM = "AES";

    /**
     * 加密模式
     */
    private static final String AESTYPE = "AES/CBC/PKCS5Padding";

    /**
     * CBC模式向量
     */
    private static final String CBCTYPE = "0102030405060708";
    
    private static final int LENGTH = 16;

    private AESUtil() {

    }

    /**
     * 
     * 加密
     * @param sSrc
     * @param sKey
     * @return
     * @throws Exception
     *@author crma
     */
    public static String encrypt(final String sSrc, final String sKey) throws Exception {
        final int length = 16;
        if (sKey == null) {
            return null;
        }
        // 判断Key是否为16位
        if (sKey.length() != length) {
            return null;
        }
        final byte[] raw = sKey.getBytes("UTF-8");
        final SecretKeySpec skeySpec = new SecretKeySpec(raw, ALGORITHM);
        final Cipher cipher = Cipher.getInstance(AESTYPE);//"算法/模式/补码方式"
        //使用CBC模式，需要一个向量iv，可增加加密算法的强度
        final IvParameterSpec ivParam = new IvParameterSpec(CBCTYPE.getBytes("UTF-8"));
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ivParam);
        final byte[] encrypted = cipher.doFinal(sSrc.getBytes("UTF-8"));

        return new BASE64Encoder().encode(encrypted);//此处使用BASE64做转码功能，同时能起到2次加密的作用。
    }

    /**
     * 解密
     * 
     * @param sSrc 解密字符串
     * @param sKey 密钥
     * @return String
     * @throws Exception 异常
     */
    public static String decrypt(final String sSrc, final String sKey) throws Exception {
        final int length = 16;
        // 判断Key是否正确
        if (sKey == null) {
            return null;
        }
        // 判断Key是否为16位
        if (sKey.length() != length) {
            return null;
        }
        final byte[] raw = sKey.getBytes("ASCII");
        final SecretKeySpec skeySpec = new SecretKeySpec(raw, ALGORITHM);
        final Cipher cipher = Cipher.getInstance(AESTYPE);
        final IvParameterSpec ivParam = new IvParameterSpec(CBCTYPE.getBytes("UTF-8"));
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, ivParam);
        final byte[] encrypted1 = new BASE64Decoder().decodeBuffer(sSrc);//先用base64解密
        final byte[] original = cipher.doFinal(encrypted1);
        final String originalString = new String(original, "UTF-8");
        return originalString;
    }

    //十六進制串到字節轉換
    public static byte[] hex2byte(byte[] b) {
        if ((b.length % 2) != 0) {
            throw new IllegalArgumentException("长度不是偶数!");
        }

        byte[] b2 = new byte[b.length / 2];

        for (int n = 0; n < b.length; n += 2) {
            String item = new String(b, n, 2);
            b2[n / 2] = (byte) Integer.parseInt(item, LENGTH);
        }
        return b2;
    }

    // 從十六進制字節串生成Key
    public static SecretKeySpec getKeySpecFromBytes(String strBytes) throws NoSuchAlgorithmException {
        SecretKeySpec spec = new SecretKeySpec(hex2byte(strBytes.getBytes()), "AES");
        return spec;
    }

    public static String decryptForJS(String data, String key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
        SecretKeySpec aesKeySpec = getKeySpecFromBytes(key.toUpperCase());
        cipher.init(Cipher.DECRYPT_MODE, aesKeySpec);

        return new String(cipher.doFinal(hex2byte(data.getBytes("UTF-8"))));
    }

//    public static String getRandomHexString(int intSize) {
//        String str = "";
//        String charSet = "0123456789abcdef";
//        for (int i = 0; i < intSize * 2; i++) {
//            int intLoc = (int) Math.floor(Math.random() * charSet.length());
//            str += charSet.substring(intLoc, intLoc + 1);
//        }
//
//        return str;
//    }
//
//    //Java生成的密文用JavaScript解密
//    public static String generateAESKeyForJS(int keySize) {
//        if ((keySize != 128) && (keySize != 192) && (keySize != 128)) {
//            keySize = 256;
//        }
//        String strAESKey = getRandomHexString(keySize / 8);
//
//        return strAESKey;
//    }


}