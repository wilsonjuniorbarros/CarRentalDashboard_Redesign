import { useState } from "react";
import { Link, useLocation } from "wouter";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export function Sidebar({ isMobileOpen, setIsMobileOpen }: { 
  isMobileOpen: boolean; 
  setIsMobileOpen: (open: boolean) => void;
}) {
  const [location] = useLocation();
  
  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", href: "/" },
    { icon: <Car className="h-5 w-5" />, label: "Veículos", href: "/vehicles" },
    { icon: <Users className="h-5 w-5" />, label: "Clientes", href: "/clients" },
    { icon: <Tag className="h-5 w-5" />, label: "Planos de Aluguel", href: "/rental-plans" },
    { icon: <FileText className="h-5 w-5" />, label: "Contratos", href: "/contracts" },
    { icon: <Calculator className="h-5 w-5" />, label: "Cotações", href: "/quotes" },
    { icon: <CheckSquare className="h-5 w-5" />, label: "Checklists", href: "/checklists" },
    { icon: <Drill className="h-5 w-5" />, label: "Manutenção", href: "/maintenance" },
    { icon: <DollarSign className="h-5 w-5" />, label: "Financeiro", href: "/financial" },
    { icon: <UserCog className="h-5 w-5" />, label: "Funcionários", href: "/employees" },
    { icon: <Crown className="h-5 w-5" />, label: "Assinatura", href: "/subscription" },
  ];

  // Mobile overlay backdrop
  const Backdrop = () => (
    <div 
      className="fixed inset-0 z-40 bg-background/80 lg:hidden"
      onClick={() => setIsMobileOpen(false)}
    />
  );

  return (
    <>
      {isMobileOpen && <Backdrop />}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-primary-800 text-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          <div className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-semibold">CarRental ERP</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-white hover:bg-primary-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        
        <nav className="py-4 overflow-y-auto scrollbar-hide h-[calc(100vh-64px)]">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
            >
              <a
                className={cn(
                  "flex items-center px-4 py-3 text-sm transition-colors duration-200",
                  location === item.href
                    ? "bg-primary-700"
                    : "hover:bg-primary-700"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
