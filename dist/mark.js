(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Mark = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function hasNodeName(elem, name) {
    return new RegExp("^".concat(name, "$"), 'i').test(elem.nodeName);
  }
  function getKey() {
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var str = '';

    for (var i = 0; i < 13; i++) {
      var index = Math.round(Math.random() * (arr.length - 1));
      str += arr[index];
    }

    return str;
  } // 只有换行符和空字符

  function hasOnlyLinefeed(value) {
    return /^(\s*)\n+(\s*)$/.test(value);
  } // 清除不可见的空字符

  function removeExtraSpace(text) {
    if (typeof text === 'string') {
      text = text.replace(/\u200B/g, '');
    }

    return text;
  }
  function log(content, name) {
    var str = function str(type) {
      return "---------- ".concat(name, " ").concat(type ? 'start' : 'end', " ----------");
    };

    console.log(str(1));
    console.log(content);
    console.log(str(0));
  }

  function hasClass(elem, cls) {
    cls = cls || "";
    if (cls.replace(/\s/g, "").length == 0) return false; //当cls没有参数时，返回false

    return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
  }
  function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
      elem.className = elem.className == "" ? cls : elem.className + " " + cls;
    }
  }
  function insertAfter(newnode, node) {
    var parent = node.parentNode;

    if (parent.lastChild == node) {
      parent.appendChild(newnode);
    } else {
      parent.insertBefore(newnode, node.nextSibling);
    }
  }

  var Create =
  /*#__PURE__*/
  function () {
    function Create(options) {
      _classCallCheck(this, Create);

      var o = Object.assign({
        debug: false
      }, options);
      this.options = o;
    }

    _createClass(Create, [{
      key: "create",
      value: function create(tagName, options) {
        var selection = options && options.selection || window.getSelection();
        this.tagName = tagName || 'mark';
        return this._create(selection);
      }
    }, {
      key: "_create",
      value: function _create(selection) {
        var opt = this.options;
        var newNodeList = [];

        if (selection.rangeCount > 0) {
          var range = selection.getRangeAt(0);
          var snode = range.startContainer;
          var enode = range.endContainer;

          if (snode && enode) {
            if (snode === enode || snode.parentNode === enode.parentNode) {
              var newnode = this._createMarkElement();

              range.surroundContents(newnode);
              newNodeList.push(newnode);
            } else {
              var newRange = this._getRangeBy(range);

              if (opt.debug) {
                log(this._createDOMTree(range), 'tree');
                log(newRange, 'newRange');
              }

              var arr = this._surroundCrossContents(newRange);

              newNodeList = newNodeList.concat(arr);
            }
          } else if (!snode) {
            console.error('range.startContainer does not exist');
          } else if (!enode) {
            console.error('range.endContainer does not exist');
          }

          selection.removeAllRanges();
        }

        return newNodeList;
      }
    }, {
      key: "_getRangeBy",
      value: function _getRangeBy(range) {
        var cnode = range.commonAncestorContainer;
        var snode = range.startContainer;
        var enode = range.endContainer;
        var nodeList = [];
        var startkey = '';
        var endkey = '';

        function cb(parent, key) {
          var childNodes = parent.childNodes;

          for (var i = 0; i < childNodes.length; i++) {
            var k = key ? "".concat(key, "-").concat(i) : "".concat(i);
            var child = childNodes[i];

            if (endkey !== '') {
              break;
            }

            if (child === snode) {
              startkey = k;
            }

            if (child === enode) {
              endkey = k;
            }

            if (startkey !== '' && !(child.nodeType === 3 && hasOnlyLinefeed(child.nodeValue))) {
              nodeList.push(_defineProperty({}, k, child));
            }

            if (child.nodeType === 1 && (child.contains(snode) || child.contains(enode))) {
              cb(child, k);
            }
          }
        }

        cb(cnode);
        return {
          nodeList: nodeList,
          startkey: startkey,
          endkey: endkey,
          startOffset: range.startOffset,
          endOffset: range.endOffset
        };
      }
    }, {
      key: "_surroundCrossContents",
      value: function _surroundCrossContents(range) {
        var _this = this;

        var nodeList = range.nodeList;
        var startkey = range.startkey;
        var endkey = range.endkey;
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        var newNodeList = [];
        nodeList.forEach(function (object) {
          var key = Object.keys(object)[0];
          var node = object[key];
          var pnode = node.parentNode;
          var value = node.nodeValue;

          var newnode = _this._createMarkElement();

          if (_this._compare(key, startkey) > 0 && _this._compare(key, endkey) < 0) {
            if (node.nodeType === 3) {
              newnode.innerText = value;
              pnode.replaceChild(newnode, node);
            } else {
              newnode.innerHTML = node.innerHTML;
              node.innerHTML = '';
              node.appendChild(newnode);
            }

            newNodeList.push(newnode);
          } else {
            if (node.nodeType === 3) {
              var siblingnode;

              if (key === startkey) {
                siblingnode = node.nextSibling;
                newnode.innerText = value.substr(startOffset);
                node.nodeValue = value.substr(0, startOffset);

                if (siblingnode) {
                  pnode.insertBefore(newnode, siblingnode);
                } else {
                  pnode.appendChild(newnode);
                }

                newNodeList.push(newnode);
              } else if (key === endkey) {
                siblingnode = node.previousSibling;
                newnode.innerText = value.substr(0, endOffset);
                node.nodeValue = value.substr(endOffset);

                if (siblingnode) {
                  insertAfter(newnode, siblingnode);
                } else {
                  pnode.insertBefore(newnode, node);
                }

                newNodeList.push(newnode);
              }
            }
          }
        });
        return newNodeList;
      }
    }, {
      key: "_compare",
      value: function _compare(key1, key2) {
        var k1 = key1.split('-');
        var k2 = key2.split('-');
        var min = k1.length - k2.length ? k1.length : k2.length;
        var res;

        for (var i = 0; i < min; i++) {
          var num = parseInt(k1[i], 10) - parseInt(k2[i], 10);

          if (num === 0 && i !== min - 1) {
            continue;
          } else {
            res = num;
            break;
          }
        }

        return res;
      }
    }, {
      key: "_createMarkElement",
      value: function _createMarkElement() {
        var tagName = this.tagName;
        var node = document.createElement(tagName);
        return node;
      }
    }, {
      key: "_createDOMTree",
      value: function _createDOMTree(range) {
        var cnode = range.commonAncestorContainer;
        var snode = range.startContainer;
        var enode = range.endContainer;
        var constructor = {};
        var startkey = '';
        var endkey = '';

        function cb(parent, obj, key) {
          parent.childNodes.forEach(function (child, index) {
            var k = key ? "".concat(key, "-").concat(index) : "".concat(index);

            if (child === snode) {
              startkey = k;
            }

            if (child === enode) {
              endkey = k;
            }

            obj[k] = {};
            obj[k].node = child;

            if (child.nodeType !== 3) {
              obj[k].child = {};
              cb(child, obj[k].child, k);
            }
          });
        }

        cb(cnode, constructor);
        return {
          constructor: constructor,
          startkey: startkey,
          endkey: endkey
        };
      }
    }]);

    return Create;
  }();

  var Mark =
  /*#__PURE__*/
  function (_Create) {
    _inherits(Mark, _Create);

    function Mark(textareaElem, options) {
      var _this;

      _classCallCheck(this, Mark);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Mark).call(this, options));

      if (textareaElem === null) {
        throw new Error('TextareaElem does not exist');
      }

      var defaultOpt = {
        tagName: 'mark',
        debug: false
      };
      _this.options = Object.assign(defaultOpt, _this.options);
      _this.textareaElem = textareaElem;
      _this.innerData = {
        points: []
      };
      return _this;
    }

    _createClass(Mark, [{
      key: "mark",
      value: function mark(type, options) {
        if (type === 'exchange') {
          if (options && options.points && options.points.length > 0) {
            this.innerData.points = options.points.sort(function (a, b) {
              return a - b;
            });
          } else {
            throw new Error('Required parameter options.points');
          }
        }

        return this._mark(type);
      }
    }, {
      key: "automark",
      value: function automark(list, options) {
        var _this2 = this;

        if (list && list.length > 0) {
          var index = 0;

          var draw = function draw() {
            var data = list[index];

            var rangeData = _this2._getRangeData(data.startOffset, data.endOffset);

            var selection = window.getSelection();
            var range = window.document.createRange();
            var sr = rangeData.startRange;
            var er = rangeData.endRange;

            try {
              range.setStart(sr.node, sr.offset);
              range.setEnd(er.node, er.offset);
              selection.addRange(range);
            } catch (error) {
              console.error(error);
              console.error("".concat(JSON.stringify(data)));
            }

            var newdata = _this2._mark(data.type, data);

            if (options && options.afterEach) {
              options.afterEach(newdata);
            }

            if (++index <= list.length - 1) {
              draw();
            } else {
              options && options.after && options.after();
            }
          }; // 开始标记前，清除所有选中状态（按钮和输入框被点击后也是选中状态）


          window.getSelection().removeAllRanges();
          draw();
        }
      }
    }, {
      key: "getContent",
      value: function getContent() {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var text = '';

        if (range) {
          text = range.toString();
        }

        return text.replace(/\n/g, '').trim();
      }
    }, {
      key: "innerText",
      value: function innerText() {
        var content = '';

        var count = function count(nodes) {
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            if (node.nodeType === 3 && !hasOnlyLinefeed(node.nodeValue)) {
              content += node.nodeValue;
            } else if (node.nodeType === 1) {
              count(node.childNodes);

              if (hasNodeName(node, 'p')) {
                content += '\n';
              }
            }
          }
        };

        count(this.textareaElem.childNodes);
        return removeExtraSpace(content);
      }
    }, {
      key: "_mark",
      value: function _mark(type, extendData) {
        var selection = window.getSelection();
        var data;

        if (selection.rangeCount > 0) {
          var range = selection.getRangeAt(0);
          var hasOneOffset = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
          var targetElems = this.create(this.options.tagName, selection);

          if (targetElems.length > 0) {
            if (extendData) {
              data = extendData;
            } else {
              data = this._getData(targetElems[0], targetElems[targetElems.length - 1]);
              data.content = hasOneOffset ? '缺漏' : data.content;
              data.points = type === 'exchange' ? this.innerData.points : [];
              data.key = getKey();
              data.type = hasOneOffset ? 'missing' : type;
            }

            this._setElems(targetElems, data);
          }
        }

        return data;
      }
    }, {
      key: "_setElems",
      value: function _setElems(elems, data) {
        if (elems && elems.length > 0) {
          var draw = data.type === 'exchange' ? this._drawExchange(data) : null;
          elems.forEach(function (elem) {
            elem.setAttribute('markkey', data.key);
            elem.setAttribute('marktype', data.type);
            addClass(elem, "mark-error mark-".concat(data.type));
            draw && draw(elem);
          });
        }
      }
    }, {
      key: "_drawExchange",
      value: function _drawExchange(data) {
        var index = 0;
        var points = data && data.points || this.innerData.points;
        var text = data && data.content.replace(/\n/g, '');
        return function fn(elem) {
          var nodes = Array.prototype.slice.call(elem.childNodes);

          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            if (node.nodeType === 3 && !hasOnlyLinefeed(node.nodeValue)) {
              var value = node.nodeValue;
              var fNode = document.createDocumentFragment();

              for (var _i = 0; _i < value.length; _i++) {
                var className = '';
                var iElem = document.createElement('i');
                iElem.innerHTML = value.charAt(_i);

                if (index == 0) {
                  className = 'left';
                } else if (index === text.length - 1) {
                  className = 'right';
                }

                addClass(iElem, className);

                if (index == points[0]) {
                  className = 'focus focus1';
                } else if (points[1] && index === points[1] + 1) {
                  className = 'focus focus2';
                } else if (index < points[0] || points[1] && index > points[1] + 1) {
                  className = 'top';
                } else {
                  className = 'bottom';
                }

                addClass(iElem, className);
                iElem.setAttribute('marktype', data.type);
                fNode.appendChild(iElem);
                index++;
              }

              node.parentNode.replaceChild(fNode, node);
            } else if (node.nodeType === 1) {
              fn(node);
            }
          }
        };
      }
    }, {
      key: "_getData",
      value: function _getData(startElem, endElem) {
        var sum = 0;
        var content = '';
        var startOffset = null;
        var endOffset = null;
        var length = null;

        var count = function count(nodes) {
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            if (endOffset !== null) {
              break;
            }

            if (node.nodeType === 3 && !hasOnlyLinefeed(node.nodeValue)) {
              var text = removeExtraSpace(node.nodeValue);
              sum += text.length;
              content += startOffset !== null ? text : '';
            } else if (node.nodeType === 1) {
              if (node === startElem) {
                startOffset = sum;
              }

              if (node === endElem) {
                var t = node.innerText;
                endOffset = sum + t.length;
                length = endOffset - startOffset;
                content += t;
              }

              count(node.childNodes);

              if (!endOffset && hasNodeName(node, 'p')) {
                sum++;
                content += '\n';
              }
            }
          }
        };

        count(this.textareaElem.childNodes);
        return {
          content: content.trim(),
          startOffset: startOffset,
          endOffset: endOffset,
          length: length
        };
      }
    }, {
      key: "_getRangeData",
      value: function _getRangeData(startOffset, endOffset) {
        var sum = 0;
        var startRange = null;
        var endRange = null;

        var count = function count(nodes) {
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            if (endRange !== null) {
              break;
            }

            if (node.nodeType === 3 && !hasOnlyLinefeed(node.nodeValue)) {
              var sum2 = sum;
              var text = removeExtraSpace(node.nodeValue);
              sum += text.length;

              if (!startRange && sum >= startOffset) {
                var offset = startOffset - sum2;
                startRange = {
                  node: node,
                  offset: offset < 0 ? 0 : offset
                };
              }

              if (!endRange && sum >= endOffset) {
                var _offset = endOffset - sum2;

                endRange = {
                  node: node,
                  offset: _offset < 0 ? 0 : _offset
                };
              }
            } else if (node.nodeType === 1) {
              count(node.childNodes);

              if (!endRange && hasNodeName(node, 'p')) {
                sum++;
              }
            }
          }
        };

        count(this.textareaElem.childNodes);
        return {
          startRange: startRange,
          endRange: endRange
        };
      }
    }]);

    return Mark;
  }(Create);

  return Mark;

})));
