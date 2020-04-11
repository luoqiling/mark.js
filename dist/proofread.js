(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Proofread"] = factory();
	else
		root["Proofread"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib */ \"../lib/index.js\")\n\n\n//# sourceURL=webpack://Proofread/../index.js?");

/***/ }),

/***/ "../lib/index.js":
/*!***********************!*\
  !*** ../lib/index.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Proofread; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"../lib/utils/index.js\");\n/* harmony import */ var _utils_jq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/jq */ \"../lib/utils/jq.js\");\n/* harmony import */ var _mark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mark */ \"../lib/mark.js\");\n\n\n\nclass Proofread {\n  constructor(textareaElem, options) {\n    if (textareaElem === null) {\n      throw new Error('TextareaElem does not exist');\n    }\n\n    const o = Object.assign({\n      tagName: 'mark'\n    }, options);\n    this.options = o;\n    this.textareaElem = textareaElem;\n    this.innerData = {\n      points: []\n    };\n    this.Mark = new _mark__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      tagName: o.tagName\n    });\n  }\n\n  mark(type, options) {\n    if (type === 'exchange') {\n      if (options && options.points && options.points.length > 0) {\n        this.innerData.points = options.points.sort((a, b) => a - b);\n      } else {\n        throw new Error('Required parameter options.points');\n      }\n    }\n\n    return this._mark(type);\n  }\n\n  automark(list, options) {\n    if (list && list.length > 0) {\n      let index = 0;\n\n      const draw = () => {\n        const data = list[index];\n\n        const rangeData = this._getRangeData(data);\n\n        const selection = window.getSelection();\n        const range = window.document.createRange();\n        const sr = rangeData.startRange;\n        const er = rangeData.endRange;\n\n        try {\n          range.setStart(sr.node, sr.offset);\n          range.setEnd(er.node, er.offset);\n          selection.addRange(range);\n        } catch (error) {\n          console.error(error);\n          console.error(`${JSON.stringify(data)}`);\n        }\n\n        const newdata = this._mark(data.type, data);\n\n        if (options && options.afterEach) {\n          options.afterEach(newdata);\n        }\n\n        if (++index <= list.length - 1) {\n          draw();\n        } else {\n          options && options.after && options.after();\n        }\n      }; // 开始标记前，清除所有选中状态（按钮和输入框被点击后也是选中状态）\n\n\n      window.getSelection().removeAllRanges();\n      draw();\n    }\n  }\n\n  getContent() {\n    const selection = window.getSelection();\n    const range = selection.getRangeAt(0);\n    let text = '';\n\n    if (range) {\n      text = range.toString();\n    }\n\n    return text.replace(/\\n/g, '').trim();\n  }\n\n  innerText() {\n    let content = '';\n\n    const count = nodes => {\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          content += node.nodeValue;\n        } else if (node.nodeType === 1) {\n          count(node.childNodes);\n\n          if (_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](node, 'p')) {\n            content += '\\n';\n          }\n        }\n      }\n    };\n\n    count(this.textareaElem.childNodes);\n    return _utils__WEBPACK_IMPORTED_MODULE_0__[\"removeExtraSpace\"](content);\n  }\n\n  _mark(type, extendData) {\n    const selection = window.getSelection();\n    const range = selection.getRangeAt(0);\n    const hasOneOffset = range.startContainer === range.endContainer && range.startOffset === range.endOffset;\n    const targetElems = this.Mark.init(selection);\n    let data;\n\n    if (targetElems.length > 0) {\n      if (extendData) {\n        data = extendData;\n      } else {\n        data = this._getData(targetElems[0], targetElems[targetElems.length - 1]);\n        data.content = hasOneOffset ? '缺漏' : data.content;\n        data.points = type === 'exchange' ? this.innerData.points : [];\n        data.key = _utils__WEBPACK_IMPORTED_MODULE_0__[\"getKey\"]();\n        data.type = hasOneOffset ? 'missing' : type;\n      }\n\n      this._setElems(targetElems, data);\n    }\n\n    return data;\n  }\n\n  _setElems(elems, data) {\n    if (elems && elems.length > 0) {\n      const draw = data.type === 'exchange' ? this._drawExchange(data) : null;\n      elems.forEach(elem => {\n        elem.setAttribute('proofreadKey', data.key);\n        elem.setAttribute('proofreadType', data.type);\n        _utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"](elem, `proofread-error proofread-${data.type}`);\n        draw && draw(elem);\n      });\n    }\n  }\n\n  _drawExchange(data) {\n    let index = 0;\n    const points = data && data.points || this.innerData.points;\n    const text = data && data.content.replace(/\\n/g, '');\n    return function fn(elem) {\n      const nodes = Array.prototype.slice.call(elem.childNodes);\n\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          const value = node.nodeValue;\n          const fNode = document.createDocumentFragment();\n\n          for (let i = 0; i < value.length; i++) {\n            let className = '';\n            const iElem = document.createElement('i');\n            iElem.innerHTML = value.charAt(i);\n\n            if (index == 0) {\n              className = 'left';\n            } else if (index === text.length - 1) {\n              className = 'right';\n            }\n\n            _utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"](iElem, className);\n\n            if (index == points[0]) {\n              className = 'focus focus1';\n            } else if (points[1] && index === points[1] + 1) {\n              className = 'focus focus2';\n            } else if (index < points[0] || points[1] && index > points[1] + 1) {\n              className = 'top';\n            } else {\n              className = 'bottom';\n            }\n\n            _utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"](iElem, className);\n            iElem.setAttribute('proofreadType', data.type);\n            fNode.appendChild(iElem);\n            index++;\n          }\n\n          node.parentNode.replaceChild(fNode, node);\n        } else if (node.nodeType === 1) {\n          fn(node);\n        }\n      }\n    };\n  }\n\n  _getData(startElem, endElem) {\n    let sum = 0;\n    let content = '';\n    let startOffset = null;\n    let endOffset = null;\n    let length = null;\n\n    const count = (nodes, startElem, endElem) => {\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          const text = _utils__WEBPACK_IMPORTED_MODULE_0__[\"removeExtraSpace\"](node.nodeValue);\n          sum += text.length;\n          content += startOffset !== null ? text : '';\n        } else if (node.nodeType === 1) {\n          if (node === startElem) {\n            startOffset = sum;\n          }\n\n          if (node === endElem) {\n            const t = node.innerText;\n            endOffset = sum + t.length;\n            length = endOffset - startOffset;\n            content += t;\n          }\n\n          if (endOffset !== null) break;\n          count(node.childNodes, startElem, endElem);\n\n          if (!endOffset && _utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](node, 'p')) {\n            sum++;\n            content += '\\n';\n          }\n        }\n      }\n    };\n\n    count(this.textareaElem.childNodes, startElem, endElem);\n    return {\n      content: content.trim(),\n      startOffset,\n      endOffset,\n      length\n    };\n  }\n\n  _getRangeData(data) {\n    let sum = 0;\n    let startRange = null;\n    let endRange = null;\n\n    const count = nodes => {\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          const sum2 = sum;\n          const text = _utils__WEBPACK_IMPORTED_MODULE_0__[\"removeExtraSpace\"](node.nodeValue);\n          sum += text.length;\n\n          if (!startRange && sum >= data.startOffset) {\n            const offset = data.startOffset - sum2;\n            startRange = {\n              node,\n              offset: offset < 0 ? 0 : offset\n            };\n          }\n\n          if (!endRange && sum >= data.endOffset) {\n            const offset = data.endOffset - sum2;\n            endRange = {\n              node,\n              offset: offset < 0 ? 0 : offset\n            };\n          }\n\n          if (endRange !== null) break;\n        } else if (node.nodeType === 1) {\n          count(node.childNodes);\n\n          if (!endRange && _utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](node, 'p')) {\n            sum++;\n          }\n        }\n      }\n    };\n\n    count(this.textareaElem.childNodes);\n    return {\n      startRange,\n      endRange\n    };\n  }\n\n}\n\n//# sourceURL=webpack://Proofread/../lib/index.js?");

/***/ }),

