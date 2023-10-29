import { LitElement, css, html } from 'lit'

const elementName = 'day-two'

export const dayTwo2023 = {
  tag: elementName,
  title: '2023 Day Two',
  path: '/2023/day-two/',
}

export class DayTwo extends LitElement {
  static properties = {
    title: { type: String }
  }

  static styles = [
    css`
      .card{
        //border: 1px solid red;
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
      <div class="card">Actual page content day 2</div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwo)
