interface CurrencyFlagProps {
  className?: string;
  currency: string;
}
export const CurrencyFlag = ({ currency, className = "" }: CurrencyFlagProps) => {
  return (
    <div
      className={`bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className={`currency-flag currency-flag-xl currency-flag-${currency.toLowerCase()} bg-center`}
      ></div>
    </div>
  );
};
