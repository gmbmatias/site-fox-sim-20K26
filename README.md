# FOX SIM — Plataforma Multilíngue de Aviação e Simulação de Voo

Plataforma educacional de aviação civil e simulação de voo construída com **Next.js (App Router)**, **TypeScript** e **Vanilla CSS**, totalmente otimizada para **SEO Internacional (i18n)**, **Core Web Vitals**, **Google AdSense** e **Google Search Console**.

---

## 🌍 Arquitetura Multilíngue (i18n)

O portal suporta 4 idiomas nativos com estrutura de URLs limpa em `/[locale]`:
- 🇧🇷 **Português do Brasil**: `/pt-br` (Padrão)
- 🇺🇸 **Inglês**: `/en`
- 🇪🇸 **Espanhol**: `/es`
- 🇫🇷 **Francês**: `/fr`

### Principais recursos de SEO Internacional:
1. **Tags `hreflang` automáticas**: Geradas no `<head>` e no `sitemap.xml` para todos os idiomas (`pt-BR`, `en`, `es`, `fr` e `x-default`).
2. **Canonical auto-referenciável**: Configurado em todas as páginas para prevenir conteúdo duplicado.
3. **Tags `<html lang="...">` dinâmicas**: Informa aos robôs de busca o idioma exato de cada página.
4. **Redirecionamento 308 permanente**: URLs legadas (ex: `/estudos`, `/artigos/como-interpretar-metar`) são redirecionadas automaticamente para a versão localizada (`/pt-br/estudos`, `/pt-br/artigos/...`).
5. **Seletor de idioma interativo**: Componente no cabeçalho que preserva a rota atual ao alternar o idioma.

---

## 📊 Dados Estruturados (JSON-LD Schemas)

A plataforma implementa schemas Schema.org para elegibilidade a rich snippets no Google:
- `Organization` e `WebSite`: Metadados corporativos, logo e busca no layout raiz.
- `Article`: Autor, datas de publicação/atualização reais e editora em todos os artigos.
- `DefinedTerm` e `DefinedTermSet`: No Glossário Aeronáutico para captura de Featured Snippets.
- `BreadcrumbList`: Navegação estrutural em todas as páginas internas.
- `FAQPage`: Perguntas e respostas frequentes nos Guias Pilares.

---

## 🚀 Como Integrar com o Google Search Console

1. Acesse o [Google Search Console](https://search.google.com/search-console).
2. Adicione a propriedade do tipo **Domínio** (`foxsim.blog`) ou **Prefixo do URL** (`https://foxsim.blog`).
3. Para verificação por metatag, configure a variável `NEXT_PUBLIC_GSC_VERIFICATION` no `.env.local` ou nas configurações da Vercel:
   ```env
   NEXT_PUBLIC_GSC_VERIFICATION=seu_codigo_de_verificacao
   ```
4. **Envio de Sitemap**: No menu lateral do Search Console, clique em **Sitemaps** e envie:
   ```text
   https://foxsim.blog/sitemap.xml
   ```
   *O sitemap contém mais de 240 URLs pré-renderizadas estaticamente (SSG) com mapeamento completo de idiomas.*

---

## 📈 Google Analytics (GA4)

Para ativar o acompanhamento de métricas via Google Analytics 4, adicione o Measurement ID no arquivo `.env.local` ou nas variáveis de ambiente da hospedagem:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 💰 Google AdSense e Gestão de Cookies (CMP)

- **Script oficial do AdSense**: Inserido de forma assíncrona no `<head>` via `ca-pub-3918433594573040`.
- **ads.txt**: Configurado e acessível em `https://foxsim.blog/ads.txt`.
- **Banner de Consentimento (CMP)**: Mensagem com 3 opções claras (*"Consentir"*, *"Não consentir"*, *"Gerenciar opções"*), compatível com GDPR, LGPD e exigências europeias.
- **Centro de Preferências**: Acessível a qualquer momento pelo rodapé em *"Preferências de cookies"*.

---

## 🛠️ Conteúdo e Funcionalidades

- **4 Trilhas de Formação**: Piloto Privado (PP), Piloto Comercial (PC), Voo por Instrumentos (IFR) e Multimotor (MLTE).
- **Banco com 24 Questões Comentadas**: Correção imediata e explicação pedagógica passo a passo.
- **Simulador de Prova Cronometrado**: 30 minutos com relatório de desempenho por matéria.
- **Pomodoro Aeronáutico**: Metas diárias, seleção de matéria, alertas sonoros e notificações de navegador.
- **10 Ferramentas de Voo**: Top of Descent (TOD), Vento Cruzado, Razão de Descida, Consumo e Autonomia, Relógio UTC Zulu e Conversores de Unidades.
- **Biblioteca com 18 Artigos Técnicos**: Meteorologia, radionavegação, procedimentos e simuladores.
- **Glossário com 16 Termos Aeronáuticos**: METAR, TAF, ILS, VOR, RNAV, RNP, SID, STAR, QNH, QFE, QNE, TOD, DME, VFR, IFR e NOTAM.
- **4 Guias Pilares**: Manuais completos para alunos de PP, pilotos IFR, meteorologia e simulação de voo (MSFS, X-Plane, Prepar3D, VATSIM, IVAO).

---

## 💻 Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar servidor local
npm run dev

# Checagem de tipos TypeScript
npm run typecheck

# Validação e build de produção
npm run build
```

---

## ⚠️ Aviso Legal e Educacional

Todo o conteúdo disponibilizado na FOX SIM destina-se exclusivamente a fins de estudo teórico e simulação de voo. Não substitui publicações aeronáuticas oficiais vigentes (AIP, ROTAER, NOTAM) nem manuais homologados da aeronave.
