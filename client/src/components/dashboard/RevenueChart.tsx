import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
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
          <p className="text-primary">Receita: {formatCurrency(payload[0].value)}</p>
          <p className="text-red-500">Despesas: {formatCurrency(payload[1].value)}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">Receita vs Despesas (Últimos 6 meses)</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barGap={0}
              barCategoryGap={20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                fontSize={12}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12}
                tickFormatter={(value) => `R$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                name="Receita" 
                dataKey="revenue" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                name="Despesas" 
                dataKey="expenses" 
                fill="hsl(var(--destructive))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
