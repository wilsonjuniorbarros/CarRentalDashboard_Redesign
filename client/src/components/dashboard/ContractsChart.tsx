import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { dashboardData } from "@/lib/data";

export function ContractsChart() {
  const data = dashboardData.contractsByStatus;

  // Cores mais suaves e modernas
  const COLORS = ["#3b82f6", "#22c55e", "#ef4444"];
  const HOVER_COLORS = ["#2563eb", "#16a34a", "#dc2626"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-100">
          <p className="font-medium">{payload[0].name}</p>
          <p className="font-medium">{payload[0].value}% ({payload[0].payload.count} contratos)</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = () => {
    return (
      <div className="flex flex-col gap-3 mt-6">
        {data.map((entry, index) => (
          <div 
            key={`legend-${index}`}
            className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm font-medium text-gray-800">{entry.status}</span>
            <span className="text-sm text-gray-700 ml-auto font-medium">{entry.percentage}%</span>
            <span className="text-sm text-gray-500 ml-2">({entry.count})</span>
          </div>
        ))}
      </div>
    );
  };

  // Renderiza rótulos dentro do gráfico
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-[300px]">
      <div className="flex h-full">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradientPie-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={1.0} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="status"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradientPie-${index})`} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/3 flex items-center">
          {renderLegend()}
        </div>
      </div>
    </div>
  );
}
