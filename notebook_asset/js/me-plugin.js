// 添加打赏模块开始 ==================================================================================================================
docsify.plugins.push(
    // 首页打赏
    function (hook) {
      hook.beforeEach(function (html) {
        var href = location.hash.split("?")
        // 首页不用管
        if (href[0] && href[0] == "#/") {
          console.log("首页打赏插件加载完成");
          return html +
              "<br><br><p></p><details>\n" +
              "<summary><p style=\"display:inline-block\"> \uD83C\uDF85 如果觉得本文档对你有帮助，或者是单纯的想鼓励我，欢迎打赏~谢谢您的支持 ❤️ </p></summary>\n" +
              "<table>\n" +
              "<thead>\n" +
              "<tr>\n" +
              "<th>支付宝</th>\n" +
              "<th>微信</th>\n" +
              "</tr>\n" +
              "</thead>\n" +
              "<tbody><tr>\n" +
              "<td><img src=\"./notebook_asset/img/支付宝.png\" data-origin=\"asset/img/支付宝.png\" alt=\"支付宝\" class=\"medium-zoom-image\" style=\"width:160px\"></td>\n" +
              "<td><img src=\"./notebook_asset/img/微信.png\" data-origin=\"asset/img/微信.png\" alt=\"微信\" class=\"medium-zoom-image\" style=\"width:160px\"></td>\n" +
              "</tr>\n" +
              "</tbody></table>\n" +
              "</details>\n"
        }
        return html
      });
    },
)

// 添加打赏模块结束 ==================================================================================================================

// 解决typora中的图片以img开始时不显示的问题。需要注意的是，只对_pic中的图片生效
// docsify.plugins.push(
//   // 解决typora中的图片以img开始时不显示
//   function (hook, vm) {
//     hook.beforeEach(function (content) {
//       vm.config.markdownHtml = ""
//       var href = location.hash.split("?")
//       var newhref = ""
//       // 首页不用管
//       if (href[0] && href[0] != "#/") {
//         newhref = href[0].substr(1) // 去掉#
//         newhref = newhref.substring(0, newhref.lastIndexOf("/") + 1)
//       }
//       if (newhref) {
//         return vm.config.markdownHtml = content.replace(/<img.*?(src=")_pic(.*?)"/gm, ($1, $2, $3, $4) =>
//           `<img src="${newhref}_pic${$3}"`)
//       }

//       return vm.config.markdownHtml = content; //返回markdown文本,并付给一个值
//     });
//   }
// )

// 内容标题可以折叠-代码块可以折叠 -开始 ====================================================================================================
docsify.plugins.push(
    function (hook, vm) {
      hook.afterEach(function (html, next) {
        next(html)
        titleAndCodeFold(html)
      });
    }
)
async function titleAndCodeFold(html) {
  // 加载标题加载按钮
  $("#main h1,#main h2,#main h3,#main h4,#main h5,#main h6").each(function (i) {
    $(this).prepend("<em class='mytitle'></em>")
  })
  // 加载代码块折叠按钮
  $("#main pre").each(function (i) {
    $(this).prepend("<button class='myprecollection'>折叠 / 展开</button>")
  })
  // 按钮显示隐藏
  $(".myprecollection,.mytitle").hover(function () {
    $(this).toggleClass("showopacity");
  });
  // 标题可以折叠相关逻辑
  $(".mytitle").click(function () {
    console.log("标题已折叠");
    var h = $(this).parent()[0].tagName.substr(1)
    $(this).parent().toggleClass("mezhedie");
    $(this).parent().nextAll().each(function (i) {
      if ($(this).filter("h1,h2,h3,h4,h5,h6").length > 0) {
        var h1 = $(this)[0].tagName.substr(1)
        if (h == h1 || h > h1) {
          return false;
        }
      }
      $(this).slideToggle(100);
    });

  });
  // 代码可以折叠相关逻辑
  $(".myprecollection").click(function () {
    console.log("代码块已折叠");
    $(this).parent().toggleClass("mecodezhedie");
  });

}
// 内容标题可以折叠-代码块可以折叠 -结束 ====================================================================================================

