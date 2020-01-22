export function hasNodeName(elem, name){
  return new RegExp(`^${name}$`,'i').test(elem.nodeName)
}

export function getKey(){
  return new Date()*1 + Math.floor(Math.random()*10000000000)
}

// 只有换行符和空字符
export function hasOnlyLinefeed(value){
  return /^(\s*)\n+(\s*)$/.test(value)
}
