var instance = new Mark(document.querySelector('#textarea'))
var $tbody = document.querySelector('#tbody')

const dataList = [
  {"content":"广东是岭南文化","startOffset":0,"endOffset":7,"length":7,"points":[],"key":"wLe2DLTAJAxGG","type":"modify"},
  {"content":"缺漏","startOffset":14,"endOffset":14,"length":0,"points":[],"key":"nVoiFGpugJa2H","type":"missing"},
  {"content":"缺漏","startOffset":15,"endOffset":15,"length":0,"points":[],"key":"VMgKKzeqPFEvF","type":"missing"},
  {"content":"古代“粤”、“越”通用","startOffset":73,"endOffset":84,"length":11,"points":[4,5],"key":"jQOuMQKBNYtlL","type":"exchange"},
  {"content":"南越","startOffset":155,"endOffset":157,"length":2,"points":[0],"key":"TIMNsN45JcoX7","type":"exchange"},
  {"content":"就是多种文化汇合并存的地方。\n广东历史久远，","startOffset":288,"endOffset":310,"length":22,"points":[],"key":"c04uoxcv1s5ml","type":"modify"},
  {"content":"南沿海一带的部族","startOffset":93,"endOffset":101,"length":8,"points":[],"key":"I962gtLAEXwkO","type":"delete"}
]

instance.automark(dataList, {
  afterEach(data) {
    console.log(JSON.stringify(data))
    renderTbody(data)
  },
  after() {
    console.log('automark end')
  }
})

var $modify = document.querySelector('#modify')
var $delete = document.querySelector('#delete')
var $exchange = document.querySelector('#exchange')

$modify.addEventListener('click', () => {
  const data = instance.mark('modify')
  console.log(JSON.stringify(data))
  renderTbody(data)
})

$delete.addEventListener('click', () => {
  const data = instance.mark('delete')
  console.log(JSON.stringify(data))
  renderTbody(data)
})

$exchange.addEventListener('click', () => {
  let points = []
  const content = instance.getContent()
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
          const data = instance.mark('exchange', { points })
          console.log(JSON.stringify(data))
          renderTbody(data)
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

function renderTbody(data) {
  if ($tbody) {
    const innerStr = $tbody.innerHTML
    const str =
    `<tr>
      <td>${data.key}</td>
      <td>${data.type}</td>
      <td>${data.startOffset}</td>
      <td>${data.endOffset}</td>
      <td>${data.length}</td>
      <td>${data.points}</td>
      <td>${data.content}</td>
    </tr>`
    $tbody.innerHTML = innerStr + str
  }
}
