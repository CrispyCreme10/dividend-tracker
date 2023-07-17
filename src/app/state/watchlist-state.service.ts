import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticker } from '../models/ticker';

const DEFAULT_WATCHLIST: Ticker[] = [];
const DEFAULT_COLUMNS: string[] = ['Symbol', 'Company Name', 'Industry', 'Price'];

@Injectable({
  providedIn: 'root'
})
export class WatchlistStateService {

  watchlist$: BehaviorSubject<Ticker[]> = new BehaviorSubject(DEFAULT_WATCHLIST);
  tableColumns$: BehaviorSubject<string[]> = new BehaviorSubject(DEFAULT_COLUMNS);

  constructor() { }

  addToList(symbol: string) {
    this.watchlist$.next([...this.watchlist$.getValue(), new Ticker(symbol)]);
  }

  removeFromList(symbol: string) {
    const index = this.watchlist$.getValue().findIndex(t => t.symbol === symbol);
    const tempArr = this.watchlist$.getValue().splice(index, 1);
    console.log(tempArr);
    this.watchlist$.next([...tempArr]);
  }
}
