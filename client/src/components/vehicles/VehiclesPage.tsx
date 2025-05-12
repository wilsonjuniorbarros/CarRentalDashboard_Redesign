import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, Plus, Car, Calendar, Wrench } from "lucide-react";
import { VehicleForm } from "./VehicleForm";
import { vehicles } from "@/lib/data";
import { Vehicle } from "@/types";

export function VehiclesPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create' | 'edit'>('view');
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPlate, setFilterPlate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchCategory = filterCategory === "all" || vehicle.category.toLowerCase() === filterCategory.toLowerCase();
    const matchPlate = !filterPlate || vehicle.plate.toLowerCase().includes(filterPlate.toLowerCase());
    const matchStatus = filterStatus === "all" || vehicle.status === filterStatus;
    return matchCategory && matchPlate && matchStatus;
  });
  
  const availableCount = vehicles.filter(v => v.status === 'available').length;
  const rentedCount = vehicles.filter(v => v.status === 'rented').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Disponível</Badge>;
      case 'rented':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Alugado</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Em Manutenção</Badge>;
      default:
        return null;
    }
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage) + ' km';
  };

  return (
    <div className="space-y-6">
      {/* Mini Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-green-600/10 flex items-center justify-center">
              <Car className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Veículos Disponíveis</p>
              <h3 className="text-2xl font-bold text-green-900">{availableCount}</h3>
              <p className="text-xs text-green-700">de {vehicles.length} veículos</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Em Aluguel</p>
              <h3 className="text-2xl font-bold text-blue-900">{rentedCount}</h3>
              <p className="text-xs text-blue-700">de {vehicles.length} veículos</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-amber-600/10 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Em Manutenção</p>
              <h3 className="text-2xl font-bold text-amber-900">{maintenanceCount}</h3>
              <p className="text-xs text-amber-700">de {vehicles.length} veículos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    
      {/* Main Card */}
      <Card>
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-800">Lista de Veículos</CardTitle>
            <div className="mt-2 sm:mt-0">
              <Button 
                onClick={() => setCurrentTab(currentTab === 'view' ? 'create' : 'view')} 
                className="inline-flex items-center"
              >
                {currentTab !== 'view' ? (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Voltar para Lista
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Veículo
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {currentTab === 'view' ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatch">Hatch</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-1">Placa</Label>
                  <Input 
                    id="plate" 
                    placeholder="Buscar por placa" 
                    value={filterPlate}
                    onChange={(e) => setFilterPlate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="rented">Alugado</SelectItem>
                      <SelectItem value="maintenance">Em Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full" onClick={() => {
                    setFilterCategory("all");
                    setFilterPlate("");
                    setFilterStatus("all");
                  }}>
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Quilometragem</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <div className="font-medium text-gray-900">{vehicle.model}</div>
                        <div className="text-sm text-gray-500">{vehicle.brand}</div>
                      </TableCell>
                      <TableCell>{vehicle.plate}</TableCell>
                      <TableCell>{vehicle.category}</TableCell>
                      <TableCell>{formatMileage(vehicle.mileage)}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary-600 mr-2"
                          onClick={() => {
                            // Sabemos que vehicle.status é um tipo válido pois vem do data.ts que está tipado
                            setSelectedVehicle(vehicle as Vehicle);
                            setCurrentTab('edit');
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <CardContent className="py-2 px-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">1</span> a{" "}
                <span className="font-medium">{filteredVehicles.length}</span> de{" "}
                <span className="font-medium">{vehicles.length}</span> resultados
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary-700">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-4">
            <VehicleForm 
              onCancel={() => setCurrentTab('view')} 
              editVehicle={currentTab === 'edit' ? selectedVehicle : undefined}
            />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
