import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'

import { Link } from 'react-router'

interface User {
  name?: string
  createdAt: Date
}

export function Menu({ name, createdAt }: User) {
  return (
    <div className="w-1/6 flex flex-col gap-8 bg-zinc-950 shadow text-white p-5">
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
          <AccordionTrigger className="text-sm">Configurações</AccordionTrigger>
          <AccordionContent>
            <h1>Lista de configurações</h1>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
