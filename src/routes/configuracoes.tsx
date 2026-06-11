import { createFileRoute } from '@tanstack/react-router'

// Isso avisa ao roteador que a página /configuracoes existe
export const Route = createFileRoute('/configuracoes')({
  component: ConfiguracoesPage,
})

function ConfiguracoesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <p className="text-gray-500">A interface de Gerenciar Acessos entrará aqui.</p>
      </div>
    </div>
  )
}