import { Component, Input, SimpleChanges } from '@angular/core'
import { Rates } from '@app/services/exchange-rate'
import { DateService } from '@app/services/date.service'
import { ConverterFormData } from '../converter-form/converter-form'

@Component({
  selector: 'app-converter-display',
  templateUrl: './converter-display.component.html',
  styleUrls: ['./converter-display.component.scss'],
})
export class ConverterDisplayComponent {
  @Input() exchangeRates?: Rates
  @Input() amount = 0
  @Input() baseCurrency = ''
  @Input() counterCurrency = ''

  today
  exchangeRateToday = 0
  counterCurrencyAmount = '0'

  constructor(dateService: DateService) {
    this.today = dateService.today()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exchangeRates'] && this.exchangeRates) {
      this.exchangeRateToday = Object.values(this.exchangeRates[this.today])[0]
    }
    this.counterCurrencyAmount = (this.amount * this.exchangeRateToday).toFixed(
      2,
    )
  }
}
