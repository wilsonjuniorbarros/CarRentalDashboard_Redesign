import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RentalPlanForm } from "./RentalPlanForm";
import { Pencil, Trash, Plus, Check } from "lucide-react";
import { rentalPlans } from "@/lib/data";

export function RentalPlansPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create'>('view');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const formatPeriod = (type: string) => {
    switch (type) {
      case 'daily':
        return '/dia';
      case 'weekly':
        return '/semana';
      case 'monthly':
        return '/mês';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Planos de Aluguel</CardTitle>
          <div className="mt-2 sm:mt-0">
            <Button 
              onClick={() => setCurrentTab(currentTab === 'create' ? 'view' : 'create')} 
              className="inline-flex items-center"
            >
              {currentTab === 'create' ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M10 17l-5-5 5-5" />
                    <path d="M19 17l-5-5 5-5" />
                  </svg>
                  Voltar para Lista
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Plano
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {currentTab === 'view' ? (
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rentalPlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg overflow-hidden shadow">
                <div className={
                  plan.type === 'daily' 
                    ? 'bg-blue-600 text-white p-4' 
                    : plan.type === 'monthly' 
                      ? 'bg-green-600 text-white p-4' 
                      : 'bg-amber-500 text-white p-4'
                }>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(plan.price)}
                    <span className="text-sm font-normal">{formatPeriod(plan.type)}</span>
                  </p>
                </div>
                <div className="p-4 bg-white">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {plan.includedKm.toLocaleString('pt-BR')} km incluídos
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Seguro básico
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Assistência 24h
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <Button variant="ghost" size="sm" className="text-primary mr-2">
                      <Pencil className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash className="h-4 w-4 mr-1" /> Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-4">
          <RentalPlanForm onCancel={() => setCurrentTab('view')} />
        </CardContent>
      )}
    </Card>
  );
}
