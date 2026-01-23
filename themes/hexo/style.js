/* eslint-disable react/no-unknown-property */
/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  return (<style jsx global>{`
    // 底色
    body{
        background-color: #f5f5f5
    }
    .dark body{
        background-color: black;
    }
  
    /*  菜单下划线动画 */
    #theme-hexo .menu-link {
        text-decoration: none;
        background-image: linear-gradient(#928CEE, #928CEE);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
    }
    
    #theme-hexo .menu-link:hover {
        background-size: 100% 2px;
        color: #928CEE;
    }

    /* 设置了从上到下的渐变黑色 */
    #theme-hexo .header-cover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:  linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.5) 100%);
    }

    /* Custem */
    .tk-footer{
        opacity: 0;
    }

    // 选中字体颜色
    ::selection {
        background: rgba(45, 170, 219, 0.3);
    }

    // 自定义滚动条
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #49b1f5;
    }

    * {
        scrollbar-width:thin;
        scrollbar-color: #49b1f5 transparent
    }
    
    /* 移动端交互增强 */
    @media (max-width: 1024px) {
        /* 点击时的背景高亮反馈 */
        a:active, 
        button:active, 
        .cursor-pointer:active {
            background-color: rgba(146, 140, 238, 0.1);
            transition: background-color 0.1s;
        }
        
        /* 移除移动端默认的点击蓝色高亮 */
        * {
            -webkit-tap-highlight-color: transparent;
        }
        
        /* 增加按钮点击时的微缩放效果 */
        .menu-link:active,
        .cursor-pointer:active {
            transform: scale(0.98);
        }
    }
    
    /* 侧边栏菜单点击态 */
    #nav-mobile .menu-link:active {
        color: #928CEE;
        font-weight: bold;
    }

    /* 自定义更慢的跳动动画 */
    @keyframes slow-bounce {
        0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
    }
    .animate-slow-bounce {
        animation: slow-bounce 2s infinite;
    }

  `}</style>)
}

export { Style }
