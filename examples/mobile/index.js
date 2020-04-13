var proofread = new Proofread(document.querySelector('#textarea'))
var $tbody = document.querySelector('#tbody')

const proofreadList = [
  {"content":"广东是岭南文化","startOffset":0,"endOffset":7,"length":7,"points":[],"key":"wLe2DLTAJAxGG","type":"modify"},
  {"content":"缺漏","startOffset":14,"endOffset":14,"length":0,"points":[],"key":"nVoiFGpugJa2H","type":"missing"},
  {"content":"缺漏","startOffset":15,"endOffset":15,"length":0,"points":[],"key":"VMgKKzeqPFEvF","type":"missing"},
  {"content":"古代“粤”、“越”通用","startOffset":73,"endOffset":84,"length":11,"points":[4,5],"key":"jQOuMQKBNYtlL","type":"exchange"},
  {"content":"南越","startOffset":155,"endOffset":157,"length":2,"points":[0],"key":"TIMNsN45JcoX7","type":"exchange"},
  {"content":"就是多种文化汇合并存的地方。\n广东历史久远，","startOffset":288,"endOffset":310,"length":22,"points":[],"key":"c04uoxcv1s5ml","type":"modify"}
]

dialog({
  content: '<span>先</span><a href="javascript:;"></a><span>秦</span><a href="javascript:;"></a><span>古</span><a href="javascript:;"></a><span>籍</span><a href="javascript:;"></a><span>对</span><a href="javascript:;"></a><span>长</span><a href="javascript:;"></a><span>江</span><a href="javascript:;"></a><span>以</span><a href="javascript:;"></a><span>南</span><a href="javascript:;"></a><span>沿</span><a href="javascript:;"></a><span>海</span><a href="javascript:;"></a><span>一</span><a href="javascript:;"></a><span>带</span><a href="javascript:;"></a><span>的</span><a href="javascript:;"></a><span>部</span><a href="javascript:;"></a><span>族</span>'
})

proofread.automark(proofreadList, {
  afterEach(data) {
    console.log(JSON.stringify(data))
    renderTbody(data)
  },
  after() {
    console.log('automark end')
  }
})

var $modify = document.querySelector('#modify')
var $exchange = document.querySelector('#exchange')

$modify.addEventListener('click', () => {
  const data = proofread.mark('modify')
  console.log(JSON.stringify(data))
  renderTbody(data)
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
          const data = proofread.mark('exchange', { points })
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
