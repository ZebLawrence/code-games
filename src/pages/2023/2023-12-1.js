import { LitElement, css, html } from 'lit'

const elementName = 'day-one'

export const dayOne2023 = {
  tag: elementName,
  title: '2023 Day One',
  path: '/2023/day-one/',
}

export class DayOne extends LitElement {
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
      <div class="card">Actual page content</div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayOne)
