---
title: "Novo portfolio! (Astro + React + Tailwind + Pagefind)"
description: "Os Bastidores do meu novo site pessoal: arquitetura estática, conteúdo em markdown, busca local, paginação e deploy automatizado."
date: 2026-03-31
featuredImage: /content/astro.jpg
featuredImageAlt: "Astro logo em gradiente"
tags: [astro, react, tailwind, pagefind, typescript, github-actions]
locale: pt-BR
translationKey: portfolio-rebuild-2026
---

Nos últimos dias eu refiz meu site pessoal de portfolio com foco em três coisas: **simplicidade para manter**, **performance** e **fluxo de conteúdo sem atrito**.

A ideia não era criar um projeto "super complexo", pelo contrário: montar uma base sólida, estática e evolutiva para usar pelos próximos anos.

## Stack e decisões

Usei:

- **Astro** como base estática
- **React + TypeScript** para componentes
- **Tailwind CSS** com `@apply` e organização em CSS por componentes BEM (**B**lock **E**lement **M**odifier)
- **Content Collections do Astro** para posts, projetos, skills e histórico profissional
- **Pagefind** para busca local no blog (sem backend)
- **GitHub Actions** para `build/deploy` automatizado

### Por que Astro?

O Astro combina muito bem com sites de conteúdo:

- gera arquivos estáticos
- excelente performance por padrão
- conteúdo em markdown funciona de forma natural
- permite usar ilhas de interatividade quando eu for preciso

Na prática, eu posso usar um servidor de hospedagem bem simples, já que o astro entrega arquivos estáticos

## Conteúdo guiado por markdown

O site antigo usava uma mistura de conteúdo *hardcoded* com banco de dados em SQL, o que era muito complexo para o que o site precisava ser.

Neste novo site, todo o conteúdo é controlado por arquivos *markdown* que são transpilados automaticamente ao realizar um *push*.

Isso simplifica muito manutenção. Para adicionar conteúdo novo, basta criar um arquivo!

Os **metadados** podem ser controlados também via *frontmatter*.
Exemplo de frontmatter do blog:

```yaml
title: "Meu post"
description: "Resumo"
date: 2026-03-31
tags: [astro, typescript]
locale: pt-BR
translationKey: meu-post
```

## Internacionalização!

Eu queria que o site tivesse a capacitade de ter múltiplos idiomas, mas ao mesmo tempo sem duplicar o código em dois sites distintos.
O que fiz foi separar o conteúdo por locale (`pt-BR` e `en`), mas manter a lógica de renderização consolidada em componentes compartilhados.


## Busca local com Pagefind

Queria incluir busca no blog, sem depender de serviços externo. O *Pagefind* resolveu isso muito bem:

- indexa no *build*
- roda 100% no cliente
- não exige backend
- funciona bem em site estático

Também adicionei suporte para filtros por idioma e tags.

## Paginação estática de verdade

Implementei paginação de blog no modelo estático do **Astro**.

- `/blog/` e `/en/blog/` para a primeira página
- rotas paginadas para páginas seguintes
- sem duplicar por conta do idioma

Isso melhora SEO, compartilhamento de URL e previsibilidade de navegação.

## CSS: menos utilitário espalhado, mais estrutura

Eu gosto de **Tailwind**, mas classes utilitárias *inline* deixam o código muito verboso e manutenção cansativa no longo prazo. Então reorganizei estilo em:

- classes BEM semânticas
- `@apply` para utilizar o **Tailwind** nos arquivos `css`
- arquivos CSS por domínio (`components`, `content`, `foundation`, etc...)

**Resultado:** ficou mais fácil de ler e alterar sem medo.

## Deploy

O deploy foi simplificado para o necessário:

1. build do site estático
2. geração de índice de busca
3. Otimização de imagens
4. upload da pasta `dist` via GitHub Actions

Sem etapa de release, sem zips intermediários, sem complicar.

## Conclusão

Esse novo site / portifólio utiliza as tecnologias que trabalho no dia a dia, ficou mais rápido, bonito, organizado e, principalmente, mais sustentável para continuar evoluindo.

Se você também quer um site pessoal que não vire dívida técnica, a recomendação é:

- priorize arquitetura estática
- trate conteúdo como código
- automatize deploy cedo
- deixe o estilo escalável desde o início

No fim, o que mais importou não foi adicionar mais ferramentas, e sim reduzir complexidade desnecessária!
