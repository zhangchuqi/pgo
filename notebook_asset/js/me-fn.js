    //  1请求地址 2参数 3，请求方式
    const request = (url, params, method = "get") => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url,
          method,
          data: params,
          success: function (res) {
            resolve(res)
          },
          contentType: "application/json;charset=UTF-8",
          error: function (res) {
            console.log("ajax获取数据失败", res,url, params, method);
            reject(res)
          }
        })
      })
    }
    // 将json中的数据转换成不是tree的格式
    function getEveryJson(json, arr = []) {
      for (let i = 0; i < json.length; i++) {
        var obj = json[i];
        if (obj.type == 1) {
          arr.push({
            id: obj.id,
            url: obj.url,
            label: obj.label
          })
        }
        if (obj.children && obj.children.length > 0) {
          getEveryJson(obj.children, arr)
        }
      }
    }

    function getFullPath(path){
      var v = path;
      var key = v
      if (/(\/)$/.test(v)) {
        // 如果是 / 结尾
        key = v + "README.md"
      }else  if (!(/(\.md)$/.test(v))) {
        // 如果不是md结尾
        key = v + ".md"
      }
      return key
    }


  