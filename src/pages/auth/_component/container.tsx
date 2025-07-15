export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="img-auth min-h-screen flex items-center justify-center">
      {children}
    </div>
  )
}
