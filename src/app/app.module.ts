import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ChartModule } from './chart/chart.module'
import { ConverterModule } from './converter/converter.module'
import { UiModule } from './ui/ui.module'

// import { SelectComponent } from './ui/select/select.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    ConverterModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
