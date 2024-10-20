import { html, LitElement } from 'lit'

const elementName = 'shadow-card'

export class ShadowCard extends LitElement {
  static properties = {
    ...super.properties,
    shadowLengthX: { state: true },
    shadowLengthY: { state: true },
    blur: { state: true }
  }

  constructor() {
    super({})
    this.shadowLengthX = 100
    this.shadowLengthY = 100
    this.blur = 0;
    document.addEventListener('mousemove', this.handleMouseMove);
  }
  
  firstUpdated(props) {
    super.firstUpdated(props)
    this.slotChild = this.shadowRoot.querySelector('slot').assignedElements()[0];
  }
  
  handleMouseMove = ({ x, y }) => {
    const { width, height, x: targetX, y: targetY } = this.slotChild.getBoundingClientRect();
    const centerX = targetX + width / 2;
    const centerY = targetY + height / 2;
    const xOffset = centerX - x
    const yOffset = centerY - y
    this.shadowLengthX = xOffset * 0.1
    this.shadowLengthY = yOffset * 0.1
    this.blur = (Math.sqrt(xOffset ** 2 + yOffset ** 2) * 0.01) + 3
    const slotChildStyle = window.getComputedStyle(this.slotChild);
    const slotChildColor = slotChildStyle.color;
    this.slotChild.style.textShadow = `${this.shadowLengthX}px ${this.shadowLengthY}px ${this.blur}px ${slotChildColor}`
  }

  render() {
    return html`
      <my-card>
        <slot></slot>
      </my-card>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, ShadowCard)