/***/ "../lib/mark.js":
/*!**********************!*\
  !*** ../lib/mark.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Mark; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"../lib/utils/index.js\");\n/* harmony import */ var _utils_jq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/jq */ \"../lib/utils/jq.js\");\n\n\nclass Mark {\n  constructor(options) {\n    const o = Object.assign({\n      tagName: 'mark',\n      debug: false\n    }, options);\n    this.options = o;\n    this.newNodeList = [];\n  }\n\n  init(selection) {\n    const opt = this.options;\n    const range = selection.getRangeAt(0);\n    const snode = range.startContainer;\n    const enode = range.endContainer;\n\n    if (snode && enode) {\n      this.newNodeList = [];\n\n      if (snode === enode) {\n        const newnode = this._createMarkElement();\n\n        range.surroundContents(newnode);\n        this.newNodeList.push(newnode);\n      } else {\n        const newRange = this._getRangeBy(range);\n\n        if (opt.debug) {\n          Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(this._createDOMTree(range), 'tree');\n          Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(newRange, 'newRange');\n        }\n\n        this._surroundCrossContents(newRange);\n      }\n    } else if (!snode) {\n      console.error('range.startContainer does not exist');\n    } else if (!enode) {\n      console.error('range.endContainer does not exist');\n    }\n\n    selection.removeAllRanges();\n    return this.newNodeList.concat();\n  }\n\n  _getRangeBy(range) {\n    const cnode = range.commonAncestorContainer;\n    const snode = range.startContainer;\n    const enode = range.endContainer;\n    let nodeList = [];\n    let startkey = '';\n    let endkey = '';\n\n    function cb(parent, key) {\n      const childNodes = parent.childNodes;\n\n      for (let i = 0; i < childNodes.length; i++) {\n        const k = key ? `${key}-${i}` : `${i}`;\n        const child = childNodes[i];\n\n        if (endkey !== '') {\n          break;\n        }\n\n        if (child === snode) {\n          startkey = k;\n        }\n\n        if (child === enode) {\n          endkey = k;\n        }\n\n        if (startkey !== '' && !(child.nodeType === 3 && Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"])(child.nodeValue))) {\n          nodeList.push({\n            [k]: child\n          });\n        }\n\n        if (child.nodeType === 1 && (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasChild\"])(child, snode) || Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasChild\"])(child, enode))) {\n          cb(child, k);\n        }\n      }\n    }\n\n    cb(cnode);\n    return {\n      nodeList,\n      startkey,\n      endkey,\n      startOffset: range.startOffset,\n      endOffset: range.endOffset\n    };\n  }\n\n  _surroundCrossContents(range) {\n    const nodeList = range.nodeList;\n    const startkey = range.startkey;\n    const endkey = range.endkey;\n    const startOffset = range.startOffset;\n    const endOffset = range.endOffset;\n    nodeList.forEach(object => {\n      const key = Object.keys(object)[0];\n      const node = object[key];\n      const pnode = node.parentNode;\n      const value = node.nodeValue;\n\n      const newnode = this._createMarkElement(); // console.log(key, node)\n      // console.log('compare', compare(key, startkey), compare(key, endkey))\n\n\n      if (this._compare(key, startkey) > 0 && this._compare(key, endkey) < 0) {\n        if (node.nodeType === 3) {\n          newnode.innerText = value;\n          pnode.replaceChild(newnode, node);\n        } else {\n          newnode.innerHTML = node.innerHTML;\n          node.innerHTML = '';\n          node.appendChild(newnode);\n        }\n\n        this.newNodeList.push(newnode);\n      } else {\n        if (node.nodeType === 3) {\n          let siblingnode;\n\n          if (key === startkey) {\n            siblingnode = node.nextSibling;\n            newnode.innerText = value.substr(startOffset);\n            node.nodeValue = value.substr(0, startOffset);\n\n            if (siblingnode) {\n              pnode.insertBefore(newnode, siblingnode);\n            } else {\n              pnode.appendChild(newnode);\n            }\n\n            this.newNodeList.push(newnode);\n          } else if (key === endkey) {\n            siblingnode = node.previousSibling;\n            newnode.innerText = value.substr(0, endOffset);\n            node.nodeValue = value.substr(endOffset);\n\n            if (siblingnode) {\n              Object(_utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"insertAfter\"])(newnode, siblingnode);\n            } else {\n              pnode.insertBefore(newnode, node);\n            }\n\n            this.newNodeList.push(newnode);\n          }\n        }\n      }\n    });\n  }\n\n  _compare(key1, key2) {\n    const k1 = key1.split('-');\n    const k2 = key2.split('-');\n    const min = k1.length - k2.length ? k1.length : k2.length;\n    let res;\n\n    for (var i = 0; i < min; i++) {\n      const num = parseInt(k1[i], 10) - parseInt(k2[i], 10);\n\n      if (num === 0 && i !== min - 1) {\n        continue;\n      } else {\n        res = num;\n        break;\n      }\n    }\n\n    return res;\n  }\n\n  _createMarkElement() {\n    const tagName = this.options.tagName;\n    const node = document.createElement(tagName);\n    return node;\n  }\n\n  _createDOMTree(range) {\n    const cnode = range.commonAncestorContainer;\n    const snode = range.startContainer;\n    const enode = range.endContainer;\n    let constructor = {};\n    let startkey = '';\n    let endkey = '';\n\n    function cb(parent, obj, key) {\n      parent.childNodes.forEach((child, index) => {\n        const k = key ? `${key}-${index}` : `${index}`;\n\n        if (child === snode) {\n          startkey = k;\n        }\n\n        if (child === enode) {\n          endkey = k;\n        }\n\n        obj[k] = {};\n        obj[k].node = child;\n\n        if (child.nodeType !== 3) {\n          obj[k].child = {};\n          cb(child, obj[k].child, k);\n        }\n      });\n    }\n\n    cb(cnode, constructor);\n    return {\n      constructor,\n      startkey,\n      endkey\n    };\n  }\n\n}\n\n//# sourceURL=webpack://Proofread/../lib/mark.js?");

/***/ }),

