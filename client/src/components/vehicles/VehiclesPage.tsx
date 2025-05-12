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
import { Pencil, Eye, Plus } from "lucide-react";
import { VehicleForm } from "./VehicleForm";
import { vehicles } from "@/lib/data";
import { Vehicle } from "@/types";

export function VehiclesPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create'>('view');
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterPlate, setFilterPlate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchCategory = !filterCategory || vehicle.category.toLowerCase() === filterCategory.toLowerCase();
    const matchPlate = !filterPlate || vehicle.plate.toLowerCase().includes(filterPlate.toLowerCase());
    const matchStatus = !filterStatus || vehicle.status.toLowerCase() === filterStatus.toLowerCase();
    return matchCategory && matchPlate && matchStatus;
  });

  const getStatusBadge = (status: Vehicle['status']) => {
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
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Lista de Veículos</CardTitle>
          <div className="mt-2 sm:mt-0">
            <Button 
              onClick={() => setCurrentTab(currentTab === 'create' ? 'view' : 'create')} 
              className="inline-flex items-center"
            >
              {currentTab === 'create' ? (
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
                    <SelectItem value="">Todas</SelectItem>
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
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="rented">Alugado</SelectItem>
                    <SelectItem value="maintenance">Em Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full" onClick={() => {
                  setFilterCategory("");
                  setFilterPlate("");
                  setFilterStatus("");
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
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-600 mr-2">
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
          <VehicleForm onCancel={() => setCurrentTab('view')} />
        </CardContent>
      )}
    </Card>
  );
}
