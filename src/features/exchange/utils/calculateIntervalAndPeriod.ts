interface Range {
  interval: string;
  period: number;
  count: number;
}
export const calculateIntervalAndPeriod = (range: string): Range => {
  switch (range) {
    case "15M":
      return { interval: "minute", period: 1, count: 15 };
    case "1H":
      return { interval: "minute", period: 5, count: 12 };
    case "1D":
      return { interval: "hourly", period: 1, count: 24 };
    case "1W":
      return { interval: "daily", period: 1, count: 7 };
    case "1M":
      return { interval: "daily", period: 1, count: 30 };
    default:
      throw new Error("Invalid range");
  }
};
