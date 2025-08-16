import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteCategorie } from '@/services/delete-categories'
import { useQueryClient } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'

export function DeleteCategories({ id }: { id: string }) {
  const queryClient = useQueryClient()

  return (
    <Dialog>
      <DialogTrigger>
        <CircleX className="hover:text-red-700 transition-all duration-300 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Excluir categoria
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta categoria? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <DialogClose
            className="bg-red-600 text-white px-4 py-1 cursor-pointer rounded hover:bg-red-700 transition-colors duration-200"
            onClick={async () => {
              const response = await deleteCategorie(id)
              alert(response.message)
              await queryClient.invalidateQueries({
                queryKey: ['categories', 'finance', 'transacoes'],
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
