
 
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;

public class FileSystem {
    //public static final String path = "D:\\OneDrive\\java\\java笔记";
    public static final String path = "D:\\OneDrive\\java相关\\笔记\\notebook(new)";
    public static final String[] excludeDir = new String[]{".git","notebook_asset",".idea"};

    public static void main(String[] args) throws IOException {
        File f = new File(path);// 指定文件位置
        ArrayList<MDClass> mdClasses = new ArrayList<>();        // 获取所有文件
        ArrayList<String> mdSidebar = new ArrayList<>();          // 获取侧边栏字符串
        tree(f, 1, mdClasses,mdSidebar);
        // 转成无限极分类的样式
        ArrayList<MDClass> list = tree2(mdClasses, "");

        /**
         * 生成目录json
         */
        genderJson(list);

        /**
         * 生成_sidebar.md
         */
        genderSidebar(mdSidebar);
    }

    private static void genderSidebar(ArrayList<String> mdSidebar) throws IOException {
        String str = "";
        for (String s : mdSidebar) {
            str += s +"\r\n";
        }
        // 复制目录文件
        copyContent( path + "\\_sidebar.md", path + "\\_sidebar_old_" + String.valueOf(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) + ".md");

        // 输出到目录文件
        File file = new File(path + "\\_sidebar.md");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(str.getBytes());
        fos.flush();
        fos.close();
    }

    private static void genderJson(ArrayList<MDClass> list) throws IOException {
        // 使用JSON对象 将JSON字符串反序列化为JavaBean
        ObjectMapper om=new ObjectMapper();
        String json = om.writeValueAsString(list);
        System.out.println(json);



        // 复制目录文件
        copyContent( path + "\\content.json", path + "\\content_old_" + String.valueOf(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) + ".json");

        // 输出到目录文件
        File file = new File(path + "\\content.json");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(json.getBytes());
        fos.flush();
        fos.close();
    }



    private static void copyContent( String fromPath, String goPath) throws IOException {
        File fromFile = new File(fromPath);
        //如果文件不存在则创建文件
        if (!fromFile.exists()) {
            fromFile.createNewFile();
        }
        File goFile = new File(goPath);
        //如果文件不存在则创建文件
        if (!goFile.exists()) {
            goFile.createNewFile();
        }

        //创建输入流，读取fromFile
        InputStream in = new FileInputStream(fromFile);

        //创建输入流，写入到goFile
        OutputStream out = new FileOutputStream(goFile);

        byte[] buf = new byte[2048];
        int i = 0;
        while ((i = in.read(buf)) != -1) {
            out.write(buf, 0, i);
            out.flush();
        }
        out.close();
        in.close();
        System.out.println("文件复制结束！！！");
    }


    private static ArrayList<MDClass> tree2(ArrayList<MDClass> list, String parentPath) {
        ArrayList<MDClass> newlist = new ArrayList<>();
        Iterator<MDClass> iterator = list.iterator();
        while (iterator.hasNext()) {
            MDClass mdClass = iterator.next();
            if (mdClass.getParentUrl().equals(parentPath)) {
                newlist.add(mdClass);
                tree2(list, mdClass.getUrl());
            }
        }

        for (MDClass mdClass : newlist) {
            ArrayList<MDClass> children = new ArrayList<>();
            for (MDClass obj : list) {
                if (obj.getParentUrl().equals(mdClass.getUrl())) {
                    children.add(obj);
                }
            }
            mdClass.setChildren(children);
        }
        return newlist;

    }

    private static void tree(File f, int level, ArrayList<MDClass> list, ArrayList<String> mdSidebar) {
        ArrayList<MDClass> mdClasses = new ArrayList<>();
        File[] childs = f.listFiles();
        for (int i = 0; i < childs.length; i++) {

            String space = "";
            for (int i1 = 0; i1 < level-1; i1++) {
                space += "  ";
            }

            File child = childs[i];
            String name = child.getName();
            String url = child.getAbsolutePath().replace(path, "").replace("\\", "/");
            if (child.isDirectory()) {
                if (!Arrays.asList(excludeDir).contains(child.getName())) {
                    mdSidebar.add(space +  "*  "+child.getName());
                    list.add(new MDClass(Math.random() + "", child.getName(), url, "2", mdClasses, child.getParent().replace(path, "").replace("\\", "/")));
                    tree(child, level + 1, list,  mdSidebar);
                }
            } else {
                if (name.endsWith(".md") && !name.startsWith("_sidebar") && !name.startsWith("_navbar")) {
                    String label = child.getName().replace(".md", "");
                    String mdUrl = "*  [" + label + "](" + url + ")";
                    mdSidebar.add(space + mdUrl);

                    list.add(new MDClass(Math.random() + "", label, url, "1", mdClasses, child.getParent().replace(path, "").replace("\\", "/")));

                }
            }

        }
    }
}



