export interface CoinValueState {
  [symbol: string]: {
    current: string;
    prev: string;
    changeDay: string;
    highDay: string;
    LowDay: string;
  };
}
export interface prevRef {
  current: string;
}
