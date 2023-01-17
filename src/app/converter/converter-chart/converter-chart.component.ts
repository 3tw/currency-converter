import { Component, Input, SimpleChanges } from '@angular/core'
import { Rates } from '@app/services/exchange-rate'
import { DateService } from '@app/services/date.service'
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-converter-chart',
  templateUrl: './converter-chart.component.html',
  styleUrls: ['./converter-chart.component.scss'],
})
export class ConverterChartComponent {
  @Input() exchangeRates?: Rates
  @Input() rateKey = ''
  updateFlag = false
  renderFlag = false
  chart: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options

  constructor(private dateService: DateService) {
    const { minValue, maxValue, data } = this.getInfoFromData()

    this.chartOptions = {
      title: {
        text: '',
      },
      chart: {
        type: 'areaspline',
        animation: true,
        zooming: {
          type: 'x',
        },
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%e %b}',
        },
        tickLength: 30,
        tickPixelInterval: 40,
        minTickInterval: 30,
        gridLineWidth: 1,
        minRange: 3600 * 1000 * 24 * 7,
      },
      yAxis: {
        title: { text: '' },
        labels: {
          format: '{value:.3f}',
        },
        min: minValue,
        max: maxValue,
        // tickAmount: 9,
      },
      tooltip: {
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        xDateFormat: '%e %b %Y',
      },
      series: [
        {
          name: 'Rate',
          showInLegend: false,
          type: 'areaspline',
          lineColor: '#bf0051',
          color: '#bf0051',
          fillOpacity: 0.4,
          data: data ?? [],
        },
      ],
    }
    this.renderFlag = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exchangeRates'] && this.exchangeRates && this.rateKey) {
      const { minValue, maxValue, data } = this.getInfoFromData()

      // Perform multiple checks to make sure there is data ready and to pass Highcharts type checks
      if (
        minValue &&
        maxValue &&
        data &&
        this.chartOptions?.series &&
        this.chartOptions.series[0].type === 'areaspline'
      ) {
        ;(<Highcharts.YAxisOptions>this.chartOptions.yAxis).max = maxValue
        ;(<Highcharts.YAxisOptions>this.chartOptions.yAxis).min = minValue
        this.chartOptions.series[0].data = data
        this.updateFlag = true
      }
    }
  }

  getInfoFromData() {
    if (!this.exchangeRates) {
      return { minValue: null, maxValue: null, data: null }
    }

    const entries = Object.entries(this.exchangeRates)
    let minValue = entries[0][1][this.rateKey]
    let maxValue = entries[0][1][this.rateKey]
    const formattedData: [number, number][] = entries.map(
      ([dateString, value]) => {
        if (value[this.rateKey] < minValue) minValue = value[this.rateKey]
        if (value[this.rateKey] > maxValue) maxValue = value[this.rateKey]
        return [
          this.dateService.parse(dateString).getTime(),
          value[this.rateKey],
        ]
      },
    )
    return { minValue, maxValue, data: formattedData }
  }
}
