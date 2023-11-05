import { html } from 'lit-html'
import { isCurrentPage } from '../utils/pathHelpers'

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
      <sp-sidenav defaultValue="Docs">
        ${pages.map(buildMenuItem)}
      </sp-sidenav>
    </sp-picker>
  `
}
