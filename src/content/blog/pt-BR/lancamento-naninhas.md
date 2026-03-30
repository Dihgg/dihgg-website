---
title: "Lançamento do Naninhas: pelúcias com impacto real no gameplay"
description: "Como o Naninhas evoluiu de uma ideia da Build 41 para um mod estável na Build 42, com foco em estado seguro, arquitetura TypeScript-to-Lua e testes."
featuredImage: "https://cdn.buymeacoffee.com/uploads/project_updates/10333055/2026/03/27/175221_1774633941479_pastedimage.jpg.png"
featuredImageAlt: "Imagem de destaque do mod Naninhas"
date: 2026-03-29
tags:
  - project-zomboid
  - modding
  - typescript
  - lua
  - build-42
locale: pt-BR
translationKey: naninhas-launch
---

O Naninhas nasceu de uma pergunta simples: se as pelúcias acopláveis já adicionam personalidade no Project Zomboid, por que não também adicionar valor de gameplay?

A proposta nunca foi quebrar o balanceamento. O foco sempre foi criar algo pequeno, temático e integrado ao fluxo normal de jogo.

## O desafio era estabilidade, não só efeito

Aplicar bônus ao equipar parece simples, mas o difícil é manter o sistema confiável em saves longos.

No Naninhas, isso exigiu atenção forte em:

- aplicação e remoção segura de traits
- rastreamento explícito de traits suprimidas
- prevenção de acúmulo indevido de multiplicadores de XP
- loops periódicos idempotentes
- sobrevivência limpa em ciclos de save/load

Esse trabalho quase não aparece para quem joga, mas é o que sustenta a qualidade do mod.

## Build 42 elevou o nível técnico

Suportar a Build 42 não foi só ajustar nomes. Foi necessário revisar integração de traits com suposições de runtime mais rigorosas e limites de tipo mais claros.

Isso trouxe:

- tipagens melhores para APIs do jogo
- menos cast inseguro
- lógica de resolução de traits mais precisa
- modelagem mais fiel ao comportamento real em runtime

Resultado: código mais legível, mais estável e mais fácil de evoluir.

## Por que TypeScript-to-Lua + PipeWrench

O mod usa fluxo TypeScript-to-Lua com PipeWrench. Em sistemas com estado temporário, traits, bônus de XP e observadores, essa estrutura trouxe ganho imediato.

Principais benefícios:

- arquitetura modular
- segurança para refatorar
- melhor testabilidade
- manutenção mais sustentável

## Arquitetura e testes fizeram diferença

A base do Naninhas separa um núcleo que varre itens equipados e módulos de pelúcia responsáveis pelo próprio comportamento.

Essa abordagem facilita adicionar novos efeitos sem reescrever tudo e separa bem regra de gameplay da camada acoplada ao jogo.

Testes também foram fundamentais para evitar regressões em comportamentos com estado.

## Publicar bem também é desenvolvimento

Finalizar um mod envolve mais que código: documentação, notas de compatibilidade, screenshots, metadata e comunicação clara sobre requisitos.

Essa camada reduz fricção e melhora a experiência de quem instala.

## Links

- [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)
- [GitHub](https://github.com/Dihgg/naninhas)
- [Post Original](https://buymeacoffee.com/dihgg/naninhas-zomboid-mod)