/*
按钮组功能
  右上角连接显示隐藏
  刷新 - 重新加载数据
  切换背景
  返回顶部
*/
docsify.plugins.push(
    function (hook, vm) {
      hook.mounted(function () {
        btnFn()
      })
    }
)
async function btnFn() {
  console.log("已加载按钮组功能");
  // 右上角连接显示隐藏
  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top > 50) {
      $(".github-corner").fadeOut(1000)
    } else {
      $(".github-corner").fadeIn(1000)
    }
  })

  // 刷新
  $(".mebox .refresh").click(function () {
    localStorage.getItem("docsify_search_time") ? localStorage.removeItem("docsify_search_time") : "";
    setTimeout(() => {
      location.reload(); // 刷新
    }, 500);
  })

  // 返回顶部
  $(".mebox .toTop").click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300);
  })

  // 切换背景
  $("#bgchange").click(function () {
    var theme = localStorage.getItem("metheme");
    if (!theme || theme == "dark") {
      localStorage.setItem("metheme", "vue");
      $("#cssHref").attr("href", "./notebook_asset/css/vue.css")
      $("#bgchange").attr("src", "./notebook_asset/img/an.png")
    } else {
      localStorage.setItem("metheme", "dark");
      $("#cssHref").attr("href", "./notebook_asset/css/dark.css")
      $("#bgchange").attr("src", "./notebook_asset/img/guang.png")
    }
  })

}
// 按钮组功能结束 ===============================================================================================================================
// 指定文件显示1._ 2._ 标题-开始 ================================================================================================================
// docsify.plugins.push(
//   function (hook, vm) {
//     hook.beforeEach(function (content) {
//       vm.config.markdownHtml = ""


//       return vm.config.markdownHtml = content; //返回markdown文本,并付给一个值
//     }),
//     hook.doneEach(function (content) {
//       // 每次开始解析 Markdown 内容时调用
//       request("_showNumberFile.md", {}).then(res => {
//         var arr = []
//         res.replace(/\[(.*?)\]\((.*?)\)/gm, ($1, $2, $3, $4) => {
//           arr.push($3)
//         })

//         vm.config.showNumRouter = arr
//         // 每次路由切换时数据全部加载完成后调用，没有参数。
//         var path = vm.route.path 
//         var tree = vm.compiler.cacheTree
//         var cacheTOC = vm.compiler.cacheTOC[vm.route.file]
//         // 只有允许的路由才会显示标题
//         var html =    vm.config.showNumRouter.filter(v => vm.route.file.startsWith(encodeURI(v))).forEach(v => {
//           // 如果当前路由在vm缓存中才会加载
//           for (const k in tree) {
//             if (k.startsWith(path)) {
//               // 修改侧边栏标题
//               titleTree(tree[k])
//             }
//           }
//         });

//         // 将修改后markdown输出道控制台
//         var html = vm.config.markdownHtml.replace(/(#+)(\s+)/ig, function ($1) {
//           arr.push("1")
//           var pre = ""
//           try{
//               pre = cacheTOC[arr.length - 1].pre ? cacheTOC[arr.length - 1].pre : ""
//           }catch{
//           }
//           // console.log(cacheTOC[arr.length - 1].pre);
//           return $1 + pre
//         })


//       })
//     })
//   }
// )
// // 数组 等级层数
// function titleTree(arr) {
//   arr.forEach((v1, i1) => {
//     v1.pre = concatI([i1])
//     updataSide(v1)
//     if (v1["children"]) {
//       v1["children"].forEach((v2, i2) => {
//         v2.pre = concatI([i1, i2])
//         updataSide(v2)
//         if (v2["children"]) {
//           v2["children"].forEach((v3, i3) => {
//             v3.pre = concatI([i1, i2, i3])
//             updataSide(v3)
//             if (v3["children"]) {
//               v3["children"].forEach((v4, i4) => {
//                 v4.pre = concatI([i1, i2, i3, i4])
//                 updataSide(v4)
//                 if (v4["children"]) {
//                   v4["children"].forEach((v5, i5) => {
//                     v5.pre = concatI([i1, i2, i3, i4, i5])
//                     updataSide(v5)
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });
//   // console.log(arr);

// }

