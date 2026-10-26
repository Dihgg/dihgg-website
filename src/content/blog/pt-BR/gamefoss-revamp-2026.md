---
title: "Gamefoss: a volta dos que não foram"
description: "Preservando posts do WordPress e usando IA para acelerar uma reestruturação completa."
featuredImage: "/content/posts/gamefoss-screenshot.png"
featuredImageAlt: "Logo do Gamefoss"
date: 2026-10-20
tags:
  - astro
  - wordpress
  - tailwind
  - pagefind
  - github-actions
locale: pt-BR
translationKey: gamefoss-revamp-2026
---

O **[Gamefoss](https://gamefoss.com.br/)** voltou dos mortos! Ou melhor, dos **não mortos**, porque ele nunca chegou a desaparecer completamente.

Esse projeto começou em 2019, mas, com a pandemia e a vida adulta, acabou ficando congelado no tempo. Sempre me incomodou o fato de ele nunca ter atingido o potencial que eu imaginava. No fundo, eu sempre me perguntava: "E se eu voltasse com o projeto?"

Pois bem, finalmente "criei coragem" e falei:

> "Bora atualizar esse site!"

![Aqui tem coragem](https://media1.tenor.com/m/OC3Og5FK_c0AAAAC/brunno-sarttori-bruno-sartori.gif)

O site ganhou uma reconstrução completa, que foi muito além de uma troca de tema do [**WordPress**](https://wordpress.com/). Saí de uma instalação antiga do **WordPress** para um site estático em [**Astro**](https://astro.build/), migrei o conteúdo importante, redesenhei a experiência do zero e preparei um fluxo de publicação mais robusto, com CI/CD usando **GitHub Actions**.

O objetivo era modernizar tudo sem apagar a personalidade do projeto. O [Gamefoss](https://gamefoss.com.br) deve continuar sendo um espaço sobre jogos, tecnologia, sociedade e o que mais der na telha. Agora, porém, ele roda sobre uma base muito mais moderna e simplificada.

## O problema inicial

Existe um motivo pelo qual sempre adiei essa reconstrução: fazer um site dá trabalho. Infelizmente, a frase *"trabalhe com o que ama e você nunca vai amar mais nada na vida"* é real. No final de um dia de trabalho, fica difícil me dedicar a esse projeto tanto quanto eu gostaria.

E como isso se resolveu? Bem, por mais que eu tenha minhas ressalvas, com a nova tecnologia do momento: IA.

## IA, para o bem ou para o mal

Eu tenho **MUITAS** ressalvas quanto ao uso de IA, especialmente quando se trata de trabalho criativo. Mas é inegável que a tecnologia existe e veio para ficar. Como tecnologista, sei bem o quanto é necessário se atualizar para se manter relevante. Pequenos projetos pessoais ajudam muito a entender como essas tecnologias funcionam em um ambiente "menor" e mais "controlável".

Usando IA como ferramenta de desenvolvimento, consegui realizar em menos de uma semana esse trabalho hercúleo, que, no passado, levaria meses. O antigo tema do **WordPress**, por exemplo, levou uns três meses para ficar pronto!

Esse ganho de produtividade que o uso de IA permite é, paradoxalmente, uma das minhas maiores ressalvas quanto a essa tecnologia. Afinal, num cenário de capitalismo de estágio tardio, quem ganha em cima do aumento de produtividade dos programadores?

![Está vivo!](https://media.giphy.com/media/wrcHkJDzqdYZktVxRl/giphy.gif)

## Migrações e história

O site antigo não estava vazio: possuía conteúdo que eu queria manter; artigos, autores, categorias e, é claro, os episódios.

O primeiro passo, então, foi pensar em uma migração para transformar os conteúdos do **WordPress** em arquivos **Markdown/MDX**, mantendo metadados e URLs sempre que possível.
Também foi necessário manter uma lista de redirecionamentos para os endereços antigos. Depois disso, bastou revisar os textos, imagens, links e detalhes de formatação.

Outro ponto importante foi garantir que o site antigo pudesse ser movido para outro canto e restaurado, caso fosse necessário. Sabe como é, né? *Backup, backup e backup!*

## Uma identidade nova na era das máquinas

Eu queria que o site fosse divertido e tivesse uma identidade visual própria. Mas, sem ser *designer* e com tempo limitado, como prosseguir?

Aqui entra a maior diferença entre um "leigo" e um profissional e o motivo de a IA não substituir o fator humano.

Um leigo dirá para a máquina: "Faça um novo site para o **Gamefoss**". O resultado, por mais que funcione, terá um visual genérico, outro problema nessa nova era da IA.

Agora, com conhecimento sobre o que está sendo feito, qual *stack* usar e por quê, é possível direcionar melhor a ferramenta. Dá para aplicar conceitos como *theming*, *design systems* e componentização, além de padrões que ajudam a obter um resultado melhor e a evitar o *AI slop*.

Fiquei bem satisfeito com o novo *layout*.

![Novo layout do Gamefoss](/content/posts/gamefoss-screenshot.png)

## A nova stack do Gamefoss

A versão atual usa a seguinte stack:

| Tecnologia | Descrição |
|------|-----------|
| **Astro + TypeScript** | Geração de site estático |
| **MDX** | Conteúdo em Markdown com componentes customizados |
| **React** | Componentes interativos |
| **Tailwind CSS** | Estilos e *framework* CSS |
| **Pagefind** | Busca local, sem *backend* |
| **Embla Carousel** | Carrosséis customizados |
| **Media Chrome** | Player de áudio visualmente consistente entre *browsers* |

O resultado é um site mais rápido e simples de hospedar. A maior parte das páginas é servida como *HTML* puro, enquanto os componentes interativos são carregados apenas onde fazem sentido, usando *React*.

## Episódios de podcast *automágicos*

Diferentemente do antigo site, os episódios não precisam ser cadastrados como "posts". Existe uma automação que lê o *RSS* do podcast diretamente do **Spotify** e gera os dados que são usados pelo **Astro**.

![MAGIC!](https://media.giphy.com/media/tgXFqkYLE6mWI/giphy.gif)

Assim, quando um episódio novo é publicado, basta executar o *workflow* no **GitHub Actions**. O site consulta o feed atualizado, reconstrói as páginas e publica a nova versão. Mágica!

## Busca em site estático

> Como fazer uma busca funcional sem um *backend*?

Simples! Com o [Pagefind](https://pagefind.app/) e o **Astro**, é possível criar uma busca funcional, bem integrada ao site, altamente customizável e sem necessidade de um *backend*. Alguns atributos espalhados pelo site são suficientes para orientar a indexação durante o *build*.

## Analytics e publicidade, mas com consentimento

Por mais que ninguém goste de publicidade, o *AdSense* pode render alguns cascalhos para ajudar a custear o projeto. Por isso, já deixei a infraestrutura de *Analytics* e *AdSense* preparada e adicionei uma camada de consentimento (vai querer um cookie?).

![Vai querer um cookie?](https://media.giphy.com/media/U8VTcEMvHuVz2z8xCH/giphy.gif)

Esses scripts são opcionais e só são carregados depois do aceite do visitante. Interações importantes são identificadas por atributos `data-ga` nos componentes *HTML*. Isso deixa a instrumentação explícita no código.

## Ambiente de homologação

Organizei o fluxo de publicação para dois ambientes, usando **git**:

1. Mudanças na *branch* `release/latest` são publicadas no ambiente de dev.
2. Mudanças na *branch* `main` geram uma versão de produção, atualizam o changelog e sobem o site no domínio principal.

Também existe a opção de *rebuild* manual. Isso é importante porque permite atualizar o site quando um episódio aparece no RSS, sem precisar criar um commit novo.

Foi a parte menos chamativa do projeto, mas provavelmente a mais importante para apertar o botão de *deploy* com tranquilidade e segurança.

## Próxima fase

O novo Gamefoss já está no ar. Fiquem de olho: novos episódios em breve!

![Missão cumprida](https://media.giphy.com/media/zwb4AvXN67p6SlvbIW/giphy.gif)
