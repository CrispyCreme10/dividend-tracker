import { Observable } from 'rxjs';
import { WatchlistStateService } from './../../state/watchlist-state.service';
import { Component, Input } from '@angular/core';
import { Ticker } from 'src/app/models/ticker';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  watchlist$: Observable<Ticker[]>;
  tableColumns$: Observable<string[]>;


  constructor(private watchlistState: WatchlistStateService) {
    this.watchlist$ = this.watchlistState.watchlist$;
    this.tableColumns$ = this.watchlistState.tableColumns$;
  }
  
  onKeyUp(event: KeyboardEvent) {

  }
}
