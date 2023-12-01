import { LitElement, css, html } from 'lit'
import '@spectrum-web-components/top-nav/sp-top-nav.js'
import '@spectrum-web-components/top-nav/sp-top-nav-item.js'
import '@spectrum-web-components/picker/sp-picker.js'
import '@spectrum-web-components/link/sp-link.js'

import siteConfig from '../site-config'
import { buildMenu, linkMenuItem, linkMenuGroup, topNavLink } from './menu'
import codeLogo from '../assets/console.svg'
import bg1 from '../assets/BG_001.jpg'
import bg2 from '../assets/BG_002.jpg'
import bg3 from '../assets/BG_003.jpg'
import bg4 from '../assets/BG_004.jpg'
import bg5 from '../assets/BG_005.jpg'
import bg6 from '../assets/BG_006.jpg'
import bg7 from '../assets/BG_007.jpg'
import bg8 from '../assets/BG_008.jpg'
import bg9 from '../assets/BG_009.jpg'
import bg10 from '../assets/BG_010.jpg'
import bg11 from '../assets/BG_011.jpg'
import bg12 from '../assets/BG_012.jpg'
import bg13 from '../assets/BG_013.jpg'
import bg14 from '../assets/BG_014.jpg'
import bg15 from '../assets/BG_015.jpg'
import bg16 from '../assets/BG_016.jpg'
import bg17 from '../assets/BG_017.jpg'
import bg18 from '../assets/BG_018.jpg'
import bg19 from '../assets/BG_019.jpg'
import bg20 from '../assets/BG_020.jpg'
import bg21 from '../assets/BG_021.jpg'
import bg22 from '../assets/BG_022.jpg'
import bg23 from '../assets/BG_023.jpg'
import bg24 from '../assets/BG_024.jpg'
import bg25 from '../assets/BG_025.jpg'
import bg26 from '../assets/BG_026.jpg'
import bg27 from '../assets/BG_027.jpg'
import bg28 from '../assets/BG_028.jpg'
import bg29 from '../assets/BG_029.jpg'
import bg30 from '../assets/BG_030.jpg'
import bg31 from '../assets/BG_031.jpg'
import bg32 from '../assets/BG_032.jpg'
import bg33 from '../assets/BG_033.jpg'
import bg34 from '../assets/BG_034.jpg'
import bg35 from '../assets/BG_035.jpg'
import bg36 from '../assets/BG_036.jpg'
import bg37 from '../assets/BG_037.jpg'
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
    this.backgrounds = [
      bg1,
      bg2,
      bg3,
      bg4,
      bg5,
      bg6,
      bg7,
      bg8,
      bg9,
      bg10,
      bg11,
      bg12,
      bg13,
      bg14,
      bg15,
      bg16,
      bg17,
      bg18,
      bg19,
      bg20,
      bg21,
      bg22,
      bg23,
      bg24,
      bg25,
      bg26,
      bg27,
      bg28,
      bg29,
      bg30,
      bg31,
      bg32,
      bg33,
      bg34,
      bg35,
      bg36,
      bg37,
    ]
  }

  updated(updated) {
    super.updated(updated)
    document.title = `>_ Code Games: ${this.pageTitle}`
  }

  render() {
    const {
      codeFileName,
      adventUrl,
      backgrounds,
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
