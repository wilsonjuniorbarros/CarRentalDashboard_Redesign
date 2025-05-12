import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Validation schema
const financialTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "Data é obrigatória" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  value: z.string().min(1, { message: "Valor é obrigatório" }),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
  status: z.enum(["paid", "pending"]).optional().default("pending"),
  notes: z.string().optional()
});

type FinancialTransactionValues = z.infer<typeof financialTransactionSchema>;

interface FinancialTransactionFormProps {
  type: "income" | "expense";
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FinancialTransactionValues) => void;
}

export function FinancialTransactionForm({ 
  type, 
  open, 
  onClose, 
  onSubmit 
}: FinancialTransactionFormProps) {
  const form = useForm<FinancialTransactionValues>({
    resolver: zodResolver(financialTransactionSchema),
    defaultValues: {
      type: type,
      date: new Date().toISOString().substring(0, 10),
      description: "",
      value: "",
      category: "",
      status: "pending",
      notes: ""
    }
  });
  
  function handleSubmit(data: FinancialTransactionValues) {
    onSubmit(data);
    onClose();
  }

  const categories = type === "income" 
    ? [
        { id: "rent", name: "Aluguel" },
        { id: "service", name: "Serviços" },
        { id: "sales", name: "Vendas" },
        { id: "other_income", name: "Outros" }
      ]
    : [
        { id: "supplies", name: "Suprimentos" },
        { id: "maintenance", name: "Manutenção" },
        { id: "fuel", name: "Combustível" },
        { id: "payroll", name: "Folha de Pagamento" },
        { id: "taxes", name: "Impostos" },
        { id: "utilities", name: "Utilidades" },
        { id: "other_expense", name: "Outros" }
      ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {type === "income" ? "Registrar Nova Receita" : "Registrar Nova Despesa"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descreva brevemente a transação" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              {type === "income" && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paid">Pago</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Observações adicionais (opcional)" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {type === "income" ? "Registrar Receita" : "Registrar Despesa"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}