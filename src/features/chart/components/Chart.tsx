import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { useEffect, useState } from "react";

interface ChartProps {
  className?: string;
  data: any[];
  dataKey: string;
}
export const Chart = ({ data, dataKey }: ChartProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ResponsiveContainer width="90%" aspect={2}>
      <AreaChart data={data}>
        {mounted && (
          <>
            <Area type="linear" dataKey={dataKey} stroke="#73b723" strokeWidth={3} fill="#f2f9ea" />
            <YAxis hide={true} domain={["auto", "auto"]} />
            <Tooltip />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};
