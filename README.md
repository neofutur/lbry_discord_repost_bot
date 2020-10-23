# lbry_discord_repost_bot
bot posting on your discord server all the reposts of your LBRY channel

invite the bot on your server with this link  :
https://discord.com/oauth2/authorize?client_id=760885448792473701&scope=bot&permissions=8

  npm install discord.js --save

  npm install request --save

  npm i node-fetch --save

rename or copy config.json.example to config.json

edit config.json to put your own lbry claimid, url, bot token 

you need to have a working lbrynet SDK on the same computer so the bot can ask infos to the LBC blockchain : 

source lbry-venv/bin/activate
lbrynet start


