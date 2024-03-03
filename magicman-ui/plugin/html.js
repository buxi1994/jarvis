const html = `
        <div id="jarvis" class="jarvis">
            <div class="icon">
                <img src="./images/jarvis.jpg"/>
            </div>
            <div id="modal" class="modal">
                <div class="listContainer">
                    <div class="tips">
                        <span>欢迎体验文档助手内测，作为一个人工智能语言模型，我可以回答你的问题，辅助你进行写作。</span>
                    </div>
                    <div id="content" class="content">
                    </div>
                    <div id="tools" class="tools">
                        <div class="fixed-tools" id="fixed-tools">
                        </div>
                        <div id="open-tools" class="open-tools">
                        </div>
                    </div>
                    <div class="search">
                        <div class="input">
                            <textarea id="textarea" placeholder="小助手最新黑科技：AI辅助生成PPT，输入&quot;/&quot;选取功能快速体验" autocomplete="off" class="input" style="text-indent: 0px;"></textarea>
                            <div class="send-bottom">
                                <div class="send-bottom-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
export default html;
