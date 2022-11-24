import { Button } from "@/features/core/components/Button";
import { useRouter } from "next/router";

const options = [
  { label: "15M", value: "15M" },
  { label: "1H", value: "1H" },
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
];

interface IntervalSelectionProps {
  currencyFrom: string;
  currencyTo: string;
  range: string;
  className?: string;
}
export const IntervalSelection = ({
  currencyFrom,
  currencyTo,
  range,
  className = "",
}: IntervalSelectionProps) => {
  const router = useRouter();

  return (
    <div className={`flex space-x-5 mb-2 justify-center ${className}`}>
      {options.map((option) => (
        <Button
          key={option.value}
          className={`px-2 bg-slate-100 hover:bg-slate-300 ${
            range === option.value ? "bg-blue-300" : ""
          }`}
          onClick={async () => {
            const searchParams = new URLSearchParams();
            searchParams.set("range", option.value);
            searchParams.set("currencyFrom", currencyFrom + "");
            searchParams.set("currencyTo", currencyTo + "");
            await router.push({
              pathname: "/",
              query: searchParams.toString(),
            });
          }}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
