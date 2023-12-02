import { LitElement, css, html } from 'lit'
import siteConfig from '../../site-config'

const elementName = 'home-page-twozero'

export const home2020 = {
  tag: elementName,
  title: '2020 Challenges',
  path: '#/2020/',
}

export class HomePageTwoZero extends LitElement {
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
    this.title = home2020.title
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">
        <h1>${title}</h1>
        <ul>
        ${siteConfig.groups['2020'].map(({ title, path }) => html`<li><sp-link href=${path}>${title}</sp-link></li>`)}
        </ul>
      </div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePageTwoZero)
