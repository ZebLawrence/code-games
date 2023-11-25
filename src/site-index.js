import { LitElement, css, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import '@spectrum-web-components/styles/all-medium-darkest.css'
import '@spectrum-web-components/theme/sp-theme.js'
import '@spectrum-web-components/theme/src/themes.js'
import { isCurrentPage } from './utils/pathHelpers'
import siteConfig from './site-config'
import './components/page-template'

const elementName = 'site-index'

export class SiteIndex extends LitElement {
  static properties = {
    currentUrl: { }
  }

  static styles = []

  constructor() {
    super()
    this.currentUrl = ''
  }

  handleHashChange({ newURL }) {
    this.currentUrl = newURL
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("hashchange", event => this.handleHashChange(event));
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('hashchange', event => this.handleHashChange(event));
  }

  render() {
    const {
      pagesConfig
    } = siteConfig;

    return html`
      <sp-theme color="dark" scale="large">
        ${pagesConfig.filter(p => isCurrentPage(p.path)).map(({ tag, title, codeFileName, adventUrl }) => {
          return html`
            <page-template pageTitle=${title} codeFileName=${codeFileName} adventUrl=${adventUrl}>
              ${unsafeHTML(`<${tag}></${tag}>`)}
            </page-template>
          `
        })}
      </sp-theme>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, SiteIndex)
