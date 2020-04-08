# proofread

## 简介
`proofread`是一个校对工具，即在富文本里校对错误文案，目前提供的校对类型有文字标记、文字缺漏和文字互换。

结合工具[`draw`](https://github.com/luobin01/draw)可以校对文章中的图片和视频。

## 预览

[请狠狠地点这里](https://luobin01.github.io/proofread/examples/umd/)

## 示例

````
const proofread = new Proofread(document.querySelector('xxx'))

// 标记所有
proofread.markAll(proofreadDataList)

// 文字标记、文字缺漏
proofread.mark('modify').then(data => {
  console.log(data)
})

// 文字互换
proofread.mark('exchange', { points }).then(data => {
  console.log(data)
})
````

## 校对数据

````
{
  content: string       // 选中文字
  startOffset: number   // 光标起点
  endOffset: number     // 光标结点
  length: number        // 选中文字的长度
  points: number[]      // 选中文字的互换位置
  key: number           // 唯一标识
  type: string          // 校对类型
}
````

## 命令行

````
# 本地运行
yarn serve

# 构建开发环境包
yarn build:dev

# 构建生产环境包
yarn build

# 代码格式检查并自动修复
yarn lint
````

## 兼容性

`proofread`主要使用到`document.execCommand`，因此其兼容性参考`execCommand`
