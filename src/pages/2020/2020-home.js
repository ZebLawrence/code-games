import { LitElement, css, html } from 'lit'

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
          <li><sp-link href="#/2020/day-one/">Day One</sp-link></li>
        </ul>
      </div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePageTwoZero)
