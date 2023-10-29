import { LitElement, css, html } from 'lit'

const elementName = 'home-page'

export class HomePage extends LitElement {
  static properties = {
    title: { type: String }
  }

  static styles = [
    css`
      .card{
        border: 1px solid red;
      }
    `
  ]

  constructor() {
    super()
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">Home</div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePage)
