import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ConverterChartComponent } from './converter-chart.component'

describe('ChartComponent', () => {
  let component: ConverterChartComponent
  let fixture: ComponentFixture<ConverterChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConverterChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ConverterChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
