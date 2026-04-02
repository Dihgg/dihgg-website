---
title: "Naninhas: Mod de Zomboid para pelúcias com impacto no gameplay"
description: "Meu primeiro Mod de Zomboid Compatível com a build 42"
featuredImage: "https://cdn.buymeacoffee.com/uploads/project_updates/10333055/2026/03/27/175221_1774633941479_pastedimage.jpg.png"
featuredImageAlt: "Imagem de destaque do mod Naninhas"
date: 2026-03-29
tags:
  - project-zomboid
  - modding
  - games
  - typescript
  - lua
locale: pt-BR
translationKey: naninhas-launch
---

[Naninhas](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298) nasceu de uma pergunta simples: se as pelúcias acopláveis do [AuthenticZ](https://steamcommunity.com/sharedfiles/filedetails/?id=2335368829) adicionam personalidade a **Project Zomboid**, por que não utilizá-las para dar vantagens ao jogador, desta forma existirá um motivo para colecionar as Naninhas.

A proposta não é quebrar o balanceamento do jogo. O foco sempre foi criar algo pequeno, temático e integrado ao fluxo normal.


## A estabilidade para além do efeito 🤔

Aplicar bônus ao equipar algo parece simples, mas existem nuances que precisei considerar:

- Aplicar e remover segura das *traits*
- Rastrear quais *traits* foram suprimidas (para poder adicioná-las novamente)
- Prevenção de acúmulo indevido de multiplicadores de XP (para evitar *exploits*)
- Efeitos periódicos para além das *traits*

Esse trabalho quase não aparece para quem joga, mas é o que sustenta a qualidade do mod.

## Como o código do Naninhas roda na prática 👩‍💻

Cada pelúcia tem efeitos que podem ser ativados ao acoplá-la e também podem ter efeitos que devem ser tratados periodicamente (diminuir a fatiga, por exemplo).

Para fazer isso acontecer, optei por um *[Observer pattern](https://refactoring.guru/design-patterns/observer)* em que cada Objeto Naninha é responsável pelo seu próprio comportamento e um observador é responsável por ativar, desativar e atualizar todas as naninhas que estão acopladas.

Essa abordagem facilita adicionar novos efeitos sem reescrever tudo.

## Publicar também fez parte do trabalho 📦

Finalizar um mod envolve mais que escrever o código código: documentação, notas de versão, *screenshots*, *metadata* e comunicação clara sobre requisitos.

Isso fricção e melhora a experiência de quem instala seu mod.

O desafio agora é compartilhar o mod com o maior número de pessoas possível!

---

## Links 🔗

- [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)
- [GitHub](https://github.com/Dihgg/naninhas)
- [Post Original](https://buymeacoffee.com/dihgg/naninhas-zomboid-mod)
