import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';

interface SymbolSearchResponse {
  bestMatches: {
    symbol: string,
    name: string,
    region: string,
    currency: string,
    matchScore: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  fieldMap = {
    [typeof 'symbol']: (): Observable<any> => {return of([])}
  }

  constructor(private http: HttpClient) {}

  private getAlphaUrl(): string {
    return `${ALPHA_VANTAGE_URL}?apikey=${environment.apiKey}`;
  }

  getData(field: string): Observable<any> {
    return this.fieldMap[field]();
  }

  tickerSearch(keywords: string): Observable<SymbolSearchResponse> {
    return this.http.get<SymbolSearchResponse>(`${this.getAlphaUrl()}&function=SYMBOL_SEARCH&keywords=${keywords}`);
  }
}
