# proofread

## 简介
`proofread`是一个校对工具，可用于标记选中的文字，目前提供的校对类型有文字涂改、文字缺漏和文字互换。

结合工具[`draw`](https://github.com/luobin01/draw)可以校对文章中的图片和视频。

## 预览

PC端/移动端：[请狠狠地点这里](https://luobin01.github.io/proofread/examples/umd/)

## 示例

````
const proofread = new Proofread(document.querySelector('xxx'), {
  tagName: 'mark'
})

// 自动标记
proofread.automark(proofreadDataList)

// 文字涂改、文字缺漏
const data = proofread.mark('modify')

// 文字互换
const data = proofread.mark('exchange', { points })
````

## 校对数据

````
{
  content: string       // 选中文字
  startOffset: number   // 光标起点
  endOffset: number     // 光标结点
  length: number        // 选中文字的长度
  points: number[]      // 选中文字的互换位置
  key: string           // 唯一标识
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
