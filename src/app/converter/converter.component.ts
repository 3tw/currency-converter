import { Component, OnInit } from '@angular/core'
import { ExchangeRateService } from '@app/services/exchange-rate.service'
import { AutocompleteService } from '@app/services/autocomplete.service'

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit {
  private rates: any
  public ratesTrie: AutocompleteService
  public currencies: string[] = []

  constructor(
    private exchangeRateService: ExchangeRateService,
    private autocompleteService: AutocompleteService,
  ) {
    this.ratesTrie = autocompleteService
  }

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates().subscribe({
      next: (data) => {
        this.rates = data
        this.currencies = Object.keys(data)
        this.ratesTrie = this.autocompleteService
        this.currencies.forEach((key) => this.ratesTrie.insert(key))
      },
      error: (e) => console.log('Error fetching exchange rates : ', e),
    })
  }
}
