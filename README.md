# lbry_discord_repost_bot
bot posting on your discord server all the posts and reposts of your LBRY channel

# necessary dependencies you need to install : 
  `npm install discord.js --save`

  `npm install request --save`

  `npm i node-fetch --save`

# configuration of your bot : 

rename or copy config.json.example to config.json

edit config.json to put your own lbry claimid, url, bot token 

( how to get your discord bot token ? : https://www.writebots.com/discord-bot-token/ )

you can choose to post only the reposts, only the uploads, or both , to post both choose:

  `"postreposts" : "yes",`

  `"postuploads" : "yes",`

in the config file, change to no if you dont want one of them

#you need to have a working lbrynet SDK on the same computer so the bot can ask infos to the LBC blockchain : 

  `source lbry-venv/bin/activate`
  
  `lbrynet start`
  
# launch your bot :

start the bot with :

`nodejs ./index.js`

# thanks LBRY initiative funding

this bot have been funded on https://discord.com/channels/362322208485277697/681479694004387850/760874208501694534 


