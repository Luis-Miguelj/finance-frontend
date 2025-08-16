import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { editCategorie } from '@/services/edit-categories'
import { useQueryClient } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

interface EditCategoriesProps {
  id: string
  name: string
}

export function EditCategories({ id, name }: EditCategoriesProps) {
  const [categorie, setCategorie] = useState<string>(name)
  const queryClient = useQueryClient()

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="hover:text-blue-700 transition-all duration-300 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl font-black">
          Editar categoria
        </DialogTitle>
        <DialogDescription>
          Aqui você pode editar as suas categoria.
        </DialogDescription>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Editar categoria:</span>
          <input
            type="text"
            placeholder="Editar categoria..."
            value={categorie}
            onChange={e => setCategorie(e.target.value)}
            required
            className="p-2 border-2 border-zinc-300 rounded-md outline-none focus:border-zinc-900 transition-all duration-300"
          />
          <Button
            className="cursor-pointer"
            onClick={async () => {
              const response = await editCategorie(id, categorie)
              if (!response) {
                alert('Erro ao editar categoria')
              }
              alert('Categoria editada com sucesso')
              queryClient.invalidateQueries({
                queryKey: ['categories', 'finance'],
              })
            }}
          >
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