/***/ "../lib/utils/index.js":
/*!*****************************!*\
  !*** ../lib/utils/index.js ***!
  \*****************************/
/*! exports provided: hasNodeName, getKey, hasOnlyLinefeed, removeExtraSpace, hasChild, log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasNodeName\", function() { return hasNodeName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getKey\", function() { return getKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasOnlyLinefeed\", function() { return hasOnlyLinefeed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeExtraSpace\", function() { return removeExtraSpace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasChild\", function() { return hasChild; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\nfunction hasNodeName(elem, name) {\n  return new RegExp(`^${name}$`, 'i').test(elem.nodeName);\n}\nfunction getKey() {\n  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];\n  let str = '';\n\n  for (let i = 0; i < 13; i++) {\n    const index = Math.round(Math.random() * (arr.length - 1));\n    str += arr[index];\n  }\n\n  return str;\n} // 只有换行符和空字符\n\nfunction hasOnlyLinefeed(value) {\n  return /^(\\s*)\\n+(\\s*)$/.test(value);\n} // 清除不可见的空字符\n\nfunction removeExtraSpace(text) {\n  if (typeof text === 'string') {\n    text = text.replace(/\\u200B/g, '');\n  }\n\n  return text;\n}\nfunction hasChild(parent, targetNode) {\n  let res;\n\n  function cb(parent) {\n    const childNodes = parent.childNodes;\n\n    for (let i = 0; i < childNodes.length; i++) {\n      const child = childNodes[i];\n\n      if (child === targetNode) {\n        res = true;\n      }\n\n      if (res !== undefined) {\n        break;\n      }\n\n      if (child.nodeType === 1) {\n        cb(child);\n      }\n    }\n  }\n\n  cb(parent);\n  return res === undefined ? false : res;\n}\nfunction log(content, name) {\n  const str = type => {\n    return `---------- ${name} ${type ? 'start' : 'end'} ----------`;\n  };\n\n  console.log(str(1));\n  console.log(content);\n  console.log(str(0));\n}\n\n//# sourceURL=webpack://Proofread/../lib/utils/index.js?");

/***/ }),

