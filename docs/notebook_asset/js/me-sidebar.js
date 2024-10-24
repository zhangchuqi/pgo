 

// var dropName = '.meside';
// // 电脑端拖拽
// $(dropName).mousedown(function (e) {
//   var positionDiv = $(this).offset();
//   var distenceX = e.pageX - positionDiv.left; // 获取当前点击的点距离当前元素的左边框距离

//   $(document).mousemove(function (e) {
//     var x = e.pageX - distenceX;


//     // 限制
//     var maxX = $(document.body)[0].clientWidth - $(dropName).outerWidth(true); // 最大可视距离
//     if (x < 0) {
//       x = 0;
//     } else if (x > maxX) {
//       x = maxX;
//     }
//     moveSidebar(x)
//   });

//   $(document).mouseup(function () {
//     $(document).off('mousemove').off("mousedown");
//   });
// });
 
// // 移动端拖拽
// ;(function yidrap() {
//   var touchstartX = 0;
//   var touchmoveX = 0;
//   var dropDom = document.querySelector(dropName);
//   dropDom.ontouchstart = function (event) {
//     $(this).css("background", "#efefef")
//     var positionDiv = $(this).offset();
//     touchstartX = event.changedTouches[0].clientX - positionDiv.left;
//   }
//   dropDom.ontouchmove = function (event) {
//     touchmoveX = event.changedTouches[0].clientX - touchstartX;
//     // 限制
//     var maxX = $(document.body)[0].clientWidth - $(dropName).outerWidth(true); // 最大可视距离
//     if (touchmoveX < 0) {
//       touchmoveX = 0;
//     } else if (touchmoveX > maxX) {
//       touchmoveX = maxX;
//     }
//     moveSidebar(touchmoveX)
//   }
//   dropDom.ontouchend = function () {
//     console.log($(this));
//     $(this).css("background", "transparent")
//   }
// })()

// $(".me-sidebar-toggle").click(function () {
//   intSidebar()
// })
// function moveSidebar(x) {
//   // if(x < 100){
//   //   return
//   // }
 
//   // 侧边栏拖动条
//   $('.meside').css({
//     'left': x - 5 + 'px'
//   });
//   // 侧边栏
//   $(".sidebar").css({
//     'width': x + 'px'
//   });
//   // 侧边栏按钮
//   $(".me-sidebar-toggle").css({
//     'width': x <= 38 ? 38 : x + 'px' // 最小显示38
//   });
//   // 内容区域变化
//   $(".content").css({
//     'left': x + 'px'
//   });
// }

// function intSidebar() {
//   if ($(".sidebar").width() <= 30) {
//     moveSidebar(300)
//   } else {
//     moveSidebar(0)
//   }
// }

// 添加侧边框和内容的标题 如1._ 2._ 2.1_
// 实现在notebook_asset\js\me-plugin.js
// -----------------------------------------------------------------------------------------------------------------
// function getMd(vm) {
//   // 每次路由切换时数据全部加载完成后调用，没有参数。
//   var path = vm.route.path
//   var tree = vm.compiler.cacheTree
//   var cacheTOC = vm.compiler.cacheTOC[vm.route.file]
//   var arr = [];
//   // 只有允许的路由才会显示标题
//   vm.config.showNumRouter.forEach(v => {
//     if (encodeURI(v) == path) {
//       // 如果当前路由在vm缓存中才会加载
//       for (const k in tree) {
//         if (k.startsWith(path)) {
//           // 修改侧边栏标题
//           titleTree(tree[k])
//         }
//       }
//     }
//   });
//   // 将修改后markdown输出道控制台
//   var html = vm.config.markdownHtml.replace(/(#+)(\s+)/ig, function ($1) {
//     arr.push("1")
//     var pre = ""
//     try{
//         pre = cacheTOC[arr.length - 1].pre ? cacheTOC[arr.length - 1].pre : ""

//     }catch{

//     }
//     // console.log(cacheTOC[arr.length - 1].pre);
//     return $1 + pre
//   })

//   return html;
// }
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
//   var dom = `.sidebar a[href='${obj.slug}']`
//   var conDom = `#main a[href='${obj.slug}']`
//   // 侧边栏锚点
//   $(dom).each(function () {
//     $(this).html(obj.pre + $(this).html())
//   })
//   // 内容锚点
//   $(conDom).each(function () {
//     $(this).html(obj.pre + $(this).html()).css("color", "#000")

//   })
// }
// function concatI(arr) {
//   var str = ""
//   arr.forEach(v => {
//     str += (v + 1) + "."
//   });
//   return str + "_"
// }
// -----------------------------------------------------------------------------------------------------------------

// 加载下拉侧边栏
// -----------------------------------------------------------------------------------------------------------------
// function loadingDropdown() {
//   var $allLi = $(".app-sub-sidebar li")
//   var domul, $img
//   var width = 20;
//   $allLi.each((i, v) => {
//     domul = $(v).next().get(0)
//     if (domul && domul.localName == "ul") {
//       // console.log($(v));
//       $(v).css({
//         "marginLeft": -width + "px"
//       })
//       $(v).prepend('<img src="./notebook_asset/img/less.png" alt="" width="' + width + 'px" class="medropdown">')
//     }

//     // 事件冒泡，只有点击图片有用
//     $(v).click(function (e) {
//       if (e.target.localName == "img") {
//         $(this).next().slideToggle(50, function () {
//           $img = $(v).find(".medropdown")[0]
//           $($img).toggleClass("dropdown_start")
//         })
//       }
//     })
    
//   })

//   if(docsify.hideDropdownAll && docsify.hideDropdownAll == true){
//     $allLi.each((i, v) => {
//       $(v).find(".medropdown").toggleClass("dropdown_start")  //折叠所有图标
//       if ( $(v).next().get(0) &&  $(v).next().get(0).localName == "ul") {
//         $(v).next().css({display:"none"})
//       }
//     })
//   }
// }
// -----------------------------------------------------------------------------------------------------------------

 

