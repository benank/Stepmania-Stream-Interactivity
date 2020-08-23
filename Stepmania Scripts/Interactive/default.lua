local function ReadFile(filename)
    local f = RageFileUtil.CreateRageFile()
    local contents
    if f:Open(filename, 1) then
        contents = f:Read()
    end
    f:destroy()
    return contents
end

local function WriteFile(text, filename)
    local f = RageFileUtil.CreateRageFile()
    if f:Open(filename, 2) then
        f:Write(text)
    end
    f:destroy()
end

-- counts an associative Lua table (use #table for sequential tables)
local function count_table(table)
    local count = 0

    for k, v in pairs(table) do
        count = count + 1
    end

    return count
end

local function insert(tbl, t)
    tbl[#tbl+1] = t
    return tbl
end

local function remove(tbl, num_to_remove)
    local table_size = count_table(tbl)
    local new_tbl = {}
    for i = math.min(num_to_remove + 1, table_size), table_size do
        new_tbl[i - num_to_remove] = tbl[i]
    end
    return new_tbl
end

local DEBUG_ON = false

-- Print for debugging, only enabled if DEBUG_ON is true
local function print(t)
    if not DEBUG_ON then return end
    SCREENMAN:SystemMessage(tostring(t))
end

-- Timer so we can perform actions on timed intervals :)
local start_time = GetTimeSinceStart()
local time = 0 -- Current time in seconds that has elapsed in this song
local last_check_time = 0

--[[
    Must store current mods and pending mods (if of the same type)

    if a current mod runs out, check for new pending mods
    apply & check current mods every second
]]
local current_mods = {}

-- Add mods to queued mods on load, then load them if none exists with the key
local queued_mods = {}

-- Default mods string per player
local default_mods_string = {}

local filename = "Save/Interaction.txt"

local text_element

--[[ Creates a new mod object from a line of text from Interaction.txt

    {
        id = 123123,
        name = StepOnIt,
        time = 10,
        mods = 
        {
            "Confusion", "C500"
        }
    }

]]
local function CreateModObjectFromLine(line)
    if string.len(line) < 5 then return end
    local split = split(",", line)
    local data = 
    {
        user_id = split[1],
        user_name = split[2],
        name = split[3],
        time = split[4]
    }

    -- Strip out first 4 entries so we just get mod strings
    split = remove(split, 4)
    local mods = {}
    local mod_types = {}

    -- Store both the types and mod strings so we can ensure no overlapping same mod types
    local index = 1
    for i = 1, count_table(split), 2 do
        mods[index] = split[i+1]
        mod_types[index] = split[i]

        index = index + 1
    end

    data.mods = mods
    data.mod_types = mod_types

    return data
end

-- Gets the full mod list of mods (default + current)
local function GetModListString(i)
    local current_mods_list = {default_mods_string[i]}

    for _, mod_entry in pairs(current_mods) do
        insert(current_mods_list, table.concat(mod_entry.mods, ","))
    end

    return table.concat(current_mods_list, ",")
end

-- Returns whether a mod of a specific mod type is currently active
local function IsAnyModActiveOfType(type)
    for mod_type, mod_data in pairs(current_mods) do
        if type == mod_type then return true end
    end
end

-- Returns whether a mod entry can be activated based on other currently active mods
local function CanActivateMod(mod_entry)

    -- Mod with this same name is running
    if current_mods[mod_entry.name] then return false end

    -- A mod with the same mod type is running
    for _, type in pairs(mod_entry) do
        if IsAnyModActiveOfType(type) then return false end
    end

    return true
end

-- Get new mod string and update all current mods
-- Mod code was inspired by Kyzentun
local function RefreshActiveMods()
    for i = 1, 2 do
        local player_state = GAMESTATE:GetPlayerState("PlayerNumber_P" .. i)
        local player_mods = player_state:GetPlayerOptionsString('ModsLevel_Song')
        player_state:SetPlayerOptions('ModsLevel_Song', GetModListString(i))
    end
end

-- Check for new mods from file and put them in queued_mods
local function CheckForNewModRequests()

    local contents = ReadFile(filename)

    if not contents then return end

    -- Clear file after we read its contents
    WriteFile("\n", filename)

    -- Parse contents line by line into objects
    local lines = split("\n", contents)

    for _, line in pairs(lines) do
        insert(queued_mods, CreateModObjectFromLine(line))
    end

end

local function ShowModText(text)
    if not text then return end
    text_element:stoptweening():settext(text):zoom(5):linear(0.3):diffusealpha(1):zoom(1):linear(5):zoom(1.5):linear(0.5):diffusealpha(0):zoom(0)
    SOUND:PlayOnce(THEME:GetPathB("","new_mod.ogg"))
end

local function GetModTextString(mod_entry)
    return string.format("\n%s [%ss]\n%s", mod_entry.name:gsub("Mod: ", ""), tostring(mod_entry.time), mod_entry.user_name)
end

-- Called every second
local function OnSecondTick(s)

    CheckForNewModRequests()

    -- Update current mods
    for mod_name, mod_entry in pairs(current_mods) do

        mod_entry.time = mod_entry.time - 1

        -- Mod time has expired
        if mod_entry.time <= 0 then
            print(mod_entry.name .. " mod expired")
            current_mods[mod_name] = nil
        end

    end

    -- Check if we can add queued mods to current mods
    for _, mod_entry in pairs(queued_mods) do
        if CanActivateMod(mod_entry) then
            print(mod_entry.name .. " added to current mods")
            current_mods[mod_entry.name] = mod_entry
            queued_mods[_] = nil
            ShowModText(GetModTextString(mod_entry))
        end
    end

    RefreshActiveMods()

end

-- Called every beat of the song
local function OnSongBeat(s)

    time = GetTimeSinceStart() - start_time

    if time - last_check_time >= 1 then
        -- One second elapsed, call the function
        OnSecondTick(s)
        last_check_time = time
    end

end

local function OnInit(s)

    start_time = GetTimeSinceStart()
    time = 0
    
    -- Store default mods strings
    for i = 1, 2 do
        local player_state = GAMESTATE:GetPlayerState("PlayerNumber_P" .. i)
        local player_mods = player_state:GetPlayerOptionsString('ModsLevel_Song')
        default_mods_string[i] = player_mods
    end

    s:sleep(99999)

end

-- Clear any active mods on song end
local function OnSongEnd()
    current_mods = {}
    queued_mods = {}
    RefreshActiveMods()
end

return Def.ActorFrame{
    Def.Actor{
        BeginCommand = function(s)
            OnInit(s)
        end,
        BeatCrossedMessageCommand = function(s)
            OnSongBeat(s)
        end,
        OffCommand = function(s)
            OnSongEnd(s)
        end
    },
    
	Def.BitmapText{
		Name= "mod_application_text", Font= "Common Large",
		Text= " ",
        InitCommand= function(s)
            text_element = s
            s:xy(SCREEN_CENTER_X, SCREEN_TOP + 180):diffuse(Color.White):strokecolor(Color.Black):diffusealpha(0)
        end
    },
}

