export const calculateStartDate = (
  refDate: Date,
  interval: string,
  period: number,
  count: number,
): string => {
  const startDate = new Date(refDate);

  switch (interval) {
    case "minute":
      startDate.setMinutes(startDate.getMinutes() - count * period);
      break;
    case "hourly":
      startDate.setHours(startDate.getHours() - count * period);
      break;
    case "daily":
      startDate.setDate(startDate.getDate() - count * period);
      break;
  }

  return startDate.toISOString().replace("T", "-").split(".")[0];
};
