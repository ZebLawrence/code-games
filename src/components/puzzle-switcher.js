import { html } from 'lit'
import '@spectrum-web-components/link/sp-link.js'
import '@spectrum-web-components/radio/sp-radio.js'
import '@spectrum-web-components/radio/sp-radio-group.js'

export const puzzleSwitcher = (selectedPuzzle, puzzles, togglePuzzle, url) => {
  return html`
    <div class="h-100">
      <div>
        <sp-radio-group label="Small" selected=${selectedPuzzle} name="selectedPuzzle">
          <label>Puzzle input</label>
          ${Object.keys(puzzles).map(puzzleName => {
            return html`<sp-radio style="border: 2px solid rgb(84, 84, 84); padding: 0.25em; border-radius: 30px; max-width: 300px; padding-left: 0.75em; margin-bottom: 0.5em;" @change=${togglePuzzle} value=${puzzleName} size="s">${puzzleName}</sp-radio>`
          })}
        </sp-radio-group>
      </div>
      <div>
        <sp-link href=${url}>Puzzle Link</sp-link>
      </div>
    </div>
  `
}
