
import { LitElement, css, html } from 'lit'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import AnimatedTheme from "@amcharts/amcharts5/themes/Animated";
import DarkTheme from "@amcharts/amcharts5/themes/Dark";
import * as am5stock from "@amcharts/amcharts5/stock";
import '@spectrum-web-components/button/sp-button.js'

export class PortfolioChart extends LitElement {
  static properties = {
    data: { type: Array, state: true }
  }

  static styles = [
    css`
      #chartdiv {
        height: 500px;
      }
    `
  ]

  constructor() {
    super()
    this.defaultData = []
    this.data = this.defaultData
    setInterval(() => {
      const portfolioData = JSON.parse(localStorage.getItem('portfolioData'))
      this.data = portfolioData
    }, 1000)
  }

  render() {
    return html`
      <div>
        <sp-button size="s" @click=${() => localStorage.setItem('portfolioData', JSON.stringify(this.defaultData))}>Clear</sp-button>
        <div id="chartdiv"></div>
      </div>
    `
  }

  renderChart() {
    const { data } = this
    const container = this.shadowRoot.getElementById('chartdiv')
    let root = am5.Root.new(container);

    root.setThemes([
      AnimatedTheme.new(root),
      DarkTheme.new(root)
    ]);
    root.interfaceColors.set("text", am5.color(0xffffff));
    root.interfaceColors.set("stroke", am5.color(0xffffff));

    let stockChart = root.container.children.push(am5stock.StockChart.new(root, {
    }));

    let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
      wheelY: "zoomX",
      panX: true,
      panY: true
    }));

    let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      baseInterval: {
        timeUnit: "second",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    this.valueSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
      name: "STCK",
      valueXField: "Date",
      valueYField: "Close",
      xAxis: dateAxis,
      yAxis: valueAxis,
      legendValueText: "{valueY}"
    }));

    this.valueSeries.data.setAll(data);

    stockChart.set("stockSeries", this.valueSeries);

    mainPanel.set("cursor", am5xy.XYCursor.new(root, {
      yAxis: valueAxis,
      xAxis: dateAxis,
      snapToSeries: [this.valueSeries],
      snapToSeriesBy: "y!"
    }));
  }

  updateChart() {
    this.valueSeries.data.setAll(this.data);
  }

  firstUpdated() {
    const { width } = this.getBoundingClientRect()
    this.renderChart(width)
  }

  updated(updated) {
    super.updated(updated)
    this.updateChart()
  }
}

!window.customElements.get('portfolio-chart') && window.customElements.define('portfolio-chart', PortfolioChart)