// function updataSide(obj) { 
//   // console.log(obj);
//   var dom = `.sidebar a[href='${obj.slug}']`
//   var conDom = `#main a[href='${obj.slug}']`
//   // 侧边栏锚点
//   $(dom).each(function () {
//     $(this).html(obj.pre.replace("._","、") + $(this).html())
//   })
//   // 内容锚点
//   $(conDom).each(function () {
//     $(this).html(obj.pre.replace("._","、") + $(this).html()).css("color", "#000")

//   })
// }

// function concatI(arr) {
//   var str = ""
//   arr.forEach(v => {
//     str += (v + 1) + "."
//   });
//   return str + "_"
// }
// 指定文件显示1._ 2._ 标题-结束 ====================================================================================================

// // 加载下拉侧边栏开始 ==========================================================================================================
docsify.plugins.push(
    // 侧边栏相关
    function (hook, vm) {
      hook.doneEach(function (content) {
        loadingDropdown() // 加载下拉列表
      });
    },
)

function loadingDropdown() {
  var $allLi = $(".app-sub-sidebar li")
  var domul, $img
  var width = 20;
  $allLi.each((i, v) => {
    domul = $(v).next().get(0)
    if (domul && domul.localName == "ul") {
      // console.log($(v));
      $(v).css({
        "marginLeft": -width + "px"
      })
      $(v).prepend('<img src="./notebook_asset/img/less.png" alt="" width="' + width + 'px" class="medropdown">')
    }

    // 事件冒泡，只有点击图片有用
    $(v).click(function (e) {
      if (e.target.localName == "img") {
        $(this).next().slideToggle(50, function () {
          $img = $(v).find(".medropdown")[0]
          $($img).toggleClass("dropdown_start")
        })
      }
    })

  })

  if (docsify.hideDropdownAll && docsify.hideDropdownAll == true) {
    $allLi.each((i, v) => {
      $(v).find(".medropdown").toggleClass("dropdown_start") //折叠所有图标
      if ($(v).next().get(0) && $(v).next().get(0).localName == "ul") {
        // $(v).slideToggle(100);
        $(v).next().css({
          display: "none"
        })
      }
    })
  }
}
// $(".active").parents("ul").prev()
// // 加载下拉侧边栏结束 ==========================================================================================================


 


