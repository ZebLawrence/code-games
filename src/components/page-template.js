import { LitElement, css, html } from 'lit'
import '@spectrum-web-components/top-nav/sp-top-nav.js'
import '@spectrum-web-components/top-nav/sp-top-nav-item.js'
import '@spectrum-web-components/picker/sp-picker.js'
import '@spectrum-web-components/link/sp-link.js'
import '@spectrum-web-components/tags/sp-tag.js'
import '@spectrum-web-components/tags/sp-tags.js'

import siteConfig from '../site-config'
import { buildMenu, linkMenuItem, linkMenuGroup, topNavLink } from './menu'
import codeLogo from '../assets/images/console.svg'
import { backgrounds } from '../assets/images/backgrounds'
import './my-playground'

export class PageTemplate extends LitElement {
  static properties = {
    pageTitle: { type: String },
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
        backdrop-filter: blur(10px);
        position: fixed;
        width: calc(100vw - 2em);
        top: 0px;
        z-index: 10;
      }
      .container{
        padding-top: 4.5em;
        padding-bottom: 4.5em;
        padding-left: 1em;
        padding-right: 1em;
        width: 100vw;
        height: 100vh;
        min-height: 100%;
        position: relative;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 1;
      }
      .bg-image{
        position: absolute;
        width: 100vw;
        height: 100vh;
        min-height: 100%;
        background-size: cover;
        background-position: center;
        top: 0px;
        left: 0px;
        z-index: 0;
        filter: brightness(20%);
      }
      footer{
        position: fixed;
        bottom: 0px;
        width: calc(100% - 2em);
        display: flex;
        justify-content: space-between;
        backdrop-filter: blur(10px);
      }
      footer .links sp-link:not(:last-child)::after{
        content: '|';
        padding: 0.5em;
        color: rgba(var(--spectrum-gray-300-rgb));
      }
      .hide{
        visibility: hidden;
      }

      .mobile-menu{
        margin-inline-start: auto;
      }

      .mobile-menu sp-menu-item{
        margin-top: 0.5em;
      }

      @media screen and (min-width: 768px){
        nav .mobile-menu{
          display: none;
        }
      }
      @media screen and (max-width: 768px){
        .container{
          padding-left: 2em;
          padding-right: 2em;
        }
        nav{
          width: calc(100vw - 4em);
        }
        footer{
          width: calc(100% - 4em);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        #picker-m, sp-top-nav-item{
          display: none;
        }
      }
    `
  ]

  constructor() {
    super()
    this.pageTitle = 'Some Code'
    this.codeFileName = null
    this.adventUrl = null
  }

  updated(updated) {
    super.updated(updated)
    document.title = `>_ Code Games: ${this.pageTitle}`
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
    const bgIndex = Math.floor(Math.random() * backgrounds.length)
    const menus = Object.entries(groups).map(buildMenu)

    return html`
      <main class="container">
        <header>
          <nav>
            <sp-top-nav>
              <h1><img class="logo" src=${codeLogo} alt="console prompt graphic"/></h1>
              ${main.map(topNavLink)}
              ${menus}
              <!-- Mobile Menu -->
              <overlay-trigger class="mobile-menu" type="modal">
                <sp-button slot="trigger" variant="secondary">Menu</sp-button>
                <sp-tray slot="click-content">
                  <sp-dialog size="l">
                    ${main.map(linkMenuItem)}
                    ${Object.entries(groups).map(linkMenuGroup)}
                  </sp-dialog>
                </sp-tray>
              </overlay-trigger>
            </sp-top-nav>
          </nav>
        </header>
        <slot></slot>
        <footer>
          <my-playground codeFileName=${codeFileName}></my-playground>
          ${adventUrl && html`<sp-link quiet target="_blank" href=${adventUrl}>This Puzzle</sp-link>`}
          <div class="links">
            <sp-link quiet target="_blank" href="https://adventofcode.com/2023/leaderboard/private/view/1083410">Private Leaderboard</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2020">2020</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2021">2021</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2022">2022</sp-link>
            <sp-link quiet target="_blank" href="https://adventofcode.com/2023">2023</sp-link>
          </div>
        </footer>
      </main>
      ${backgrounds.map((bg, index) => {
        return html`<div class="bg-image ${index === bgIndex ? '' : 'hide'}" style="background-image: url(${bg})"></div>`
      })}
      
    `
  }

}

!window.customElements.get('page-template') && window.customElements.define('page-template', PageTemplate)
