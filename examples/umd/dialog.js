function dialog(options){
  const tpl = `
    <div id="dialog" class="dialog">
      <div class="dialog-body">
        <div class="dialog-main">${options.content}</div>
        <div class="dialog-button">
          <button>取消</button>
          <button>保存</button>
        </div>
      </div>
    </div>
  `
  const divElem = document.createElement('div')
  divElem.innerHTML = tpl
  document.body.appendChild(divElem)

  let buttons

  if (divElem) {
    buttons = divElem.querySelectorAll('button')
    buttons[1].onclick = () => {
      if (options.sure) {
        options.sure(divElem)
      }
      document.body.removeChild(divElem)
    }
    buttons[0].onclick = () => {
      if (options.cancel) {
        options.cancel(divElem)
      }
      document.body.removeChild(divElem)
    }
  }

  return divElem
}
