import * as process from "process";

export const getCurrencyList = () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/live_currencies_list`);
  url.searchParams.append("api_key", process.env.NEXT_PUBLIC_API_KEY || "");

  return fetch(url)
    .then((res) => res.json())
    .then(({ available_currencies }) =>
      Object.entries(available_currencies).map(([key, value]) => ({ key, label: value + "" })),
    );
};

export const getExchangeData = (
  currencyFrom: string,
  currencyTo: string,
  startDate: string,
  endDate: string,
  interval: string,
  period: number,
): Promise<ExchangeData[]> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/timeseries`);
  url.searchParams.append("api_key", process.env.NEXT_PUBLIC_API_KEY || "");
  url.searchParams.append("currency", currencyFrom + currencyTo);
  url.searchParams.append("start_date", startDate);
  url.searchParams.append("end_date", endDate);
  url.searchParams.append("interval", interval);
  url.searchParams.append("period", period + "");

  return fetch(url)
    .then((res) => res.json())
    .then(({ quotes }) =>
      quotes.map((quote: any) => ({
        symbol: currencyFrom + currencyTo,
        ts: new Date(quote.date).getTime(),
        value: quote.close,
      })),
    );
};
