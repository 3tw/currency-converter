import { Component, OnInit } from '@angular/core'
import { ExchangeRateService } from '@app/exchange-rate.service'
import { AutocompleteService } from '@app/autocomplete.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
})
export class ConverterFormComponent implements OnInit {
  private rates: any
  private ratesTrie
  private suggestions: Set<string>

  constructor(
    private exchangeRateService: ExchangeRateService,
    private autocompleteService: AutocompleteService,
  ) {
    this.ratesTrie = autocompleteService
    this.suggestions = new Set()
  }

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates().subscribe({
      next: (v) => {
        this.rates = v
        this.ratesTrie = this.autocompleteService
        Object.keys(this.rates).forEach((key) => this.ratesTrie.insert(key))
      },
      error: (e) => console.log('Error fetching exchange rates : ', e),
    })
  }

  getSuggestions(event: any) {
    this.suggestions = this.ratesTrie.getSuggestions(event.target.value)
    console.log(this.suggestions)
  }
}
