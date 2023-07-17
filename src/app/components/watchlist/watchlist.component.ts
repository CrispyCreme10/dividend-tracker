import { Matches, StockDataService, SymbolSearchResponse } from './../../services/stock-data.service';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { WatchlistStateService } from './../../state/watchlist-state.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Ticker } from 'src/app/models/ticker';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  @ViewChild('searchInput') searchInput: ElementRef;

  watchlist$: Observable<Ticker[]>;
  tableColumns$: Observable<string[]>;

  searchResults$: BehaviorSubject<Matches[]> = new BehaviorSubject<Matches[]>([]);

  constructor(private watchlistState: WatchlistStateService,
              private stockDataService: StockDataService) {
    this.watchlist$ = this.watchlistState.watchlist$;
    this.tableColumns$ = this.watchlistState.tableColumns$;
  }
  
  onKeyUp(event: KeyboardEvent) {
    if (this.searchInput !== null && this.searchInput !== undefined && this.searchInput.nativeElement.value !== '') {
      console.log(this.searchInput.nativeElement.value);
      this.stockDataService.tickerSearch(event.key)
      .pipe(
        map(res => res.bestMatches.map((bm: any) => ({
          symbol: bm['1. symbol'],
          name: bm['2. name'],
        })))
      )
      .subscribe(res => {
        console.log(res);
        this.searchResults$.next(res);
      });
    }
  }
}
