import { NextRequest, NextResponse } from 'next/server'

// EMAIL TEMPORARIAMENTE DESATIVADO - reativar após 02/05
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Envio de email temporariamente indisponível. Use o link do WhatsApp para compartilhar a proposta.' },
    { status: 503 }
  )
}
