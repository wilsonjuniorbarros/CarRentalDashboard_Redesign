import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientForm } from "./ClientForm";
import { clients } from "@/lib/data";
import { Pencil, Eye, Plus, History } from "lucide-react";

export function ClientsPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create'>('view');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cpf.includes(searchQuery)
  );

  const formatCnhExpiration = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Lista de Clientes</CardTitle>
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
                  Adicionar Cliente
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
                <Input
                  placeholder="Buscar por nome ou CPF"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-auto sm:self-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSearchQuery("")}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>CNH</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.cpf}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>
                      <div>{client.cnh}</div>
                      <div className="text-xs text-green-600">Válida até: {formatCnhExpiration(client.cnhExpiration)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary mr-2">
                        <History className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary mr-2">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
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
              <span className="font-medium">{filteredClients.length}</span> de{" "}
              <span className="font-medium">{clients.length}</span> resultados
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
          <ClientForm onCancel={() => setCurrentTab('view')} />
        </CardContent>
      )}
    </Card>
  );
}
