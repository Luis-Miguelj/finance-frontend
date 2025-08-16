import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Link } from 'react-router'
import { format } from 'date-fns'

interface MenuProps {
  name?: string
  createdAt: Date
  handleLogout: () => void
}
export function MenuDesktop({ name, createdAt, handleLogout }: MenuProps) {
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
            <AccordionContent className="flex flex-col gap-2">
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
                <Link
                  to={'/dashboard/categorias'}
                  className="text-sm font-medium p-2 rounded hover:bg-zinc-800 transition-all duration-200"
                >
                  Categorias
                </Link>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-medium">
              Relatórios
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <ul className="flex flex-col gap-2">
                <Link
                  to={'/dashboard/relatorios'}
                  className="text-sm font-medium p-2 rounded hover:bg-zinc-800 transition-all duration-200"
                >
                  Relatório de transações
                </Link>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-medium">
              Sair da conta
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-start bg-zinc-900 font-medium p-2 rounded hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                Sair
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
