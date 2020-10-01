// Integrated with DDRDave's song requests script, which you can find here: https://github.com/DaveLinger/Stepmania-Stream-Tools
const fetch = require('node-fetch');
const util = require('util');

const request_reward_name = "Song Request";
const request_url = `%srequest.php?security_key=%s&user=%s&userid=%s&songid=%s`;

function SongRequest(reward_name, user, song_id)
{
    song_id = parseInt(song_id);
    if (typeof song_id != "number" || !song_id || song_id < 1 || reward_name != request_reward_name)
    {
        console.log(`Invalid input from %s when requesting a song: %s`, user.display_name, song_id)
        return;
    }
    
    fetch(GetFormattedSongRequestURL(user, song_id))
        .then(res => res.text())
        .then(body => console.log(body));

}

function GetFormattedSongRequestURL(user, song_id)
{
    return util.format(request_url, process.env.WEBSITE_URL, process.env.SECURITY_KEY, user.display_name, user.id, song_id);
}

module.exports = {SongRequest}