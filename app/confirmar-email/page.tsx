import Link from 'next/link'
import { FileText, Mail, ArrowLeft } from 'lucide-react'

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function ConfirmarEmailPage({ searchParams }: Props) {
  const { email } = await searchParams

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-xl mb-10">
          <FileText size={24} />
          PropostaTrack
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          {/* Ícone */}
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="text-blue-600" size={32} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Confirme seu email
          </h1>

          <p className="text-gray-500 leading-relaxed mb-2">
            Enviamos um link de confirmação para:
          </p>

          {email && (
            <p className="font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg mb-6 text-sm">
              {email}
            </p>
          )}

          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Clique no link que enviamos para ativar sua conta e começar a usar o PropostaTrack.
            O email é enviado automaticamente pelo sistema de autenticação.
          </p>

          {/* Dicas */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-left mb-4">
            <p className="text-amber-800 text-sm font-semibold mb-2">Não recebeu o email?</p>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Verifique a caixa de spam ou lixo eletrônico</li>
              <li>• O remetente será <strong>noreply@mail.app.supabase.io</strong></li>
              <li>• Aguarde até 2 minutos</li>
              <li>• Certifique-se que o email está correto</li>
            </ul>
          </div>

          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
          >
            <ArrowLeft size={14} />
            Usar outro email
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Após confirmar, você será redirecionado automaticamente para o dashboard.
        </p>
      </div>
    </div>
  )
}
