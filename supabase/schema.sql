-- Tabela de propostas
create table proposals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  slug text unique not null,
  title text not null,
  client_name text not null,
  client_email text,
  nicho text not null default 'geral',
  intro text,
  services jsonb default '[]',
  price numeric,
  price_description text,
  validity_days integer default 15,
  status text default 'ativa',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Tabela de visualizações (rastreamento)
create table proposal_views (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references proposals(id) on delete cascade not null,
  viewed_at timestamp with time zone default now(),
  ip_address text,
  user_agent text,
  duration_seconds integer
);

-- Habilitar RLS
alter table proposals enable row level security;
alter table proposal_views enable row level security;

-- Políticas proposals
create policy "Usuário vê suas próprias propostas"
  on proposals for select
  using (auth.uid() = user_id);

create policy "Usuário cria suas propostas"
  on proposals for insert
  with check (auth.uid() = user_id);

create policy "Usuário edita suas propostas"
  on proposals for update
  using (auth.uid() = user_id);

create policy "Usuário deleta suas propostas"
  on proposals for delete
  using (auth.uid() = user_id);

-- Proposta pública (qualquer um pode ver pelo slug)
create policy "Proposta pública por slug"
  on proposals for select
  using (true);

-- Políticas proposal_views
create policy "Usuário vê views das suas propostas"
  on proposal_views for select
  using (
    exists (
      select 1 from proposals
      where proposals.id = proposal_views.proposal_id
      and proposals.user_id = auth.uid()
    )
  );

create policy "Qualquer um pode registrar view"
  on proposal_views for insert
  with check (true);
