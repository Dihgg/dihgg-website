---
title: "Como construí meu novo portfolio (Astro + React + Tailwind + Pagefind)"
description: "Bastidores técnicos do meu novo portfolio: arquitetura estática, conteúdo em markdown, busca local, paginação e deploy automatizado."
date: 2026-03-31
featuredImage: /content/astro.jpg
featuredImageAlt: "Astro logo em gradiente"
tags: [astro, react, tailwind, pagefind, typescript, github-actions]
locale: pt-BR
translationKey: portfolio-rebuild-2026
---

Nos últimos dias eu reescrevi meu portfolio com foco em três coisas: **simplicidade para manter**, **performance real em produção** e **fluxo de conteúdo sem atrito**.

A ideia não era criar um projeto "super complexo". Era o contrário: montar uma base sólida, estática e evolutiva para usar por anos.

## Stack e decisões

Usei:

- **Astro** como base estática
- **React + TypeScript** para componentes interativos pontuais
- **Tailwind CSS** com `@apply` e organização em CSS por componentes (BEM)
- **Content Collections do Astro** para posts, projetos, skills e histórico profissional
- **Pagefind** para busca local no blog (sem backend)
- **GitHub Actions** para build/deploy automatizado

### Por que Astro?

Porque combina muito bem com site de conteúdo:

- gera arquivos estáticos
- excelente performance por padrão
- conteúdo em markdown funciona de forma natural
- permite usar ilhas de interatividade quando eu realmente preciso

Na prática, eu não preciso pagar custo de SPA em todas as páginas.

## Conteúdo guiado por markdown

Uma das melhorias mais importantes foi mover dados que antes estavam hardcoded em TS para markdown versionado no Git.

Hoje tenho coleções para:

- blog
- work (timeline)
- projects
- skills

Isso simplifica muito manutenção. Para adicionar conteúdo novo, basta criar um arquivo.

Exemplo de frontmatter do blog:

```yaml
title: "Meu post"
description: "Resumo"
date: 2026-03-31
tags: [astro, typescript]
locale: pt-BR
translationKey: meu-post
```

## Internacionalização sem duplicar lógica

O conteúdo é separado por locale (`pt-BR` e `en`), mas a lógica de renderização foi consolidada em componentes compartilhados.

Ou seja: mantive rotas amigáveis por idioma, mas evitei duplicar página inteira para cada variação.

## Busca local com Pagefind

Queria busca rápida sem depender de serviço externo. O Pagefind resolveu isso muito bem:

- indexa no build
- roda 100% no cliente
- não exige backend
- funciona bem em site estático

Também adicionei suporte para filtros por idioma/tags e destaque da linguagem em blocos de código.

## Paginação estática de verdade

Implementei paginação de blog no modelo estático do Astro (sem fake load-more):

- `/blog/` e `/en/blog/` para a primeira página
- rotas paginadas para páginas seguintes
- sem duplicar `/page/1`

Isso melhora SEO, compartilhamento de URL e previsibilidade de navegação.

## CSS: menos utilitário espalhado, mais estrutura

Eu gosto de Tailwind, mas muitos utilitários inline deixam manutenção cansativa no longo prazo. Então reorganizei estilo em:

- classes BEM semânticas
- `@apply` para agrupar utilitários
- arquivos CSS menores por domínio (`components`, `content`, `foundation`)

Resultado: ficou mais fácil de ler e alterar sem medo.

## Deploy

O deploy foi simplificado para o necessário:

1. build do site estático
2. geração de índice de busca
3. upload da pasta `dist` via GitHub Actions

Sem etapa de release semântica, sem zips intermediários, sem complicar.

## Fechando

Esse novo portfolio ficou mais rápido, mais organizado e, principalmente, mais sustentável para continuar evoluindo.

Se você também quer um site pessoal que não vire dívida técnica, minha recomendação é:

- priorize arquitetura estática
- trate conteúdo como código
- automatize deploy cedo
- deixe o estilo escalável desde o início

No fim, o que mais importou não foi adicionar mais ferramentas, e sim reduzir complexidade desnecessária.
