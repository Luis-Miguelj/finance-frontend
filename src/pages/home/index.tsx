import { Link } from 'react-router'

export function Home() {
  return (
    <div className="img-auth">
      <div className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gradient-to-br to-zinc-950/30 to-40% from-transparent from-30% ">
        <h1 className="text-6xl font-black text-white text-shadow-2xs">
          Seja bem vindo(a)!
        </h1>
        <div className="group flex flex-col justify-center px-2.5 py-1 rounded-md hover:bg-white/40 transition-all duration-500">
          <Link to={'/login'} className="text-xl font-medium text-white">
            Acessar minhas finanças
          </Link>
          <div className="w-0 h-1 rounded-md group-hover:w-full group-hover:bg-white transition-all duration-500" />
        </div>
      </div>
    </div>
  )
}
