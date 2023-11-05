import { LitElement, css, html } from 'lit'
import '@spectrum-web-components/top-nav/sp-top-nav.js'
import '@spectrum-web-components/top-nav/sp-top-nav-item.js'
import '@spectrum-web-components/action-menu/sync/sp-action-menu.js'
import '@spectrum-web-components/menu/sp-menu-item.js'
import '@spectrum-web-components/menu/sp-menu-divider.js'
import '@spectrum-web-components/picker/sp-picker.js'
import '@spectrum-web-components/link/sp-link.js'
import '@spectrum-web-components/sidenav/sp-sidenav.js'
import '@spectrum-web-components/sidenav/sp-sidenav-item.js'
import siteConfig from '../site-config'
import { buildMenu } from './menu'
import codeLogo from '../assets/console.svg'
import './my-playground'

export class PageTemplate extends LitElement {
  static properties = {
    title: { type: String },
    codeFileName: { type: String },
    adventUrl: { type: String },
  }

  static styles = [
    css`
      h1{
        margin-top: 0;
        margin-bottom: 0;
      }
      h1 .logo{
        height: 50px;
      }
      nav{
        margin-bottom: 1em;
      }
      .container{
        padding-left: 1em;
        padding-right: 1em;
        width: 100vw;
        height: 100vh;
        min-height: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: hidden;
        position: relative;
      }
      footer{
        position: absolute;
        bottom: 0px;
        width: calc(100% - 2em);
        display: flex;
        justify-content: space-between;
      }
      footer .links sp-link:not(:last-child)::after{
        content: '|';
        padding: 0.5em;
        color: rgba(var(--spectrum-gray-300-rgb));
      }
    `
  ]

  constructor() {
    super()
    this.title = 'Some Code'
    this.codeFileName = null
    this.adventUrl = null
  }

  firstUpdated() {
    super.firstUpdated()
    document.title = this.title
  }

  render() {
    const {
      codeFileName,
      adventUrl,
    } = this
    const {
      main,
      groups
    } = siteConfig

    const menus = Object.entries(groups).map(buildMenu)
    console.log('The render template')
    return html`
      <main class="container">
        <header>
          <nav>
            <sp-top-nav>
              <h1><img class="logo" src=${codeLogo} alt="console prompt graphic"/></h1>
              ${main.map(({ path, title }) => {
                return html`<sp-top-nav-item href=${path}>${title}</sp-top-nav-item>`
              })}
              ${menus}
            </sp-top-nav>
          </nav>
        </header>
        <slot></slot>
        <footer>
          <my-playground codeFileName=${codeFileName}></my-playground>
          ${adventUrl && html`<sp-link quiet target="_blank" href=${adventUrl}>This Puzzle</sp-link>`}
          <div class="links">
            <sp-link quiet target="_blank" href="https://adventofcode.com/2022/leaderboard/private/view/1083410">Private Leaderboard</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2020">2020</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2021">2021</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2022">2022</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2023">2023</sp-link>
          </div>
        </footer>
      </main>
    `
  }

}

!window.customElements.get('page-template') && window.customElements.define('page-template', PageTemplate)
