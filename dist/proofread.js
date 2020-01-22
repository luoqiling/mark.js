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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Proofread; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"../lib/utils/index.js\");\n/* harmony import */ var _utils_jq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/jq */ \"../lib/utils/jq.js\");\n\n\nclass Proofread {\n  constructor(textareaElem) {\n    if (textareaElem === null) {\n      console.error('textareaElem does not exist');\n      return;\n    }\n\n    this.textareaElem = textareaElem;\n    this.exchangeData = {\n      points: []\n    };\n  }\n\n  mark(type, options) {\n    return new Promise((resolve, reject) => {\n      if (type === 'exchange') {\n        if (options && options.points && options.points.length > 0) {\n          this.exchangeData.points = options.points.sort((a, b) => a - b);\n        } else {\n          console.error('no points of exchange');\n          return;\n        }\n      }\n\n      this._mark(type).then(data => {\n        resolve(data);\n      }).catch(error => {\n        reject(error);\n      });\n    });\n  }\n\n  markAll(list, options) {\n    if (list && list.length > 0) {\n      let index = 0;\n\n      const draw = () => {\n        const data = list[index];\n\n        const rangeData = this._getRangeData(data);\n\n        const selection = window.getSelection();\n        const range = window.document.createRange();\n        const sr = rangeData.startRange;\n        const er = rangeData.endRange;\n        range.setStart(sr.node, sr.offset);\n        range.setEnd(er.node, er.offset);\n        selection.addRange(range);\n\n        this._mark(data.type, data).then(data => {\n          options && options.afterEach && options.afterEach(data);\n\n          if (++index <= list.length - 1) {\n            draw();\n          } else {\n            options && options.after && options.after();\n          }\n        });\n      }; // 开始标记前，清除所有选中状态（按钮和输入框被点击后也是选中状态）\n\n\n      window.getSelection().removeAllRanges();\n      draw();\n    }\n  }\n\n  getContent() {\n    const selection = window.getSelection();\n    const range = selection.getRangeAt(0);\n    let text = '';\n\n    if (range) {\n      text = range.toString();\n    }\n\n    return text.replace(/\\s/g, '').trim();\n  }\n\n  innerText() {\n    let content = '';\n\n    const count = nodes => {\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          content += node.nodeValue;\n        } else if (node.nodeType === 1) {\n          count(node.childNodes);\n\n          if (_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](node, 'p')) {\n            content += '\\n';\n          }\n        }\n      }\n    };\n\n    count(this.textareaElem.childNodes); // 清除不可见的空字符\n\n    return content.replace(/\\u200B/g, '');\n  }\n\n  _mark(type, extendData) {\n    const selection = window.getSelection();\n    const range = selection.getRangeAt(0);\n    const hasOneOffset = range.startContainer === range.endContainer && range.startOffset === range.endOffset;\n\n    if (hasOneOffset) {\n      const fontELem = window.document.createElement('font');\n      fontELem.face = 'initial';\n      range.insertNode(fontELem);\n    } else {\n      window.document.execCommand(\"fontName\", false, 'initial');\n    }\n\n    selection.removeAllRanges();\n    return new Promise((resolve, reject) => {\n      const time = 1000;\n      const stime = new Date() * 1;\n\n      const timing = () => {\n        setTimeout(() => {\n          const targetElems = this._getElems();\n\n          if (targetElems.length > 0) {\n            const startElem = targetElems[0];\n            const endElem = targetElems[targetElems.length - 1];\n\n            const data = extendData || this._getData(startElem, endElem);\n\n            data.points = extendData && extendData.points || this.exchangeData.points;\n            data.key = extendData && extendData.key || _utils__WEBPACK_IMPORTED_MODULE_0__[\"getKey\"]();\n            data.type = type;\n\n            if (!extendData && hasOneOffset) {\n              data.content = '缺漏';\n              data.type = 'missing';\n            }\n\n            this._setElems(targetElems, data);\n\n            resolve(data);\n          } else {\n            const ctime = new Date() * 1;\n\n            if (ctime - stime >= time) {\n              reject(new Error('targetElems does not exist'));\n            } else {\n              timing();\n            }\n          }\n        }, 50);\n      };\n\n      timing();\n    });\n  }\n\n  _getElems() {\n    const allTargetElems = this.textareaElem.querySelectorAll('font');\n    const targetElems = Array.prototype.filter.call(allTargetElems, elem => {\n      return _utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](elem, 'font') && elem.face == 'initial' && !elem.getAttribute('proofreadKey');\n    });\n    return targetElems;\n  }\n\n  _setElems(elems, data) {\n    if (elems && elems.length > 0) {\n      const draw = data.type === 'exchange' ? this._drawExchange(data) : null;\n      elems.forEach(elem => {\n        elem.setAttribute('proofreadKey', data.key);\n        elem.setAttribute('proofreadType', data.type);\n        _utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"](elem, `proofread-error proofread-${data.type}`);\n        draw && draw(elem);\n      });\n    }\n  }\n\n  _drawExchange(data) {\n    let index = 0;\n    const points = data && data.points || this.exchangeData.points;\n    const text = data && data.content.replace(/\\s/g, '');\n    return function fn(elem) {\n      const nodes = Array.prototype.slice.call(elem.childNodes);\n\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          const value = node.nodeValue;\n          const fNode = document.createDocumentFragment();\n\n          for (let i = 0; i < value.length; i++) {\n            let className = '';\n            const iElem = document.createElement('i');\n            iElem.innerHTML = value.charAt(i);\n\n            if (index == 0) {\n              className = 'left';\n            } else if (index === text.length - 1) {\n              className = 'right';\n            }\n\n            _utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"](iElem, className);\n\n            if (index == points[0]) {\n              className = 'focus focus1';\n            } else if (points[1] && index === points[1] + 1) {\n              className = 'focus focus2';\n            } else if (index < points[0] || points[1] && index > points[1] + 1) {\n              className = 'top';\n            } else {\n              className = 'bottom';\n            }\n\n            _utils_jq__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"](iElem, className);\n            iElem.setAttribute('proofreadType', data.type);\n            fNode.appendChild(iElem);\n            index++;\n          }\n\n          node.parentNode.replaceChild(fNode, node);\n        } else if (node.nodeType === 1) {\n          fn(node);\n        }\n      }\n    };\n  }\n\n  _getData(startElem, endElem) {\n    let sum = 0;\n    let content = '';\n    let startOffset = null;\n    let endOffset = null;\n    let length = null;\n\n    const count = (nodes, startElem, endElem) => {\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          const text = node.nodeValue;\n          sum += text.length;\n          content += startOffset !== null ? text : '';\n        } else if (node.nodeType === 1) {\n          if (node === startElem) {\n            startOffset = sum;\n          }\n\n          if (node === endElem) {\n            const text = node.innerText;\n            endOffset = sum + text.length;\n            length = endOffset - startOffset;\n            content += text;\n          }\n\n          if (endOffset !== null) break;\n          count(node.childNodes, startElem, endElem);\n\n          if (!endOffset && _utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](node, 'p')) {\n            sum++;\n            content += '\\n';\n          }\n        }\n      }\n    };\n\n    count(this.textareaElem.childNodes, startElem, endElem);\n    return {\n      content: content.trim(),\n      startOffset,\n      endOffset,\n      length\n    };\n  }\n\n  _getRangeData(data) {\n    let sum = 0;\n    let startRange = null;\n    let endRange = null;\n\n    const count = nodes => {\n      for (let i = 0; i < nodes.length; i++) {\n        const node = nodes[i];\n\n        if (node.nodeType === 3 && !_utils__WEBPACK_IMPORTED_MODULE_0__[\"hasOnlyLinefeed\"](node.nodeValue)) {\n          const length = node.nodeValue.length;\n          const sum2 = sum;\n          sum += length;\n\n          if (!startRange && sum >= data.startOffset) {\n            const offset = data.startOffset - sum2;\n            startRange = {\n              node,\n              offset: offset < 0 ? 0 : offset\n            };\n          }\n\n          if (!endRange && sum >= data.endOffset) {\n            const offset = data.endOffset - sum2;\n            endRange = {\n              node,\n              offset: offset < 0 ? 0 : offset\n            };\n          }\n\n          if (endRange !== null) break;\n        } else if (node.nodeType === 1) {\n          count(node.childNodes);\n\n          if (!endRange && _utils__WEBPACK_IMPORTED_MODULE_0__[\"hasNodeName\"](node, 'p')) {\n            sum++;\n          }\n        }\n      }\n    };\n\n    count(this.textareaElem.childNodes);\n    return {\n      startRange,\n      endRange\n    };\n  }\n\n}\n\n//# sourceURL=webpack://Proofread/../lib/index.js?");

/***/ }),

/***/ "../lib/utils/index.js":
/*!*****************************!*\
  !*** ../lib/utils/index.js ***!
  \*****************************/
/*! exports provided: hasNodeName, getKey, hasOnlyLinefeed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasNodeName\", function() { return hasNodeName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getKey\", function() { return getKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasOnlyLinefeed\", function() { return hasOnlyLinefeed; });\nfunction hasNodeName(elem, name) {\n  return new RegExp(`^${name}$`, 'i').test(elem.nodeName);\n}\nfunction getKey() {\n  return new Date() * 1 + Math.floor(Math.random() * 10000000000);\n} // 只有换行符和空字符\n\nfunction hasOnlyLinefeed(value) {\n  return /^(\\s*)\\n+(\\s*)$/.test(value);\n}\n\n//# sourceURL=webpack://Proofread/../lib/utils/index.js?");

/***/ }),

