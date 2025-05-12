import { Car, KeyRound, BanknoteIcon, FileText, PlusCircle, UserPlus, CalculatorIcon } from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { RevenueChart } from "./RevenueChart";
import { ContractsChart } from "./ContractsChart";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Veículos Disponíveis"
          value={dashboardData.availableVehicles.toString()}
          icon={Car}
          iconColor="text-green-500"
          iconBgColor="bg-green-100"
        />
        <SummaryCard 
          title="Veículos Alugados"
          value={dashboardData.rentedVehicles.toString()}
          icon={KeyRound}
          iconColor="text-primary"
          iconBgColor="bg-blue-100"
        />
        <SummaryCard 
          title="Receita Mensal"
          value={formatCurrency(dashboardData.monthlyRevenue)}
          icon={BanknoteIcon}
          iconColor="text-amber-500"
          iconBgColor="bg-amber-100"
        />
        <SummaryCard 
          title="Contratos Ativos"
          value={dashboardData.activeContracts.toString()}
          icon={FileText}
          iconColor="text-purple-500"
          iconBgColor="bg-purple-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <ContractsChart />
      </div>

      {/* Shortcuts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/contracts?action=new">
              <Button className="inline-flex items-center bg-primary text-white">
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
