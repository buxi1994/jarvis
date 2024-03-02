import css from "./css.js";
import html from "./html.js";
// https://www.jsdelivr.com/package/npm/markdown-it-emoji
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/+esm';
import {full as emoji} from 'https://cdn.jsdelivr.net/npm/markdown-it-emoji@3.0.0/+esm';
const md = new markdownIt({
  html: true, // 在源码中启用 HTML 标签
  xhtmlOut: true, // 使用 '/' 来闭合单标签 （比如 <br />）。
  // 这个选项只对完全的 CommonMark 模式兼容。
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify: true, // 将类似 URL 的文本自动转换为链接。

  // 启用一些语言中立的替换 + 引号美化
  typographer: true,

  // 双 + 单引号替换对，当 typographer 启用时。
  // 或者智能引号等，可以是 String 或 Array。
  //
  // 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
  // 还有 ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] 给法国人使用（包括 nbsp）。
  quotes: "“”‘’",

  // 高亮函数，会返回转义的HTML。
  // 或 '' 如果源字符串未更改，则应在外部进行转义。
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function (/*str, lang*/) {
    return "";
  },
}).use(emoji);
// Create a class for the element
class Garvis extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerHTML = css;

    shadow.appendChild(style);

    const dom = document.createElement("div");
    // TODO
    dom.innerHTML = html;

    // Append it to the shadow root
    shadow.appendChild(dom);
  }
  // 每当元素添加到文档中时调用
  connectedCallback() {
    const shadow = this.shadowRoot;

    let dataObject = {
      recommend: [
        "查找相似问题",
        "尝试修复问题",
        "最近一周改动",
        "建议解决方案",
        "最近一个月改动",
        "最新IT咨询",
      ],
      "你可能想了解：": ["value1", "value2", "value3"],
      拓展: ["关于鼎汉技术分点讨论议题", "点讨论议题", "value3"],
    };
    this.generateHtml(dataObject);
    const icon = shadow.querySelector(".icon");
    const jarvis = shadow.querySelector(".jarvis");
    let isDragging = false; // 初始化拖拽状态
    let dragStarted = false; // 标记拖拽
    // 鼠标按下事件
    icon.addEventListener("mousedown", function (e) {
      e.preventDefault();
      isDragging = false;
      dragStarted = true;
      console.log(
        "mousedown---isDragging:" + isDragging + "---dragStarted:" + dragStarted
      );
      // 获取鼠标在元素内的初始位置
      let startX = e.clientX - jarvis.offsetLeft;
      let startY = e.clientY - jarvis.offsetTop;
      function mouseMoveHandler(e) {
        console.log(
          "mouseMoveHandler---isDragging:" +
            isDragging +
            "---dragStarted:" +
            dragStarted
        );
        if (!dragStarted) return;
        isDragging = true;
        // 计算新的位置
        let newX = e.clientX - startX;
        let newY = e.clientY - startY;

        // 获取页面的有效区域大小
        const pageWidth = document.documentElement.clientWidth;
        const pageHeight = document.documentElement.clientHeight;

        // 获取元素的大小
        const elementWidth = jarvis.offsetWidth;
        const elementHeight = jarvis.offsetHeight;

        // 计算边界
        const minX = 0;
        const maxX = pageWidth - elementWidth;
        const minY = 0;
        const maxY = pageHeight - elementHeight;

        // 确保元素不会移出页面的有效区域
        newX = Math.min(Math.max(newX, minX), maxX);
        newY = Math.min(Math.max(newY, minY), maxY);

        // 更新元素位置
        jarvis.style.left = newX + "px";
        jarvis.style.top = newY + "px";
      }

      function mouseUpHandler() {
        console.log(
          "mouseUpHandler---isDragging:" +
            isDragging +
            "---dragStarted:" +
            dragStarted
        );
        dragStarted = false;
        // 移除事件监听
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      }
      // 添加事件监听
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });
    icon.addEventListener("click", function (e) {
      console.log(
        "click---isDragging:" + isDragging + "---dragStarted:" + dragStarted
      );
      if (isDragging) {
        e.preventDefault(); // 如果是拖拽操作，阻止click事件的默认行为
        isDragging = false; // 重置拖拽状态
      } else {
        if (jarvis.classList.contains("active")) {
          jarvis.classList.remove("active");
        } else {
          jarvis.classList.add("active");
          // 获取页面的有效区域大小
          const pageWidth = document.documentElement.clientWidth;
          let left = jarvis.style.left;
          if (left.substring(0, left.length - 2) > pageWidth / 2) {
            jarvis.style.left = pageWidth - 340 + "px";
          } else {
            jarvis.style.left = "20px";
          }
          jarvis.style.top = "2%";
        }
      }
    });
    // 为输入框添加键盘按下事件监听器
    const input = shadow.getElementById("textarea");
    const this_ = this;
    input.addEventListener("keydown", function (event) {
      // 检查按下的键是否是回车键（keyCode 13）
      if (event.keyCode === 13) {
        event.preventDefault();
        const value = event.target.value;
        // 清空数据
        event.target.value = "";
        console.log("haha");
        const question =
          '<div class="user-question"><div>' + value + "</div></div>";
        shadow.getElementById("content").innerHTML += question;
        this_.search(value).then((res) => {
          const html = md.render(res);
          content.innerHTML += "<div class='item-content'>" + html + "</div>";
        }).catch(err=>{
          const html = md.render(':zzz:服务器睡着了，请重试...');
          content.innerHTML += "<div class='item-content'>" + html + "</div>";
        });
      }
    });
    const content = shadow.getElementById("content");
    // 创建一个回调函数来接收变化通知
    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        console.log(mutation);
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          content.scrollTo(0, content.scrollHeight);
        }
      }
    };
    // 创建MutationObserver实例，传入回调函数
    const observer = new MutationObserver(callback);
    // 使用配置对象指定观察的类型
    const config = { attributes: false, childList: true, subtree: false };

    // 开始观察目标节点
    observer.observe(shadow.getElementById("content"), config);
  }
  search() {
    return new Promise((resolve, reject) => {
      // 假设这是根据异步操作成功或失败的条件
      let condition = true; 
      setTimeout(() => {
        if (condition) {
          const res = `**以下是不同公司不同订单类型的相关介绍**
          1. 到货时间受许多因素影响，例如产品类型、供应商的库存、运输方式、发货地点和目的地等。对于特定订单的到货时间，您需要联系您的供应商或物流公司以获取更准确的信息。
          2. 对于国际订单，由于涉及到海关清关、运输等环节，所以时间可能会有所延迟。在这种情况下，建议您与供应商或物流公司联系，以了解具体原因和预期的交货时间。
          3. 总的来说，到货时间是一个相对复杂的问题，需要综合考虑各种因素。如果您有任何疑问或需要更详细的信息，请联系您的供应商或物流公司。`;
          resolve(res); // 如果操作成功，调用resolve并传递成功的值
        } else {
          reject("操作失败"); // 如果操作失败，调用reject并传递失败的原因
        }
      }, 3000);
    });
  }
  generateHtml(dataObject) {
    let content = this.shadowRoot.getElementById("content");
    for (let key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        let itemBox = document.createElement("div");
        itemBox.className = "item-content";
        let title = key == "recommend" ? "试试以下对话吧：" : key;
        let item = this.generateHTMLFromArray(dataObject[key]);
        itemBox.innerHTML =
          '<div class="title">' +
          title +
          "</div><div class='list'>" +
          item +
          "</div>";

        content.appendChild(itemBox);
      }
    }
  }
  generateHTMLFromArray(array) {
    let div = "";
    if (array instanceof Array) {
      array.forEach((item) => {
        div += '<div class="item">' + item + "</div>";
      });
    } else {
      div += array;
    }
    return div;
  }
}

// Define the new element
customElements.define("garvis-ai", Garvis);
