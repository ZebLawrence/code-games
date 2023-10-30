import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import '@spectrum-web-components/top-nav/sp-top-nav.js'
import '@spectrum-web-components/top-nav/sp-top-nav-item.js'
import '@spectrum-web-components/action-menu/sync/sp-action-menu.js'
import '@spectrum-web-components/menu/sp-menu-item.js'
import '@spectrum-web-components/menu/sp-menu-divider.js'
import '@spectrum-web-components/picker/sp-picker.js'
import '@spectrum-web-components/link/sp-link.js'
import '@spectrum-web-components/sidenav/sp-sidenav.js'
import '@spectrum-web-components/sidenav/sp-sidenav-item.js'
import 'playground-elements/playground-ide.js'
import 'playground-elements/playground-project.js'
import 'playground-elements/playground-file-editor.js'
import playgroundStyle from 'playground-elements/themes/monokai.css?inline'
import siteConfig from '../site-config'
import { buildMenu } from './menu'

export class PageTemplate extends LitElement {
  static properties = {
    title: { type: String },
    codeFileName: { type: String },
  }

  static styles = [
    unsafeCSS(playgroundStyle),
    css`
      h1{
        margin-top: 0;
        margin-bottom: 0;
      }
      .container{
        padding: 1em;
        width: 100vw;
        height: 100vh;
        min-height: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: hidden;
      }
    `
  ]

  constructor() {
    super()
    this.title = 'Code Games'
    this.codeFileName = null
  }

  firstUpdated() {
    super.firstUpdated()
    document.title = this.title
  }

  render() {
    const {
      title,
      isCurrentPage,
      codeFileName
    } = this
    const {
      main,
      groups
    } = siteConfig

    const menus = Object.entries(groups).map(buildMenu)
    const playground = codeFileName
      ? html`
        <playground-project class="playground-theme-monokai" id="codeproject" project-src="./playground.config.json"></playground-project>
        <playground-file-editor
          line-numbers
          type="js"
          class="playground-theme-monokai"
          project="codeproject"
          filename=${codeFileName}
        ></playground-file-editor>
      `
      : nothing
    return html`
      <main class="container">
        <header>
          <h1>${title}</h1>
          <nav>
            <sp-top-nav>
              ${main.map(({ path, title }) => {
                return html`<sp-top-nav-item href=${path}>${title}</sp-top-nav-item>`
              })}
              ${menus}
            </sp-top-nav>
          </nav>
        </header>
        <slot></slot>
        <div>${playground}</div>
      </main>
    `
  }

}

!window.customElements.get('page-template') && window.customElements.define('page-template', PageTemplate)
