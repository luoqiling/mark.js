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

  _getRangeBy(range) {
    const cnode = range.commonAncestorContainer
    const snode = range.startContainer
    const enode = range.endContainer
    let nodeList = []
    let startkey = ''
    let endkey = ''
    function cb(parent, key) {
      const childNodes = parent.childNodes
      for (let i = 0; i < childNodes.length; i++) {
        const k = key ? `${key}-${i}` : `${i}`
        const child = childNodes[i]
        if (endkey !== '') {
          break
        }
        if (child === snode) {
          startkey = k
        }
        if (child === enode) {
          endkey = k
        }
        if (startkey !== '' && !(child.nodeType === 3 && hasOnlyLinefeed(child.nodeValue))) {
          nodeList.push({[k]:child})
        }
        if (child.nodeType === 1 && (child.contains(snode) || child.contains(enode))) {
          cb(child, k)
        }
      }
    }
    cb(cnode)
    return {
      nodeList,
      startkey,
      endkey,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    }
  }

  _surroundCrossContents(range) {
    const opt = this.options
    const newRange = this._getRangeBy(range)
    const nodeList = newRange.nodeList
    const startkey = newRange.startkey
    const endkey = newRange.endkey
    const startOffset = newRange.startOffset
    const endOffset = newRange.endOffset
    let newNodeList = []
    if (opt.debug) {
      log(this._createDOMTree(range), 'tree')
      log(newRange, 'newRange')
    }
    nodeList.forEach(object => {
      const key = Object.keys(object)[0]
      const node = object[key]
      const pnode = node.parentNode
      const value = node.nodeValue
      const newnode = this._createMarkElement()
      if (this._compare(key, startkey) > 0 && this._compare(key, endkey) < 0) {
        if (node.nodeType === 3) {
          newnode.innerText = value
          pnode.replaceChild(newnode, node)
        } else {
          newnode.innerHTML = node.innerHTML
          node.innerHTML = ''
          node.appendChild(newnode)
        }
        newNodeList.push(newnode)
      } else {
        if (node.nodeType === 3) {
          let siblingnode
          if (key === startkey) {
            siblingnode = node.nextSibling
            newnode.innerText = value.substr(startOffset)
            node.nodeValue = value.substr(0, startOffset)
            if (siblingnode) {
              pnode.insertBefore(newnode, siblingnode)
            } else {
              pnode.appendChild(newnode)
            }
            newNodeList.push(newnode)
          } else if (key === endkey) {
            siblingnode = node.previousSibling
            newnode.innerText = value.substr(0, endOffset)
            node.nodeValue = value.substr(endOffset)
            if (siblingnode) {
              insertAfter(newnode, siblingnode)
            } else {
              pnode.insertBefore(newnode, node)
            }
            newNodeList.push(newnode)
          }
        }
      }
    })
    return newNodeList
  }

  _compare(key1, key2) {
    const k1 = key1.split('-')
    const k2 = key2.split('-')
    const min = k1.length - k2.length ? k1.length : k2.length
    let res
    for (var i = 0; i < min; i++) {
      const num = parseInt(k1[i], 10) - parseInt(k2[i], 10)
      if (num === 0 && i !== min - 1) {
        continue
      } else {
        res = num
        break
      }
    }
    return res
  }

  _createMarkElement() {
    const tagName = this.tagName
    const node = document.createElement(tagName)
    return node
  }

  _createDOMTree(range) {
    const cnode = range.commonAncestorContainer
    const snode = range.startContainer
    const enode = range.endContainer
    let constructor = {}
    let startkey = ''
    let endkey = ''
    function cb(parent, obj, key) {
      parent.childNodes.forEach((child, index) => {
        const k = key ? `${key}-${index}` : `${index}`
        if (child === snode) {
          startkey = k
        }
        if (child === enode) {
          endkey = k
        }
        obj[k] = {}
        obj[k].node = child
        if (child.nodeType !== 3) {
          obj[k].child = {}
          cb(child, obj[k].child, k)
        }
      })
    }
    cb(cnode, constructor)
    return {
      constructor,
      startkey,
      endkey
    }
  }
}
