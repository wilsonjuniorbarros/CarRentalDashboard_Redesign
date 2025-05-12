import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ContractForm } from "./ContractForm";
import { contracts } from "@/lib/data";
import { FileText, Printer, XCircle, Plus } from "lucide-react";

export function ContractsPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create'>('view');
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [clientFilter, setClientFilter] = useState<string>("");

  const filteredContracts = contracts.filter(contract => {
    const matchStatus = !statusFilter || contract.status === statusFilter;
    const matchClient = !clientFilter || 
      contract.clientName.toLowerCase().includes(clientFilter.toLowerCase());
    return matchStatus && matchClient;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case 'finalized':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Finalizado</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Contratos de Aluguel</CardTitle>
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
                  Novo Contrato
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {currentTab === 'view' ? (
        <>
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="finalized">Finalizados</SelectItem>
                    <SelectItem value="cancelled">Cancelados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">Cliente</Label>
                <Input 
                  id="client" 
                  placeholder="Buscar por cliente" 
                  value={clientFilter}
                  onChange={(e) => setClientFilter(e.target.value)}
                  className="w-full sm:w-[300px]"
                />
              </div>
              <div className="w-full sm:w-auto sm:self-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setStatusFilter("");
                    setClientFilter("");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{contract.clientName}</div>
                    </TableCell>
                    <TableCell>{contract.vehicleName}</TableCell>
                    <TableCell>{formatDate(contract.startDate)} - {formatDate(contract.endDate)}</TableCell>
                    <TableCell>{formatCurrency(contract.total)}</TableCell>
                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary-dark">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary-dark">
                        <Printer className="h-4 w-4" />
                      </Button>
                      {contract.status === 'active' && (
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <CardContent className="py-2 px-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando <span className="font-medium">1</span> a{" "}
              <span className="font-medium">{filteredContracts.length}</span> de{" "}
              <span className="font-medium">{contracts.length}</span> resultados
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
          <ContractForm onCancel={() => setCurrentTab('view')} />
        </CardContent>
      )}
    </Card>
  );
}
