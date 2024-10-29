中文 | [English](./README-en.md) | [日本語](./README-ja.md)

# 稻客-钻石收银系统
<p align="center">
    <img src="https://i.postimg.cc/GB1rGZXp/logo2.png" width="150" />
</p>
<p align="center">
    <a href="" target="_blank">主页</a> |
    <a href="" target="_blank">文档</a> | 
    <a href="" target="_blank">演示</a> |
    <a href="https://arco.design" target="_blank">Arco Design官方文档</a> 
</p>

这是一款专门为线下品牌连锁门店量身定制的POS系统，可自适应PC和iPad。当尊贵的顾客光临您的品牌店铺，专业销售员介绍产品后，顾客产生购买意向。此时，专业销售员使用专业iPad POS，与顾客共享高质量、高效率的购物体验。这无疑将提升您的品牌形象。该系统不仅提供主流的POS基本功能和友好的用户界面，还可根据您的品牌色调进行自定义。它是您企业数字化的基石，助力实现"营销在线"、"销售在线"、"服务在线"和"生产在线"的目标。

开源不易， 如果您能动动您的发财的小手给个小星星⭐star， 将是对我最大的支持和鼓励！

## 项目清单
```
├── plugin
│   ├── arcoResolver.js
│   ├── arcoStyleImport.js
│   ├── compress.js
│   ├── imagemin.js
│   └── visualizer.js
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── .DS_Store
│   ├── App.vue
│   ├── api
│   ├── assets
│   │   ├── images
│   │   ├── logo.svg
│   │   ├── logo2.png
│   │   ├── style
│   │   ├── svg
│   │   └── world.json
│   ├── components
│   │   ├── TemplateAddRowModal
│   │   ├── TemplateDialog
│   │   ├── breadcrumb
│   │   ├── chart
│   │   ├── custom
│   │   ├── footer
│   │   ├── global-setting
│   │   ├── index.js
│   │   ├── menu
│   │   ├── message-box
│   │   ├── navbar
│   │   └── tab-bar
│   ├── config
│   ├── directive
│   ├── hooks
│   ├── layout
│   ├── locale
│   ├── main.js
│   ├── mock
│   ├── router
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   ├── style.css
├── ├──tests
│   │   └── .js
│   ├── utils
│   └── views
│       ├── cashier
│       │   ├── components
│       │   ├── index.vue
│       │   ├── locale
│       │   └── mock.js
│       ├── exception
│       │   ├── 403
│       │   ├── 404
│       │   └── 500
│       ├── login
│       │   ├── components
│       │   ├── index.vue
│       │   └── locale
│       ├── not-found
│       │   └── index.vue
│       ├── order
│       │   ├── components
│       │   ├── index.vue
│       │   ├── locale
│       │   └── mock.js
│       ├── pending
│       │   ├── components
│       │   ├── index.vue
│       │   ├── locale
│       │   └── mock.js
│       ├── refund
│       │   ├── components
│       │   ├── index.vue
│       │   └── mock.js
│       └── write-off
│           ├── components
│           ├── index.vue
│           └── order.vue
├── .gitignore
├── .prettierignore
├── DIRECTORY_STRUCTURE.txt
├── LICENSE
├── README-en.md
├── README.md
├── babel.config.js
├── commitlint.config.cjs
├── generate-tree.js
├── index.html
├── jest.config.js
├── listFolders.js
├── package-lock.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
└── yarn.lock
```
## 安装使用

- 获取代码
```
git clone https://github.com/vica2024/DAOKE-POS-VUE3.git
```
- 安装依赖
```
cd DAOKE-POS-VUE3 && yarn install 
```
或者
```
cd DAOKE-POS-VUE3 && yarn install
```
- 运行项目
```
yarn dev
```
- 打包发布
```
yarn build
```

## 作者公众号

[![qrcode-for-gh-bc50bba44e73-258.jpg](https://i.postimg.cc/CKPx13vN/qrcode-for-gh-bc50bba44e73-258.jpg)](https://vicazhuo.tech/daoke-retail)
 关注获取安装教程

## 软件截图

[![2024-10-12-10-23-48.png](https://i.postimg.cc/nLFckFjZ/2024-10-12-10-23-48.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-52-20.png](https://i.postimg.cc/rynnyQC9/2024-10-19-9-52-20.png)](https://postimg.cc/mh9N83nc)

[![2024-10-19-9-53-38.png](https://i.postimg.cc/4dDznLwY/2024-10-19-9-53-38.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-54-04.png](https://i.postimg.cc/htsqKNMt/2024-10-19-9-54-04.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-54-40.png](https://i.postimg.cc/X7MR0nKb/2024-10-19-9-54-40.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-54-11.png](https://i.postimg.cc/ZRcNHbLh/2024-10-19-9-54-11.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-53-15.png](https://i.postimg.cc/xdV9dKV6/2024-10-19-9-53-15.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-54-21.png](https://i.postimg.cc/0rg9JmJ5/2024-10-19-9-54-21.png)](https://vicazhuo.tech/daoke-retail)

[![2024-10-19-9-54-30.png](https://i.postimg.cc/sDnt852M/2024-10-19-9-54-30.png)](https://vicazhuo.tech/daoke-retail)

