import { LitElement, html, css } from 'lit'

export class TypeCode extends LitElement {
  static properties = {
    content: {},
    contentTyped: { state: true },
  }

  static styles = [
    css`
      pre{
        box-shadow: 0px 0px 0.5em 0.5em rgba(0,0,0,0.25);
        -webkit-box-shadow: 0px 0px 0.5em 0.5em rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 0.5em 0.5em rgba(0,0,0,0.25);
        padding: 0.5em;
        color: #00cc00;
        text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
        backdrop-filter: blur(10px);
      }
    `,
  ]

  handleTyping() {
    if (this.content.length) {
      this.contentTyped += this.content.charAt(0)
      this.content = this.content.substring(1)
    } else {
      clearInterval(this.typeTimer)
    }
  }

  constructor() {
    super()
    this.contentTyped = ''
    this.content = null
  }

  firstUpdated() {
    super.firstUpdated()
    this.typeTimer = setInterval(() => this.handleTyping(), 50)
  }

  disconnectedCallback() {
    clearInterval(this.typeTimer)
  }

  render() {
    const {
      contentTyped
    } = this
    return html`
      <pre>
${contentTyped}
      </pre>
    `
  }
}

!window.customElements.get('type-code') && window.customElements.define('type-code', TypeCode)
