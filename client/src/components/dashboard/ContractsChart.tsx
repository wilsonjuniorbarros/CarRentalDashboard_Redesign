import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { dashboardData } from "@/lib/data";

export function ContractsChart() {
  const data = dashboardData.contractsByStatus;

  const COLORS = ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--destructive))"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-100">
          <p className="font-medium">{payload[0].name}</p>
          <p>{payload[0].value}% ({payload[0].payload.count} contratos)</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = () => {
    return (
      <div className="flex flex-col gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-700">{entry.status}</span>
            <span className="text-sm text-gray-700 ml-auto">{entry.percentage}% ({entry.count})</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">Contratos por Status</h3>
        </div>
        <div className="flex justify-center h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="hsl(var(--primary))"
                dataKey="percentage"
                nameKey="status"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {renderLegend()}
      </CardContent>
    </Card>
  );
}
