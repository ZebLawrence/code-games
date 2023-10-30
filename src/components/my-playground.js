import { LitElement, html, nothing, unsafeCSS, css } from 'lit'
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import 'playground-elements/playground-ide.js'
import 'playground-elements/playground-project.js'
import 'playground-elements/playground-file-editor.js'
import playgroundStyle from 'playground-elements/themes/monokai.css?inline'

export class Playground extends LitElement {
  static properties = {
    codeFileName: { type: String },
  }

  static styles = [
    unsafeCSS(playgroundStyle),
    css`
      .playground-theme-monokai{
        height: 100%;
      }
    `
  ]

  constructor() {
    super()
    this.codeFileName = null
  }

  render() {
    const {
      codeFileName
    } = this

    const playground = codeFileName
      ? html`
      <overlay-trigger type="modal">
        <sp-dialog-wrapper
          slot="click-content"
          headline="Code"
          mode="fullscreen"
          cancel-label="Close"
          dismissable
          no-divider
          headline-visibility="none"
          underlay
          size="s"
          footer="Content for footer"
        >
          <playground-project class="playground-theme-monokai" id="codeproject" project-src="./playground.config.json"></playground-project>
          <playground-file-editor
            line-numbers
            type="js"
            class="playground-theme-monokai"
            project="codeproject"
            filename=${codeFileName}
          ></playground-file-editor>
        </sp-dialog-wrapper>
        <sp-button quiet slot="trigger" size="s" variant="secondary">Toggle Code</sp-button>
      </overlay-trigger>        
      `
      : nothing

    return html`
      <div>
        ${playground}
      </div>

    `
  }

}

!window.customElements.get('my-playground') && window.customElements.define('my-playground', Playground)
