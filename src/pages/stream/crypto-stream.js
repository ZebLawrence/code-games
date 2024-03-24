
import { LitElement, css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import './portfolio-chart.js'

export const  CryptoStream = {
  tag: 'crypto-stream',
  title: 'Crypto Stream',
  path: '#/crypto-stream',
}

export class CryptoStreamClass extends LitElement {
  static properties = {
    streamSymbols: { type: Object, state: true, hasChanged: (value, oldValue) => JSON.stringify(value) !== JSON.stringify(oldValue) }
  }
  static styles = [
    css`
      table{
        backdrop-filter: blur(10px);
        width: 100%;
      }
      table th, table td {
        padding: 10px;
        text-align: right;
        border-top: 2px solid #545454;
      }
      table th:first-child, table td:first-child {
        text-align: left;
      }
      table th:last-child, table td:last-child {
        border-right: none;
      }
      table thead th {
        border-top: none;
      }
      .red {
        color: #cc2900;
        text-shadow: 0 0 2px #cc2900, 0 0 5px #cc2900;
      }
      .green {
        color: #00cc00;
        text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
      }

      @media (max-width: 1600px) {
        table th, table td {
          padding: 2px;
          font-size: 0.75em;
        }
      }
    `
  ]

  constructor() {
    super()
    this.streamSymbols = {}
    this.client = new WebSocket('wss://stream.binance.us:9443/stream')
    this.defaultDataObj = { c: 0, p: 0, Q: 0, P: 0, q: 0 }
    this.symbols = [
      {
          purchasedPrice: 520.03,
          coin: 'BTC',
          coinPair: 'BTCUSDT',
          ratio: 0.00792231,
          chartNum: 1027
      },
      {
          purchasedPrice: 250,
          coin: 'ETH',
          coinPair: 'ETHUSDT',
          ratio: 0.06897,
          chartNum: 1027
      },
      {
          purchasedPrice: 0.01,
          coin: 'ATOM',
          coinPair: 'ATOMUSDT',
          ratio: 0.00121141,
          chartNum: 3794
      },
      {
          purchasedPrice: 50,
          coin: 'DOGE',
          coinPair: 'DOGEUSDT',
          ratio: 221,
          chartNum: 74
      },        
      {
          purchasedPrice: 0.01,
          coin: 'ALGO',
          coinPair: 'ALGOUSDT',
          ratio: 0.05084596,
          chartNum: 4030
      },
      {
          purchasedPrice: 0.09,
          coin: 'MATIC',
          coinPair: 'MATICUSDT',
          ratio: 0.1,
          chartNum: 3890
      },
      {
          purchasedPrice: 0.01,
          coin: 'CLV',
          coinPair: 'CLVUSDT',
          ratio: 0.0972,
          chartNum: 3890
      }
  ]
    this.client.onopen = () => {
      console.log('WebSocket Client Connected')
      const params = []
      this.symbols.forEach(symbol => {
        params.push(`${symbol.coinPair.toLowerCase()}@ticker`)
        params.push(`${symbol.coinPair.toLowerCase()}@aggTrade`)
      })
      this.client.send(JSON.stringify({ method: 'SUBSCRIBE', params, id: 1 }))
    }
    this.client.onmessage = (message) => {
      const { data } = JSON.parse(message.data)

      if (!data) return

      const [previousTicker, previousTicker2] = this.streamSymbols[data.s]?.ticker || [this.defaultDataObj, this.defaultDataObj]
      const [previousAgg, previousAgg2] = this.streamSymbols[data.s]?.aggTrade || [this.defaultDataObj, this.defaultDataObj]

      let newTickerData = false
      let newAggData = false

      if (data.e === '24hrTicker') {
        newTickerData = data
      }

      if (data.e === 'aggTrade') {
        newAggData = data
      }

      const updatedSymbols = {
        ...this.streamSymbols,
        [data.s]: {
          ticker: newTickerData ? [newTickerData, previousTicker] : [previousTicker, previousTicker2],
          aggTrade: newAggData ? [newAggData, previousAgg] : [previousAgg, previousAgg2]
        }
      }
      this.streamSymbols = updatedSymbols
    }
    this.client.onclose = (message) => {
      console.log('WebSocket Client Closed', message)
    }
    this.client.onerror = (error) => {
      console.error('WebSocket Client Error', error)
    }
  }

  setPortfolioData(Close) {
    const previous = JSON.parse(localStorage.getItem('portfolioData')) || []
    const current = {
      Date: Date.now(),
      Close
    }
    if (previous[previous.length - 1] && previous[previous.length - 1]?.Close !== Close) {
      localStorage.setItem('portfolioData', JSON.stringify([...previous, current]))
    } else if (!previous[previous.length - 1]) {
      localStorage.setItem('portfolioData', JSON.stringify([current]))
    }
  }

  render() {
    const {
      symbols,
      streamSymbols,
      defaultDataObj
    } = this;

    let total = 0
    let purchasedTotal = 0
    let priceCount = 0

    const tableRows = symbols.map(({
      coin,
      coinPair,
      ratio,
      purchasedPrice
    }) => {
      const  streams = streamSymbols[coinPair] || { ticker: [defaultDataObj, defaultDataObj], aggTrade: [defaultDataObj, defaultDataObj] }
      const [ticker] = streams.ticker || [defaultDataObj, defaultDataObj]
      const [trade, previousTrade] = streams.aggTrade || [defaultDataObj, defaultDataObj]

      if (ticker.c > 0) {
        priceCount++
      }
      total += ticker?.c * ratio
      purchasedTotal += purchasedPrice

      const lastChange = trade.p - previousTrade.p
      const lastChangePercent = (lastChange / previousTrade.p) * 100
      const lastChangeClass = classMap({ green: lastChange > 0, red: lastChange < 0 })
      const tickerClass = classMap({ green: ticker.p > 0, red: ticker.p < 0 })
      const lastTradeClass = classMap({ green: trade.p > previousTrade.p, red: trade.p < previousTrade.p })
      const ratioClass = classMap({ green: ticker.c * ratio > purchasedPrice, red: ticker.c * ratio < purchasedPrice })
      return html`
        <tr>
          <td>${coin}</td>
          <td class=${lastTradeClass}>${trade.p}</td>
          <td class=${lastChangeClass}>${lastChange}</td>
          <td class=${lastChangeClass}>${lastChangePercent}</td>
          <td class=${lastTradeClass}>${trade.q}</td>
          <td>${ticker.c}</td>
          <td>${ticker.Q}</td>
          <td class=${tickerClass}>${ticker.p}</td>
          <td class=${tickerClass}>${ticker.P}</td>
          <td>${purchasedPrice}</td>
          <td class=${ratioClass}>${ticker.c * ratio}</td>
        </tr>
      `
    })

    if (priceCount === symbols.length) {
      this.setPortfolioData(total)
    }

    return html`
      <div class="body">
        <portfolio-chart></portfolio-chart>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Last Trade</th>
              <th>Last Change</th>
              <th>Last Change Percent</th>
              <th>Trade Vol</th>
              <th>Last Price</th>
              <th>Last Vol</th>
              <th>1 Day Change</th>
              <th>1 Day Change Percent</th>
              <th>Purchased Price</th>
              <th>Current Value</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            <tr>
              <td>Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>${purchasedTotal}</td>
              <td>${total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }
}

!window.customElements.get(CryptoStream.tag) && window.customElements.define(CryptoStream.tag, CryptoStreamClass)
