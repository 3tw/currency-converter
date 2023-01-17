import { CommonModule } from '@angular/common'
import { ConverterChartComponent } from './converter-chart/converter-chart.component'
import { ConverterComponent } from './converter.component'
import { ConverterDisplayComponent } from './converter-display/converter-display.component'
import { ConverterFormComponent } from './converter-form/converter-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HighchartsChartModule } from 'highcharts-angular'
import { NgModule } from '@angular/core'
import { UiModule } from '@app/ui/ui.module'

@NgModule({
  declarations: [
    ConverterComponent,
    ConverterFormComponent,
    ConverterDisplayComponent,
    ConverterChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    UiModule,
  ],
  exports: [
    ConverterComponent,
    ConverterFormComponent,
    ConverterDisplayComponent,
    ConverterChartComponent,
  ],
})
export class ConverterModule {}
