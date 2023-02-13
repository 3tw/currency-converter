import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ViewChildren,
  ElementRef,
  SimpleChanges,
  QueryList,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { AutocompleteService } from '@app/services/autocomplete.service'
import { SelectOptionComponent } from '../select-option/select-option.component'

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
  @ViewChildren('selectOption')
  optionElements!: QueryList<SelectOptionComponent>
  @Input() excludedOption = ''
  @Input() options: string[] = []

  value = ''
  query = ''
  userIsTyping = false
  userTypingTimer: ReturnType<typeof setTimeout> | null = null
  listOpen = false
  defaultOptions: string[] = []
  displayedOptions: string[] = []
  ratesTrie: AutocompleteService

  onChange: any = () => {} // Will fire valueChanges event on form control
  onTouched: any = () => {}

  constructor(private autocompleteService: AutocompleteService) {
    this.ratesTrie = autocompleteService
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options.length) {
      this.options.forEach((key) => this.ratesTrie.insert(key))
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
  }
  close(reFocus = false) {
    this.onChange(this.value)
    this.listOpen = false
    this.displayedOptions = this.excludeSelectedOptions(this.options)
    this.query = ''
    if (reFocus) {
      this.triggerElement.nativeElement.focus()
    }
  }
  handleOutsideClick() {
    if (!this.listOpen) return
    this.close()
  }

  // Autocomplete
  search(event: any) {
    const key = event.key.toLowerCase()
    if (!key) return

    // Set timer to reset query if user is stops typing
    if (this.userIsTyping && this.userTypingTimer) {
      clearTimeout(this.userTypingTimer)
    }
    this.userIsTyping = true
    this.userTypingTimer = setTimeout(() => {
      this.userIsTyping = false
      this.query = ''
    }, 700)

    // Adjust query
    if (key === 'backspace' || this.query.length >= 3) {
      this.query = ''
    } else if (key.length === 1 && /[a-z]/.test(key)) {
      this.query += key
    }

    // Get suggestions and focus first element on the list
    const suggestions = this.ratesTrie
      ? this.excludeSelectedOptions(
          Array.from(this.ratesTrie.getSuggestions(this.query)),
        )
      : []
    let selected = ''
    if (
      !suggestions.length ||
      (suggestions.length === 1 && this.excludedOption === suggestions[0])
    ) {
      this.query = ''
    }
    selected = suggestions[0]

    const suggestedOptionElement = this.optionElements.find(
      (el) => el && el.value === selected,
    )
    if (!suggestedOptionElement) return
    suggestedOptionElement.focus()
  }
  excludeSelectedOptions(array: string[]) {
    return array.filter((value) => value !== this.excludedOption)
  }

  // Control Value Accessor Interface
  writeValue(value: string, close = false): void {
    if (this.value === value) return
    if (close) this.close(true)
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
