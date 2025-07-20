import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu as DropdownMenuAction } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from './ui/button'

interface User {
  name?: string
  createdAt: Date
}

export function Menu({ name, createdAt }: User) {
  function handleLogout() {
    localStorage.removeItem('token')
    location.reload()
  }

  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
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
  }

  return (
    <div className="w-1/6 flex flex-col justify-between gap-8 bg-zinc-950 shadow text-white p-5">
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-black">{name}</h1>
          <h2 className="text-xs font-semibold text-zinc-400">
            Usuário criado em {format(new Date(createdAt), 'dd/MM/yyyy')}
          </h2>
        </div>

        <Accordion defaultValue={'item-1'} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-medium">
              Menu
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2">
                <Link
                  to={'/dashboard'}
                  className="text-sm font-medium p-2 rounded hover:bg-zinc-800 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to={'/dashboard/transacoes'}
                  className="text-sm font-medium p-2 rounded hover:bg-zinc-800 transition-all duration-200"
                >
                  Transações
                </Link>
                <Link
                  to={'/dashboard/criar-transacao'}
                  className="text-sm font-medium p-2 rounded hover:bg-zinc-800 transition-all duration-200"
                >
                  Criar transação
                </Link>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">
              Configurações
            </AccordionTrigger>
            <AccordionContent>
              <h1>Lista de configurações</h1>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Button variant={'default'} className="px-6" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  )
}