/***/ "../lib/utils/jq.js":
/*!**************************!*\
  !*** ../lib/utils/jq.js ***!
  \**************************/
/*! exports provided: hasClass, addClass, removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasClass\", function() { return hasClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addClass\", function() { return addClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeClass\", function() { return removeClass; });\nfunction hasClass(elem, cls) {\n  cls = cls || \"\";\n  if (cls.replace(/\\s/g, \"\").length == 0) return false; //当cls没有参数时，返回false\n\n  return new RegExp(\" \" + cls + \" \").test(\" \" + elem.className + \" \");\n}\nfunction addClass(elem, cls) {\n  if (!hasClass(elem, cls)) {\n    elem.className = elem.className == \"\" ? cls : elem.className + \" \" + cls;\n  }\n}\nfunction removeClass(elem, cls) {\n  if (hasClass(elem, cls)) {\n    var newClass = \" \" + elem.className.replace(/[\\t\\r\\n]/g, \"\") + \" \";\n\n    while (newClass.indexOf(\" \" + cls + \" \") >= 0) {\n      newClass = newClass.replace(\" \" + cls + \" \", \" \");\n    }\n\n    elem.className = newClass.replace(/^\\s+|\\s+$/g, \"\");\n  }\n}\n\n//# sourceURL=webpack://Proofread/../lib/utils/jq.js?");

/***/ })

/******/ })["default"];
});