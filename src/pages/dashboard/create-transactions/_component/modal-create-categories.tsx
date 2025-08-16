import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createCategories } from '@/services/create-categories'
import { DialogClose } from '@radix-ui/react-dialog'

export function ModalCreateCategories() {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: ['categories'],
    mutationFn: async (categoryName: string) =>
      await createCategories(categoryName),
  })

  const [categoryName, setCategoryName] = useState('')

  async function handleCreateCategories(categoryName: string) {
    if (!categoryName) {
      alert('O nome da categoria não pode estar vazio')
      return
    }

    const response = await mutateAsync(categoryName)
    if (response) {
      alert('Categoria criada com sucesso!')
      setCategoryName('')
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
    } else {
      alert('Erro ao criar categoria')
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="text-sm font-medium hover:text-zinc-400 text-zinc-950 cursor-pointer transition-colors duration-300">
        Cadastrar Categoria
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Cadastrar Categoria
          </DialogTitle>
          <DialogDescription className="font-semibold">
            Adicione uma nova categoria para suas transações.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="p-2 outline-none border-2 border-zinc-400 rounded-md focus:border-zinc-900 transition-colors duration-300 placeholder:text-sm placeholder:font-medium"
            placeholder='Ex: "Alimentação", "Transporte", "Saúde"'
            onChange={e => setCategoryName(e.target.value)}
            value={categoryName}
          />
          <div className="flex flex-col gap-2.5">
            <Button
              onClick={() => handleCreateCategories(categoryName)}
              className="cursor-pointer"
            >
              Criar categoria
            </Button>
            <DialogClose className="bg-white text-zinc-900 hover:bg-zinc-300 border transition-all duration-300 p-1.5 rounded-md cursor-pointer">
              Fechar
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
