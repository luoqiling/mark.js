# mark.js

## 简介
`mark.js`可用于标记选中的文字，目前提供的标记类型有文字涂改、文字缺漏、文字删除和文字互换。 

结合工具[`draw`](https://github.com/luobin01/draw)可以标记文章中的图片和视频。

## 预览

校对（PC端/移动端）：[请狠狠地点这里](https://luoqiling.github.io/mark.js/examples/umd/)

自定义插入标签（PC端）：[请狠狠地点这里](https://luoqiling.github.io/mark.js/examples/customize/)

## 示例

````
const m = new Mark(document.querySelector('xxx'), {
  tagName: 'mark'
})

// 自动标记
m.automark(dataList)

// 文字涂改、文字缺漏
const data = m.mark('modify')

// 文字删除
const data = m.mark('delete')

// 文字互换
const data = m.mark('exchange', { points })
````

## 标记数据

````
{
  content: string       // 选中文字
  startOffset: number   // 光标起点
  endOffset: number     // 光标结点
  length: number        // 选中文字的长度
  points: number[]      // 选中文字的互换位置
  key: string           // 唯一标识
  type: string          // 标记类型
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