/***/ "../lib/utils/jq.js":
/*!**************************!*\
  !*** ../lib/utils/jq.js ***!
  \**************************/
/*! exports provided: hasClass, addClass, removeClass, insertAfter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasClass\", function() { return hasClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addClass\", function() { return addClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeClass\", function() { return removeClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertAfter\", function() { return insertAfter; });\nfunction hasClass(elem, cls) {\n  cls = cls || \"\";\n  if (cls.replace(/\\s/g, \"\").length == 0) return false; //当cls没有参数时，返回false\n\n  return new RegExp(\" \" + cls + \" \").test(\" \" + elem.className + \" \");\n}\nfunction addClass(elem, cls) {\n  if (!hasClass(elem, cls)) {\n    elem.className = elem.className == \"\" ? cls : elem.className + \" \" + cls;\n  }\n}\nfunction removeClass(elem, cls) {\n  if (hasClass(elem, cls)) {\n    var newClass = \" \" + elem.className.replace(/[\\t\\r\\n]/g, \"\") + \" \";\n\n    while (newClass.indexOf(\" \" + cls + \" \") >= 0) {\n      newClass = newClass.replace(\" \" + cls + \" \", \" \");\n    }\n\n    elem.className = newClass.replace(/^\\s+|\\s+$/g, \"\");\n  }\n}\nfunction insertAfter(newnode, node) {\n  const parent = node.parentNode;\n\n  if (parent.lastChild == node) {\n    parent.appendChild(newnode);\n  } else {\n    parent.insertBefore(newnode, node.nextSibling);\n  }\n}\n\n//# sourceURL=webpack://Proofread/../lib/utils/jq.js?");

/***/ })

/******/ })["default"];
});