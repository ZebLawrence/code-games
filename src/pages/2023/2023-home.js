import { LitElement, css, html } from 'lit'

const elementName = 'home-page-twothree'

export const home2023 = {
  tag: elementName,
  title: '2023 Challenges',
  path: '/2023/'
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
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">HomePageTwoThree</div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePageTwoThree)
