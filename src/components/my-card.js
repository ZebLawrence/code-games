import { LitElement, html, css, nothing } from 'lit'
import '@spectrum-web-components/banner/sp-banner.js'

export class MyCard extends LitElement {
  static properties = {
    label: {}
  }

  static styles = [
    css`
      :host{
        display: flex;
        flex-basis: 100%;
        margin-left: 1em;
      }
      .card{
        position: relative;
        width: 100%;
        padding: 1em;
        border-radius: 1em;
        box-shadow: 0px 0px 1em 1em rgba(0,0,0,0.25) inset;
        -webkit-box-shadow: 0px 0px 1em 1em rgba(0,0,0,0.25) inset;
        -moz-box-shadow: 0px 0px 1em 1em rgba(0,0,0,0.25) inset;
      }
      sp-banner{
        box-shadow: 0px 0px 0.3em 0.3em rgba(0,0,0,0.25);
        -webkit-box-shadow: 0px 0px 0.3em 0.3em rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 0.3em 0.3em rgba(0,0,0,0.25);
      }
    `,
  ]

  constructor() {
    super()
    this.label = null
  }

  render() {
    const {
      label,
    } = this

    const banner = label
      ? html`
        <div>
          <sp-banner corner>
            <div slot="header">${label}</div>
          </sp-banner>
        </div>
      `
      : nothing

    return html`
      <div class="card">
        ${banner}
        <slot></slot>
      </div>
    `
  }
}

!window.customElements.get('my-card') && window.customElements.define('my-card', MyCard)
