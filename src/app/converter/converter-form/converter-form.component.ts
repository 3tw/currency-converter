import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { ConverterFormData } from './converter-form'

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
})
export class ConverterFormComponent {
  @Input() currencies: string[] = []
  @Output() emitData = new EventEmitter<ConverterFormData>()

  converter = new FormGroup({
    amount: new FormControl(null),
    baseCurrency: new FormControl('EUR'),
    counterCurrency: new FormControl('USD'),
  })

  constructor() {}

  ngOnInit(): void {
    this.emitFormData()
    this.converter.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value: any) => {
        this.emitFormData()
      })
  }

  emitFormData() {
    const payload = {
      amount: this.converter.controls.amount.value ?? 0,
      baseCurrency: this.converter.controls.baseCurrency.value ?? '',
      counterCurrency: this.converter.controls.counterCurrency.value ?? '',
    }
    this.emitData.emit(payload)
  }

  switchCurrency() {
    const temp = this.converter.controls.baseCurrency.value
    this.converter.controls.baseCurrency.setValue(
      this.converter.controls.counterCurrency.value,
    )
    this.converter.controls.counterCurrency.setValue(temp)
  }
}
