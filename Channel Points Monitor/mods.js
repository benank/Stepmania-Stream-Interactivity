// Class for handling activation of mods
const Config = require('./config');
const Rewards = require('./rewards');

// Table of username to bits that they currently have ready for use.
// Bits are used to power up mods and give them more time.
const users_with_bits = {}
const BITS_TO_SECONDS_CONVERSION = 0.01; // 0.05 = 5 extra seconds per 100 bits

/**
 * Applies a mod to the game from a user.
 * @param {*} mod 
 * @param {*} user 
 */
function ApplyMod(mod_list, user)
{
    const mod_list_copy = Copy(mod_list);

    // Validate mods
    mod_list_copy.forEach((mod) => {
        if (!Config.ValidateInput(mod.params, mod.type))
        {
            console.log(`Error in parsing mod params. Type ${mod.type} Params: ${mod.params}`);
            return;
        }
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

module.exports = {ApplyMod}