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
import { buildMenu, buildMenuItem } from './menu'
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

      @media screen and (min-width: 768px){
        nav sp-action-menu{
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

        nav sp-action-menu{
          display: block;
          --swc-menu-width: 100vw;
        }
        sp-action-menu sp-link{
          padding-left: 1em;
          display: block;
        }

        sp-menu-divider{
          width: calc(100vh - 4em);
        }
      }
    `
  ]

  constructor() {
    super()
    this.title = 'Some Code'
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
    ]
  }

  firstUpdated() {
    super.firstUpdated()
    document.title = this.title
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
    const bgIndex = Math.floor(Math.random() * 19)
    const menus = Object.entries(groups).map(buildMenu)

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

              <sp-action-menu
                  label="Account"
                  style="margin-inline-start: auto;"
                  quiet
              >
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item><span slot="description">Main</span></sp-menu-item>
                ${main.map(({ path, title }) => {
                  return html`<sp-link quiet href=${path}>${title}</sp-link>`
                })}
                ${Object.entries(groups).map(([name, pages]) => {
                  return html`
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item><span slot="description">${name}</span></sp-menu-item>
                    ${pages.map(({ path, title }) => {
                      return html`<sp-link quiet href=${path}>${title}</sp-link>`
                    })}
                  `
                })}
                <sp-menu-divider></sp-menu-divider>
              </sp-action-menu>
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
      ${backgrounds.map((bg, index) => {
        return html`<div class="bg-image ${index === bgIndex ? '' : 'hide'}" style="background-image: url(${bg})"></div>`
      })}
      
    `
  }

}

!window.customElements.get('page-template') && window.customElements.define('page-template', PageTemplate)
