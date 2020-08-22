
Mod = 
{
    Drunk: 1,
    Dizzy: 2,
    Speed: 3,
    Perspective: 4,
    Acceleration: 5,
    Twirl: 6,
    Confusion: 7,
    Beat: 8,
    Tornado: 9,
    Mini: 10,
    Appearance: 11,
    RandomSpeed: 12,
    Scroll: 13,
    Bumpy: 14,
    Roll: 15,
    XMode: 16,
    Tipsy: 17,
    Flip: 18
}

// Input validation for InputTypes. Verifies that it matches the correct format.
// Returns true if it matches, false if the input was not in the correct format.
InputValidation = 
{
    // Accepts input of percents, like 100% or 50%
    [Mod.Drunk]: new RegExp('^[0-9]+% drunk$'),

    // Accepts input of percents, like 100% or 50%
    [Mod.Dizzy]: new RegExp('^[0-9]+% dizzy$'),

    // Accepts input of percents, like 100% or 50%
    [Mod.Twirl]: new RegExp('^[0-9]+% twirl$'),

    // Accepts speed inputs such as 3x, 5.5x, C500, M300, X400
    [Mod.Speed]: new RegExp('^((C|M|X)[1-9][0-9]*)|([0-9]+(.[0-9]+)?x)$'),

    [Mod.Perspective]: new RegExp('^(Incoming)|(Overhead)|(Space)|(Hallway)|(Distant)$'),

    [Mod.Acceleration]: new RegExp('^(Normal)|(Boost)|(Brake)|(Wave)|(Expand)|(Boomerang)$'),

    [Mod.Confusion]: new RegExp('^[0-9]+% confusion$'),

    [Mod.Beat]: new RegExp('^[0-9]+% beat$'),

    [Mod.Tornado]: new RegExp('^[0-9]+% tornado$'),

    [Mod.Appearance]: new RegExp('^(RandomVanish)|(Blink)|(Stealth)|(Sudden)|(Hidden)|(Dark)$'),

    [Mod.RandomSpeed]: new RegExp('^[0-9]+% RandomSpeed$'),
    
    [Mod.Scroll]: new RegExp('^(Normal)|(Reverse)|(Split)|(Alternate)|(Cross)|(Centered)$'),

    [Mod.Bumpy]: new RegExp('^[0-9]+% bumpy$'),
    
    [Mod.Roll]: new RegExp('^[0-9]+% roll$'),
    
    [Mod.XMode]: new RegExp('^[0-9]+% XMode$'),
    
    [Mod.Tipsy]: new RegExp('^[0-9]+% tipsy$'),
    
    [Mod.Flip]: new RegExp('^Flip$'),
    
}

/**
 * Validates that a string matches a given InputType. False if input is not valid, true otherwise.
 * @param {string} input - Input string you want to check
 * @param {InputType} inputType - Input type you want to check the string against
 */
function ValidateInput(input, inputType)
{
    return InputValidation[inputType].test(input.toString());
}

module.exports = {Mod, ValidateInput}