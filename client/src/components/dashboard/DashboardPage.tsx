import { Car, KeyRound, BanknoteIcon, FileText, PlusCircle, UserPlus, CalculatorIcon, TrendingUp, BarChart3 } from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { RevenueChart } from "./RevenueChart";
import { ContractsChart } from "./ContractsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { dashboardData } from "@/lib/data";

export function DashboardPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao seu painel de controle da locadora</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="h-9">
            <BarChart3 className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
          <Button size="sm" className="h-9">
            <TrendingUp className="h-4 w-4 mr-2" />
            Análise
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard 
          title="Veículos Disponíveis"
          value={dashboardData.availableVehicles.toString()}
          icon={Car}
          iconColor="text-green-500"
          iconBgColor="bg-green-100"
          trend={{ value: "+12%", isPositive: true }}
        />
        <SummaryCard 
          title="Veículos Alugados"
          value={dashboardData.rentedVehicles.toString()}
          icon={KeyRound}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-100"
          trend={{ value: "+5%", isPositive: true }}
        />
        <SummaryCard 
          title="Receita Mensal"
          value={formatCurrency(dashboardData.monthlyRevenue)}
          icon={BanknoteIcon}
          iconColor="text-amber-500"
          iconBgColor="bg-amber-100"
          trend={{ value: "+8.2%", isPositive: true }}
        />
        <SummaryCard 
          title="Contratos Ativos"
          value={dashboardData.activeContracts.toString()}
          icon={FileText}
          iconColor="text-purple-500"
          iconBgColor="bg-purple-100"
          trend={{ value: "-3%", isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">Receitas e Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">Contratos por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ContractsChart />
          </CardContent>
        </Card>
      </div>

      {/* Shortcuts */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-800">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-4">
            <Link href="/contracts?action=new">
              <Button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Contrato
              </Button>
            </Link>
            <Link href="/clients?action=new">
              <Button className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Cliente
              </Button>
            </Link>
            <Link href="/quotes?action=new">
              <Button className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white">
                <CalculatorIcon className="mr-2 h-4 w-4" />
                Nova Cotação
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
