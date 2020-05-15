import { hasOnlyLinefeed, log } from './utils'
import { insertAfter } from './utils/jq'

export default class Create {
  constructor(options) {
    const o = Object.assign({
      debug: false
    }, options)
    this.options = o
  }

  create(tagName, options) {
    const selection = options && options.selection || window.getSelection()
    this.tagName = tagName || 'mark'
    return this._create(selection)
  }

  _create(selection) {
    let newNodeList = []
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const snode = range.startContainer
      const enode = range.endContainer
      if (snode && enode) {
        if (snode === enode || snode.parentNode === enode.parentNode) {
          const newnode = this._createMarkElement()
          range.surroundContents(newnode)
          newNodeList.push(newnode)
        } else {
          const arr = this._surroundCrossContents(range)
          newNodeList = newNodeList.concat(arr)
        }
      } else if (!snode) {
        console.error('range.startContainer does not exist')
      } else if (!enode) {
        console.error('range.endContainer does not exist')
      }
      selection.removeAllRanges()
    }
    return newNodeList
  }

  _getNewRange(range) {
    const cnode = range.commonAncestorContainer
    const snode = range.startContainer
    const enode = range.endContainer
    let nodeList = []
    let start = false
    let end = false
    function cb(parent) {
      const childNodes = parent.childNodes
      for (let i = 0; i < childNodes.length; i++) {
        const child = childNodes[i]
        if (end) {
          break
        }
        if (child === snode) {
          start = true
        }
        if (child === enode) {
          end = true
        }
        if (child.nodeType === 1) {
          if (child.contains(snode) || child.contains(enode)) {
            cb(child)
          } else if (start) {
            nodeList.push(child)
          }
        } else if (child.nodeType === 3 && !hasOnlyLinefeed(child.nodeValue) && start) {
          nodeList.push(child)
        }
      }
    }
    cb(cnode)
    return {
      nodeList,
      startOffset: range.startOffset,
      endOffset: range.endOffset
    }
  }

  _surroundCrossContents(range) {
    const opt = this.options
    const newRange = this._getNewRange(range)
    const nodeList = newRange.nodeList
    const startOffset = newRange.startOffset
    const endOffset = newRange.endOffset
    const length = nodeList.length
    let newNodeList = []
    if (opt.debug) {
      log(newRange, 'newRange')
    }
    nodeList.forEach((node, index) => {
      const pnode = node.parentNode
      const value = node.nodeValue
      const newnode = this._createMarkElement()
      if (index === 0) {
        if (node.nodeType === 3) {
          const siblingnode = node.nextSibling
          newnode.innerText = value.substr(startOffset)
          node.nodeValue = value.substr(0, startOffset)
          if (siblingnode) {
            pnode.insertBefore(newnode, siblingnode)
          } else {
            pnode.appendChild(newnode)
          }
          newNodeList.push(newnode)
        }
      } else if (index === length - 1) {
        if (node.nodeType === 3) {
          const siblingnode = node.previousSibling
          newnode.innerText = value.substr(0, endOffset)
          node.nodeValue = value.substr(endOffset)
          if (siblingnode) {
            insertAfter(newnode, siblingnode)
          } else {
            pnode.insertBefore(newnode, node)
          }
          newNodeList.push(newnode)
        }
      } else {
        if (node.nodeType === 3) {
          newnode.innerText = value
          pnode.replaceChild(newnode, node)
        } else {
          newnode.innerHTML = node.innerHTML
          node.innerHTML = ''
          node.appendChild(newnode)
        }
        newNodeList.push(newnode)
      }
    })
    return newNodeList
  }

  _createMarkElement() {
    const tagName = this.tagName
    const node = document.createElement(tagName)
    return node
  }
}
