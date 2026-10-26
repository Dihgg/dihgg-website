---
title: "Electron Archshift: Rodando Apps do Apple Silicon no Intel"
description: "Desenvolvi um pequeno pacote npm para adaptar aplicativos Electron do macOS Apple Silicon para o macOS Intel"
featuredImage: "/content/posts/electron-archshift/main.png"
featuredImageAlt: "Banner do Electron"
date: 2026-10-26
tags:
  - node
  - npm
  - games
locale: pt-BR
translationKey: electron-archshift
---

## O problema: duas arquiteturas para o macOS

Nos últimos anos, a **Apple** promoveu uma verdadeira revolução em seus computadores com a chegada da família de processadores **Apple Silicon**.

Minha *firma* tem um programa que permite aos funcionários comprar suas máquinas de trabalho após alguns anos de uso. Foi assim que consegui meu **MacBook** com processador **Intel**.

Embora ainda seja uma ótima máquina, agora que o **Apple Silicon** se tornou o padrão, comecei a enfrentar alguns problemas de compatibilidade com determinados aplicativos.

Outro dia, me deparei com um problema peculiar: encontrei um joguinho indie que queria testar e, para minha surpresa, ele tinha uma versão para **macOS** (o que, por si só, já é uma raridade!).

Mas, quando tentei executá-lo, fui recebido com o seguinte aviso:

![You cannot open this application because this application is not supported on this Mac](/content/posts/electron-archshift/screenshot-1.png)

Bem, não tenho **R$ 10.000** dando sopa para comprar um **Mac** novo. E agora?

Existem algumas opções:

- Rodar a versão para Windows usando [CrossOver](https://www.codeweavers.com/) ou [Wine](https://www.winehq.org).
- Pedir ao desenvolvedor para compilar uma versão para Intel.
- Chorar.
- Hackear o jogo e adaptá-lo para uma arquitetura diferente daquela para a qual foi originalmente compilado.

Claramente, a quarta opção foi a que escolhi!

![Fine, I'll do it myself](https://media.giphy.com/media/0NTG9ffrXT870Wt9qv/giphy.gif)

## A solução

A primeira coisa que eu precisava descobrir era: **como aquele jogo foi feito?**

Para quem não sabe, um arquivo `.app` do macOS é, na verdade, uma espécie de pasta que contém o executável e os demais arquivos necessários para o funcionamento de um aplicativo.

Ao explorar o conteúdo do jogo, encontrei um arquivo `.asar`. Como já tinha visto esse formato antes, reconheci imediatamente: aquele jogo havia sido desenvolvido com [Electron](https://www.electronjs.org)!

O formato [.asar](https://www.electronjs.org/docs/latest/tutorial/asar-archives) é utilizado pelo Electron para empacotar os arquivos de uma aplicação.

Sabendo disso, e considerando que o Electron permite transformar aplicações desenvolvidas com tecnologias Web em aplicativos desktop, surgiu uma ideia:

**Será que eu conseguiria extrair os arquivos originais e reempacotar o jogo para rodar em um Mac Intel?**

E a resposta foi: **sim!**

Com um pouco de **Node.js** e algumas ferramentas do próprio ecossistema **Electron**, consegui extrair o conteúdo do aplicativo e reconstruir seu pacote utilizando uma versão do Electron compatível com a arquitetura Intel.

Em outras palavras, em vez de recompilar o jogo inteiro, aproveitei seus arquivos originais e substituí a estrutura de execução por uma compatível com o meu Mac.

O resultado? O jogo funcionou perfeitamente no meu **MacBook Intel**!

É claro que essa abordagem não funciona necessariamente com qualquer aplicativo Electron. Dependências nativas, bibliotecas específicas e outros componentes compilados para uma única arquitetura podem impedir a conversão.

Mas, naquele caso, funcionou!

---

## Compartilhando o resultado

Bem, e se eu encontrasse outro jogo na mesma situação?

Teria que lembrar de todos os passos e repetir o processo manualmente?

Como bom programador, resolvi automatizar a solução.

Apresento a vocês o **[electron-arcshift](https://www.npmjs.com/package/electron-arcshift)**!

Um pequeno pacote npm que permite, por meio da linha de comando, **analisar aplicativos Electron e, quando possível, convertê-los de uma arquitetura para outra**.

A ideia é simples: identificar se um aplicativo pode ser adaptado e automatizar o processo de reconstrução do pacote, evitando todo o trabalho manual que tive na primeira tentativa.

### Como usar?

Muito simples! O pacote disponibiliza dois comandos principais:

**1. Verificar a compatibilidade**

```bash
npx --yes electron-arcshift check "/path/to/App.app"
```

Esse comando analisa o aplicativo e verifica a possibilidade de realizar a conversão.

**2. Converter o aplicativo**

```bash
npx --yes electron-arcshift convert "/path/to/App.app" --out "/path/to/generated-files"
```

Esse comando tenta converter um aplicativo `.app` criado para **Apple Silicon (ARM64)** em uma versão compatível com **Macs Intel (x64)**, salvando o resultado no diretório indicado.

E pronto! Se o aplicativo for compatível com esse processo, você terá uma versão que poderá executar no seu Mac Intel, sem precisar modificar manualmente os arquivos internos.

