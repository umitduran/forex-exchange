import { ComboBox } from "@/features/core/components/ComboBox";
import { useRouter } from "next/router";

interface CurrencySelectionPanelProps {
  className?: string;
  currencies: Currency[];
  currencyFrom: string;
  currencyTo: string;
}
export const CurrencySelectionPanel = ({
  currencies,
  className = "",
  currencyFrom,
  currencyTo,
}: CurrencySelectionPanelProps) => {
  const router = useRouter();
  const selectedFromCurrency = currencies.find((currency) => currency.key === currencyFrom);
  const selectedToCurrency = currencies.find((currency) => currency.key === currencyTo);

  const handleFromCurrencyChange = async (currency: Currency) => {
    const newCurrencyTo = currency.key === currencyTo ? currencyFrom : currencyTo;
    await router.push(`/?currencyFrom=${currency.key}&currencyTo=${newCurrencyTo}`);
  };
  const handleToCurrencyChange = async (currency: Currency) => {
    const newCurrencyFrom = currency.key === currencyFrom ? currencyTo : currencyFrom;
    await router.push(`/?currencyFrom=${newCurrencyFrom}&currencyTo=${currency.key}`);
  };

  return (
    <div className={`flex flex-col gap-1 md:gap-5 ${className}`}>
      <ComboBox
        options={currencies}
        selected={selectedFromCurrency}
        onSelect={handleFromCurrencyChange}
      />
      <ComboBox
        options={currencies}
        selected={selectedToCurrency}
        onSelect={handleToCurrencyChange}
      />
    </div>
  );
};
