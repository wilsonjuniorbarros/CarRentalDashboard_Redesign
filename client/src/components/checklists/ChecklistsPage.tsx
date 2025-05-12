import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistForm } from "./ChecklistForm";
import { deliveryChecklist, returnChecklist } from "@/lib/data";
import { Printer } from "lucide-react";

export function ChecklistsPage() {
  const [activeTab, setActiveTab] = useState<"delivery" | "return">("delivery");
  const [showForm, setShowForm] = useState(false);

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Checklists de Veículo</CardTitle>
          <div className="mt-2 sm:mt-0">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center"
            >
              {showForm ? (
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
                  Voltar para Checklists
                </>
              ) : (
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
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Novo Checklist
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {showForm ? (
        <CardContent className="p-4">
          <ChecklistForm onCancel={() => setShowForm(false)} />
        </CardContent>
      ) : (
        <>
          <div className="border-b border-gray-200">
            <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "delivery" | "return")}>
              <TabsList className="mx-4 mt-2">
                <TabsTrigger value="delivery">Entrega de Veículo</TabsTrigger>
                <TabsTrigger value="return">Devolução de Veículo</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <CardContent className="p-4">
            {activeTab === "delivery" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Checklist de Entrega</h3>
                    <p className="text-sm text-gray-500">
                      Contrato #001 - {deliveryChecklist.contractVehicle} - {deliveryChecklist.contractClient}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Data: {new Date(deliveryChecklist.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Condições Gerais</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Combustível</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {deliveryChecklist.fuel === 'full' ? 'Cheio' : 
                            deliveryChecklist.fuel === 'threeFourths' ? '3/4' : 
                            deliveryChecklist.fuel === 'half' ? '1/2' : 
                            deliveryChecklist.fuel === 'quarter' ? '1/4' : 'Reserva'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hodômetro (km)</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {deliveryChecklist.odometer}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pneus</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {deliveryChecklist.tires === 'ok' ? 'OK' : 
                            deliveryChecklist.tires === 'attention' ? 'Atenção Necessária' : 'Danificados'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Itens Obrigatórios</h4>
                    <div className="space-y-2">
                      {deliveryChecklist.requiredItems.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <input type="checkbox" checked disabled className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                          <label className="ml-2 text-sm text-gray-700">
                            {item === 'triangle' ? 'Triângulo de Sinalização' :
                             item === 'jack' ? 'Macaco' : 
                             item === 'spare' ? 'Estepe' : 
                             item === 'wrench' ? 'Chave de Roda' : 
                             item === 'extinguisher' ? 'Extintor' : 'Manual do Proprietário'}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Avarias</h4>
                  <div className="border border-gray-300 rounded overflow-hidden">
                    <div className="p-4 flex flex-wrap gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Danos Identificados</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {deliveryChecklist.damages}
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 min-h-[100px]">
                          {deliveryChecklist.comments}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Assinatura do Cliente:</p>
                          <p className="text-sm text-gray-700 mt-1">{deliveryChecklist.clientSignature}</p>
                        </div>
                        <div>
                          <Button variant="outline" className="flex items-center">
                            <Printer className="h-4 w-4 mr-2" />
                            Imprimir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "return" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Checklist de Devolução</h3>
                    <p className="text-sm text-gray-500">
                      Contrato #001 - {returnChecklist.contractVehicle} - {returnChecklist.contractClient}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Data: {new Date(returnChecklist.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Condições Gerais</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Combustível</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {returnChecklist.fuel === 'full' ? 'Cheio' : 
                            returnChecklist.fuel === 'threeFourths' ? '3/4' : 
                            returnChecklist.fuel === 'half' ? '1/2' : 
                            returnChecklist.fuel === 'quarter' ? '1/4' : 'Reserva'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hodômetro (km)</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {returnChecklist.odometer}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">KM Percorridos</label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {returnChecklist.odometer - deliveryChecklist.odometer}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Novos Danos</h4>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 min-h-[100px]">
                      {returnChecklist.newDamages}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Taxas Adicionais</h4>
                  <div className="border border-gray-300 rounded overflow-hidden">
                    <div className="p-4">
                      {returnChecklist.additionalFees.map((fee, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                          <span className="text-sm">{fee.description}:</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fee.value)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center py-2 mt-2 border-t border-gray-900">
                        <span className="font-medium">Total:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                            returnChecklist.additionalFees.reduce((sum, fee) => sum + fee.value, 0)
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Assinatura do Cliente:</p>
                          <p className="text-sm text-gray-700 mt-1">{returnChecklist.clientSignature}</p>
                        </div>
                        <div>
                          <Button variant="outline" className="flex items-center">
                            <Printer className="h-4 w-4 mr-2" />
                            Imprimir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
