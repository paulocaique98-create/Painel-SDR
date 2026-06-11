import { useState } from "react";
import { createNewUserAction } from "../../server/auth-actions"; // Ajuste se necessário para subir até a pasta src
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { toast } from "sonner";

export function GerenciarAcessos() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "operador">("operador");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNewUserAction({ data: { email, password, role } });
      toast.success("Operador cadastrado e liberado com sucesso!");
      setEmail("");
      setPassword("");
      setRole("operador");
    } catch (error: any) {
      toast.error(error.message || "Falha ao criar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Cadastrar Novo Operador</CardTitle>
        <CardDescription className="text-gray-500">
          Crie credenciais de acesso para a equipe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateUser} className="space-y-5">
          {/* ... restante do seu código igual ... */}
        </form>
      </CardContent>
    </Card>
  );
}
