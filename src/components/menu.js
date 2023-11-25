import { html } from 'lit-html'
import { isCurrentPage } from '../utils/pathHelpers'
import '@spectrum-web-components/action-menu/sync/sp-action-menu.js'
import '@spectrum-web-components/menu/sp-menu-item.js'
import '@spectrum-web-components/menu/sp-menu-divider.js'
import '@spectrum-web-components/sidenav/sp-sidenav.js'
import '@spectrum-web-components/sidenav/sp-sidenav-item.js'

export const topNavLink = ({ path, title }) => {
  const selected = isCurrentPage(path)
  return html`<sp-top-nav-item .selected=${path} href=${path}>${title}</sp-top-nav-item>`
}

export const linkMenuItem = ({ path, title }) => {
  const selected = isCurrentPage(path)
  return html`<sp-menu-item .active=${selected} .selected=${selected}><sp-link quiet href=${path}>${title}</sp-link></sp-menu-item>`
}

export const linkMenuGroup = ([name, pages]) => {
  return html`
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item><span slot="description">${name}</span></sp-menu-item>
    ${pages.map(linkMenuItem)}
  `
}

export const buildMenuItem = ({ path, title }) => {
  const selected = isCurrentPage(path)
  return html`
    <sp-sidenav-item
      value=${title}
      href=${path}
      label=${title}
      .selected=${selected}
    ></sp-sidenav-item>
  `
}

export const buildMenu = ([name, pages], index) => {
  return html`              
    <sp-picker style=${index === 0 ? 'margin-inline-start: auto;' : ''} quiet id="picker-m" size="m" >
      <div slot="label">${name}</div>
      <sp-sidenav>
        ${pages.map(buildMenuItem)}
      </sp-sidenav>
    </sp-picker>
  `
}