// 目录展示开始==========================================================================================================
docsify.plugins.push(
    // 侧边栏相关
    function (hook, vm) {
      hook.mounted(function() {
        $("main").prepend(`
                  <div class="markdown_left">
                    <!-- 搜素 -->
                    <el-input placeholder="搜索" v-model="tree_sidebar.tree_sidebar_search_text" clearable></el-input>
                    <!-- 文件树 -->
                    <el-tree :data="tree_sidebar.tree_data" :props="tree_sidebar.defaultProps"
                        :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                        <span slot-scope="{ node, data }">
                            <i :class="{
                            'el-icon-document': data.type == 1 || !data.type,
                            'el-icon-folder': data.type == 2 && !node.expanded,
                            'el-icon-folder-opened': data.type == 2 && node.expanded
                            }"></i>
                            <span style="padding-left: 4px;">{{node.label}}</span>
                        </span>
                    </el-tree>
                </div>
                <div class="markdown_left_resize" title="收缩知识库目录">
                    <button @click="leftShowOrHide" class="markdown_left_resize_btn">收缩</button>
                </div>
      `)
        $("main").append
        (`
            <div class="markdown_right_resize" title="收缩markdown侧边栏">
                <button @click="rightShowOrHide" class="markdown_left_resize_btn">收缩</button>
            </div>
            <div class="markdown_right">
                <el-input placeholder="搜索" v-model="article_tree_sidebar.article_tree_sidebar_search_text" clearable></el-input>
                <!-- 文件树 -->
                <el-tree :data="article_tree_sidebar.tree_data" :props="article_tree_sidebar.defaultProps"
                         :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick2">
                </el-tree>
            </div>
      `)

     tree_init =    new Vue({
          el: 'main',
          data() {
            return {
              activeIndex: '1',
              // 树形侧边栏
              tree_sidebar: {
                tree_data: [],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                tree_sidebar_search_text: '',
              },
              // 树形侧边栏
              article_tree_sidebar: {
                tree_data: [],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                article_tree_sidebar_search_text: '',
              }
            }
          },
          mounted() {
            // 左侧拖拽
            this.leftDragControllerDiv();
            // 右侧拖拽
            this.rightDragControllerDiv();
            // 加载目录
            request("_config.json", {}).then(res => {
              this.tree_sidebar.tree_data = res.sidebar
            })
 
          },
          methods: {
            handleSelect(key, keyPath) {
              console.log(key, keyPath);
            },
            // 左侧拖拽
            leftDragControllerDiv() {
              var resize = document.querySelector(".markdown_left_resize");
              var left = document.querySelector(".markdown_left");
              var mid = document.querySelector("section");
              var box = document.querySelector("main");
              // 鼠标按下事件
              resize.onmousedown = function (e) {
                //颜色改变提醒
                resize.style.background = '#818181';
                var startX = e.clientX;
                resize.left = resize.offsetLeft;
                // 鼠标拖动事件
                document.onmousemove = function (e) {
                  var endX = e.clientX;
                  var moveLen = resize.left + (endX - startX); // （endx-startx）=移动的距离。resize.left+移动的距离=左边区域最后的宽度
                  var maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

                  if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
                  if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px


                  left.style.width = moveLen + 'px'; // 设置左侧区域的宽度
                  resize.style.left = moveLen + 'px';
                  ; // 设置拖动条的位置
                  mid.style.paddingLeft = (moveLen + 5) + 'px'; // 注意加上滚动条的宽度
                  //  mid.style.width = (box.clientWidth - moveLen - 10) + 'px';
                };
                // 鼠标松开事件
                document.onmouseup = function (evt) {
                  //颜色恢复
                  resize.style.background = '#d6d6d6';
                  document.onmousemove = null;
                  document.onmouseup = null;
                  resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                };
                resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                return false;
              };
            },
            // 右侧拖拽
            rightDragControllerDiv() {
              var resize = document.querySelector(".markdown_right_resize");
              var right = document.querySelector(".markdown_right");
              var mid = document.querySelector("section");
              var box = document.querySelector("main");
              // 鼠标按下事件
              resize.onmousedown = function (e) {
                //颜色改变提醒
                resize.style.background = '#818181';
                var startX = e.clientX;
                resize.left = resize.offsetLeft;
                // 鼠标拖动事件
                document.onmousemove = function (e) {
                  var endX = e.clientX;
                  var moveLen = resize.left + (endX - startX); // （endx-startx）=移动的距离。resize.left+移动的距离=左边区域最后的宽度
                  var maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

                  if (moveLen < 150) moveLen = 150; // 左边区域的最小宽度为32px
                  if (moveLen > maxT - 32) moveLen = maxT - 32; //右边区域最小宽度为150px

                  resize.style.right = (box.clientWidth - moveLen) + 'px';
                  ; // 设置拖动条的位置
                  right.style.width = (box.clientWidth - moveLen) + 'px'; // 设置左侧区域的宽度
                  mid.style.paddingRight = (box.clientWidth - (moveLen + 5)) + 'px'; // 注意加上滚动条的宽度

                };
                // 鼠标松开事件
                document.onmouseup = function (evt) {
                  //颜色恢复
                  resize.style.background = '#d6d6d6';
                  document.onmousemove = null;
                  document.onmouseup = null;
                  resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                };
                resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                return false;
              };
            },
            leftShowOrHide() {
              $("main").toggleClass("left_hide")
            },
            rightShowOrHide() {
 
              $("main").toggleClass("right_hide")
            },
            filterNode(value, data) {
              if (!value) return true
              if (data.label.indexOf(value) !== -1) return true

              // 小写拼音搜索
              // 将label拆散成小写拼音数组
              const arr = data.label.spell('low', 'array')
              // 拼接成完整label的拼音
              const spell = arr.join('')
              // lengths 是label完整拼音 中每个汉字第一个拼音字母的index值的数组
              const lengths = [0]
              for (var i = 0; i < arr.length - 1; i++) {
                lengths.push(lengths[i] + arr[i].length)
              }
              // 判断label完整拼音 中 输入值的 index 是不是等于某个汉字第一个拼音字母的index值
              if (lengths.indexOf(spell.indexOf(value)) !== -1) return true

              // 大写拼音搜索
              // 将label拆散成小写拼音数组
              const arrUp = data.label.spell('up', 'array')
              // 拼接成完整label的拼音
              const spellUp = arrUp.join('')
              // lengths 是label完整拼音 中每个汉字第一个拼音字母的index值的数组
              const lengthsUp = [0]
              for (var i = 0; i < arrUp.length - 1; i++) {
                lengthsUp.push(lengthsUp[i] + arrUp[i].length)
              }
              // 判断label完整拼音 中 输入值的 index 是不是等于某个汉字第一个拼音字母的index值
              return lengthsUp.indexOf(spellUp.indexOf(value)) !== -1
            },
            handleNodeClick(data, a, b) {
              var { type } = a.data;
              var { label } = a.data;
              var { url } = a.data;
              // 如果类型为空 或者为1，呢么就认为这个是一个链接需要跳转
              if (type == 1 || !type) {
                window.location.href = "#" + url;
              }
            },
            handleNodeClick2(data, a, b) {
              var { type } = a.data;
              var { label } = a.data;
              var { url } = a.data;
              window.location.hash = "" + url;
              $('html, body').animate({scrollTop: $('#'+a.data.domid).offset().top}, 300)
            
            },
            setarticle(res){
              this.article_tree_sidebar.tree_data = res
            }

          },
          watch: {
            // 标题搜索
            'tree_sidebar.tree_sidebar_search_text'(val) {
              this.$refs.tree.filter(val);
            },
            // 标题搜索
            'article_tree_sidebar.article_tree_sidebar_search_text'(val) {
              this.$refs.tree.filter(val);
            }

          }
        })

      });
      hook.doneEach(function (content) {
        // 获取所有标题
        var cate = getCatalog()
        // 将标题转换成树形
        var treecate = toTree(cate)
        tree_init.setarticle(treecate)
  
      })
    },
)

