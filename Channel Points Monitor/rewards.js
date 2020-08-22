Config = require('./config');

module.exports = 
{
    // Reward name (must be exact): array of mod objects (see config.js for example mod strings)
    "Mod: Confusion": 
    [
        {
            type: Config.Mod.Confusion,
            params: "Confusion"
        }
    ],
    "Mod: Random Speed, Tornado, Dizzy": 
    [
        {
            type: Config.Mod.Confusion,
            params: "Confusion"
        },
        {
            type: Config.Mod.Tornado,
            params: "Tornado"
        },
        {
            type: Config.Mod.Dizzy,
            params: "dizzy 100%"
        },
    ],
}