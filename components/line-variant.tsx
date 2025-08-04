import { format } from 'date-fns';
import { Tooltip, XAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import CustomTooltip from './custom-tooltip';

interface Props {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export default function LineVariant({ data }: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, 'dd MMM')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="income"
          fill="#3b82f6"
          className="drop-shadow-sm"
        />
        <Line
          dataKey="expenses"
          fill="#f43f56"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
