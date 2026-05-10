---
title: Um guia para desacoplar colunas em estúdios
description: O desacoplamento das colunas em régies é uma prática recomendada que melhora significativamente a resposta do sistema escuta. Embora a acústica da sala seja a base fundamental, garantir que as colunas se encontram desacopladas dos seus stands ou paredes pode resultar em melhorias significativas no desempenho geral do sistema.
date: 2026-02-14
author: Miguel Pinheiro Marques
translationKey: "decouplingspeakers"
permalink: "/pt/posts/um-guia-para-desacoplar-colunas/" 
tags: ["Acústica", "Studio Design", "Colunas"]
---

Desacoplar as colunas em régies melhora visivelmente o seu desempenho no ambiente de escuta. A acústica da sala é a base de tudo, mas ter as colunas devidamente isoladas dos stands ou das paredes pode limpar o sistema consideravelmente.

## Quais são os benefícios de desacoplar as colunas

Quando uma coluna é colocada directamente num suporte ou numa mesa sem desacoplamento, a energia mecânica da caixa transfere-se para a estrutura de suporte, fazendo-a vibrar por simpatia. Isto transforma a mesa, os stands ou o chão num radiador secundário e descontrolado que ensombra o som. Ao desacoplar a coluna quebra-se esta ponte mecânica, mantendo a energia dos drivers focada em mover o ar em vez de abanar a estrutura. O resultado é graves mais controlados e uma imagem stereo mais limpa.

O desacoplamento também ajuda a resposta a transientes. Quando a caixa vibra contra uma superfície rígida, os micro-movimentos distorcem o ataque inicial de um som, particularmente nos médios-graves. O isolamento estabiliza a coluna, deixando os drivers parar e arrancar com maior precisão. O resultado é uma imagem stereo mais definida, melhor profundidade de campo e um ambiente de escuta onde o que se ouve é o que está gravado, não a ressonância do mobiliário ou da sala.

![A sala de mastering original da Arda Recorders durante a instalação das colunas em 2020.](/static/img/atc_sylomer_arda.jpg "A sala de mastering original da Arda Recorders durante a instalação das colunas em 2020.")
#### Image 2. A sala de mastering original da Arda Recorders durante a instalação das colunas em 2020, com as ATC SCM110ASL Pro totalmente desacopladas dentro de uma caixa ainda aberta, para permitir medições e o ajuste dos apoios.

## O desacoplamento apenas na base da coluna é suficiente?

Uma dúvida razoável: se a coluna está apenas a "flutuar", o movimento frontal do woofer não vai empurrar a caixa para trás? Tecnicamente sim. A terceira lei de Newton diz que essa energia tem de ir para algum lado e, sem uma ligação rígida, a caixa fica sujeita a micro-movimentos que podem afectar os transientes. Em quase todos os cenários de escuta, porém, a distorção audível causada por um chão ou mesa ressonante a "cantar" juntamente com os graves é muito mais destrutiva do que o recuo da caixa. Quebrar essa ponte mecânica é a melhor opção.

Para ter o melhor dos dois mundos (desacoplamento e estabilidade), pode-se introduzir mais massa na equação. Uma boa solução é colocar um bloco pesado de pedra, granito ou betão directamente sob a coluna, com os apoios de isolamento por baixo dessa laje. Isto aumenta a inércia total do sistema. A massa pesada resiste ao recuo da caixa e deixa os drivers disparar a partir de uma posição estável, enquanto o material de isolamento por baixo continua a impedir que a energia se propague para a estrutura do edifício.

Para configurações embutidas, a coluna deve idealmente ser desacoplada omnidireccionalmente: flutuando no topo, na base e nas laterais. A abordagem mais eficaz é alojar a coluna dentro de uma caixa pesada e amortecida, fixando-a sob pressão contra apoios de isolamento ou molas. Todo este módulo é instalado na parede como uma só peça. Embora isto aumente a complexidade dos cálculos de carga (é preciso contabilizar não só a distribuição de peso da própria coluna, mas também a força descendente exercida pelos apoios ou molas comprimidos no topo), maximiza o isolamento e permite que o sistema (caixa + coluna) seja removido como uma unidade única para manutenção.

## O que funciona para o desacoplamento (e o que não funciona)

No mundo DIY, há a ideia instalada de que qualquer material macio serve para isolar uma coluna. Isto leva ao uso de bolas de ténis cortadas ao meio, bases de borracha simples, espuma de embalagem ou até placas de lã de rocha de alta densidade. Estes materiais são geralmente ineficazes porque não têm características de mola. Regra rápida para soluções comerciais: se o produto é definido principalmente por uma classificação de dureza Shore, é um amortecedor, não um isolador com comportamento de mola.

O desacoplamento a sério requer um material que actue como um filtro mecânico passa-baixo. Para colunas pesadas, as molas metálicas são frequentemente a opção mais prática porque oferecem uma frequência natural muito baixa, embora possam introduzir ressonância se não forem devidamente amortecidas. Uma alternativa mais versátil são os elastómeros de poliuretano microcelular, como o Sylomer ou o Regufoam. Estes materiais são espumas com comportamento de mola, concebidas com densidades específicas para lidar com gamas de peso precisas. Ao contrário da borracha genérica, comportam-se como uma mola combinada com um amortecedor, isolando as vibrações sem o *ringing* associado às molas metálicas não amortecidas.

