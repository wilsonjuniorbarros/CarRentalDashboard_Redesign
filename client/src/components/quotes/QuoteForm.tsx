import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { clients, vehicles, rentalPlans } from "@/lib/data";
import { Quote } from "@/types";
import { SendHorizontal } from "lucide-react";

// Validation schema
const quoteFormSchema = z.object({
  clientId: z.string().min(1, { message: "Cliente é obrigatório" }),
  vehicleId: z.string().min(1, { message: "Veículo é obrigatório" }),
  planId: z.string().min(1, { message: "Plano é obrigatório" }),
  startDate: z.string().min(1, { message: "Data inicial é obrigatória" }),
  endDate: z.string().min(1, { message: "Data final é obrigatória" }),
  notes: z.string().optional()
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  onCancel: () => void;
  editQuote?: Quote | null;
}

export function QuoteForm({ onCancel, editQuote }: QuoteFormProps) {
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: editQuote
      ? {
          clientId: editQuote.clientId.toString(),
          vehicleId: editQuote.vehicleId.toString(),
          planId: editQuote.planId.toString(),
          startDate: editQuote.startDate,
          endDate: editQuote.endDate,
          notes: ""
        }
      : {
          clientId: "",
          vehicleId: "",
          planId: "",
          startDate: "",
          endDate: "",
          notes: ""
        }
  });
  
  function onSubmit(data: QuoteFormValues) {
    // This would normally send data to the server
    console.log(data);
    onCancel(); // Return to list view
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        {editQuote ? `Editar Cotação` : "Nova Cotação"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.length > 0 ? (
                        clients.map(client => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-clients">Nenhum cliente disponível</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veículo</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.filter(vehicle => vehicle.status === 'available').length > 0 ? (
                        vehicles
                          .filter(vehicle => vehicle.status === 'available')
                          .map(vehicle => (
                            <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                              {vehicle.model} - {vehicle.plate}
                            </SelectItem>
                          ))
                      ) : (
                        <SelectItem value="no-vehicles">Nenhum veículo disponível</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="planId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plano de Aluguel</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rentalPlans.length > 0 ? (
                        rentalPlans.map(plan => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.name} - R${plan.price.toFixed(2)}/{plan.type === 'daily' ? 'dia' : plan.type === 'weekly' ? 'semana' : 'mês'}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-plans">Nenhum plano disponível</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Estimativa Total (R$)</FormLabel>
              <Input type="text" readOnly value="240.00" className="bg-gray-50" />
            </div>
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Retirada</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Devolução</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Observações adicionais sobre a cotação" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="button" variant="outline" className="flex items-center">
              <SendHorizontal className="h-4 w-4 mr-2" />
              Enviar
            </Button>
            <Button type="submit">
              {editQuote ? "Atualizar Cotação" : "Salvar Cotação"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
