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
import { MaintenanceForm } from "./MaintenanceForm";
import { maintenances, suppliers, vehicles } from "@/lib/data";
import { AlertCircle, AlertTriangle, CheckCircle2, UserPlus, Settings, Eye, Edit } from "lucide-react";

export function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [showForm, setShowForm] = useState(false);

  // Format date using local format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Agendada</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Em Andamento</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Concluída</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>;
      default:
        return null;
    }
  };

  // Vehicles that need maintenance soon
  const upcomingMaintenance = [
    {
      vehicleId: 2,
      vehicleName: "HB20 2022",
      lastMaintenanceKm: vehicles.find(v => v.id === 2)?.mileage! - 9500,
      currentMileage: vehicles.find(v => v.id === 2)?.mileage,
      kmUntilMaintenance: 500
    },
    {
      vehicleId: 3,
      vehicleName: "Strada 2020",
      lastMaintenanceDate: "2025-02-20",
      scheduledDate: "2025-05-12",
      daysRemaining: 5
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-gray-800">Manutenção & Fornecedores</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              setActiveTab("suppliers");
              setShowForm(false);
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Fornecedor
          </Button>
          <Button
            className="flex items-center"
            onClick={() => {
              setActiveTab("work-order");
              setShowForm(true);
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            Nova Manutenção
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Próximas Manutenções</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
          <TabsTrigger value="work-order">Ordem de Serviço</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {upcomingMaintenance.map((item, index) => (
                  <div key={index} className={
                    item.kmUntilMaintenance 
                      ? "bg-amber-50 border border-amber-200 rounded-md p-4" 
                      : "bg-red-50 border border-red-200 rounded-md p-4"
                  }>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {item.kmUntilMaintenance 
                          ? <AlertTriangle className="h-6 w-6 text-amber-400" /> 
                          : <AlertCircle className="h-6 w-6 text-red-400" />
                        }
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800">{item.vehicleName}</h3>
                        <div className="mt-2 text-sm">
                          {item.kmUntilMaintenance ? (
                            <p className="text-amber-700">
                              Última manutenção há {9500} km. Próxima em {item.kmUntilMaintenance} km.
                            </p>
                          ) : (
                            <p className="text-red-700">
                              Manutenção programada para {formatDate(item.scheduledDate!)} (em {item.daysRemaining} dias).
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Corolla 2020</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Manutenção realizada em {formatDate("2025-04-28")}. Próxima em 10.000 km.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Veículo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Custo Est.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenances.map((maintenance) => (
                      <TableRow key={maintenance.id}>
                        <TableCell>#{maintenance.id.toString().padStart(3, '0')}</TableCell>
                        <TableCell>{maintenance.vehicleName}</TableCell>
                        <TableCell>
                          {maintenance.type === 'preventive' ? 'Preventiva' : 'Corretiva'}
                        </TableCell>
                        <TableCell>{maintenance.supplierName}</TableCell>
                        <TableCell>{formatDate(maintenance.date)}</TableCell>
                        <TableCell>{formatCurrency(maintenance.estimatedCost)}</TableCell>
                        <TableCell>{getStatusBadge(maintenance.status)}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon" className="text-primary hover:text-primary-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                    <h4 className="text-lg font-medium text-gray-800">{supplier.name}</h4>
                    <p className="text-sm text-gray-600">{supplier.type}</p>
                    <p className="text-sm text-gray-600">{supplier.city}</p>
                    <p className="text-sm text-gray-600">{supplier.phone}</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-primary">Detalhes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-order" className="pt-4">
          <Card>
            <CardContent className="p-6">
              {showForm ? (
                <MaintenanceForm onCancel={() => setShowForm(false)} />
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Selecione uma manutenção existente para visualizar ou clique em "Nova Manutenção" para criar uma nova ordem de serviço.</p>
                  <Button className="mt-4" onClick={() => setShowForm(true)}>
                    Nova Manutenção
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
