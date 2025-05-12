import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Calendar, AlertCircle } from "lucide-react";
import { subscriptionPlan } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export function SubscriptionPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Calculate days remaining until expiration
  const daysUntilExpiration = () => {
    const expDate = new Date(subscriptionPlan.expiration);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = daysUntilExpiration();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Crown className="mr-2 h-6 w-6 text-yellow-500" />
                    Plano {subscriptionPlan.plan}
                  </CardTitle>
                  <CardDescription>
                    Seu plano atual
                  </CardDescription>
                </div>
                <Badge 
                  className={subscriptionPlan.status === 'active' 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"}
                >
                  {subscriptionPlan.status === 'active' ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold">
                  {formatCurrency(subscriptionPlan.price)}<span className="text-sm font-normal text-gray-500">/mês</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  Expira em {formatDate(subscriptionPlan.expiration)}
                </div>
              </div>

              {daysRemaining <= 30 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Sua assinatura expira em breve</p>
                    <p className="text-sm text-yellow-700">
                      {daysRemaining <= 0 
                        ? "Sua assinatura expirou. Renove agora para manter o acesso." 
                        : `Faltam ${daysRemaining} dias para a renovação. Considere renovar seu plano.`
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Veículos</span>
                  <span className="font-medium">{subscriptionPlan.maxVehicles} veículos</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Usuários</span>
                  <span className="font-medium">{subscriptionPlan.maxUsers} usuários</span>
                </div>
              </div>

              <Separator className="my-4" />

              <h3 className="font-medium mb-3">Funcionalidades incluídas:</h3>
              <ul className="space-y-2">
                {subscriptionPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full">Renovar Assinatura</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Plano Professional</p>
                    <p className="text-sm text-gray-500">10/04/2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(subscriptionPlan.price)}</p>
                    <Badge className="bg-green-100 text-green-800">Pago</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Plano Professional</p>
                    <p className="text-sm text-gray-500">10/03/2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(subscriptionPlan.price)}</p>
                    <Badge className="bg-green-100 text-green-800">Pago</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Plano Professional</p>
                    <p className="text-sm text-gray-500">10/02/2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(subscriptionPlan.price)}</p>
                    <Badge className="bg-green-100 text-green-800">Pago</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver Todos os Pagamentos</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Planos Disponíveis</CardTitle>
            <CardDescription>
              Compare nossos planos e escolha o melhor para seu negócio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-lg mb-2">Básico</div>
                <div className="text-2xl font-bold mb-4">R$ 99,90<span className="text-sm font-normal text-gray-500">/mês</span></div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Até 10 veículos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">2 usuários</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Gestão básica de contratos</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Selecionar</Button>
              </div>
              
              <div className="border-2 border-primary rounded-lg p-4 relative">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  ATUAL
                </div>
                <div className="font-medium text-lg mb-2">Professional</div>
                <div className="text-2xl font-bold mb-4">R$ 199,90<span className="text-sm font-normal text-gray-500">/mês</span></div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Até 50 veículos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">5 usuários</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Todos os recursos básicos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Relatórios avançados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Suporte prioritário</span>
                  </li>
                </ul>
                <Button className="w-full">Renovar</Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-lg mb-2">Enterprise</div>
                <div className="text-2xl font-bold mb-4">R$ 399,90<span className="text-sm font-normal text-gray-500">/mês</span></div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Veículos ilimitados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">15 usuários</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Todos os recursos Professional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">API de integração</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Atendimento dedicado</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Selecionar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
