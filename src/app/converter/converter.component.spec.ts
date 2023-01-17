import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppComponent } from '@app/app.component'
import { ConverterComponent } from './converter.component'
import { ConverterChartComponent } from './converter-chart/converter-chart.component'
import { ConverterDisplayComponent } from './converter-display/converter-display.component'
import { ConverterFormComponent } from './converter-form/converter-form.component'
import { SelectComponent } from '@app/ui/select/select.component'

describe('ConverterComponent', () => {
  let component: ConverterComponent
  let fixture: ComponentFixture<ConverterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        ConverterComponent,
        ConverterFormComponent,
        ConverterDisplayComponent,
        ConverterChartComponent,
        SelectComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ConverterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
