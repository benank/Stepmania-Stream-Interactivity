// Logic for the twitch pubsub connection
const WebSocket = require('ws');

const WS_URL = 'wss://pubsub-edge.twitch.tv';
let ws = new WebSocket(WS_URL);
const Handlers = require("./handlers");

// generate tokens here https://twitchtokengenerator.com/

HandlePingPong();

ws.on('open', function open() {
    console.log(`Connection established to ${WS_URL}. Setting everything up...`);
    ListenToTopic([`channel-points-channel-v1.${process.env.CHANNEL_ID}`, `channel-bits-events-v2.${process.env.CHANNEL_ID}`], process.env.TOKEN);
});

ws.on('message', function incoming(message) {
    HandleMessage(message);
});

function ForceReconnect()
{
    console.log("Reconnecting...");
    ws.terminate();
    ws = new WebSocket(WS_URL);
}

function HandleMessage(message)
{
    message = JSON.parse(message);

    if (message.type == "RECONNECT")
    {
        console.log("RECONNECT message received")
        ForceReconnect();
    }
    else if (message.type == "PONG")
    {
        awaiting_pong = false;
    }
    else if (message.type == "RESPONSE")
    {
        if (message.error)
        {
            console.error(message.error);
        }
        else
        {
            console.log("All set up! We're good to go!")
        }
    }
    else if (message.type == "MESSAGE")
    {
        // An event occurred, so let's handle it
        message.data.message = JSON.parse(message.data.message)
        Handlers.HandleMessage(message.data.message);
    }
}

function ListenToTopic(topics, auth_token)
{
    const data = 
    {
        "type": "LISTEN",
        "data": {
          "topics": topics,
          "auth_token": auth_token
        }
    }
    ws.send(JSON.stringify(data));
}

let awaiting_pong = false;

// Must ping the server within 5 minutes to keep the connection alive
function HandlePingPong()
{
    setInterval(() => {

        if (ws.readyState == 2 || ws.readyState == 3)
        {
            // Websocket is closing, let's reconnect instead
            ForceReconnect();
        }
        else
        {
            ws.send(JSON.stringify({
                "type": "PING"
            }));
            awaiting_pong = true;

            // Response not received in time
            setTimeout(() => {
                if (awaiting_pong)
                {
                    awaiting_pong = false;
                    ForceReconnect();
                }
            }, 1000 * 15);
        }
    }, 1000 * 60 * 3);
}