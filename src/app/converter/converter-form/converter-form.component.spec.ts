import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from '@app/app.component'
import { ReactiveFormsModule } from '@angular/forms'

import { ConverterFormComponent } from './converter-form.component'
import { SelectComponent } from '@app/ui/select/select.component'

describe('ConverterFormComponent', () => {
  let component: ConverterFormComponent
  let fixture: ComponentFixture<ConverterFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ConverterFormComponent, SelectComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents()

    fixture = TestBed.createComponent(ConverterFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('after switch baseCurrency should be "USD" and counterCurrency should be "EUR"', () => {
    component.converter.setValue({
      amount: null,
      baseCurrency: 'EUR',
      counterCurrency: 'USD',
    })

    component.switchCurrency()
    expect(component.converter.get('baseCurrency')?.value).toEqual('USD')
    expect(component.converter.get('counterCurrency')?.value).toEqual('EUR')
  })
})
