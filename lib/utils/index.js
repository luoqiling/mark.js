export function hasNodeName(elem, name){
  return new RegExp(`^${name}$`,'i').test(elem.nodeName)
}

export function getKey(){
  return Date.now() + Math.floor(Math.random()*10000000000)
}

// 只有换行符和空字符
export function hasOnlyLinefeed(value){
  return /^(\s*)\n+(\s*)$/.test(value)
}

// 清除不可见的空字符
export function removeExtraSpace(text) {
  if (typeof text === 'string') {
    text = text.replace(/\u200B/g,'')
  }
  return text
}
