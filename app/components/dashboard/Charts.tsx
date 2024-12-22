/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

interface ChartsDataProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

const aggregateData = (data: any) => {
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});

  return Object.keys(aggregated).map((date)=> ({
    date,
    revenue: aggregated[date]
  }))
};

export function Charts({ data }: ChartsDataProps) {
    const procData = aggregateData(data)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={procData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="bump"
          stroke="#ff0990"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
