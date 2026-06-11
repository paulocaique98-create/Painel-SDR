import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/configuracoes")({
  component: () => (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      <p className="text-gray-500">Página em manutenção para ajuste de rotas.</p>
    </div>
  ),
});
