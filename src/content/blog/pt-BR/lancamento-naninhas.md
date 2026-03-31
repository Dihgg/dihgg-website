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

O [Naninhas](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298) nasceu de uma pergunta simples: se as pelúcias acopláveis do [AuthenticZ](https://steamcommunity.com/sharedfiles/filedetails/?id=2335368829) já adicionam personalidade ao **Project Zomboid**, por que não também adicionar elemento de Gameplay?

A proposta nunca foi quebrar o balanceamento do jogo. O foco sempre foi criar algo pequeno, temático e integrado ao fluxo normal.

## O desafio era estabilidade, não só efeito

Aplicar bônus ao equipar parece simples, mas o difícil é manter o sistema confiável ao longo do tempo.

No **Naninhas**, isso exigiu atenção forte em:

- aplicação e remoção segura das *traits*
- rastreamento explícito de *traits* suprimidas
- prevenção de acúmulo indevido de multiplicadores de XP
- loops periódicos idempotentes

Esse trabalho quase não aparece para quem joga, mas é o que sustenta a qualidade de um mod.

## Build 42 elevou o nível técnico

Suportar a **Build 42** não foi só ajustar nomes. Foi necessário revisar integração de *traits*, essa build introduziu novas **APIs** que quebraram o **Mod**.

Isso me fez refletir para introduzir:

- tipagens melhores para APIs do jogo
- lógica de resolução de traits mais precisa
- modelagem mais fiel ao comportamento real em runtime

**Resultado:** código mais legível, mais estável e mais fácil de evoluir.

## Por que TypeScript-to-Lua + PipeWrench

O mod usa fluxo **TypeScript-to-Lua** com [PipeWrench](https://github.com/asledgehammer/PipeWrench). Em sistemas com estado temporário, *traits*, bônus de XP e um *pattern* de observadores, essa estrutura trouxe:

- arquitetura modular
- segurança para refatorar
- melhor testabilidade
- manutenção mais sustentável

## Arquitetura e testes fizeram diferença

A base do **Naninhas** separa um núcleo que varre itens equipados e módulos de pelúcia responsáveis pelo próprio comportamento.

Essa abordagem facilita adicionar novos efeitos sem reescrever tudo e separa bem regra de gameplay da camada acoplada ao jogo.

Testes também foram fundamentais para evitar regressões em comportamentos com estado.

## Publicar bem também é desenvolvimento

Finalizar um mod envolve mais que código: documentação, notas de compatibilidade, *screenshots*, *metadata* e comunicação clara sobre requisitos.

Essa camada reduz fricção e melhora a experiência de quem instala.

## Links

- [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)
- [GitHub](https://github.com/Dihgg/naninhas)
- [Post Original](https://buymeacoffee.com/dihgg/naninhas-zomboid-mod)
