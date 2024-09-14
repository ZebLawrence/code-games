import { LitElement, css, html } from 'lit'
import siteConfig from '../../site-config'

const elementName = 'home-page-two-four'

export const home2024 = {
  tag: elementName,
  title: '2024 Challenges',
  path: '#/2024/',
}

export class HomePageTwoFour extends LitElement {
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
    this.title = home2024.title
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">
        <h1>${title}</h1>
        <ul>
          ${siteConfig.groups['2024'].map(({ title, path }) => html`<li><sp-link href=${path}>${title}</sp-link></li>`)}
        </ul>
      </div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePageTwoFour)
