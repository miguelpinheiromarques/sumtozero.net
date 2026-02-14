---
title: Configurar metadata no Reaper em sessões de masterização
description: Um guia completo para guardar e gerir metadata de discos em sessões do Reaper. Inclui templates para regiões, dicas para utilização de wildcards e scripts para gerir CD-TEXT de forma automática no processo de criação de DDP.
date: 2026-01-03
author: Miguel Pinheiro Marques
translationKey: "metadatareaper"
permalink: "/pt/posts/configurar-metadata-no-reaper-para-masterização/" 
tags: ["Masterização", "Reaper", "Scripts"]
---

A gestão de metadados é um passo crucial na masterização de um disco. Serve como uma ferramenta excelente para manter um arquivo digital bem organizado e pesquisável — uma necessidade para qualquer estúdio de masterização. Os clientes solicitam frequentemente ficheiros anos após o processo estar concluído, e metadados adequados garantem que esses ficheiros possam ser localizados facilmente.

Para além do arquivo, metadados em falta ou incorretos colocam desafios significativos para a distribuição digital. Além disso, apesar do domínio do streaming, os CDs continuam a ser uma parte vital da indústria musical. O CD-TEXT sempre foi uma funcionalidade valorizada pelos músicos, tornando a inserção precisa de metadados em ficheiros master DDP um requisito.

Uma das principais razões pelas quais adoro usar o Reaper para masterização é a sua capacidade de gerir todas as tarefas num único projeto: processamento de áudio, sequência e exportação. Esta centralização permite-me inserir os metadados de um lançamento diretamente na timeline e automatizar o processo de exportação.

A forma principal como giro isto é anexando os metadados diretamente às regiões (Regions).

### Porquê Regiões?
Trabalhar com regiões no Reaper faz todo o sentido para masterização, especialmente quando se lida com áudio delimitado no tempo, como uma música individual, um álbum, ou movimentos numa peça de música clássica.

Mesmo para um disco gapless (sem pausas), as regiões ajudam a visualizar onde começam e acabam partes específicas. Permitem saltar entre secções instantaneamente e fazer cortes para processar secções separadamente se necessário — mesmo que, no final, exporte tudo como um único ficheiro contínuo.

Inspirei-me no sistema nativo do Reaper desenhado para exportação de DDP e desenvolvi um modelo padrão de nomeação de regiões:

```
#TITLE=Title|PERFORMER=Artist|COMPOSER=Composer|LYRICIST=Lyricist|ISRC=PTKNU2600001|VERSION=1|VINYL=A1
```

Para cada região, uso este modelo e edito os campos para essa faixa específica. Isto permite-me inserir dados granulares que podem ser recuperados mais tarde usando wildcards durante o processo de render.

#### Detalhe dos Campos
- Campos Padrão: TITLE, PERFORMER, COMPOSER, LYRICIST e ISRC são etiquetas (tags) padrão autoexplicativas.
- VERSION: Usado internamente. Se uma faixa for alvo de revisões, consigo facilmente identificar o número da versão no nome do ficheiro.
- VINYL: Como masterizo frequentemente para vinil, este campo permite-me designar os lados (ex: A1, A2, B1, C4). Para streaming o ID da região determina a ordem das faixas (1, 2, 3...) mas para vinyl extraio o wildcard deste campo para determinar a sequência.

Esta abordagem garante até que seja possível ter sequências distintas para lançamentos digitais e vinil, além de que essa informação fica sempre guardada dentro do projeto.

### Metadados Globais do Lançamento
Enquanto os metadados da região lidam com detalhes ao nível da faixa, também preciso de campos para o lançamento inteiro (ex: Artista do Álbum, Título do Álbum) e para isso guardo essa informação isto nas Definições do Projeto (Project Settings):

- Ir a File > Project Settings.
- Clicar no separador Notes.
- Preencher os campos "Title" (Nome do Álbum) e "Author" (Artista do Álbum).

### Exportar Ficheiros Digitais
Assim que as regiões estiverem nomeadas, o próximo passo é instruir o Reaper a usar esse texto como metadados.

