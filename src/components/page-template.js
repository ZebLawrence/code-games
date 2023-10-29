import { LitElement, css, html } from 'lit'
import siteConfig from '../site-config'

export class PageTemplate extends LitElement {
  static properties = {
    title: { type: String }
  }

  static styles = [
    css`
      .container{
        //width: 100%;
        //height: 100%;
      }
    `
  ]

  constructor() {
    super()
    this.title = 'Code Games'
  }

  firstUpdated() {
    super.firstUpdated()
    document.title = this.title
  }

  render() {
    const {
      title
    } = this
    const {
      pagesConfig
    } = siteConfig

    return html`
      <main class="container">
        <header>
          <h1>${title}</h1>
          <nav>
            <ul>
              ${pagesConfig.map(({ path, title }) => {
                return html`
                  <li><a href=${path}>${title}</a></li>
                `
              })}
            </ul>
          </nav>
        </header>
        <slot></slot>
      </main>
    `
  }

}

!window.customElements.get('page-template') && window.customElements.define('page-template', PageTemplate)