// 目录展示结束 ==========================================================================================================

// 目录生成树开始====================================================================
function getCatalog() {
  const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  var elements = $('#main h1,#main h2,#main h3,#main h4,#main h5,#main h6')
 
  let hElements = []
  elements.each((index,key) => {
    if (h.indexOf(key.localName) > -1) {
      let text
      if (key.children && key.children.length) {
        text = getText(key.children)
      } else {
        text = key.innerHTML
      }
 
      hElements.push({
        hLevel: parseInt(key.localName[1]),
        label:text,
        domid:key.id,
        url:$(key).find("a").eq(0).attr("href"),
      })
    }
  })
  return hElements
}
function getText(arr) {
  let result = null
  if (!arr.length) return
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children && arr[i].children.length) {
      result = this.getText(arr[i].children)
    } else {
      result = arr[i].innerHTML
    }
  }
  return result
}
function toTree(flatArr) {
  var tree = []
  var copyArr = flatArr.map(function (item) {
    return item
  })

  // 根据指定级别查找该级别的子孙级，并删除掉已经查找到的子孙级
  var getChildrenByLevel = function (currentLevelItem, arr, level) {
    if (!currentLevelItem) {
      return
    }
    // 将level值转成负数，再进行比较
    var minusCurrentLevel = -currentLevelItem.hLevel
    var children = []
    for (var i = 0, len = arr.length; i < len; i++) {
      var levelItem = arr[i]
      if (-levelItem.hLevel < minusCurrentLevel) {
        children.push(levelItem)
      } else {
        // 只找最近那些子孙级
        break
      }
    }
    // 从数组中删除已经找到的那些子孙级，以免影响到其他子孙级的查找
    if (children.length > 0) {
      arr.splice(0, children.length)
    }
    return children
  }

  var getTree = function (result, arr, level) {
    // 首先将数组第一位移除掉，并添加到结果集中
    var currentItem = arr.shift()

    currentItem.level = level
    result.push(currentItem)
    while (arr.length > 0) {
      if (!currentItem) {
        return
      }
      // 根据当前级别获取它的子孙级
      var children = getChildrenByLevel(currentItem, arr, level)
      // 如果当前级别没有子孙级则开始下一个
      if (children.length == 0) {
        currentItem = arr.shift()
        currentItem.level = level
        if (currentItem) {
          result.push(currentItem)
        }
        continue
      }
      currentItem.children = []
      // 查找到的子孙级继续查找子孙级
      getTree(currentItem.children, children, level + 1)
    }
  }
  getTree(tree, copyArr, 1)
  return tree
}

// 目录生成树结束====================================================================
