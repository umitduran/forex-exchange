import Head from "next/head";
import "node_modules/currency-flags/dist/currency-flags.min.css";
import { ChartPanel } from "@/features/chart/components/ChartPanel";
import { CurrencySelectionPanel } from "@/features/exchange/components/CurrencySelectionPanel";
import { GetServerSideProps } from "next";
import { getCurrencyList, getExchangeData } from "@/features/exchange/store/exchangeAPI";
import { calculateIntervalAndPeriod } from "@/features/exchange/utils/calculateIntervalAndPeriod";
import { calculateStartDate } from "@/features/exchange/utils/calculateStartDate";
import { calculateEndDate } from "@/features/exchange/utils/calculateEndDate";
import { IntervalSelection } from "@/features/exchange/components/IntervalSelection";

interface Props {
  range: string;
  currencyFrom: string;
  currencyTo: string;
  currencies: Currency[];
  exchangeData: ExchangeData[];
}

export default function Home({ currencies, range, currencyFrom, currencyTo, exchangeData }: Props) {
  return (
    <div className="w-full text-slate-900 flex justify-center items-center px-5">
      <Head>
        <title>Forex Exchange</title>
        <meta
          name="description"
          content="Forex Exchange - check out the current price for a currency pair"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row w-full gap-3 md:gap-10 items-center">
        <CurrencySelectionPanel
          currencyFrom={currencyFrom}
          currencyTo={currencyTo}
          currencies={currencies}
        />

        <div className={`flex flex-col grow gap-2 md:gap-5 drop-shadow-lg shadow-2xl w-full`}>
          <ChartPanel currencyFrom={currencyFrom} currencyTo={currencyTo} data={exchangeData} />
          <IntervalSelection currencyFrom={currencyFrom} currencyTo={currencyTo} range={range} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { range = "15M", currencyFrom = "EUR", currencyTo = "USD" } = context.query;
  const currencies = await getCurrencyList();
  const { interval, period, count } = calculateIntervalAndPeriod(range + "");
  const startDate = calculateStartDate(new Date(), interval, period, count);
  const endDate = calculateEndDate(new Date());

  const exchangeData = await getExchangeData(
    currencyFrom + "",
    currencyTo + "",
    startDate,
    endDate,
    interval,
    period,
  );

  return {
    props: {
      range: range + "",
      currencyFrom: currencyFrom + "",
      currencyTo: currencyTo + "",
      currencies,
      exchangeData,
    },
  };
};
