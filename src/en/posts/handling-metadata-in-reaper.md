---
title: Handling metadata when using Reaper for mastering
description: Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.
date: 2026-01-03
author: Miguel Pinheiro Marques
translationKey: "metadatareaper"
permalink: "/en/posts/handling-metadata-when-using-reaper-for-mastering/" 
tags: ["Mastering", "Reaper"]
---

Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.

Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.

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