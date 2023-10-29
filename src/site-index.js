import { LitElement, css, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import siteConfig from './site-config'
import './components/page-template'

const elementName = 'site-index'

export class SiteIndex extends LitElement {
  static properties = {}

  static styles = []

  isCurrentPage(path) {
    const locationPath = window.location.pathname.toLowerCase().replaceAll('/', '')
    path = path.toLowerCase().replaceAll('/', '')
    console.log('The replaced', locationPath)
    return locationPath === path
  }

  constructor() {
    super()
  }

  render() {
    const {
      isCurrentPage
    } = this
    const {
      pagesConfig
    } = siteConfig;

    return html`
      <div>
        ${pagesConfig.filter(p => isCurrentPage(p.path)).map(({ tag, title }) => {
          const markup = `<${tag}></${tag}>`
          return html`
            <page-template title=${title}>
              ${unsafeHTML(markup)}
            </page-template>
          `
        })}
      </div>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, SiteIndex)
