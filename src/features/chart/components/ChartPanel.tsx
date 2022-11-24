import { Chart } from "@/features/chart/components/Chart";
import { CurrencyFlag } from "@/features/core/components/CurrencyFlag";
import getSymbol from "currency-symbol-map";
import { useLastData } from "@/features/exchange/hooks/useLastData";

interface ChartPanelProps {
  className?: string;
  currencyFrom: string;
  currencyTo: string;
  data: ExchangeData[];
}

export const ChartPanel = ({ currencyFrom, currencyTo, data, className = "" }: ChartPanelProps) => {
  const symbolPair = `${currencyFrom}${currencyTo}`;
  const lastDataValue = useLastData(symbolPair, data[data.length - 1]?.value);
  const diff = lastDataValue - data[0]?.value;
  const diffPercentage = (diff / data[0]?.value) * 100;
  const diffColor = diff > 0 ? "text-green-500" : "text-red-500";

  return (
    <div className={` ${className}`}>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <CurrencyFlag currency={currencyFrom} />
          <CurrencyFlag currency={currencyTo} />
          <div className="bg-gray-200 rounded-full text-gray-500 py-1 px-5 text-sm font-semibold">
            Forex.com
          </div>
        </div>
        <div className="flex justify-between py-2 items-baseline">
          <h3 className="text-3xl font-bold">
            {currencyFrom}/{currencyTo}
          </h3>
          <p className="text-2xl text-gray-900">
            {getSymbol(currencyTo) ?? currencyTo} {lastDataValue.toFixed(6)}
          </p>
        </div>
        <div className="flex justify-end">
          <p className={`text-sm font-semibold ${diffColor}`}>
            {diff.toFixed(6)} ({diffPercentage.toFixed(6)}%)
          </p>
        </div>
      </div>
      <Chart data={data} dataKey="value" />
    </div>
  );
};
