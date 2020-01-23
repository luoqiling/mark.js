import * as Utils from './utils'
import * as JQ from './utils/jq'

export default class Proofread {
  constructor(textareaElem) {
    if (textareaElem === null) {
      console.error('textareaElem does not exist')
      return
    }
    this.textareaElem = textareaElem
    this.innerData = {
      points: []
    }
  }

  mark(type, options) {
    return new Promise((resolve, reject) => {
      if (type === 'exchange') {
        if (options && options.points && options.points.length > 0) {
          this.innerData.points = options.points.sort((a, b) => (a - b))
        } else {
          console.error('no points of exchange')
          return
        }
      }
      this._mark(type).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  markAll(list, options) {
    if (list && list.length > 0) {
      let index = 0
      const draw = () => {
        const data = list[index]
        const rangeData = this._getRangeData(data)
        const selection = window.getSelection()
        const range = window.document.createRange()
        const sr = rangeData.startRange
        const er = rangeData.endRange
        range.setStart(sr.node, sr.offset)
        range.setEnd(er.node, er.offset)
        selection.addRange(range)
        this._mark(data.type, data).then(data => {
          options && options.afterEach && options.afterEach(data)
          if ((++index) <= list.length - 1) {
            draw()
          } else {
            options && options.after && options.after()
          }
        })
      }
      // 开始标记前，清除所有选中状态（按钮和输入框被点击后也是选中状态）
      window.getSelection().removeAllRanges()
      draw()
    }
  }

  getContent() {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    let text = ''
    if (range) {
      text = range.toString()
    }
    return text.replace(/\n/g, '').trim()
  }

  innerText() {
    let content = ''
    const count = nodes => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === 3 && !Utils.hasOnlyLinefeed(node.nodeValue)) {
          content += node.nodeValue
        } else if (node.nodeType === 1) {
          count(node.childNodes)
          if (Utils.hasNodeName(node, 'p')) {
            content += '\n'
          }
        }
      }
    }
    count(this.textareaElem.childNodes)
    // 清除不可见的空字符
    return content.replace(/\u200B/g,'')
  }

  _mark(type, extendData) {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const hasOneOffset = range.startContainer === range.endContainer && range.startOffset === range.endOffset
    if (hasOneOffset) {
      const fontELem = window.document.createElement('font')
      fontELem.face = 'initial'
      range.insertNode(fontELem)
    } else {
      window.document.execCommand("fontName", false, 'initial')
    }
    selection.removeAllRanges()
    return new Promise((resolve, reject) => {
      const time = 1000
      const stime = new Date() * 1
      const timing = () => {
        setTimeout(() => {
          const targetElems = this._getElems()
          if (targetElems.length > 0) {
            const startElem = targetElems[0]
            const endElem = targetElems[targetElems.length - 1]
            const data = extendData || this._getData(startElem, endElem)
            data.points = extendData && extendData.points || this.innerData.points
            data.key = extendData && extendData.key || Utils.getKey()
            data.type = type
            if (!extendData && hasOneOffset) {
              data.content = '缺漏'
              data.type = 'missing'
            }
            this._setElems(targetElems, data)
            resolve(data)
          } else {
            const ctime = new Date() * 1
            if (ctime - stime >= time) {
              reject(new Error('targetElems does not exist'))
            } else {
              timing()
            }
          }
        }, 50)
      }
      timing()
    })
  }

  _getElems() {
    const allTargetElems = this.textareaElem.querySelectorAll('font')
    const targetElems  = Array.prototype.filter.call(allTargetElems, elem => {
      return Utils.hasNodeName(elem, 'font') && elem.face == 'initial' && !elem.getAttribute('proofreadKey')
    })
    return targetElems
  }

  _setElems(elems, data) {
    if (elems && elems.length > 0) {
      const draw = data.type === 'exchange' ? this._drawExchange(data) : null
      elems.forEach(elem => {
        elem.setAttribute('proofreadKey', data.key)
        elem.setAttribute('proofreadType', data.type)
        JQ.addClass(elem, `proofread-error proofread-${data.type}`)
        draw && draw(elem)
      })
    }
  }

  _drawExchange(data) {
    let index = 0
    const points = data && data.points || this.innerData.points
    const text = data && data.content.replace(/\n/g, '')
    return function fn(elem) {
      const nodes = Array.prototype.slice.call(elem.childNodes)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === 3 && !Utils.hasOnlyLinefeed(node.nodeValue)) {
          const value = node.nodeValue
          const fNode = document.createDocumentFragment()
          for(let i = 0; i<value.length; i++) {
            let className = ''
            const iElem = document.createElement('i')
            iElem.innerHTML = value.charAt(i)
            if (index == 0) {
              className = 'left'
            } else if (index === text.length - 1) {
              className = 'right'
            }
            JQ.addClass(iElem, className)
            if (index == points[0]) {
              className = 'focus focus1'
            } else if (points[1] && index === points[1] + 1) {
              className = 'focus focus2'
            } else if (index < points[0] || ( points[1] && index > points[1] + 1) ) {
              className = 'top'
            } else {
              className = 'bottom'
            }
            JQ.addClass(iElem, className)
            iElem.setAttribute('proofreadType', data.type)
            fNode.appendChild(iElem)
            index++
          }
          node.parentNode.replaceChild(fNode, node)
        } else if (node.nodeType === 1) {
          fn(node)
        }
      }
    }
  }

  _getData(startElem, endElem) {
    let sum = 0
    let content = ''
    let startOffset = null
    let endOffset = null
    let length = null

    const count = (nodes, startElem, endElem) => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === 3 && !Utils.hasOnlyLinefeed(node.nodeValue)) {
          const text = node.nodeValue
          sum += text.length
          content += startOffset !== null ? text : ''
        } else if (node.nodeType === 1) {
          if (node === startElem) {
            startOffset = sum
          }
          if (node === endElem) {
            const t = node.innerText
            endOffset = sum + t.length
            length = endOffset - startOffset
            content += t
          }
          if (endOffset !== null) break

          count(node.childNodes, startElem, endElem)

          if (!endOffset && Utils.hasNodeName(node, 'p')) {
            sum++
            content += '\n'
          }
        }
      }
    }

    count(this.textareaElem.childNodes, startElem, endElem)

    return {
      content: content.trim(),
      startOffset,
      endOffset,
      length
    }
  }

  _getRangeData(data) {
    let sum = 0
    let startRange = null
    let endRange = null

    const count = nodes => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === 3 && !Utils.hasOnlyLinefeed(node.nodeValue)) {
          const sum2 = sum
          sum += node.nodeValue.length
          if (!startRange && sum >= data.startOffset) {
            const offset = data.startOffset - sum2
            startRange = { node, offset: offset < 0 ? 0 : offset }
          }
          if (!endRange && sum >= data.endOffset) {
            const offset = data.endOffset - sum2
            endRange = { node, offset: offset < 0 ? 0 : offset }
          }
          if (endRange !== null) break
        } else if (node.nodeType === 1) {
          count(node.childNodes)
          if (!endRange && Utils.hasNodeName(node, 'p')) {
            sum++
          }
        }
      }
    }

    count(this.textareaElem.childNodes)

    return {
      startRange,
      endRange
    }
  }
}
