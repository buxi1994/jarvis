const css = `
    select, input, button, textarea {
        font: 100% arial, helvetica, clean;
    }

    .jarvis {
        position: fixed;
        top: 2%;
        left: 0px;
        width: 56px;
        transition: width 0.5s ease-out;
        display: flex;
        justify-content: right;
        flex-direction: column;
        align-items: center;
    }

    .jarvis.active {
        width: 320px;
        .modal{
            display:block;
        }
    }

    .icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        animation: glow 2s infinite alternate;
    }

    @keyframes glow {
        from {
            box-shadow: 0 0 3px rgba(79,236,252, 0.4);
        }
        to {
            box-shadow: 0 0 10px rgba(79,236,252, 1);
        }
    }

    .icon>img {
        height: 100%;
    }

    .icon.dragging{
        opacity: 0;
        transition: opacity 0.2s;
        cursor: none;
    }

    .modal {
        display: none;
        /* 初始时隐藏弹窗 */
        position: relative;
        width: 100%;
        z-index: -1;
        top: -18px;
        background-color: rgba(0,0,0,0.9);
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: 4px 4px 1px 0 #4fecfc;
        color:#4fecfc;
    }

    .listContainer {
        padding: 28px 12px 12px;
        font-family: "arial";
        font-size: 12px;
    }
    .content{
        /* IE and Edge 隐藏滚动条*/
        -ms-overflow-style: none;  
        scrollbar-width: none;
        max-height: 480px;
        margin: 10px 0;
        overflow:auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .user-question{
            display: flex;
            justify-content: flex-end;
            margin-bottom: 16px;
            div{
                background-color: #15a1af;
                border-radius: 12px;
                border-top-right-radius: 0;
                box-sizing: border-box;
                color: #fff;
                cursor: pointer;
                display: inline-block;
                font-size: 14px;
                line-height: 22px;
                min-height: 26px;
                outline: none;
                padding: 9px 14px;
                white-space: normal;
                word-break: break-word;
            }
        }
        .item-content {
            color:#666;
            background-color: #fff;
            border-radius: 10px;
            border-top-left-radius: 0;
            box-sizing: border-box;
            margin-bottom: 16px;
            overflow: hidden;
            padding: 12px 16px 16px;
            &:last-child{
                margin-bottom:0;
            }
            .title {
                color: #999;
                font-size: 13px;
                padding: 10px 0;
                line-height: 22px;
            }
            
            .item {
                align-items: flex-start;
                background-color: #f7f7f7;
                border-radius: 0 12px 12px 12px;
                color: #222;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 12px;
                max-width: none;
                padding: 12px 13px;
                position: relative;
                width: auto;
                word-break: break-all;
            }
            
        }
    }

    .tips{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 10px;
        margin-top: 12px;
        span{
            color: #858585;
        }
    }
    .search{
        background-image: linear-gradient(90deg, #1c77ff, #4cecfc);
        border-radius: 12px;
        box-shadow: 0 0 12px 0 rgba(0,155,109,.15);
        box-sizing: border-box;
        height: 100%;
        padding: 2px;
        width: 100%;
        .input{
            border: 0 !important;
            border-radius: 10px;
            padding: 2px 3px;
            background-color: #fff;
            box-sizing: border-box;
            position: relative;
            width: 100%;
            textarea {
                border: none;
                box-sizing: border-box;
                color: #222;
                line-height: 20px;
                outline: 0;
                overflow-y: auto;
                width: 100%;
                font-size: 14px;
                height: 62px;
                resize: none;
                /* IE and Edge 隐藏滚动条*/
                -ms-overflow-style: none;  
                scrollbar-width: none;
                &::-webkit-scrollbar {
                    display: none;
                }
                &:focus {
                    outline: none;
                }
            }
            .send-bottom{
                display:flex;
                justify-content: flex-end;
                .send-bottom-btn{
                    cursor:pointer;
                    text-align:center;
                    background: linear-gradient(316deg, #0bd3e7 16.71%, #15c393 116.53%);
                    border-radius: 8px;
                    height: 26px;
                    position: relative;
                    width: 36px;
                    &:before{
                        background: url(https://edu-wenku.bdimg.com/v1/pc/aigc/presentation-sample/send-1702458556573.svg) no-repeat;
                        background-size: cover;
                        content: "";
                        height: 16px;
                        position: absolute;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 16px;
                    }
                }
            }
        }
    }`;

export default css;
