import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '@/components/ui/dialog'
import { useQueryClient } from '@tanstack/react-query'

import { deleteFinance } from '@/services/delete-finance'
import { CircleX } from 'lucide-react'

interface DeleteFinanceProps {
  id: string
}

export function DeleteFinance({ id }: DeleteFinanceProps) {
  const queryClient = useQueryClient()

  return (
    <Dialog>
      <DialogTrigger>
        <CircleX className="hover:text-red-700 transition-all duration-300 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Excluir transação
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta transação? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <DialogClose
            className="bg-red-600 text-white px-4 py-1 cursor-pointer rounded hover:bg-red-700 transition-colors duration-200"
            onClick={async () => {
              await deleteFinance(id)
              alert('Transação excluída com sucesso!')
              await queryClient.invalidateQueries({
                queryKey: ['transacoes', 'finance'],
              })
            }}
          >
            Excluir
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
