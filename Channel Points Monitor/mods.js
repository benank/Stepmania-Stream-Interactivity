// Class for handling activation of mods
const Config = require('./config');
const Rewards = require('./rewards');
const fs = require('fs');
const path = require('path');
const { CLIENT_RENEG_WINDOW } = require('tls');

const APPDATA = process.env.APPDATA || process.env.HOME;
const file_path = "Stepmania 5/Save/Interaction.txt";
const full_path = path.join(APPDATA, file_path);

// Table of username to bits that they currently have ready for use.
// Bits are used to power up mods and give them more time.
const users_with_bits = {};
const BITS_TO_SECONDS_CONVERSION = 0.01; // 0.05 = 5 extra seconds per 100 bits, or 1 extra per 20 bits

/**
 * Applies a mod to the game from a user.
 * @param {*} mod_list - Table from rewards.js
 * @param {*} user 
 */
function ApplyMod(mod_list, user, reward_name)
{
    const mod_list_copy = Copy(mod_list);

    const extra_seconds_from_bits = GetExtraModTimeFromBits(user);

    // Validate mods
    let parse_success = true;
    mod_list_copy.mods.forEach((mod) => {
        if (!Config.ValidateInput(mod.params, mod.type))
        {
            parse_success = false;
            console.error(`Error in parsing mod params. Type '${mod.type}' Params: '${mod.params}'`);
            return;
        }
    });

    // Failed to parse params, so exit
    if (!parse_success)
    {
        return;
    }

    const name_regex = new RegExp(',');
    if (name_regex.test(reward_name))
    {
        console.error(`Reward names cannot contain commas. Invalid name: ${reward_name}`);
        return;
    }

    // Add extra seconds for each mod
    mod_list_copy.time += extra_seconds_from_bits;

    // Mods have been validated and extra seconds applied; let's send it to Stepmania!

    // Make it into a nice string that's easy to parse
    const serialized_entry = Serialize(mod_list_copy, user, reward_name);

    fs.stat(full_path, function(err, stat)
    {
        // File does not exist
        if (err && err.code == 'ENOENT')
        {
            // Create file
            fs.writeFileSync(full_path, "");
        }

        fs.appendFileSync(full_path, `${serialized_entry}\n`);
    });
}

/**
 * Called when a user activates bits.
 * @param {*} user 
 * @param {*} amount_of_bits 
 */
function ActivateBits(user, amount_of_bits)
{
    if (!users_with_bits[user.id])
    {
        users_with_bits[user.id] = 0
    }
    users_with_bits[user.id] = users_with_bits[user.id] + amount_of_bits;
}

/**
 * Returns the extra number of seconds that a mod lasts based on how many bits a user has in users_with_bits
 * @param {*} user 
 */
function GetExtraModTimeFromBits(user)
{
    if (users_with_bits[user.id])
    {
        const extra_seconds = math.floor(users_with_bits[user.id] * BITS_TO_SECONDS_CONVERSION)
        users_with_bits[user.id] = 0;
        return extra_seconds;
    }
    return 0;
}

function Copy(t)
{
    return JSON.parse(JSON.stringify(t));
}

// Serializes the mod list into something like:
// 9782348,displayname,10,drunk 100%,Tornado
function Serialize(mod_list, user, reward_name)
{
    const param_list = mod_list.mods.map(mod_data => mod_data.params);
    return `${user.id},${user.display_name},${reward_name},${mod_list.time},${param_list.toString()}`;
}

module.exports = {ApplyMod}