-- Adicionar coluna logo_url na tabela proposals
alter table proposals add column if not exists logo_url text;

-- Criar bucket para logos (execute no Storage do Supabase)
-- insert into storage.buckets (id, name, public) values ('logos', 'logos', true);
