const Rewards = require('./rewards');
const ModHandler = require('./mods');
const SongRequestsHandler = require('./song_requests');

// Called when a message from twitch comes, like bits or points redemption
function HandleMessage(message)
{
    const type = message.type || message.message_type;
    if (type == "reward-redeemed")
    {
        HandleChannelPointsRedeemed(message.data);
    }
    else if (type == "bits_event")
    {
        HandleBits(message.data);
    }
    else
    {
        console.log("Unsupported message type (You probably subscribed to some more events that we don't use)");
        console.log(message);
    }
}

function HandleChannelPointsRedeemed(data)
{
    const mod = Rewards[data.redemption.reward.title];
    if (!mod)
    {
        // Reward does not exist in rewards.js config - not handling it here (probably a different type of reward, unrelated)

        // Try to handle a song request
        SongRequestsHandler.SongRequest(data.redemption.reward.title, data.redemption.user, data.redemption.user_input);
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
    ModHandler.ActivateBits({id: data.user_id, name: data.user_name}, data.bits_used);
}


module.exports = { HandleMessage }