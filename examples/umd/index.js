var proofread = new Proofread(document.querySelector('#textarea'))

var proofreadList = [
  {"content":"广东是岭南文化","startOffset":0,"endOffset":7,"length":7,"points":[],"key":1580531678823,"type":"modify"},
  {"content":"缺漏","startOffset":14,"endOffset":14,"length":0,"points":[],"key":1587189587082,"type":"missing"},
  {"content":"缺漏","startOffset":15,"endOffset":15,"length":0,"points":[],"key":1586235321090,"type":"missing"},
  {"content":"古代“粤”、“越”通用","startOffset":73,"endOffset":84,"length":11,"points":[4,5],"key":1580395051742,"type":"exchange"},
  {"content":"南越","startOffset":155,"endOffset":157,"length":2,"points":[0],"key":1582243724962,"type":"exchange"},
  {"content":"就是多种文化汇合并存的地方。\n广东历史久远，","startOffset":288,"endOffset":310,"length":22,"points":[],"key":1583069222325,"type":"modify"}
]

proofread.markAll(proofreadList)

var $modify = document.querySelector('#modify')
var $exchange = document.querySelector('#exchange')

$modify.addEventListener('click', () => {
  proofread.mark('modify').then(data => {
    console.log(JSON.stringify(data))
  })
})

$exchange.addEventListener('click', () => {
  let points = []
  const content = proofread.getContent()
  const words = content.split('').concat()
  if (words.length > 0) {
    let str = ''
    words.forEach((word, index) => {
      const spanStr = `<span>${word}</span>`
      const aStr = '<a href="javascript:;"></a>'
      str += spanStr
      if (index !== words.length - 1) {
        str += aStr
      }
    })

    const $dialog = dialog({
      content: str,
      sure() {
        const $anchors = $dialog.querySelectorAll('a')
        $anchors.forEach((anchor, index) => {
          if (anchor.className === 'focus') {
            points.push(index)
          }
        })
        if (points.length > 0) {
          proofread.mark('exchange', { points }).then(data => {
            console.log(JSON.stringify(data))
          })
        }
      }
    })

    if ($dialog) {
      const $anchors = $dialog.querySelectorAll('a')
      const hasTwoPoints = () => Array.prototype.filter.call($anchors, a => a.className === 'focus').length >= 2
      $dialog.addEventListener('click', e => {
        const $target = e.target
        if ($target && $target.nodeName === 'A') {
          if ($target.className === 'focus') {
            $target.className = ''
          } else {
            if (!hasTwoPoints()) {
              $target.className = 'focus'
            }
          }
        }
      })
    }
  }
})
