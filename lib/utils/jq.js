export function hasClass(elem, cls) {
  cls = cls || ""
  if (cls.replace(/\s/g, "").length == 0) return false //当cls没有参数时，返回false
  return new RegExp(" " + cls + " ").test(" " + elem.className + " ")
}

export function addClass(elem, cls) {
  if (!hasClass(elem, cls)) {
    elem.className = elem.className == "" ? cls : elem.className + " " + cls
  }
}

export function removeClass(elem, cls) {
  if (hasClass(elem, cls)) {
    var newClass = " " + elem.className.replace(/[\t\r\n]/g, "") + " "
    while (newClass.indexOf(" " + cls + " ") >= 0) {
      newClass = newClass.replace(" " + cls + " ", " ")
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, "")
  }
}
