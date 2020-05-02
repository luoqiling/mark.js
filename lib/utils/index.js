export function hasNodeName(elem, name){
  return new RegExp(`^${name}$`,'i').test(elem.nodeName)
}

export function getKey(){
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let str = ''
  for (let i = 0; i < 13; i++) {
    const index = Math.round(Math.random() * (arr.length - 1))
    str += arr[index]
  }
  return str
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

export function log(content, name) {
  const str = type => {
    return `---------- ${name} ${type ? 'start' : 'end'} ----------`
  }
  console.log(str(1))
  console.log(content)
  console.log(str(0))
}
