/**
 * 
 */
package com.zd.admin.core.common;

import java.io.File;
import java.util.List;

/**
 * @author machengrong
 * @createtime 2017年8月8日
 */
public class Utils {
	
    public static void listRelativePathOfAllFiles(File folder, String rootPath, String suffix, List<String> list) {
        if (folder.exists() && !folder.isFile()) {
            File[] files = folder.listFiles();
            for (File file : files) {
                if (file.isFile() && file.getName().endsWith(suffix)) {
                    list.add(file.getAbsolutePath().substring(rootPath.length()).replaceAll("\\\\", "/"));
                } else if (file.isDirectory()) {
                    listRelativePathOfAllFiles(file, rootPath, suffix, list);
                }
            }
        }
    }

}
