export class Ticker {
  public symbol: string;
  public companyName: string;
  public industry: string;
  public price: number;
  public divYield: number;
  public payoutRatio: number;
  public divGrowth: number;
  public pe: number;
  public freeCashFlow: number;
  public marketShare: number;

  constructor(symbol: string) {
    this.symbol = symbol;
  }
}