O fator crítico na escolha destes materiais é a deflexão estática: quanto é que o material comprime com o peso da coluna. O desacoplamento é física, não magia; para um apoio funcionar, tem de ser carregado correctamente. Se colocar uma coluna leve num apoio rígido, o apoio não comprime o suficiente para actuar como mola e as vibrações passam directamente. O contrário também é verdade: se a coluna for demasiado pesada, o material fica completamente esmagado e torna-se uma ponte sólida.

![Três exemplos de diferentes apoios Sylomer e suportes de mola da AMC Mecanocaucho.](/static/img/sylomer_pad_springs.png "Três exemplos de diferentes apoios Sylomer e suportes de mola da AMC Mecanocaucho.")
#### Image 1. Três exemplos de diferentes apoios Sylomer e suportes de mola da <a href="https://www.mecanocaucho.com" target="_blank" rel="noopener">AMC Mecanocaucho</a>.

## Calcular a carga: é tudo uma questão de matemática

Escolher o isolamento certo é uma questão de matemática simples mas que tem de ser calculada. Não se pode adivinhar; é obrigatório calcular. O primeiro passo é consultar a ficha técnica do fabricante para saber o peso exacto da coluna, mas esse número isolado raramente chega. A maioria das colunas, particularmente os modelos passivos com ímanes pesados nos drivers, tem o peso distribuído de forma frontal. Isto desloca o centro de gravidade para a frente, o que significa que os apoios ou molas frontais suportarão muito mais carga do que os traseiros. Se usar quatro apoios idênticos num quadrado, os dois da frente podem ficar sobrecarregados (esmagados) enquanto os dois de trás ficam subcarregados (demasiado rígidos para isolar), comprometendo todo o sistema.

Para resolver isto, é necessário calcular a carga por ponto de montagem. Se estiver a usar um material como o Sylomer, o fabricante disponibiliza fichas técnicas que especificam a gama de carga estática ideal para cada densidade codificada por cores. Por exemplo, um apoio de Sylomer amarelo com 100x100x25mm poderá ter o seu desempenho ideal entre 9-10kg, enquanto um laranja com as mesmas dimensões requer 14-16kg para funcionar como pretendido (**nota: diferentes fabricantes podem usar códigos de cores diferentes**). Poderá ser necessário usar densidades diferentes para a frente e para a traseira, ou ajustar o espaçamento dos apoios para equilibrar a distribuição de peso. A capacidade de carga é geralmente indicada em N/mm<sup>2</sup> por cor, pelo que a escolha do apoio correcto exige acertar tanto na dimensão como na cor.

O último passo é a verificação. Uma vez colocadas as colunas nos suportes, é preciso medir a deflexão: a quantidade real que a mola ou o apoio comprimiu. Para molas, medir a altura chega; para elastómeros como o Sylomer, procura-se uma percentagem específica de compressão (frequentemente cerca de 10-20%, dependendo do tipo) para garantir que o material está na sua região elástica linear. Se um apoio não estiver a deflectir o suficiente, está a agir como um bloco sólido; esmagado, está a fazer ponte. Ajustar o número de apoios ou a sua posição até atingir uma deflexão uniforme e especificada em todos os pontos é a única forma de garantir que o sistema está verdadeiramente desacoplado.

![Medição da deflexão em apoios Sylomer individuais para garantir a carga correta.](/static/img/atc_sylomer_ave_ruler.jpg "Medição da deflexão em apoios Sylomer individuais para garantir a carga correta")
#### Imagem 3. Medição da deflexão em apoios Sylomer individuais com a régua do <a href="https://www.youtube.com/@arduinoversusevil2025" target="_blank" rel="noopener">@AvE</a>, para garantir a correcta deformação do apoio.

## Soluções prontas a usar: para quem não quer fazer contas

Se a matemática parecer assustadora ou se preferir uma solução verificada e com acabamento profissional, há boas opções no mercado que aplicam exactamente estes princípios. Ao contrário das bases de espuma genéricas ou dos discos de borracha "mágicos", empresas como a <a href="https://www.mesanovicmicrophones.com/iso-platform" target="_blank" rel="noopener">Mesanovic</a> e a <a href="https://spacelab.systems/products/lift-mk2-speaker-stand" target="_blank" rel="noopener">Space Lab Systems</a> desenvolvem os seus suportes e plataformas com Sylomer calibrado ou isolamento à base de molas. Estes produtos eliminam a incerteza da equação, fornecendo um sistema massa-mola pré-sintonizado. Ao seleccionar o modelo que corresponde à gama de peso das colunas, obtém-se uma frequência natural baixa garantida e a deflexão correcta logo à saída da caixa, sem necessidade de cortar espuma ou medir a compressão manualmente.