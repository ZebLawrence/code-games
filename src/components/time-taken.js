import { html } from 'lit'
import '@spectrum-web-components/badge/sp-badge.js'

export const timeTaken = (startTime) => {
  const totalTime = performance.now() - startTime;
  return html`
    <div class="d-flex justify-end">
      <sp-badge class="mt-1" size="s" variant=${totalTime > 50 ? 'negative' : 'positive' }>Time taken (ms): ${totalTime}</sp-badge>
    </div>
  `
}