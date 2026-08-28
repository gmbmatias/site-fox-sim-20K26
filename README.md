# FOX SIM

Portal educacional de aviação e simulação construído com Next.js, React e TypeScript.

## Recursos

- Trilhas de estudo PP, PC, IFR e MLTE
- Questões comentadas e simulados cronometrados
- Pomodoro com metas, matérias, som e notificações
- Painel e progresso persistidos no navegador
- Dez calculadoras e conversores aeronáuticos
- Biblioteca com artigos de meteorologia, navegação, performance e simulação
- SEO técnico, dados estruturados, sitemap, robots e páginas institucionais
- Integração opcional com Google AdSense sem identificador fictício

## Desenvolvimento

```bash
npm install
npm run dev
```

Validação completa:

```bash
npm run lint
npm run typecheck
npm run build
```

Copie `.env.example` para `.env.local` somente quando precisar configurar valores locais. O portal funciona sem variáveis para desenvolvimento; em produção, `NEXT_PUBLIC_SITE_URL` deve apontar para o domínio público. `NEXT_PUBLIC_ADSENSE_CLIENT` é opcional e só deve conter um identificador real.

## Aviso

O conteúdo é educacional e não substitui publicações oficiais, manuais aprovados ou instrução de voo habilitada.
