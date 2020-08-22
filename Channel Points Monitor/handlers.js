const Rewards = require('./rewards');
const ModHandler = require('./mods')

// Called when a message from twitch comes, like bits or points redemption
function HandleMessage(message)
{
    if (message.type == "reward-redeemed")
    {
        HandleChannelPointsRedeemed(message.data);
    }
    else if (message.type == "bits??")
    {
        HandleBits(message.data);
    }
    else
    {
        console.log("Unsupported message type (You probably subscribed to some more events that we don't use)");
    }
}

function HandleChannelPointsRedeemed(data)
{
    const mod = Rewards[data.redemption.reward.title];
    if (!mod)
    {
        // Reward does not exist in rewards.js config - not handling it here (probably a different type of reward, unrelated)
        return;
    }

    // Activate mods from reward
    try
    {
        ModHandler.ApplyMod(mod, data.redemption.user, data.redemption.reward.title)
    }
    catch (error)
    {
        console.log(`************ Failed to ApplyMod. Exception: ${error}`)
    }
}

function HandleBits(data)
{
    console.log("HandleBits")
}


module.exports = { HandleMessage }