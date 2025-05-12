import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

// Validation schema
const rentalPlanFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().optional(),
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
  includedKm: z.string().min(1, { message: "Quilometragem incluída é obrigatória" }),
  extraKmFee: z.string().min(1, { message: "Taxa de km extra é obrigatória" }),
  securityDeposit: z.string().min(1, { message: "Depósito de segurança é obrigatório" })
});

type RentalPlanFormValues = z.infer<typeof rentalPlanFormSchema>;

interface RentalPlanFormProps {
  onCancel: () => void;
}

export function RentalPlanForm({ onCancel }: RentalPlanFormProps) {
  const form = useForm<RentalPlanFormValues>({
    resolver: zodResolver(rentalPlanFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      price: "",
      includedKm: "",
      extraKmFee: "",
      securityDeposit: ""
    }
  });
  
  function onSubmit(data: RentalPlanFormValues) {
    // This would normally send data to the server
    console.log(data);
    onCancel(); // Return to list view
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">Adicionar Novo Plano</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Plano</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Diário Básico" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o plano de aluguel" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="includedKm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quilômetros Incluídos</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 200" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="extraKmFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taxa de KM Extra (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="securityDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depósito de Segurança (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Plano</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
