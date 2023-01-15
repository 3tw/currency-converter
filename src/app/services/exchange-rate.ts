export type Rates = {
  [key: string]: { [key: string]: number }
}

export interface ExchangeRateTimeseriesResponse {
  motd: any
  success: boolean
  timeseries: boolean
  base: string
  start_date: string
  end_date: string
  rates: Rates
}
