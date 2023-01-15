import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, iif, from } from 'rxjs'
import { map, retry, catchError, share, tap } from 'rxjs/operators'
import { ExchangeRateTimeseriesResponse, Rates } from './exchange-rate'
import { DateService } from '@app/services/date.service'

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://api.exchangerate.host/'
  public cache = new Map<string, Rates>()

  exchangeRates$: Observable<string[]>

  constructor(private http: HttpClient, private dateService: DateService) {
    this.exchangeRates$ = http.get<any>(`${this.apiUrl}latest`).pipe(
      map((data) => Object.keys(data?.rates)),
      retry(2),
      catchError((err, caught) => {
        console.log(err)
        return caught
      }),
      share(),
    )
  }

  // DEV: get date dynamically
  getRate(baseCurrency: string | null, counterCurrency: string | null) {
    if (!baseCurrency || !counterCurrency) return
    const id = `${baseCurrency}-${counterCurrency}`
    const startDate = this.dateService.addYears(-1)
    const endDate = this.dateService.today()

    return iif(
      () => this.cache.has(id),
      of(this.cache.get(id)),
      from(
        this.http
          .get<ExchangeRateTimeseriesResponse>(
            `${this.apiUrl}timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${counterCurrency}`,
          )
          .pipe(
            map((data) => data.rates),
            tap((rates) => this.cache.set(id, rates)),
          ),
      ),
    )
  }
}
