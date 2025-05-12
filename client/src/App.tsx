import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { VehiclesPage } from "@/components/vehicles/VehiclesPage";
import { ClientsPage } from "@/components/clients/ClientsPage";
import { RentalPlansPage } from "@/components/rental-plans/RentalPlansPage";
import { ContractsPage } from "@/components/contracts/ContractsPage";
import { QuotesPage } from "@/components/quotes/QuotesPage";
import { ChecklistsPage } from "@/components/checklists/ChecklistsPage";
import { MaintenancePage } from "@/components/maintenance/MaintenancePage";
import { FinancialPage } from "@/components/financial/FinancialPage";
import { EmployeesPage } from "@/components/employees/EmployeesPage";
import { SubscriptionPage } from "@/components/subscription/SubscriptionPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/vehicles" component={VehiclesPage} />
      <Route path="/clients" component={ClientsPage} />
      <Route path="/rental-plans" component={RentalPlansPage} />
      <Route path="/contracts" component={ContractsPage} />
      <Route path="/quotes" component={QuotesPage} />
      <Route path="/checklists" component={ChecklistsPage} />
      <Route path="/maintenance" component={MaintenancePage} />
      <Route path="/financial" component={FinancialPage} />
      <Route path="/employees" component={EmployeesPage} />
      <Route path="/subscription" component={SubscriptionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MainLayout>
          <Router />
        </MainLayout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
