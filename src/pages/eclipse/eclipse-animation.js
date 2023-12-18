import { LitElement, css, html } from 'lit'
import * as d3 from 'd3'
import numeral from 'numeral'
/* playground-hide */
const elementName = 'eclipse-animation'
export const EclipseAnimation = {
  tag: elementName,
  title: 'Eclipse Animation',
  path: '#/eclipse-animation',
}
/* playground-hide-end */
export class EclipseAnimationClass extends LitElement {
  static properties = {}

  static styles = [
    css`:host {
      --size: 80vh;
      --s: calc(var(--size) / 10);
      --bor: calc(var(--size) / 30);
      --boxShadow: calc(var(--size) / 12);
      --my-white: #f7f4f4;
      --my-black: #000;
    }
    
    .body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: var(--my-white);
      overflow:hidden;
      width: 100vw;
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100vh;
    }
    .circle {
      position: absolute;
      left: 50%;
      top: 50%;
      background: var(--my-black);
      transform: translate(-50%, -50%);
      width: var(--size);
      border-radius: 50%;
      height: var(--size);
      filter: url(#wavy) blur(1px);
    
    }
    .circle-black {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--size) - 30px);
      height: calc(var(--size) - 30px);
      z-index: 9;
      background: var(--my-white);
      // border: 1px solid red;
      border-radius: 50%;
      // box-shadow: 0px 0px 5px 3px var(--my-white);
      // filter: url(#wavy) blur(1px);
    }
    
    .circle:before,
    .circle:after {
      content: "";
      position: absolute;
      top: var(--s);
      left: var(--s);
      right: var(--s);
      bottom: var(--s);
      border-radius: 50%;
      border: var(--bor) solid var(--my-white);
    }
    .circle:before {
      box-shadow: 0 0 var(--boxShadow) var(--my-black), inset 0 0 var(--boxShadow) var(--my-black);
      //-webkit-box-reflect: below 10px
        linear-gradient(transparent, transparent, #0002);
      animation: move 5s linear infinite;
    }
    
    .circle:after {
      box-shadow: 0 0 calc(var(--bor)/2) var(--my-white), inset 0 0 var(--bor) var(--my-white);
    }
    
    @keyframes move {
      0% {
        box-shadow:  inset 0 0 var(--boxShadow) var(--my-white);
        // filter: hue-rotate(0deg);
      }
      20% {
        box-shadow:  inset 0 0 60px var(--my-white);
      }
    
      40% {
        box-shadow:  inset 0 0 40px var(--my-white);
      }
      60% {
        box-shadow:  inset 0 0 80px var(--my-white);
      }
      80% {
        box-shadow:  inset 0 0 100px var(--my-white);
      }
      100% {
        box-shadow:  inset 0 0 var(--boxShadow) var(--my-white);
        // filter: hue-rotate(360deg);
      }
    }
    
    svg {
      width: 0;
      height: 0;
    }
    
    
    @-moz-keyframes spin { 
        100% { -moz-transform: rotate(360deg); } 
    }
    @-webkit-keyframes spin { 
        100% { -webkit-transform: rotate(360deg); } 
    }
    @keyframes spin { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }`
  ]

  constructor() {
    super()
  }

  svgAnimation() {
    return html`
      <svg>
        <filter id="wavy">
          <feTurbulence x="0" y="0" baseFrequency="2.109" numOctaves="5" speed="2">
            <animate attributeName="baseFrequency" dur="60s" values="0.02; 0.005; 0.02" repeatCount="indefinite">
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30"></feTurbulence>
        </filter>
      </svg>
    `
  }

  render() {

    return html`
    <div class="body">
      <div class="circle"></div>
      <div class="circle-black"></div>
      ${this.svgAnimation()}
    </div>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, EclipseAnimationClass)
