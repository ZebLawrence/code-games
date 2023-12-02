import { LitElement, css, html } from 'lit'
import siteConfig from '../../site-config'

const elementName = 'home-page-two-three'

export const home2023 = {
  tag: elementName,
  title: '2023 Challenges',
  path: '#/2023/',
}

export class HomePageTwoThree extends LitElement {
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
    this.title = home2023.title
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">
        <h1>${title}</h1>
        <ul>
          ${siteConfig.groups['2023'].map(({ title, path }) => html`<li><sp-link href=${path}>${title}</sp-link></li>`)}
        </ul>
      </div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePageTwoThree)
