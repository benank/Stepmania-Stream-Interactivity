Config = require('./config');

module.exports = 
{
    // Reward name (must be exact): array of mod objects (see config.js for example mod strings)
    "Mod: A little drunk": 
    {
        time: 10,
        mods:
        [
            {
                type: Config.Mod.Drunk,
                params: "50% drunk"
            }
        ]
    },
    "Mod: A little dizzy": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Dizzy,
                params: "50% dizzy"
            }
        ],
    },
    "Mod: A little twirl": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Twirl,
                params: "50% twirl"
            }
        ],
    },
    "Mod: Drunk": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Drunk,
                params: "100% drunk"
            }
        ],
    },
    "Mod: Dizzy": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Dizzy,
                params: "100% dizzy"
            }
        ],
    },
    "Mod: Twirl": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Twirl,
                params: "100% twirl"
            }
        ],
    },
    "Mod: Tilted notes": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Perspective,
                params: "Space"
            }
        ],
    },
    "Mod: Zoom notes": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Perspective,
                params: "Incoming"
            }
        ],
    },
    "Mod: Boost": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Acceleration,
                params: "Boost"
            }
        ],
    },
    "Mod: Beat": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Beat,
                params: "200% beat"
            }
        ],
    },
    "Mod: 0.25x Speed": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Speed,
                params: "0.25x"
            }
        ],
    },
    "Mod: 4x Speed": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Speed,
                params: "4x"
            }
        ],
    },
    "Mod: Brake": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Acceleration,
                params: "Brake"
            }
        ],
    },
    "Mod: Wave": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Acceleration,
                params: "Wave"
            }
        ],
    },
    "Mod: Spring": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Acceleration,
                params: "Expand"
            }
        ],
    },
    "Mod: Notes from top": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Scroll,
                params: "Reverse"
            }
        ],
    },
    "Mod: Bumpy": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Bumpy,
                params: "100% bumpy"
            }
        ],
    },
    "Mod: Roll": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Roll,
                params: "100% roll"
            }
        ],
    },
    "Mod: Confusion": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Confusion,
                params: "100% confusion"
            }
        ],
    },
    "Mod: Boomerang": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Acceleration,
                params: "Boomerang"
            }
        ],
    },
    "Mod: Tornado": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Tornado,
                params: "100% tornado"
            }
        ],
    },
    "Mod: Sudden": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Appearance,
                params: "Sudden"
            }
        ],
    },
    "Mod: Tipsy": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Tipsy,
                params: "100% tipsy"
            }
        ],
    },
    "Mod: C600": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Speed,
                params: "C600"
            }
        ],
    },
    "Mod: C800": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Speed,
                params: "C800"
            }
        ],
    },
    "Mod: Random Vanish": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Appearance,
                params: "RandomVanish"
            }
        ],
    },
    "Mod: Blink": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Appearance,
                params: "Blink"
            }
        ],
    },
    "Mod: Dark": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Appearance,
                params: "Dark"
            }
        ],
    },
    "Mod: Random Speed": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.RandomSpeed,
                params: "100% RandomSpeed"
            }
        ],
    },
    "Mod: Notes are split": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Scroll,
                params: "Split"
            }
        ],
    },
    "Mod: Alternating notes": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Scroll,
                params: "Alternate"
            }
        ],
    },
    "Mod: Notes Crossing": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Scroll,
                params: "Cross"
            }
        ],
    },
    "Mod: Vertically Centered": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Scroll,
                params: "Centered"
            }
        ],
    },
    "Mod: Crazy X": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.XMode,
                params: "200% XMode"
            }
        ],
    },
    "Mod: Flip": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Flip,
                params: "Flip"
            }
        ],
    },
    "Mod: Stealth": 
    {
        time: 10,
        mods: 
        [
            {
                type: Config.Mod.Appearance,
                params: "Stealth"
            }
        ],
    },
}