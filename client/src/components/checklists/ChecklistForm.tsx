import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { contracts } from "@/lib/data";
import { SaveIcon } from "lucide-react";

// Validation schema
const checklistFormSchema = z.object({
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
  contractId: z.string().min(1, { message: "Contrato é obrigatório" }),
  date: z.string().min(1, { message: "Data é obrigatória" }),
  fuel: z.string().min(1, { message: "Nível de combustível é obrigatório" }),
  odometer: z.string().min(1, { message: "Quilometragem é obrigatória" }),
  tires: z.string().min(1, { message: "Estado dos pneus é obrigatório" }),
  damages: z.string().optional(),
  comments: z.string().optional(),
  requiredItems: z.array(z.string()).optional(),
  additionalFees: z.array(
    z.object({
      description: z.string(),
      value: z.string()
    })
  ).optional(),
});

type ChecklistFormValues = z.infer<typeof checklistFormSchema>;

interface ChecklistFormProps {
  onCancel: () => void;
}

export function ChecklistForm({ onCancel }: ChecklistFormProps) {
  const form = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: {
      type: "delivery",
      contractId: "",
      date: new Date().toISOString().split('T')[0],
      fuel: "full",
      odometer: "",
      tires: "ok",
      damages: "",
      comments: "",
      requiredItems: ["triangle", "jack", "spare", "wrench", "extinguisher", "manual"],
      additionalFees: [{ description: "", value: "" }],
    }
  });
  
  const watchType = form.watch("type");
  
  function onSubmit(data: ChecklistFormValues) {
    // This would normally send data to the server
    console.log(data);
    onCancel(); // Return to list view
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">Novo Checklist</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Checklist</FormLabel>
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
                      <SelectItem value="delivery">Entrega de Veículo</SelectItem>
                      <SelectItem value="return">Devolução de Veículo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contractId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrato</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um contrato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contracts.map(contract => (
                        <SelectItem key={contract.id} value={contract.id.toString()}>
                          #{contract.id.toString().padStart(3, '0')} - {contract.clientName} - {contract.vehicleName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
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
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de Combustível</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full">Tanque Cheio</SelectItem>
                      <SelectItem value="threeFourths">¾ do Tanque</SelectItem>
                      <SelectItem value="half">½ do Tanque</SelectItem>
                      <SelectItem value="quarter">¼ do Tanque</SelectItem>
                      <SelectItem value="empty">Reserva</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="odometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Odômetro (km)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {watchType === "delivery" && (
              <FormField
                control={form.control}
                name="tires"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado dos Pneus</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ok">OK</SelectItem>
                        <SelectItem value="attention">Atenção Necessária</SelectItem>
                        <SelectItem value="damaged">Danificados</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
          </div>
          
          {watchType === "delivery" && (
            <div className="space-y-3">
              <FormLabel>Itens Obrigatórios</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="requiredItems"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={form.getValues().requiredItems?.includes('triangle')}
                          onCheckedChange={(checked) => {
                            const current = form.getValues().requiredItems || [];
                            if (checked) {
                              form.setValue("requiredItems", [...current, "triangle"]);
                            } else {
                              form.setValue("requiredItems", current.filter(item => item !== "triangle"));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Triângulo de Sinalização</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requiredItems"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={form.getValues().requiredItems?.includes('jack')}
                          onCheckedChange={(checked) => {
                            const current = form.getValues().requiredItems || [];
                            if (checked) {
                              form.setValue("requiredItems", [...current, "jack"]);
                            } else {
                              form.setValue("requiredItems", current.filter(item => item !== "jack"));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Macaco</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requiredItems"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={form.getValues().requiredItems?.includes('spare')}
                          onCheckedChange={(checked) => {
                            const current = form.getValues().requiredItems || [];
                            if (checked) {
                              form.setValue("requiredItems", [...current, "spare"]);
                            } else {
                              form.setValue("requiredItems", current.filter(item => item !== "spare"));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Estepe</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requiredItems"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={form.getValues().requiredItems?.includes('wrench')}
                          onCheckedChange={(checked) => {
                            const current = form.getValues().requiredItems || [];
                            if (checked) {
                              form.setValue("requiredItems", [...current, "wrench"]);
                            } else {
                              form.setValue("requiredItems", current.filter(item => item !== "wrench"));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Chave de Roda</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requiredItems"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={form.getValues().requiredItems?.includes('extinguisher')}
                          onCheckedChange={(checked) => {
                            const current = form.getValues().requiredItems || [];
                            if (checked) {
                              form.setValue("requiredItems", [...current, "extinguisher"]);
                            } else {
                              form.setValue("requiredItems", current.filter(item => item !== "extinguisher"));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Extintor</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requiredItems"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={form.getValues().requiredItems?.includes('manual')}
                          onCheckedChange={(checked) => {
                            const current = form.getValues().requiredItems || [];
                            if (checked) {
                              form.setValue("requiredItems", [...current, "manual"]);
                            } else {
                              form.setValue("requiredItems", current.filter(item => item !== "manual"));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Manual do Proprietário</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          
          <FormField
            control={form.control}
            name="damages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {watchType === "delivery" ? "Danos Identificados" : "Novos Danos"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={watchType === "delivery" ? "Descreva quaisquer danos pré-existentes" : "Descreva quaisquer novos danos"} 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {watchType === "return" && (
            <div>
              <FormLabel className="block mb-2">Taxas Adicionais</FormLabel>
              <div className="space-y-2">
                {form.getValues().additionalFees?.map((_, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder="Descrição"
                      value={form.getValues().additionalFees?.[index]?.description || ""}
                      onChange={(e) => {
                        const fees = [...(form.getValues().additionalFees || [])];
                        fees[index] = { 
                          ...fees[index], 
                          description: e.target.value 
                        };
                        form.setValue("additionalFees", fees);
                      }}
                      className="flex-grow"
                    />
                    <Input
                      type="number"
                      placeholder="Valor"
                      value={form.getValues().additionalFees?.[index]?.value || ""}
                      onChange={(e) => {
                        const fees = [...(form.getValues().additionalFees || [])];
                        fees[index] = { 
                          ...fees[index], 
                          value: e.target.value 
                        };
                        form.setValue("additionalFees", fees);
                      }}
                      className="w-32"
                    />
                    {index === form.getValues().additionalFees?.length! - 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          const fees = [...(form.getValues().additionalFees || []), { description: "", value: "" }];
                          form.setValue("additionalFees", fees);
                        }}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Observações adicionais"
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="border-t border-gray-200 pt-4">
            <FormLabel>Assinatura do Cliente</FormLabel>
            <div className="mt-1 border border-gray-300 rounded-md p-2 h-24 bg-gray-50 flex items-center justify-center">
              <p className="text-sm text-gray-500 italic">Área para assinatura do cliente</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="button" variant="outline">
              Limpar
            </Button>
            <Button type="submit" className="flex items-center">
              <SaveIcon className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
