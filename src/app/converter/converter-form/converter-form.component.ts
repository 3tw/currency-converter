import { Component, Input } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { AutocompleteService } from '@app/services/autocomplete.service'

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
})
export class ConverterFormComponent {
  @Input() ratesTrie: AutocompleteService | undefined = undefined
  @Input() currencies: string[] = []
  private suggestions: Set<string> = new Set()
  converter = new FormGroup({
    amount: new FormControl(null),
    baseCurrency: new FormControl(''),
    counterCurrency: new FormControl(''),
  })

  constructor() {}

  test() {
    console.log(this.converter.controls.baseCurrency.value)
    console.log(this.converter.controls.counterCurrency.value)
  }

  getSuggestions() {
    if (!this.ratesTrie) return
    this.suggestions = this.ratesTrie.getSuggestions(
      // this.converter.controls.amount?.vaue
      'EU ',
    )
  }
}
