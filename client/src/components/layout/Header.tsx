import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  Bell
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Tag, 
  FileText, 
  Calculator, 
  CheckSquare, 
  Drill, 
  DollarSign, 
  UserCog, 
  Crown 
} from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [location] = useLocation();
  
  const getPageTitle = () => {
    switch (location) {
      case "/":
        return { title: "Dashboard", icon: <LayoutDashboard className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/vehicles":
        return { title: "Veículos", icon: <Car className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/clients":
        return { title: "Clientes", icon: <Users className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/rental-plans":
        return { title: "Planos de Aluguel", icon: <Tag className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/contracts":
        return { title: "Contratos", icon: <FileText className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/quotes":
        return { title: "Cotações", icon: <Calculator className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/checklists":
        return { title: "Checklists", icon: <CheckSquare className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/maintenance":
        return { title: "Manutenção", icon: <Drill className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/financial":
        return { title: "Financeiro", icon: <DollarSign className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/employees":
        return { title: "Funcionários", icon: <UserCog className="h-5 w-5 mr-2 text-gray-500" /> };
      case "/subscription":
        return { title: "Assinatura", icon: <Crown className="h-5 w-5 mr-2 text-gray-500" /> };
      default:
        return { title: "Dashboard", icon: <LayoutDashboard className="h-5 w-5 mr-2 text-gray-500" /> };
    }
  };

  const { title, icon } = getPageTitle();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="lg:hidden mr-2 text-gray-500"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            {icon}
            <span className="text-lg font-medium text-gray-800">{title}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 text-gray-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white mr-2">
                  <span>RA</span>
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">Rafael Almeida</span>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
