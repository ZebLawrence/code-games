
const style = 'background-color: darkblue; color: white; font-style: italic; margin-top: 5px; font-family: monospace; padding: 3px; border: 5px solid hotpink; font-size: 2em;'
const methods = {
  sus:(...args) => {
    console.log(...args)
  },
  blue:(...args) => {
    console.log(`%c${args.join(', ')}`, style)
  }
}

window.lowKey = window.lowKey || {}
window.lowKey = {...methods}
window.lowkey = {...methods}
