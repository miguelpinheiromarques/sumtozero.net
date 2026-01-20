---
title: Handling metadata when using Reaper for mastering
description: How we deal with album and song metadata while mastering in Reaper, for digital streaming and CD replication in DDP
date: 2026-01-03
author: Miguel Pinheiro Marques
translationKey: "metadatareaper"
permalink: "/en/posts/handling-metadata-when-using-reaper-for-mastering/" 
tags: ["Mastering", "Reaper"]
---

Handling metadata is a crucial step in mastering a record. It serves as an excellent tool for maintaining a well-organized and searchable digital archive, which is particularly beneficial for mastering studios. Clients often request files years after the mastering process, and metadata ensures that these files can be easily located and accessed. Additionally, handling files without proper metadata can pose challenges for digital distribution. Furthermore, despite the prevalence of digital formats, CDs are still a part of the music industry, and CD-TEXT was always a valued feature for musicians which makes printing metadata to DDP master files a common practice.

One of the key reasons we love and use Reaper for mastering is that it allows us to perform all tasks within a single application and project, including audio processing, sequencing, and exporting masters. This also means we can store the release’s metadata and handle all related tasks using Reaper. The primary way we utilize metadata in Reaper is by adding it to regions.

### Why regions?
Working with regions in Reaper for mastering makes perfect sense, especially when you’re dealing with time-constrained pieces of music, such as a single song, several songs in a record, or movements in a classical piece. Even for a gapless record, having regions helps you determine where specific parts begin and end, making it convenient to work with. You can jump between sections and even make cuts to process regions separately if needed, even if you ultimately export everything as a single continuous file.

So how do we approach metadata in Reaper regions? We take a cue from the built-in system designed for DDP export in markers and we ended up with the following template:

```
#TITLE=Song Title|PERFORMER=Artist|COMPOSER=Composer|LYRICIST=Writer|ISRC=PTKNU2600001|VERSION=1|VINYL=A1
```

For each region, we use this template and edit the required fields for that specific release. This serves as a means for us to input information about each region, which we can later retrieve using wildcards. TITLE, PERFORMER, COMPOSER, ISRC and LYRICIST are self-explanatory fields. The VERSION field is used internally and during the mastering process. If revisions occur on a track, we can easily trace those revisions. The VINYL field is also useful since I frequently release vinyl records. It allows us to add track numbering like A1, B2, C4 (or any other format) to files. For digital releases, the region number determines the track ordering. For vinyl releases, the wildcard determines the track sequencing on vinyl. This way, you can even have separate sequencing for digital and vinyl releases, and it will always be saved in the project information.

### What about album and release metadata?

While adding information to individual track metadata in regions is excellent, we still need a few fields related to the entire release information, such as the release artist and release title. At our studio, we simply add this information to the Reaper project’s notes in the Title & Author field. You can find those fields in Project Settings, in the Notes tab.

### So what's next?

After you've inputed all information in your regions name, you just need to tell Reaper to use that as metadata when exporting files. In Reaper's Render to File window, turn the "Metadata..." toggle on, and add the wildcards from your regions to each field you want to extract the information from the region title. At our studio, our template is the following:

![alt text](/static/img/project_render_metadata.png "Title")

*Convert Regions to DDP Markers script*
```
--[[
* ReaScript Name: Convert Regions to DDP Markers
* Description: Creates DDP markers (!, Tracks, @) with full metadata integration.
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