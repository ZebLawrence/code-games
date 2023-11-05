import { css } from 'lit'

export const common = css`
  .d-flex{
    display: flex;
  }
  .justify-between{
    justify-content: space-between;
  }
  .justify-even{
    justify-content: space-evenly;
  }
  .justify-end{
    justify-content: flex-end
  }
  .mt-1{
    margin-top: 1em;
  }
  .h-100{
    height: 100%;
  }
  pre{
    box-shadow: 0px 0px 0.5em 0.5em rgba(0,0,0,0.25);
    -webkit-box-shadow: 0px 0px 0.5em 0.5em rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 0.5em 0.5em rgba(0,0,0,0.25);
    padding: 0.5em;
    color: #00cc00;
    text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
  }
  .small-shadow, sp-badge{
    box-shadow: 0px 0px 0.3em 0.3em rgba(0,0,0,0.25);
    -webkit-box-shadow: 0px 0px 0.3em 0.3em rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 0.3em 0.3em rgba(0,0,0,0.25);
  }
`
