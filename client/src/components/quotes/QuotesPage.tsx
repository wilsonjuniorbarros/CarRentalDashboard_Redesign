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
import { Eye, SendHorizontal, Files, Trash, Plus, Clock, CheckCircle, XCircle } from "lucide-react";
import { Quote } from "@/types";

export function QuotesPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create' | 'edit'>('view');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const filteredQuotes = quotes.filter(quote => {
    const matchStatus = statusFilter === "all" || quote.status === statusFilter;
    const matchClient = !clientFilter || 
      quote.clientName.toLowerCase().includes(clientFilter.toLowerCase());
    return matchStatus && matchClient;
  });

  // Count quotes by status
  const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
  const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
  const rejectedQuotes = quotes.filter(q => q.status === 'rejected').length;

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
    <div className="space-y-6">
      {/* Mini Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-yellow-600/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Cotações Pendentes</p>
              <h3 className="text-2xl font-bold text-yellow-900">{pendingQuotes}</h3>
              <p className="text-xs text-yellow-700">de {quotes.length} cotações</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-green-600/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Cotações Aceitas</p>
              <h3 className="text-2xl font-bold text-green-900">{acceptedQuotes}</h3>
              <p className="text-xs text-green-700">de {quotes.length} cotações</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-red-600/10 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Cotações Rejeitadas</p>
              <h3 className="text-2xl font-bold text-red-900">{rejectedQuotes}</h3>
              <p className="text-xs text-red-700">de {quotes.length} cotações</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Card */}
      <Card>
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-800">Cotações</CardTitle>
            <div className="mt-2 sm:mt-0">
              <Button 
                onClick={() => setCurrentTab(currentTab === 'view' ? 'create' : 'view')} 
                className="inline-flex items-center"
              >
                {currentTab !== 'view' ? (
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
                      <SelectItem value="all">Todos</SelectItem>
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
                      setStatusFilter("all");
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-primary hover:text-primary-600"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setCurrentTab('edit');
                          }}
                        >
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
            <QuoteForm 
              onCancel={() => setCurrentTab('view')} 
              editQuote={currentTab === 'edit' ? selectedQuote : undefined}
            />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
