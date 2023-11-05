import { LitElement, css, html } from 'lit'
import { TypeCode } from '../components/type-code?inline'
import '../components/type-code'

const elementName = 'home-page'

export const home = {
  tag: elementName,
  title: 'Home',
  path: '/',
}

export class HomePage extends LitElement {
  static properties = {
    title: { type: String }
  }

  static styles = [
    css`
      .card{
        // border: 1px solid red;
      }
    `
  ]

  constructor() {
    super()
    this.title = home.title
  }

  render() {
    const {
      title
    } = this
    return html`
      <div class="card">
        <type-code content="The first puzzles will unlock on December 1st at midnight EST (UTC-5). See you then!\nIn the meantime, you can still access past"></type-code>
        <type-code content=${TypeCode}></type-code>
      </div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePage)
