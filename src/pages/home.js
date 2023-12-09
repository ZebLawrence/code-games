import { LitElement, css, html } from 'lit'
import { problemStatement } from './2023/day8/problem-statement'
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
        <type-code content="Welcome to my Advent of code site.\nThis is a place where I solve the daily puzzles and try to build fun visualizations of each.\nThis is new for year 2023, you can find my previous puzzle visualizations here: https://advent.zeblawrence.com/"></type-code>
        <a href="#/2023/day-eight/" target="_blank"> >_ 2023 Day 8</a>
        <type-code content=${problemStatement}></type-code>
      </div>
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, HomePage)
