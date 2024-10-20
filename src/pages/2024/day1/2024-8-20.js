import { css, html, LitElement } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import '../../../components/shadow-card'

/* playground-hide */
const elementName = 'day-one-two-four'
export const dayOne2024 = {
  tag: elementName,
  title: '2014 Day One',
  path: '#/2024/day-one/',
  codeFileName: '2024-8-20.js',
  adventUrl: 'https://adventofcode.com',
}
/* playground-hide-end */

export class DayOne extends LitElement {
  static properties = {
    ...super.properties,
    shadowLengthX: { state: true },
    shadowLengthY: { state: true },
    blur: { state: true },
  }
/* playground-hide */
  static styles = [
    css`
      shadow-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 70vh;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({})
    this.shadowLengthX = 100
    this.shadowLengthY = 100
    this.blur = 0;
    document.addEventListener('mousemove', this.handleMouseMove);
  }
  
  firstUpdated(props) {
    super.firstUpdated(props)
    this.textDiv = this.shadowRoot.getElementById('textDiv')
  }
  
  handleMouseMove = ({ x, y }) => {
    const { x: targetX, y: targetY } = this.textDiv.getBoundingClientRect()
    const xOffset = targetX - x
    const yOffset = targetY - y
    this.shadowLengthX = xOffset * 0.1
    this.shadowLengthY = yOffset * 0.1
    this.blur = Math.sqrt(xOffset ** 2 + yOffset ** 2) * 0.05
  }

  updated(updates) {
    super.updated(updates)
  }

  render() {
    const {
      shadowLengthX,
      shadowLengthY,
      blur
    } = this

    const shadowStyles = {
      textShadow: `${shadowLengthX}px ${shadowLengthY}px ${blur}px white`
    }

    return html`
      <shadow-card>
        <div class="content">something</div>
      </shadow-card>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayOne)
