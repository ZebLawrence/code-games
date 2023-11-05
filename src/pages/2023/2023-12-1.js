import { LitElement, css, html } from 'lit'

/* playground-hide */
const elementName = 'day-one-two-three'

export const dayOne2023 = {
  tag: elementName,
  title: '2023 Day One',
  path: '#/2023/day-one/',
  codeFileName: '2023-12-1.js',
}
/* playground-hide-end */

export class DayOne extends LitElement {
  static properties = {
    title: { type: String }
  }
  
  static styles = [css`
    .card{
      border: 1px solid red;
    }
  `]
  
  constructor() {
    super()
  }
  
  problemHandler(input) {
    // Some code
  }

  render() {
    const {
      title
    } = this

  return html`
      <div class="card">
        Actual page content
      </div>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayOne)
