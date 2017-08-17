/**
 * @author machengrong
 * @createTime 2017年8月15日
 */
package com.zd.admin.core.common;




/**
 * 
 * RC4算法加解密工具
 * @author crma
 */
public class RC4Util {
    
    /**
     * 字节长度
     */
    private static final int BYTE_SIZE = 256;
    
    private static class SingletonClassInstance {
		private static final RC4Util instance = new RC4Util();
	}

	public static RC4Util getInstance() {
		return SingletonClassInstance.instance;
	} 
	
	private RC4Util(){
		
	}
    
    /**
     * 
     *RC4加解密
     * @param aInput
     * @param aKey
     * @return
     */
    public String rc4(String aInput,String aKey)   
    {   
        int[] iS = new int[BYTE_SIZE];   
        byte[] iK = new byte[BYTE_SIZE];   
          
        for (int i=0;i<BYTE_SIZE;i++){
            iS[i]=i;   
        }
          
        for (short i= 0;i<BYTE_SIZE;i++)   
        {   
            iK[i]=(byte)aKey.charAt(i % aKey.length());   
        }   
          
        int j=0;   
          
        for (int i=0;i<BYTE_SIZE;i++)   
        {   
            j=(j+iS[i]+iK[i]) % BYTE_SIZE;   
            int temp = iS[i];   
            iS[i]=iS[j];   
            iS[j]=temp;   
        } 
      
        int i=0;   
        j=0;   
        char[] iInputChar = aInput.toCharArray();   
        char[] iOutputChar = new char[iInputChar.length];   
        for(short x = 0;x<iInputChar.length;x++)   
        {   
            i = (i+1) % BYTE_SIZE;   
            j = (j+iS[i]) % BYTE_SIZE;   
            int temp = iS[i];   
            iS[i]=iS[j];   
            iS[j]=temp;   
            int t = (iS[i]+(iS[j] % BYTE_SIZE)) % BYTE_SIZE;   
            int iY = iS[t];
            char iCY = (char)iY;   
            iOutputChar[x] =(char)( iInputChar[x] ^ iCY) ;     
        }   
        
        return new String(iOutputChar);   
                  
    }  
    
    /**
     * RC4加密算法
     * @param {} data 所需加密的数据 array utf-8编码
     * @param {} key 密钥
     * @return {}
     */
    public byte[] rc4(byte[] in, String key){
    	int[] seq = new int[256];//int
    	byte[] das = new byte[in.length];//code of data

    	for (int i=0; i<256; i++){
    		seq[i] = i;
    	}
    	int j = 0;
    	for (int i=0; i<256; i++){
    		j=(j+seq[i]+key.charAt(i % key.length())) % 256;
    		int temp = seq[i];
    		seq[i] = seq[j];
    		seq[j] = temp;
    	}
    	
    	for(int i=0; i<in.length; i++){
    	   //das[i] = data.charCodeAt(i);
    		das[i] = in[i];
    	}
    	int i=0;
    	j=0;
    	for(int x = 0; x < das.length; x++){
    		 i = (i+1) % 256;
    		 j = (j+seq[i]) % 256;
    		int temp = seq[i];
    		seq[i] = seq[j];
    		seq[j] = temp;
    		int k = (seq[i] + (seq[j] % 256)) % 256;
    		das[x] =(byte) (das[x] ^ seq[k]) ;
    	}
    	return das;
    }

}
