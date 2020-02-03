# proofread

## 简介
proofread是一个校对工具，即在富文本里校对错误文案，目前提供的校对类型有文字标记、文字缺漏和文字互换。

[在线预览](https://luobin01.github.io/proofread/examples/umd/)

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

## 校对数据
````
{
  content: string       // 选中文字
  startOffset: number   // 光标起点
  endOffset: number     // 光标结点
  length: number        // 选中文字的长度
  points: number[]      // 选中文字的互换点
  key: number           // 唯一标识
  type: string          // 校对类型
}
````

## 兼容性

proofread主要使用到document.execCommand，因此其兼容性参考execCommand
