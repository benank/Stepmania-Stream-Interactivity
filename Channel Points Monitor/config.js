
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
    [Mod.Drunk]: new RegExp('drunk [0-9]+%'),

    // Accepts input of percents, like 100% or 50%
    [Mod.Dizzy]: new RegExp('dizzy [0-9]+%'),

    // Accepts input of percents, like 100% or 50%
    [Mod.Twirl]: new RegExp('twirl [0-9]+%'),

    // Accepts speed inputs such as 3x, 5.5x, C500, M300, X400
    [Mod.Speed]: new RegExp('((C|M|X)[1-9][0-9]*)|([0-9]+(.[0-9]+)?x)'),

    [Mod.Perspective]: new RegExp('(Incoming)|(Overhead)|(Space)|(Hallway)|(Distant)'),

    [Mod.Acceleration]: new RegExp('(Normal)|(Boost)|(Brake)|(Wave)|(Expand)|(Boomerang)'),

    [Mod.Confusion]: new RegExp('Confusion'),

    [Mod.Beat]: new RegExp('Beat'),

    [Mod.Tornado]: new RegExp('Tornado'),

    [Mod.Appearance]: new RegExp('(RandomVanish)|(Blink)|(Stealth)|(Sudden)|(Hidden)|(Dark)'),

    [Mod.RandomSpeed]: new RegExp('RandomSpeed'),
    
    [Mod.Scroll]: new RegExp('(Normal)|(Reverse)|(Split)|(Alternate)|(Cross)|(Centered)'),

    [Mod.Bumpy]: new RegExp('Bumpy'),
    
    [Mod.Roll]: new RegExp('Roll'),
    
    [Mod.XMode]: new RegExp('XMode'),
    
    [Mod.Tipsy]: new RegExp('Tipsy'),
    
    [Mod.Flip]: new RegExp('Flip'),
    
}

/**
 * Validates that a string matches a given InputType. False if input is not valid, true otherwise.
 * @param {string} input - Input string you want to check
 * @param {InputType} inputType - Input type you want to check the string against
 */
function ValidateInput(input, inputType)
{
    return input.toString().test(InputValidation[inputType]);
}

ModData = 
{
    [Mod.Drunk]: 
    {
        Name: "Drunk",
        Time: 10 // Time in seconds the effect lasts for
    },
    [Mod.Dizzy]:
    {
        Name: "Dizzy",
        Time: 10
    },
    [Mod.Twirl]:
    {
        Name: "Twirl",
        Time: 10
    },
    [Mod.Speed]:
    {
        Name: "Speed",
        Time: 10
    },
    [Mod.Perspective]:
    {
        Name: "Perspective",
        Time: 10
    },
    [Mod.Acceleration]:
    {
        Name: "Acceleration",
        Time: 10
    },
    [Mod.Confusion]:
    {
        Name: "Confusion",
        Time: 10
    },
    [Mod.Beat]:
    {
        Name: "Beat",
        Time: 10
    },
    [Mod.Tornado]:
    {
        Name: "Tornado",
        Time: 10
    },
    [Mod.Mini]:
    {
        Name: "Mini", // Same as tiny
        Time: 10
    },
    [Mod.Appearance]:
    {
        Name: "Appearance",
        Time: 10
    },
    [Mod.RandomSpeed]:
    {
        Name: "Random Speed",
        Time: 10
    },
    [Mod.Scroll]:
    {
        Name: "Scroll",
        Time: 10
    },
    [Mod.Bumpy]:
    {
        Name: "Bumpy",
        Time: 10
    },
    [Mod.Roll]:
    {
        Name: "Roll",
        Time: 10
    },
    [Mod.XMode]:
    {
        Name: "XMode",
        Time: 10
    },
    [Mod.Tipsy]:
    {
        Name: "Tipsy",
        Time: 10
    },
    [Mod.Flip]:
    {
        Name: "Flip",
        Time: 10
    }
}

module.exports = {Mod, ModData, ValidateInput}