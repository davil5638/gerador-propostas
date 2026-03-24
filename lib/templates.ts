export interface Template {
  id: string
  label: string
  icon: string
  titulo: string
  nicho: string
  intro: string
  servicos: { nome: string; descricao: string }[]
  precoDescricao: string
  validadeDias: string
}

export const templates: Template[] = [
  {
    id: 'desenvolvimento',
    label: 'Desenvolvimento Web',
    icon: '💻',
    titulo: 'Desenvolvimento de Site Profissional',
    nicho: 'desenvolvimento',
    intro: 'Olá! É um prazer apresentar esta proposta personalizada para o desenvolvimento do seu novo site. Nossa solução focará em performance, design moderno e resultados reais para o seu negócio.',
    servicos: [
      { nome: 'Design UI/UX', descricao: 'Layout moderno, responsivo e focado em conversão' },
      { nome: 'Desenvolvimento Frontend', descricao: 'Código limpo com React/Next.js e performance otimizada' },
      { nome: 'Integração e Deploy', descricao: 'Configuração completa em servidor com SSL e domínio' },
    ],
    precoDescricao: '50% na aprovação + 50% na entrega',
    validadeDias: '15',
  },
  {
    id: 'design',
    label: 'Design Gráfico',
    icon: '🎨',
    titulo: 'Projeto de Identidade Visual',
    nicho: 'design',
    intro: 'Olá! Apresento esta proposta para criar uma identidade visual que transmita os valores da sua marca e se destaque no mercado.',
    servicos: [
      { nome: 'Logotipo', descricao: '3 opções de logo + arquivos finais em todos os formatos' },
      { nome: 'Manual de Marca', descricao: 'Guia completo com cores, tipografia e aplicações' },
      { nome: 'Material de Apoio', descricao: 'Cartão de visita, papel timbrado e assinatura de email' },
    ],
    precoDescricao: '50% para iniciar + 50% na entrega final',
    validadeDias: '7',
  },
  {
    id: 'marketing',
    label: 'Marketing Digital',
    icon: '📈',
    titulo: 'Gestão de Redes Sociais e Tráfego Pago',
    nicho: 'marketing',
    intro: 'Olá! Esta proposta apresenta nossa estratégia completa de marketing digital para aumentar sua presença online e gerar mais clientes.',
    servicos: [
      { nome: 'Gestão de Redes Sociais', descricao: '12 posts/mês no Instagram e Facebook com design profissional' },
      { nome: 'Tráfego Pago', descricao: 'Campanhas no Google Ads e Meta Ads com relatório mensal' },
      { nome: 'Relatório Mensal', descricao: 'Análise completa de resultados e planejamento do próximo mês' },
    ],
    precoDescricao: 'Mensalidade com contrato mínimo de 3 meses',
    validadeDias: '7',
  },
  {
    id: 'consultoria',
    label: 'Consultoria',
    icon: '🎯',
    titulo: 'Consultoria Estratégica de Negócios',
    nicho: 'consultoria',
    intro: 'Olá! Apresento esta proposta de consultoria para ajudar sua empresa a identificar oportunidades, resolver gargalos e alcançar seus objetivos de crescimento.',
    servicos: [
      { nome: 'Diagnóstico Inicial', descricao: '2h de reunião para mapear situação atual e principais desafios' },
      { nome: 'Plano de Ação', descricao: 'Documento detalhado com estratégias e metas para 90 dias' },
      { nome: 'Acompanhamento', descricao: '2 reuniões mensais de follow-up por 3 meses' },
    ],
    precoDescricao: 'Pagamento à vista ou em 3x sem juros',
    validadeDias: '15',
  },
  {
    id: 'video',
    label: 'Vídeo / Edição',
    icon: '🎬',
    titulo: 'Produção e Edição de Vídeo Profissional',
    nicho: 'video',
    intro: 'Olá! Esta proposta apresenta nossos serviços de produção audiovisual para criar conteúdo profissional que engaje seu público e fortaleça sua marca.',
    servicos: [
      { nome: 'Roteiro e Storyboard', descricao: 'Criação do roteiro alinhado com sua mensagem e objetivos' },
      { nome: 'Gravação', descricao: 'Equipe profissional com equipamento de alta qualidade' },
      { nome: 'Edição e Finalização', descricao: 'Corte, colorização, trilha sonora e legendas incluídas' },
    ],
    precoDescricao: '50% antecipado + 50% na entrega',
    validadeDias: '7',
  },
  {
    id: 'copywriting',
    label: 'Copywriting',
    icon: '✍️',
    titulo: 'Criação de Copy e Conteúdo Persuasivo',
    nicho: 'copywriting',
    intro: 'Olá! Apresento esta proposta para criar textos persuasivos que conectam com seu público, geram leads qualificados e convertem em vendas.',
    servicos: [
      { nome: 'Análise e Briefing', descricao: 'Estudo do seu negócio, público-alvo e concorrentes' },
      { nome: 'Redação dos Textos', descricao: 'Copy para página de vendas, emails e anúncios' },
      { nome: 'Revisão e Ajustes', descricao: 'Até 2 rodadas de revisão até aprovação final' },
    ],
    precoDescricao: '50% para iniciar + 50% na entrega',
    validadeDias: '15',
  },
]
