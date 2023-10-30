import { LitElement, html, nothing, css } from 'lit'

export class MyCollapse extends LitElement {
  static properties = {
    isOpen: { type: Bool },
  }

  static styles = [
    css``,
  ]

  constructor() {
    super()
    this.isOpen = false
  }

  render() {
    const {
      isOpen
    } = this


    return html`
      <div>
        
      </div>
    `
  }

}

!window.customElements.get('my-collapse') && window.customElements.define('my-collapse', MyCollapse)
