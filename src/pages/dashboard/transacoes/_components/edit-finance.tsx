import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormEditFinance } from './form-edit-finance'
interface EditFinanceProps {
  categories: {
    id: string
    name: string
  }[]
  id: string
  category: string
  type: string
  value: number
}
export function EditFinance({
  categories,
  id,
  category,
  type,
  value,
}: EditFinanceProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="hover:text-blue-700 transition-all duration-300 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl font-black">
          Editar Transações
        </DialogTitle>
        <DialogDescription>
          Aqui você pode editar as suas transações.
        </DialogDescription>
        <FormEditFinance
          categories={categories}
          id={id}
          category={category}
          type={type}
          value={value}
        />
      </DialogContent>
    </Dialog>
  )
}
