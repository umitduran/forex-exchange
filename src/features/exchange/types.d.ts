interface Currency {
  key: string;
  label: string;
}

interface ExchangeData {
  symbol: string;
  ts: number;
  value: number;
}

interface SocketData {
  symbol: string;
  ts: string;
  ask: number;
  bid: number;
  mid: number;
}

interface ExchangeState {
  currencyFrom: string;
  currencyTo: string;
  symbol: string;
  interval: string;
  data: ExchangeData[];
}
