import { css } from 'lit'

export const common = css`
  .d-flex{
    display: flex;
  }
  .space-between{
    justify-content: space-between;
  }
  .grid{
    display: grid;
    gap: 1em;
  }
  .d-flex-grid{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1em;
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
  .mr-2{
    margin-right: 2em;
  }
  .mr-1{
    margin-right: 1em;
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
  table{
    text-align: center;
  }
  .table-container{
    padding-right: 2em;
    padding-bottom: 2em;
    overflow-x: auto;
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5em;
  }

  .valid{
    background-color: #00cc0014;
  }

  .invalid{
    background-color: #cc00000f;
  }

  .total{
    background-color: #8fc9fc0f;
  }

  .red{
    background-color: #cc00006a;
  }

  .blue{
    background-color: #0000cc7a;
  }
  .green{
    background-color: #00cc0083;
  }
  .black{
    background-color: #0000006c;
  }
`
