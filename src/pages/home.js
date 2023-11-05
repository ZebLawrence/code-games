import { LitElement, css, html } from 'lit'

const elementName = 'home-page'

export const home = {
  tag: elementName,
  title: 'Home',
  path: '/',
}

export class HomePage extends LitElement {
  static properties = {
    title: { type: String }
  }

  static styles = [
    css`
      .card{
        // border: 1px solid red;
      }
    `
  ]

  constructor() {
    super()
    this.title = home.title
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">${title}</div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePage)
