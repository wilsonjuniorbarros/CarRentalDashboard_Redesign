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
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmployeeForm } from "./EmployeeForm";
import { employees } from "@/lib/data";
import { Plus, Search, Pencil, Eye } from "lucide-react";

export function EmployeesPage() {
  const [currentTab, setCurrentTab] = useState<'view' | 'create'>('view');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.cpf.includes(searchQuery) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800">Funcionários</CardTitle>
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
                  Adicionar Funcionário
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {currentTab === 'view' ? (
        <>
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                placeholder="Buscar por nome, CPF ou cargo"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.cpf}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>
                      {employee.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary-600 mr-2">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
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
              Mostrando <span className="font-medium">{filteredEmployees.length}</span> funcionários
            </div>
          </CardContent>
        </>
      ) : (
        <CardContent className="p-4">
          <EmployeeForm onCancel={() => setCurrentTab('view')} />
        </CardContent>
      )}
    </Card>
  );
}
