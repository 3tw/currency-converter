import {
  Component,
  Input,
  AfterViewInit,
  SimpleChanges,
  ElementRef,
} from '@angular/core'
import { Rates } from '@app/services/exchange-rate'
import { DateService } from '@app/services/date.service'
import * as Highcharts from 'highcharts'
import { min } from 'date-fns'
import { ConstantPool } from '@angular/compiler'

@Component({
  selector: 'app-converter-chart',
  templateUrl: './converter-chart.component.html',
  styleUrls: ['./converter-chart.component.scss'],
})
export class ConverterChartComponent {
  @Input() exchangeRates?: Rates
  @Input() rateKey = ''
  chartIsReady = false
  updateFlag = false
  chart: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'areaspline',
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
      tickPixelInterval: 35,
      minTickInterval: 30,
      gridLineWidth: 1,
      minRange: 3600 * 1000 * 24 * 7,
    },
    yAxis: {
      title: { text: '' },
      labels: {
        format: '{value:.3f}',
      },
      tickAmount: 9,
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
        data: [],
      },
    ],
  }

  constructor(private dateService: DateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exchangeRates'] && this.exchangeRates && this.rateKey) {
      const entries = Object.entries(this.exchangeRates)
      let minValue = entries[0][1][this.rateKey]
      const formattedData: [number, number][] = entries.map(
        ([dateString, value]) => {
          if (value[this.rateKey] < minValue) minValue = value[this.rateKey]
          return [
            this.dateService.parse(dateString).getTime(),
            value[this.rateKey],
          ]
        },
      )

      this.updateFlag = true
      const updatedOptions = {
        yAxis: { min: minValue },
      }
      // @ts-ignore
      this.chart.setOptions(updatedOptions)
      // @ts-ignore
      this.chartOptions.series[0].data = formattedData
      if (!this.chartIsReady) {
        this.chartIsReady = true
        return
      }
    }
  }
}
