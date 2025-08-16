import { useEffect, useState } from 'react'
import { useIsFetching } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
export function GlobalLoading() {
  const isFetching = useIsFetching() // quantidade de queries ativas
  const [showWakeup, setShowWakeup] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (isFetching > 0) {
      // se tem query ativa, arma o timer
      timer = setTimeout(() => {
        setShowWakeup(true)
      }, 2000) // só ativa se demorar mais de 2s
    } else {
      // se não tem query ativa, reseta
      clearTimeout(timer)
      setShowWakeup(false)
    }

    return () => clearTimeout(timer)
  }, [isFetching])

  if (!showWakeup) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Loader2 className="animate-spin text-white" size={32} />
      <span className="text-white ml-2">Loading...</span>
    </div>
  )
}
