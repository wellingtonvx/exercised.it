import Link from 'next/link'

export default function Login() {
  return (
    <div>
      <h1>Tela de login</h1>

      <form action="">
        <h2>Bem Vindo</h2>

        <span>Digite seu nome para começar a usar</span>
        <input type="text"/>
        
        <Link href="/home">
          <button>Entrar</button>
        </Link>
        
      </form>
    </div>
  )
}
