import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, BarChart, PieChart } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { financialData } from "@/lib/data";

export function FinancialPage() {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-gray-800">Painel Financeiro</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex items-center"
          >
            <ArrowDownRight className="h-4 w-4 mr-2" />
            Registrar Despesa
          </Button>
          <Button
            className="flex items-center"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Registrar Receita
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Receita deste mês</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(financialData.monthlyRevenue)}
            </p>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm mr-1">+12.5%</span>
              <span className="text-sm text-gray-500">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Despesas deste mês</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(financialData.monthlyExpenses)}
            </p>
            <div className="mt-1 flex items-center">
              <span className="text-red-600 text-sm mr-1">+5.2%</span>
              <span className="text-sm text-gray-500">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Saldo líquido</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(financialData.netBalance)}
            </p>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm mr-1">+18.3%</span>
              <span className="text-sm text-gray-500">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Evolução Financeira</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="h-8">
                <BarChart className="h-4 w-4 mr-2" />
                Mensal
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <PieChart className="h-4 w-4 mr-2" />
                Anual
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={financialData.revenueByMonth}
                margin={{
                  top: 20,
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
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <div>
        <Tabs defaultValue="income">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="income">Receitas</TabsTrigger>
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="h-9">
              Exportar Relatório
            </Button>
          </div>
          
          <TabsContent value="income">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.incomes.map((income) => (
                      <TableRow key={income.id}>
                        <TableCell>{formatDate(income.date)}</TableCell>
                        <TableCell>{income.description}</TableCell>
                        <TableCell>{formatCurrency(income.value)}</TableCell>
                        <TableCell>
                          {income.status === 'paid' ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pago</Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(expense.value)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
