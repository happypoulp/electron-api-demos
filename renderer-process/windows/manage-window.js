const {BrowserWindow, getCurrentWindow} = require('electron').remote
const path = require('path')

// ISSUE #2: inconsistent maximize / unmaximize result (click 4 times on
// button to see the problem)
const toggleMaximizeBtn = document.getElementById("togglemaximize")
toggleMaximizeBtn.addEventListener('click', () => {
  const currentWin = getCurrentWindow()
  if (currentWin.isMaximized()) {
    currentWin.unmaximize()
  }
  else {
    currentWin.maximize()
  }
})

const manageWindowBtn = document.getElementById('manage-window')
let win

manageWindowBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/manage-modal.html')
  win = new BrowserWindow({ width: 400, height: 275 })

  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()

  function updateReply () {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    manageWindowReply.innerText = message
  }
})
