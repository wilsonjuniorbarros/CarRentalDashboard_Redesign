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
import { QuoteForm } from "./QuoteForm";
import { quotes } from "@/lib/data";
import { Eye, SendHorizontal, Files, Trash, Plus } from "lucide-react";

export function QuotesPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create'>('view');
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [clientFilter, setClientFilter] = useState<string>("");

  const filteredQuotes = quotes.filter(quote => {
    const matchStatus = !statusFilter || quote.status === statusFilter;
    const matchClient = !clientFilter || 
      quote.clientName.toLowerCase().includes(clientFilter.toLowerCase());
    return matchStatus && matchClient;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Enviado</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aceito</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeitado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Cotações</CardTitle>
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
                  Nova Cotação
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
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="sent">Enviado</SelectItem>
                    <SelectItem value="accepted">Aceito</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
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
                  <TableHead>Plano</TableHead>
                  <TableHead>Estimativa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.clientName}</TableCell>
                    <TableCell>{quote.vehicleName}</TableCell>
                    <TableCell>{quote.planName}</TableCell>
                    <TableCell>{formatCurrency(quote.totalEstimate)}</TableCell>
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {quote.status === 'pending' && (
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary-600">
                          <SendHorizontal className="h-4 w-4" />
                        </Button>
                      )}
                      {(quote.status === 'sent' || quote.status === 'accepted') && (
                        <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                          <Files className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                        <Trash className="h-4 w-4" />
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
              <span className="font-medium">{filteredQuotes.length}</span> de{" "}
              <span className="font-medium">{quotes.length}</span> resultados
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
          <QuoteForm onCancel={() => setCurrentTab('view')} />
        </CardContent>
      )}
    </Card>
  );
}
