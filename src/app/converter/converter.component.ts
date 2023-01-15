import { Component, OnInit } from '@angular/core'
import { ExchangeRateService } from '@app/services/exchange-rate.service'
import { Rates } from '@app/services/exchange-rate'
import { ConverterFormData } from './converter-form/converter-form'

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  currencies: string[] = []
  formData: ConverterFormData = {
    amount: 0,
    baseCurrency: '',
    counterCurrency: '',
  }
  exchangeRates: Rates | undefined
  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.exchangeRates$.subscribe({
      next: (data) => {
        this.currencies = data
      },
      error: (e) => console.log('Error fetching exchange rates : ', e),
    })
  }

  updateForm(data: ConverterFormData) {
    const { amount, baseCurrency, counterCurrency } = data

    if (
      this.formData.baseCurrency !== baseCurrency ||
      this.formData.counterCurrency !== counterCurrency
    ) {
      this.getRate(baseCurrency, counterCurrency)
    }

    this.formData.amount = amount
    this.formData.baseCurrency = baseCurrency
    this.formData.counterCurrency = counterCurrency
  }

  getRate(baseCurrency: string, counterCurrency: string) {
    const response = this.exchangeRateService.getRate(
      baseCurrency,
      counterCurrency,
    )

    response?.subscribe((rates) => {
      if (!rates) return
      this.exchangeRates = rates
    })
  }
}
