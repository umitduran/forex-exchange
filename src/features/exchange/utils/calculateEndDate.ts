export const calculateEndDate = (refDate: Date): string => {
  return refDate.toISOString().replace("T", "-").split(".")[0];
};
