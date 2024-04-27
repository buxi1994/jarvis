export const GetRequest = (url = "", params = "") => {
  if (url === "" && params === "") {
    return { url, params };
  }
  let urlParamsArr = [];
  const urlData = url.split("?");
  url = urlData[0];
  if (urlData.length > 1 && urlData[1].length > 0) {
    let strs = ("?" + urlData[1]).substr(1).split("&");
    for (let i = 0; i < strs.length; i++) {
      let item = strs[i].split("=");
      if (item.length > 0 && item[0].length > 0) {
        urlParamsArr[i] = item[0] + "=" + decodeURI(item[1] || "");
      }
    }
  }
  console.log(urlParamsArr);
  if (params.trim() !== "") {
    let paramsArr = params.trim().split("\n");
    for (const key in paramsArr) {
      urlParamsArr[key] = paramsArr[key];
    }
  }
  let newUrl = url + "?";
  let newParams = "";
  for (const key in urlParamsArr) {
    newUrl += urlParamsArr[key] + "&";
    newParams += urlParamsArr[key] + "\n";
  }
  if (params !== "") {
    newParams = params;
  } else {
    newParams = newParams.slice(0, newParams.length - 1);
  }
  newUrl = newUrl.slice(0, newUrl.length - 1);
  return { url: newUrl, params: newParams };
};

// 将形如“name=Jane\nage=10”转成{name:Jane;nage:10}
export const parseKeyValueToObj=(str,splitChar="=")=> {
  // 根据换行符拆分字符串
  var lines = str.split("\n");

  // 创建一个空对象来存储键值对
  var obj = {};

  // 遍历拆分后的行
  lines.forEach(function(line) {
    // 再次根据等号拆分每一行
    var parts = line.split(splitChar);
    
    // 检查是否具有正确的键值对结构
    if (parts.length === 2) {
      var key = parts[0].trim();
      var value = parts[1].trim();
      
      // 检查键是否为非空字符串
      if (key) {
        obj[key] = value;
      } else {
        console.error('Error: Invalid key in line:', line);
      }
    } else {
      console.error('Error: Invalid line format:', line);
    }
  });

  // 返回转换后的对象
  return obj;
}
