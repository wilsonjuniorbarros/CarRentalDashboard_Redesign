import { useState } from "react";
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
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { financialData } from "@/lib/data";
import { FinancialTransactionForm } from "./FinancialTransactionForm";

export function FinancialPage() {
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

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
          <p className="text-blue-500">Receita: {formatCurrency(payload[0].value)}</p>
          <p className="text-red-500">Despesas: {formatCurrency(payload[1].value)}</p>
        </div>
      );
    }
  
    return null;
  };

  const handleTransactionSubmit = (data: any) => {
    console.log('Nova transação:', data);
    // Aqui normalmente enviaríamos os dados para o servidor
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-gray-800">Painel Financeiro</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => setShowExpenseForm(true)}
          >
            <ArrowDownRight className="h-4 w-4 mr-2" />
            Registrar Despesa
          </Button>
          <Button
            className="flex items-center"
            onClick={() => setShowIncomeForm(true)}
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Registrar Receita
          </Button>
        </div>
      </div>

      {/* Formulários de transação */}
      <FinancialTransactionForm 
        type="income" 
        open={showIncomeForm} 
        onClose={() => setShowIncomeForm(false)} 
        onSubmit={handleTransactionSubmit}
      />
      
      <FinancialTransactionForm 
        type="expense" 
        open={showExpenseForm} 
        onClose={() => setShowExpenseForm(false)} 
        onSubmit={handleTransactionSubmit}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-blue-700 mb-2">Receita deste mês</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(financialData.monthlyRevenue)}
            </p>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm mr-1">+12.5%</span>
              <span className="text-sm text-gray-500">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-red-700 mb-2">Despesas deste mês</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(financialData.monthlyExpenses)}
            </p>
            <div className="mt-1 flex items-center">
              <span className="text-red-600 text-sm mr-1">+5.2%</span>
              <span className="text-sm text-gray-500">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-green-700 mb-2">Saldo líquido</h3>
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
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-800">Evolução Financeira</CardTitle>
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
              <AreaChart
                data={financialData.revenueByMonth}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
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
                <Legend />
                <Area 
                  type="monotone"
                  name="Receita" 
                  dataKey="revenue" 
                  fill="rgba(59, 130, 246, 0.2)" 
                  stroke="#3b82f6"
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone"
                  name="Despesas" 
                  dataKey="expenses" 
                  fill="rgba(239, 68, 68, 0.2)" 
                  stroke="#ef4444"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
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
            <Card className="shadow-sm border-blue-100">
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
                      <TableRow key={income.id} className="hover:bg-blue-50">
                        <TableCell>{formatDate(income.date)}</TableCell>
                        <TableCell>{income.description}</TableCell>
                        <TableCell className="font-medium text-blue-700">{formatCurrency(income.value)}</TableCell>
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
            <Card className="shadow-sm border-red-100">
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
                      <TableRow key={expense.id} className="hover:bg-red-50">
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-red-700">{formatCurrency(expense.value)}</TableCell>
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
