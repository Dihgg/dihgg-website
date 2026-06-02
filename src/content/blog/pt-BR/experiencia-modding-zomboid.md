---
title: "Minha experiência com modding de zomboid"
description: "Como fui de scripts Lua básicos a um pipeline TypeScript completo com testes automatizados, e o que aprendi no caminho."
featuredImage: "/content/posts/zomboid.jpg"
featuredImageAlt: "Project Zomboid steam cover"
date: 2026-06-02
tags:
  - project-zomboid
  - modding
  - games
  - typescript
  - lua
locale: pt-BR
translationKey: zomboid-modding-experience
---

Project Zomboid não é o jogo mais óbvio para quem quer começar a modar. A documentação oficial é escassa, a **API** do **Java** fica escondida atrás de uma camada de Lua, e o ciclo de *Build 41* para *Build 42* quebrou boa parte dos mods existentes sem muita cerimônia. Mas é exatamente esse tipo de ambiente que me atrai: você aprende de verdade quando o chão some debaixo dos seus pés.

![this is fine](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2M2enA5ZjltOWhnanVuem85dGRzY3JxdHpjMnEzOW5hNjkzeWxxaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NTur7XlVDUdqM/giphy.gif)

## Como tudo começou: as [Naninhas](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)

O primeiro mod que publiquei foi o [**Naninhas**](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298) — um mod que adiciona buffs às pelúcias do AuthenticZ quando você as prende na mochila. É simples na superfície: cada pelúcia dá um bônus diferente ao personagem enquanto equipada. Mas foi esse projeto que me forçou a entender como o jogo carrega itens, como os eventos de equipar/desequipar funcionam, e como organizar o código Lua de um jeito que eu conseguisse manter depois.

O mod virou um exercício de arqueologia: ler o código de outros mods no Workshop, vasculhar os arquivos de mídia do jogo em `media/lua`, e fazer muita tentativa e erro. Mas funcionou, foi publicado, e ainda tem gente usando.

## Adotando TypeScript com PipeWrench

Escrever Lua funciona. Mas escalar Lua é outra história; sem tipos, sem *autocomplete* confiável, sem jeito de criar testes facilmente. Em projetos com lógica mais complexa, essa falta de pode virar um problema.

![gatinho no computador](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHd2c211YjNmNGg4ZGhlNHQyb3V5cG5vZXc5dXNoMWU3ZWtpYWdobyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7NoNw4pMNTvgc/giphy.gif)
Aí entrou o [PipeWrench](https://github.com/asledgehammer/PipeWrench): um conjunto de *type definitions* da API do **Project Zomboid** para **TypeScript**, combinado com o `typescript-to-lua` (TSTL) para compilar o TS direto em Lua. O resultado é um *pipeline* onde você escreve **TypeScript** com tipagem completa, testes com **Jest**, e no final do *build* tem um arquivo Lua pronto para o jogo carregar.

Isso mudou bastante o jeito de trabalhar. Ao invés de debugar comportamentos no jogo ao vivo, a maioria da lógica de domínio pode ser testada localmente com **Jest**. É estranhamente satisfatório rodar `npm test` para validar mecânicas de um jogo de sobrevivência de zumbis antes mesmo de abrir o jogo.

Inclusive, para facilitar esse processo, eu montei um template público: [**zomboid-mod-template**](https://github.com/Dihgg/zomboid-mod-template). Ele já vem com estrutura de *build*, *postbuild*, testes com **Jest**, organização para **Build 42** (com suporte opcional para **Build 41** quando necessário) e scripts de empacotamento para Steam. Se você quer começar a criar mods em **TypeScript** no Zomboid sem configurar tudo do zero, esse template já resolve boa parte do caminho.

## O pesadelo (e a solução) do Build 42

A migração para o Build 42 trouxe uma mudança na estrutura de pastas dos mods que pegou muita gente de surpresa. Não basta mais jogar os arquivos na pasta `media/` na raiz do mod — agora existe uma hierarquia específica:

```
dist/{modName}/
  mod.info
  42/
    mod.info        ← com version=42 e deps do B42
    media/          ← TODO o conteúdo vai aqui
      lua/
      ...
```

O detalhe chato: o plugin **TSTL** do **PipeWrench** compila o Lua para `dist/{modId}/media/` (na raiz), mas o jogo espera tudo dentro de `42/media/`. A solução foi a criação de *scripts* de `postbuild` que move o *output* para o lugar certo. Parece pequeno, mas pode causar uma confusão enorme.

## Tradução não é mero detalhe

Uma coisa que aprendi cedo: localização não pode ser uma reflexão tardia. O Project Zomboid, na build 42, tem um sistema de tradução baseado em arquivos `.json`.

Criei *scripts* que geram mods separados de traduções, por exemplo: [**Naninhas - PTBR**](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298), é um mod gerado a partir de uma fonte central onde as traduções se encontram, o sistema ainda se utiliza do *Google Translate* caso alguma tradução ainda não exista.

No [**Arianaland Posters**](https://steamcommunity.com/sharedfiles/filedetails/?id=3468675418) o problema ficou mais interessante: Este mod suporta tanto a *build* 42 quanto o 41, e a antiga usa arquivos `.txt` com um formato específico para as traduções. A solução foi manter uma pasta com arquivos **JSON** que são a "fonte da verdade" para as traduções e gerar os dois formatos a partir dele, cada *build* recebe o formato que espera, sem duplicar manualmente as traduções.

Rodar `npm run translate -- pt` e ter os arquivos prontos é muito mais simples do que editar `.txt` na mão.


---

## O que ficou de aprendizado


*Modding* de jogo é uma escola excelente de engenharia pragmática. Você não tem luxo de refatorar infinitamente, o jogo tem que funcionar e os jogadores vão reclamar se não funcionar. Algumas coisas que ficaram:

- **TypeScript + TSTL é viável para mods sérios.** A curva de configuração existe, mas vale o investimento em projetos maiores.
- **Testes salvam tempo.** Especialmente em lógica de domínio complexa onde ter que abrir o jogo para testar pode demorar bastante.
- **Leia o código dos outros mods.** O **Workshop** é cheio de soluções para problemas que você vai encontrar. Não reinvente a roda antes de entender como a roda original foi feita.
- **Build 42 quebrou muita coisa, ~~e vai continuar quebrando~~.** Seu código deve ser preparado para mudança, isole as integrações com a API do jogo atrás de adaptadores, e mantenha os scripts de build automatizados.

Ainda há muito o que aprender, a **API** do **Java** por baixo do Lua ainda tem partes obscuras, e o *Build 42* está em desenvolvimento ativo. Mas se fosse fácil, não seria divertido.

![keep going!](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVrb3BkNjZkbDh5dWZyeDZidXhkdWcwNHNvZDRiZmpuNWpmYjR6ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LOQyoLIojnizS949is/giphy.gif)
