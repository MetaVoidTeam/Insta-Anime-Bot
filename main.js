const Insta = require('./insta.js');
const mal = require('mal-scraper');
const axios = require('axios')
const client = new Insta.Client();

client.on('connected', () => {
    console.log(`Login Id ${client.user.username}`);
});                                            
 
client.on('pendingRequest', msg => {
        msg.approve();
});


client.on('messageCreate', async function(msg) {
           if (msg.author.id === client.user.id) return
           msg.markSeen();
           var moe = ctx.content;
           let nk = moe.split(" ");
           nk.shift();
           text = nk.join(" ");      
       if (new RegExp(".chat").exec(moe)) {
           const reply = await axios.get(`https://kukiapi.xyz/api/kuki/message=${text}`)
           const chat = reply.data.reply
           return await msg.reply(`${chat}`)          
       }
       if (new RegExp(".sfw", "i").exec(moe)) {
           const waifusfw = await axios.get(`https://api.waifu.pics/sfw/${text}`)
           const sfw = waifusfw.data.url
           return await msg.chat.sendPhoto(`${sfw}`)          
       }
       if (new RegExp(".nsfw", "i").exec(moe)) {
           const waifunsfw = await axios.get(`https://api.waifu.pics/nsfw/${text}`)
           const nsfw = waifunsfw.data.url
           return await msg.chat.sendPhoto(`${nsfw}`)          
       }
       if (new RegExp(".anime", "i").exec(moe)) {
           Anime = await Mal.getInfoFromName(text);    
           await msg.reply(`\nTitle: ${Anime.title}\nType: ${Anime.type}\nStatus: ${Anime.status}\nPremiered: ${Anime.premiered}\nEpisodes: ${Anime.episodes}\nDuration: ${Anime.duration}\nPopularity: ${Anime.popularity}\nScore: ${Anime.score}`)
           return await msg.chat.sendPhoto(`${Anime.picture}`)
       }
});

client.login(process.env.username, process.env.password);
