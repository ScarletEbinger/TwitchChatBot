console.log('Welcome to Twitch Chat Bot!')

import tmi from 'tmi.js'
import { ask } from './aiHandler'
import { BOT_USERNAME , OAUTH_TOKEN, CHANNEL_NAME } from './config';

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN
    },
    channels: [ CHANNEL_NAME ]


}
const client = new tmi.Client(options);

client.connect();

async function onMessage(channel, tags, message, self) {
	// Ignore echoed messages.
	if(self) return;
   /* let isTheAINameMentioned = false
    isTheAINameMentioned = message.toLowerCase().includes(AI_NAME) */
    if (message.startsWith('start, ')) {
        try {
            const question = message.slice(7)
            console.log(question)
            const response = `${(await ask(question)) || ''}`
            await client.say(channel, `${tags.username}, ${response}`)
          } catch (e) {
            console.error(e)
            await client.say(channel, 'AI Offline')
          }
    }
}
    
;

client.on('message', onMessage); 

setInterval(function(channel = 'altofctrlgg', tags, message, self) { 
    // Put your ad that will appear every five minutes on "PUT AD HERE"
    console.log('sending your ad msg very 5 minutes right now')
    client.say(channel, 'PUT AD HERE')
    client.say(channel, 'PUT AD HERE')
    client.say(channel, 'PUT AD HERE')
  }, 300000); // Run every 5 minutes (300000 milliseconds).
			

