import { html } from 'lit'
import '@spectrum-web-components/badge/sp-badge.js'

export const badge = label => {
  return html`<sp-badge size="s" variant="informative">${label}</sp-badge>`
}