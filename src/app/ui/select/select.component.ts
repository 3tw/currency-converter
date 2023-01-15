import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { AutocompleteService } from '@app/services/autocomplete.service'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @ViewChild('trigger') triggerElement!: ElementRef<HTMLElement>
  @Input() excludedOption = ''
  @Input() options: string[] = []

  value = ''
  query = ''
  listOpen = false
  defaultOptions: string[] = []
  displayedOptions: string[] = []
  ratesTrie: AutocompleteService

  onChange: any = () => {}
  onTouched: any = () => {}

  constructor(private autocompleteService: AutocompleteService) {
    this.ratesTrie = autocompleteService
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options.length) {
      console.log('NEW')
      this.displayedOptions = this.excludeSelectedOptions(this.options)
      this.options.forEach((key) => this.ratesTrie.insert(key))
      return
    }
    this.displayedOptions = this.excludeSelectedOptions(this.options)
  }

  // Ui
  toggle() {
    if (this.listOpen) this.close()
    else this.open()
  }
  open() {
    this.listOpen = true
    this.triggerElement.nativeElement.focus()
  }
  close() {
    this.onChange(this.value)
    this.listOpen = false
    this.triggerElement.nativeElement.focus()
    this.displayedOptions = this.options
    this.query = ''
  }

  // Auto complete
  search(event: any) {
    const key = event.key.toLowerCase()
    if (!key) return
    if (this.query.length >= 3) {
      this.query = ''
    } else if (key === 'backspace') {
      this.query = this.query.slice(0, -1)
    } else if (key.length === 1 && /[a-z]/.test(key)) {
      this.query += key
    }

    const suggestions = this.ratesTrie
      ? this.excludeSelectedOptions(
          Array.from(this.ratesTrie.getSuggestions(this.query)),
        )
      : []

    if (
      !suggestions.length ||
      (suggestions.length === 1 &&
        [this.value, this.excludedOption].includes(suggestions[0]))
    ) {
      this.displayedOptions = this.excludeSelectedOptions(this.options)
      this.query = ''
    } else {
      this.displayedOptions = suggestions
    }
  }
  excludeSelectedOptions(array: string[]) {
    return array.filter(
      (value) => value !== this.value && value !== this.excludedOption,
    )
  }

  // Control Value Accessor Interface
  writeValue(value: string): void {
    this.value = value
    this.onChange(this.value)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {}
}
