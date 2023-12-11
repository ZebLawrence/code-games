import { css } from 'lit'

export const common = css`
  .d-flex{
    display: flex;
  }
  .flex-wrap{
    flex-wrap: wrap;
  }
  .space-between{
    justify-content: space-between;
  }
  .space-evenly{
    justify-content: space-evenly
  }
  .grid{
    display: grid;
    gap: 1em;
    
  }
  .child-ml-1 > *{
    margin-left: 1em;
  }
  .d-flex-grid{
    // width: 100%;
    flex-grow: 4;
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
  .justify-center{
    justify-content: center;
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
  .orange{
    background-color: #ff800053;
  }
  .red{
    background-color: #cc00006a;
  }
  .bright .red{
    background-color: #cc0000be;
  }
  .yellow{
    background-color: #cccc006a;
  }
  .bright .yellow{
    background-color: #f7f705e6;
  }
  .blue{
    background-color: #0000cc7a;
  }
  .bright .blue{
    background-color: #0a0af0ed;
  }
  .green{
    background-color: #00cc0083;
  }
  .bright .green{
    background-color: #0beb0bea;
  }
  .black{
    background-color: #0000006c;
  }
  .blur{
    backdrop-filter: blur(10px);
  }
  .bold{
    font-weight: bold;
    text-shadow: 0 0 2px #ffffff, 0 0 5px #fdfdfd;
  }
  .text-right{
    text-align: right;
  }
  .text-center{
    text-align: center;
  }
`
