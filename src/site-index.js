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
  static properties = {}

  static styles = []

  constructor() {
    super()
  }

  render() {
    const {
      pagesConfig
    } = siteConfig;

    return html`
      <sp-theme color="dark" scale="large">
        ${pagesConfig.filter(p => isCurrentPage(p.path)).map(({ tag, title }) => {
          return html`
            <page-template title=${title}>
              ${unsafeHTML(`<${tag}></${tag}>`)}
            </page-template>
          `
        })}
      </sp-theme>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, SiteIndex)
