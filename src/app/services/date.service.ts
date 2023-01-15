import { Injectable } from '@angular/core'
import { addYears, format, parse } from 'date-fns'

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private todayDate
  private stringFormat = 'yyyy-MM-dd'

  constructor() {
    this.todayDate = new Date()
  }

  today() {
    return format(this.todayDate, this.stringFormat)
  }
  addYears(years: number) {
    return format(addYears(this.todayDate, years), this.stringFormat)
  }
  parse(dateString: string) {
    return parse(dateString, this.stringFormat, new Date())
  }
}
