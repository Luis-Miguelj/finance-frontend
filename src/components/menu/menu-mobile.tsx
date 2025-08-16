import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu as DropdownMenuAction } from 'lucide-react'
import { Link } from 'react-router'

interface MenuProps {
  name?: string
  createdAt: Date
  handleLogout: () => void
}
export function MenuMobile({ name, createdAt, handleLogout }: MenuProps) {
  return (
    <header className="w-full h-20 shadow-md flex items-center px-5 justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-black text-white">{name}</h1>
        <h2 className="text-xs font-semibold text-zinc-400">
          Usuário criado em {format(new Date(createdAt), 'dd/MM/yyyy')}
        </h2>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white">
            <DropdownMenuAction />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 flex flex-col py-4 px-2 bg-zinc-950 text-white border-zinc-800 shadow-md mr-4">
            <Link to={'/dashboard'}>
              <DropdownMenuItem className="font-medium text-lg my-0.5">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link to={'/dashboard/transacoes'}>
              <DropdownMenuItem className="font-medium text-lg my-0.5">
                Transações
              </DropdownMenuItem>
            </Link>
            <Link to={'/dashboard/criar-transacao'}>
              <DropdownMenuItem className="font-medium text-lg my-0.5">
                Criar transação
              </DropdownMenuItem>
            </Link>
            <Link to={'/dashboard/categorias'}>
              <DropdownMenuItem className="font-medium text-lg my-0.5">
                Categorias
              </DropdownMenuItem>
            </Link>
            <div className="border-t border-zinc-800 my-2"></div>
            <Link to={'/dashboard/relatorios'}>
              <DropdownMenuItem className="font-medium text-lg my-0.5">
                Relatórios
              </DropdownMenuItem>
            </Link>
            <div className="border-t border-zinc-800 my-2"></div>
            <DropdownMenuItem
              onClick={handleLogout}
              className="font-medium text-lg my-0.5"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
