import { useIsFetching } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
export function GlobalLoading() {
  const isFetching = useIsFetching()
  if (!isFetching) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Loader2 className="animate-spin text-white" size={32} />
      <span className="text-white ml-2">Loading...</span>
    </div>
  )
}
