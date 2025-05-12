import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { financialData } from "@/lib/data";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function RevenueChart() {
  const data = financialData.revenueByMonth;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-100">
          <p className="font-medium">{label}</p>
          <p className="text-blue-500 font-medium">{`Receita: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-rose-500 font-medium">{`Despesas: ${formatCurrency(payload[1].value)}`}</p>
          <p className="text-emerald-500 font-medium">{`Lucro: ${formatCurrency(payload[0].value - payload[1].value)}`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            fontSize={12}
            stroke="#999"
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            fontSize={12}
            tickFormatter={(value) => `R$${value / 1000}k`}
            stroke="#999"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <ReferenceLine y={0} stroke="#000" />
          <Area 
            type="monotone" 
            name="Receita" 
            dataKey="revenue" 
            stroke="#3b82f6" 
            fillOpacity={1}
            fill="url(#colorRevenue)"
            activeDot={{ r: 6 }}
          />
          <Area 
            type="monotone" 
            name="Despesas" 
            dataKey="expenses" 
            stroke="#ef4444" 
            fillOpacity={1}
            fill="url(#colorExpenses)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
