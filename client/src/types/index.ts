export interface Vehicle {
  id: number;
  model: string;
  brand: string;
  plate: string;
  category: string;
  mileage: number;
  status: "available" | "rented" | "maintenance";
  purchaseValue: number;
  purchaseDate: string;
}

export interface Client {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
  cnh: string;
  cnhExpiration: string;
}

export interface RentalPlan {
  id: number;
  name: string;
  description: string;
  type: "daily" | "weekly" | "monthly";
  price: number;
  includedKm: number;
  extraKmFee: number;
  securityDeposit: number;
}

export interface Contract {
  id: number;
  clientId: number;
  clientName: string;
  vehicleId: number;
  vehicleName: string;
  planId: number;
  startDate: string;
  endDate: string;
  total: number;
  status: "active" | "finalized" | "cancelled";
}

export interface Quote {
  id: number;
  clientId: number;
  clientName: string;
  vehicleId: number;
  vehicleName: string;
  planId: number;
  planName: string;
  startDate: string;
  endDate: string;
  totalEstimate: number;
  status: "pending" | "sent" | "accepted" | "rejected";
}

export interface Checklist {
  id: number;
  contractId: number;
  contractClient: string;
  contractVehicle: string;
  date: string;
}

export interface DeliveryChecklist extends Checklist {
  fuel: "empty" | "quarter" | "half" | "threeFourths" | "full";
  odometer: number;
  tires: "ok" | "attention" | "damaged";
  damages: string;
  requiredItems: string[];
  comments: string;
  clientSignature: string;
}

export interface ReturnChecklist extends Checklist {
  fuel: "empty" | "quarter" | "half" | "threeFourths" | "full";
  odometer: number;
  newDamages: string;
  additionalFees: { description: string; value: number }[];
  notes: string;
  clientSignature: string;
}

export interface Maintenance {
  id: number;
  vehicleId: number;
  vehicleName: string;
  type: "preventive" | "corrective";
  supplierId: number;
  supplierName: string;
  date: string;
  mileage: number;
  estimatedCost: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  description: string;
}

export interface Supplier {
  id: number;
  name: string;
  type: string;
  city: string;
  phone: string;
}

export interface FinancialData {
  monthlyRevenue: number;
  monthlyExpenses: number;
  netBalance: number;
  incomes: Income[];
  expenses: Expense[];
  revenueByMonth: { month: string; revenue: number; expenses: number }[];
}

export interface Income {
  id: number;
  date: string;
  description: string;
  value: number;
  status: "paid" | "pending";
}

export interface Expense {
  id: number;
  date: string;
  description: string;
  value: number;
  category: string;
}

export interface Employee {
  id: number;
  name: string;
  cpf: string;
  role: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

export interface SubscriptionPlan {
  plan: string;
  maxVehicles: number;
  maxUsers: number;
  price: number;
  expiration: string;
  status: "active" | "inactive";
  features: string[];
}

export interface DashboardData {
  availableVehicles: number;
  rentedVehicles: number;
  monthlyRevenue: number;
  activeContracts: number;
  contractsByStatus: { status: string; count: number; percentage: number }[];
}