- Na janela Render to File:
- Ativar a opção Metadata....
- Usar wildcards para extrair os dados da sua região para tags ID3/WAV.
- Por exemplo, para definir o Título da Faixa, usaria: $region(#TITLE)[|]

![Reaper Render Metadata com wildcards](/static/img/project_render_metadata.png "Reaper Render Metadata with wildcards")

#### Padrão de Nomeação de Ficheiros
Também uso estes wildcards para gerir nomes dos ficheiros para exportação. O padrão de nomeação habitual do nosso estúdio é:

```
$region(PERFORMER)[|] - $regionnumber $region(#TITLE)[|] v$region(VERSION)[|]
```

Isto gera automaticamente nomes de ficheiros como: *Nome do Artista - 01 Título da Música v1.wav*

### Gerir DDPs e CD-TEXT
Enquanto o sistema acima funciona perfeitamente para ficheiros digitais, os CDs de Áudio (imagens DDP) requerem uma abordagem especializada. Os DDPs dependem de marcadores (markers) específicos para identificar pontos de início de faixa, índices e CD-TEXT.

O Reaper tem suporte nativo para DDP, mas colocar marcadores manualmente e escrever os metadados para eles é entediante e propenso a erros. Felizmente, o Reaper permite a criação de scripts. Escrevi um script em Lua que automatiza todo este processo. O script extrai toda a informação que já inserimos nas regiões, limpa caracteres especiais e converte-os para marcadores específicos necessários para um DDP válido.

Este script faz duas coisas:
- Converte Regiões em Marcadores: Insere nos inícios das regiões marcadores de faixa (#) e gere os marcadores especiais de início (!) e fim (@) exigidos pela norma DDP.
- Simplfica o Texto: O CD-TEXT é muito restrito quanto aos conjuntos de caracteres (ASCII), não aceitando por exemplo alguns dos caracteres usados na lingua Portuguesa. O script converte automaticamente caracteres como “ç” para “c” ou “ã" para “a”. Embora não seja linguisticamente perfeito, evita que os leitores de CD exibam caracteres errado ou rejeitem o texto completamente.

```
--[[
* ReaScript Name: Convert Regions to DDP Markers
* Description: Creates DDP markers (!, Tracks, @) with full metadata integration and text sanitization.
* Author: Knurl Mastering
--]]

local is_new_value, filename, section_ID, command_ID, mode, resolution, val = reaper.get_action_context()

-----------------------------------------------------------
-- 1. TOOLBAR FLASH LOGIC
-----------------------------------------------------------
local flash_duration = 0.1 
local start_time = 0

function MonitorFlash()
	local now = reaper.time_precise()
	if now - start_time < flash_duration then
		reaper.defer(MonitorFlash) 
	else
		reaper.SetToggleCommandState(section_ID, command_ID, 0)
		reaper.RefreshToolbar2(section_ID, command_ID)
	end
end

function TriggerFlash()
	reaper.SetToggleCommandState(section_ID, command_ID, 1)
	reaper.RefreshToolbar2(section_ID, command_ID)
	start_time = reaper.time_precise()
	MonitorFlash()
end

-----------------------------------------------------------
-- 2. TEXT SANITIZATION
-----------------------------------------------------------
local replacements = {
	["á"]="a", ["à"]="a", ["ã"]="a", ["â"]="a", ["ä"]="a", ["å"]="a",
	["é"]="e", ["è"]="e", ["ê"]="e", ["ë"]="e",
	["í"]="i", ["ì"]="i", ["î"]="i", ["ï"]="i",
	["ó"]="o", ["ò"]="o", ["õ"]="o", ["ô"]="o", ["ö"]="o",
	["ú"]="u", ["ù"]="u", ["û"]="u", ["ü"]="u",
	["ç"]="c", ["ñ"]="n", ["ý"]="y",
	["Á"]="A", ["À"]="A", ["Ã"]="A", ["Â"]="A", ["Ä"]="A", ["Å"]="A",
	["É"]="E", ["È"]="E", ["Ê"]="E", ["Ë"]="E",
	["Í"]="I", ["Ì"]="I", ["Î"]="I", ["Ï"]="I",
	["Ó"]="O", ["Ò"]="O", ["Õ"]="O", ["Ô"]="O", ["Ö"]="O",
	["Ú"]="U", ["Ù"]="U", ["Û"]="U", ["Ü"]="U",
	["Ç"]="C", ["Ñ"]="N", ["Ý"]="Y"
}

function sanitize_text(str)
	if not str then return "" end
	-- Step A: Replace accented chars
	for k, v in pairs(replacements) do
		str = string.gsub(str, k, v)
	end
	-- Step B: Allow # = | and standard punctuation
	str = string.gsub(str, "[^%w%s%-%_%.%,%!%?%'%\"%(%)%#%=%|]", "")
	return str
end

-----------------------------------------------------------
-- 3. METADATA HELPERS
-----------------------------------------------------------
function get_project_title()
	local retval, title = reaper.GetSetProjectInfo_String(0, "PROJECT_TITLE", "", false)
	if retval and title ~= "" then
		return sanitize_text(title)
	else
		return "Unknown Album"
	end
end

function get_project_author()
	local retval, author = reaper.GetSetProjectInfo_String(0, "PROJECT_AUTHOR", "", false)
	if retval and author ~= "" then
		return sanitize_text(author)
	else
		return "Unknown Artist"
	end
end

function create_colored_marker(pos, name, id)
	-- Dark Grey (64, 64, 64)
	local r, g, b = 64, 64, 64
	local color = reaper.ColorToNative(r, g, b) | 0x1000000
	
	reaper.AddProjectMarker2(0, false, pos, 0, name, id, color)
end

-----------------------------------------------------------
-- 4. MAIN LOGIC
-----------------------------------------------------------
function main()
	-- CHECK: Do regions exist?
	local ret, num_markers, num_regions = reaper.CountProjectMarkers(0)
	if num_regions == 0 then return end 
	
	TriggerFlash()
	reaper.Undo_BeginBlock()

	local i = 0
	local regions_to_process = {}
	local last_region_end = 0

	-- LOOP: Gather all Regions
	while true do
		local retval, isrgn, pos, rgnend, name, markrgnindexnumber = reaper.EnumProjectMarkers(i)
		if retval == 0 then break end
		
		if isrgn then
			table.insert(regions_to_process, {
				pos = pos,
				name = name,
				id = markrgnindexnumber
			})
			
			-- Find the absolute end of the album
			if rgnend > last_region_end then
				last_region_end = rgnend
			end
		end
		i = i + 1
	end

	-- A. CREATE START MARKER (ID 99)
	create_colored_marker(0, "!", 99)

	-- B. CREATE TRACK MARKERS
	for _, rgn in ipairs(regions_to_process) do
		local clean_name = sanitize_text(rgn.name)
		create_colored_marker(rgn.pos, clean_name, rgn.id)
	end

	-- C. CREATE END MARKER
	-- Format: @ALBUM|PERFORMER=Artist
	local album_title = get_project_title()
	local album_artist = get_project_author()
	local end_marker_name = "@" .. album_title .. "|PERFORMER=" .. album_artist
	
	-- ID: Number of Regions + 1
	local end_marker_id = num_regions + 1
	
	create_colored_marker(last_region_end, end_marker_name, end_marker_id)

	reaper.Undo_EndBlock("Create DDP Markers", -1)
end

main()
```