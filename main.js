
//////////////////////////////////////////////////////
//================== AUTO RESTART ==================//
/////////////////////////////////////////////////////

const timerestart = 120   //in minutes
const google = require('googlethis');
const fs = require("fs");
const { keep_alive } = require("./keep_alive.js");
const http = require('https'); // or 'https' for https:// URLs
const login = require("fca-unofficial");
const axios = require("axios");
const YoutubeMusicApi = require('youtube-music-api')
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const ffmpegs = require('fluent-ffmpeg');
ffmpegs.setFfmpegPath(ffmpeg.path);
const musicApi = new YoutubeMusicApi()
// GLOBAL MESSAGE STORAGE
let msgs = {};
let vips = ['100007909449910','100046351269353','100071918311154','100002833444192','100077642405600','100059562017368','100068762056618','100056442565207','100057685300979','100074826541004','100075857646105'];
let vip = ['100046351269353']
let bot = ['100078003790746', '100077808525745', '100078297275425', '100078525727498', '100078225894635', '100078591791882', '100078347222408', '100078444408815']
let cd = {};
let threads = ""
let onBot = true 
let unsentOn = true
let unsentGC = ""
const bot_name = "Minari"
const prefix = "!"


const translate = async(from, to) => {
                    let options = {
                        page: 0,
                        safe: false,
                        additional_params: {
                            hl: "en"
                        }
                    };
                    
                    return await google.search(`translate ${from} to ${to}`, options);
                };
                
                    
/*==================================== LEECH tiktok FUNC ====================================*/

async function leechTT(link) {
    out = await axios.get("https://www.tiktokdownloader.org/check.php?v=" + link).then((response) => { return response.data.download_url }).catch((error) => { return "err" })
    return out
}
/*==================================== LEECH tiktok FUNC ====================================*/


/*==================================== WIKI search FUNC ====================================*/
async function getWiki(q) {
  out = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then((response) => { return response.data}).catch((error) => { return error })
  return out
}
 
 /*==================================== WIKI search FUNC ====================================*/

/*==================================== DICTIONARY FUNC ===========================================*/

async function whatIs(x){
    let o = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + x).then((response) => {
        return response.data[0]
    }).catch((err) => {
        return "Error 123 " + err.message
    })
    return o
}
/*==================================== DICTIONARY FUNC ===========================================*/



/*==================================== LEECH MP3 FUNC ====================================*/
async function conv(v, t, e) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-Key': 'de0cfuirtgf67a'
    }
    results = await axios.post("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", "v_id=" + v + "&ftype=mp3&fquality=128&token=" + t + "&timeExpire=" + e + "&client=yt5s.com", { headers: headers }).then((response) => { return response.data.d_url }).catch((error) => { return error.message });
    return results
}
async function fetch(query) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    results = await axios.post("https://yt5s.com/api/ajaxSearch", "q=" + query + "&vt=mp3", { headers: headers }).then((response) => { return response.data }).catch((error) => { return error.message });
    return results
}

async function dl(x){
	let s = fetch(x)
	let r = await s.then((response) => {
		let slist = response
		console.log(slist)
		if(slist.t < 1500){
			let d_u = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
				return [response, slist.title, slist.a]
			})
			return d_u
		}else{
			console.log(slist.t)
			return "Error: MPOP"
		}
	})
	return r
}

async function leechmp3(query) {
    var songs = fetch(query);
    let resp = await songs.then((response) => {
        let slist = response;
        if (slist == "err") {
            return "err"
        }
        else if (slist.t < 1300) {
            let d_url = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
                return [response, slist.title]
            });
            return d_url
        }
        else if (slist.p == "search") {
            return 'err'
        }
        else if (slist.mess.startsWith("The video you want to download is posted on TikTok.")) {
            return 'tiktok'
        }
        else {
            return 'pakyo'
        }
    });
    return resp
}

/*==================================== LEECH MP3 FUNC ====================================*/

/*==================================== RANDOM QOUTES FUNC ====================================*/

async function qt() {
    let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => { return response.data[0] }).catch((err) => { return "err " });
    return qoute
}
/*==================================== RANDOM QOUTES FUNC ====================================*/

login({ appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true, selfListen: false });
    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
        switch (event.type) {
            case "message_reply":   
let input = event.body;
            let msgid = event.messageID
                let input2 = input.toLowerCase();
                let mess = event.body;
                let x = mess.toLowerCase()
                let y = x.split(" ")
                let myDay = new Date() + 8
                if((new Date().getHours() + 8)> 24){
                    myDay = (new Date().getHours() + 8) - 24
                }else{
                    myDay = new Date().getHours() + 8
                }
                msgs[msgid] = input;
                        
            if(input2.includes("vilat")){
            	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("mukha mo po vilat " + data[event.senderID]['name'] + "!😊😊", event.threadID, event.messageID);
                            }
                        })
}

if(input2.includes("(4)")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("(5)", event.threadID, event.messageID);
                            }
                        })
}
if((input2.includes("pogi") || input2.includes("gwapo") || input2.includes("ganda") || input2.includes("shawty") || input2.includes("beaut") || input2.includes("kawaii") || input2.includes("gunthe") || input2.includes("cute")) && !bot.includes(event.senderID)){
	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("YES PO, OPO? KUNG WALA KAYONG KAILANGAN SA MAGANDA/POGI/GWAPO HUWAG NYO PO AKONG IMENTION!😡😡😡", event.threadID, event.messageID);
                            }
                        })
}
if((input2.includes("morning") || input2.includes("umaga") || input2.includes("murning"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🌄", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Good Morning @${data[event.senderID].firstName}, Have a Great Day!❤️\n\n💠 Auto Greet by: PaulBotX`,
                            mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                            })
                        
                        }

                            
                            
                            if((input2.includes("night") || input2.includes("nyt") || input2.includes("nayt") || input2.includes("gabi"))&& !bot.includes(event.senderID)){
                                              
                      api.setMessageReaction("😴", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Good Night @${data[event.senderID].firstName}, SleepWell!❤️\n\n💠 Auto Greet by: Paul BotX`, 
                                mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                            })
                        
                        }
                            
                            if((input2.includes("afternoon") || input2.includes("hapon") || input2.includes("aftie"))&& !bot.includes(event.senderID)){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Good Afternoon @${data[event.senderID].firstName}, How's your day?\n\n💠 Auto Greet by: PaulBotX`,
                            mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                            })
                        
                        }

                                
                         

                         if((input2.includes("vivi") || 
input2.includes("bot"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("BAT MO PO AKO TINAWAG?! ALAM MO BA NA NAKAKAISTURBO KA SA NATUTULOG?! 😾😾", event.threadID, event.messageID);
                            }
                        })
}   
                            
                            if((input2.includes("panget") ||            input2.includes("ngetpa") ||            input2.includes("ngitpa") || input2.includes("pangit") || input2.includes("ugly") || input2.includes("kowai"))&& !bot.includes(event.senderID)){
                           	   	let data = input;
                                           if (!vips.includes(event.senderID)){
                                           	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Mas panget po ang may pangalan na " + data[event.senderID]['name'] + "!😊😊"), event.threadID, event.messageID);
                            }
                        })
                        }
                       }
 if (vips.includes(event.senderID)) {
                   api.setMessageReaction("😍", event.messageID, (err) => {
                 }, true);
              }
           //    else {
  //                   api.setMessageReaction("😝", // event.messageID, (err) => {
   //               }, true);
  //             }
             break
            case "message":
 if (vips.includes(event.senderID)) {
                 api.setMessageReaction("😍", event.messageID, (err) => {
                  }, true);
                }
    //            else {
//                   api.setMessageReaction("😝", //event.messageID, (err) => {
     //             }, true);
      //           }
                if (event.attachments.length != 0) {
                    if (event.attachments[0].type == "photo") {
                        msgs[event.messageID] = ['img', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "sticker") {
                        msgs[event.messageID] = ['sticker', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "animated_image") {
                        msgs[event.messageID] = ['gif', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "video") {
                        msgs[event.messageID] = ['vid', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "audio") {
                        msgs[event.messageID] = ['vm', event.attachments[0].url]
                    }
                } else {
                    msgs[event.messageID] = event.body
                }
                
		
                if (event.body != null) {
                    let input = event.body;
                    let input2 = input.toLowerCase();
                    
                    
                   
if(vips.includes(event.senderID)){
                        if(input.startsWith("Bot: Sleep") && onBot){
                            onBot = false
                            api.sendMessage(bot_name + " Bot is now sleeping..", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage(bot_name + " Bot has turned off!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Bot: Activate") && threads.includes(event.threadID)){
                            threads = threads.replace(event.threadID + " ", "")
                            api.sendMessage(bot_name + " Bot is now activated in this conversation.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage(bot_name + " Bot was activated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Bot: Kill") && !threads.includes(event.threadID)){
                            threads += event.threadID + " "
                            api.sendMessage(bot_name + " Bot is now deactivated in this conversation.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage(bot_name + " Bot was deactivated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Bot: Wake up") && !onBot){
                            onBot = true
                            api.sendMessage(bot_name + " Bot is now awake.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage(bot_name + "Bot has turned on!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Status")){
                        let m = bot_name + " Bot is currently active, "
                            if(onBot){
                                m += "also awake."
                            }else{
                                m += "but on sleep mode."
                            }
                            api.sendMessage(m, event.threadID, event.messageID)
                        }
                        if(input.startsWith("Unsent: Off") && unsentOn){
                            unsentOn = false
                            api.sendMessage("Anti-Unsent is now disabled", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti-Unsent has turned off!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Unsent: Activate") && unsentGC.includes(event.threadID)){
                            unsentGC = threads.replace(event.threadID + " ", "")
                            api.sendMessage("Anti-Unsent is now activated in this conversation.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti-Unsent was activated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Unsent: Kill") && !unsentGC.includes(event.threadID)){
                            unsentGC += event.threadID + " "
                            api.sendMessage("Anti-Unsent is now deactivated in this conversation.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti-Unsent was deactivated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Unsent: On") && !unsentOn){
                            unsentOn = true
                            api.sendMessage("Anti-Unsent is now enabled.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti-Unsent has turned on!", vip[i])
                                }
                            }
                        }
           
                        else if (input.startsWith(prefix + "admin")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("Admin commands\n\nBot: Sleep\nBot: Wake up\nBot: Activate\nBot: Kill\nStatus\n\nUnsent: Off \nUnsent: On\nUnsent: Kill\nUnsent: Activate\n\n\n💠 Made By: John Paul Caigas", event.threadID, event.messageID);
                            
                            }
                            }
                    }
                    
/*================== UNSENT ENABLE & DISABLE COMMAND ==================*/                    
                        
           /*================== UNSENT ENABLE & DISABLE COMMAND ==================*/                    
   
                    if(onBot && !threads.includes(event.threadID)){
if(!f(input2)){
if (input.startsWith(prefix + "leech")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !leech yt_url", event.threadID);
                        } else {
                            api.sendMessage("🔃Trying to Download...", event.threadID, event.messageID);
                            try {
                                let s = leechmp3(data[1]);
                                s.then((response) => {
                                    if (response == "pakyo") {
                                        api.setMessageReaction("🖕🏾", event.messageID, (err) => {
                                        }, true);
                                        api.sendMessage("TANGINA MO PAKYOOO😠\nULOL 20mins Max Duration Only!😝", event.threadID, event.messageID);
                                    }
                                    else if (response == "err") {
                                        api.sendMessage("❌Invalid Input", event.threadID, event.messageID);
                                        api.setMessageReaction("😭", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else if (response == "tiktok") {
                                        api.sendMessage("❌Youtube Only, Bawal Tiktok!", event.threadID, event.messageID);
                                        api.setMessageReaction("😡", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else if (response[0] != undefined) {
                                        var file = fs.createWriteStream("song.mp3");
                                        var targetUrl = response[0];
                                        var gifRequest = http.get(targetUrl, function (gifResponse) {
                                            gifResponse.pipe(file);
                                            file.on('finish', function () {
                                                console.log('finished downloading..')
                                                api.sendMessage('✅Download Complete! Uploading...', event.threadID)
                                                var message = {
                                                    body: "😚Here's what ya ordered senpai!\n🎶Song Title: " + response[1] + "\n🎉Made by: John Paul Caigas\n🔏Credits to: Salvador",
                                                    attachment: fs.createReadStream(__dirname + '/song.mp3')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            });
                                        });
                                    }
                                });
                            } catch (err) {
                                api.sendMessage("⚠️Error: " + err.message, event.threadID);
                            }
                        }
                    }
                    else if (input.startsWith(prefix + "tiktokdl")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !tiktok vid_url", event.threadID);
                        } else {
                            api.sendMessage("🔃Trying to Download...", event.threadID, event.messageID);
                            try {
                                let s = leechTT(data[1]);
                                s.then((response) => {
                                    if (response == "err") {
                                        api.sendMessage("❌Invalid Input", event.threadID, event.messageID);
                                        api.setMessageReaction("😭", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else {
                                        var file = fs.createWriteStream("tiktok.mp4");
                                        var targetUrl = response;
                                        var gifRequest = http.get(targetUrl, function (gifResponse) {
                                            gifResponse.pipe(file);
                                            file.on('finish', function () {
                                                console.log('finished downloading..')
                                                api.sendMessage('✅Download Complete! Uploading...', event.threadID)
                                                var message = {
                                                    body: "😚Here's what ya ordered senpai!\n🎉Made by: John Paul Caigas\n🔏Credits to: Salvador",
                                                    attachment: fs.createReadStream(__dirname + '/tiktok.mp4')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            });
                                        });
                                    }
                                });
                            } catch (err) {
                                api.sendMessage("⚠️Error: " + err.message, event.threadID);
                            }
                        }
                    }
                    else if ((input.startsWith(prefix + "help")) && !bot.includes(event.senderID)){
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("🎉Commands List🎉\n--------------------------------------\n\nℹ️ " + prefix + "help\n\n▶️ " + prefix + "play (song_title) \n\n⬇️ " + prefix +"leech (yt_url)\n\n💃 " + prefix + "tiktokdl (tiktok_url)\n\n🤩 " + prefix + "motivation \n\n🔎 " + prefix + "wiki (word)\n\n🔎 " + prefix + "define (word)\n\n👥 " + prefix + "fbid\n\n⚙️ " + prefix + "admin\n\n🎖️ " + prefix + "animequote\n\n📖 "+ prefix + "bible \n\n🤖 " + prefix + "translate\n\n📦 " + prefix + "others\n\n\nNotes:\n\n*If your request is still on processing, plaese wait until it is finished before requesting a new one!\n\n*Please do not spam, be responsible when using this command to avoid getting blocked!\n\n*One request at a time only, let the Bot do its job!\n\nThank you for your understanding, have a good day🥰!\n\n\n💠 Made by: John Paul Caigas", event.threadID, event.messageID);                           
                            }
                            }
                            
         if((input2.includes("pogi") || 
input2.includes("gwapo") || input2.includes("ganda") || input2.includes("shawty") || input2.includes("beaut") || input2.includes("kawaii") || input2.includes("gunthe") || input2.includes("cute"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("YES PO, OPO? KUNG WALA KAYONG KAILANGAN SA MAGANDA/POGI/GWAPO HUWAG NYO PO AKONG IMENTION!😡😡😡", event.threadID, event.messageID);
                            }
                        })
}
if((input2.includes("morning") || input2.includes("umaga") || input2.includes("murning"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🌄", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Good Morning @${data[event.senderID].firstName}, Have a Great Day!❤️\n\n💠 Auto Greet by: PaulBotX`,
                            mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                            })
                        
                        }

                                
                                
                                
                               
                            
                            if((input2.includes("night") || input2.includes("nyt") || input2.includes("nayt") || input2.includes("gabi"))&& !bot.includes(event.senderID)){
                                              
                      api.setMessageReaction("😴", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Good Night @${data[event.senderID].firstName}, SleepWell!❤️\n\n💠 Auto Greet by: Paul BotX`, 
                                mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                            })
                        
                        }

                                
                                
                                
                            
                            if((input2.includes("afternoon") || input2.includes("hapon") || input2.includes("aftie"))&& !bot.includes(event.senderID)){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Good Afternoon @${data[event.senderID].firstName}, How's your day?\n\n💠 Auto Greet by: PaulBotX`,
                            mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                            })
                        
                        }

                                
                                
                                
                            
                         if((input2.includes("vivi") || 
input2.includes("bot"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("BAT MO PO AKO TINAWAG?! ALAM MO BA NA NAKAKAISTURBO KA SA NATUTULOG?! 😾😾", event.threadID, event.messageID);
                            }
                        })
}   
                            
                            if((input2.includes("panget") ||            input2.includes("ngetpa") ||            input2.includes("ngitpa") || input2.includes("pangit") || input2.includes("ugly") || input2.includes("kowai")) && !bot.includes(event.senderID)){
                           	   	let data = input;
                                           if (!vips.includes(event.senderID)){
                                           	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Mas panget po ang may pangalan na " + data[event.senderID]['name'] + "!😊😊"), event.threadID, event.messageID);
                            }
                        })
                        }
                       }
                     
             if(input2.includes("vilat")){
             	api.setMessageReaction("😾", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("mukha mo po vilat " + data[event.senderID]['name'] + "!😊😊", event.threadID, event.messageID);
                            }
                        })
}        
                            else if ((input.startsWith(prefix + "notes"))&& !bot.includes(event.senderID)){
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️ Notes:\n\n*If your request is still on processing, plaese wait until it is finished before requesting a new one!\n\n*Please do not spam, be responsible when using this command to avoid getting blocked!\n\n*One request at a time only, let the Bot do its job!\n\nChat me if you incounter a problem here:\nhttps://m.me/johnpaul.caigas001\n\nThank you for your understanding, have a good day🥰!\n\n\n💠 Made by: John Paul Caigas", event.threadID, event.messageID);
                            
                            }
                            }
                            else if ((input.startsWith(prefix + "others"))&& !bot.includes(event.senderID)){
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("🎉 Other Command Lists (Trash Commands!) 🎉\n\ngoodmorning\ngoodafternoon\ngoodnight\nganda\npogi\ngwapo\n\n⚠️ This commands is for entertainment purposes only. If you easier got offended please don't use this commands cuz it's not for you!\n\n⚠️ We removed *Hi* and *Hello* commands from this bot.", event.threadID, event.messageID);
                            
                            }
                            }
                            else if ((input.startsWith(prefix + "fbid"))&& !bot.includes(event.senderID)){
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                      api.sendMessage(("Your Facebook Id: " + event.senderID + "\n\n💠 By: John Paul Caigas"), event.threadID, event.messageID);
                            
                            }
                            }
                            if(input2.includes("haha") || input2.includes("lmao") || input2.includes("lol") || input2.includes("xd")){
					        	api.setMessageReaction("😆", event.messageID, (err) => {}, true)
					}
					if(input2.includes("kawawa") || input2.includes("sad") || input2.includes("agoi") || input2.includes("sakit") ||input2.includes("skit")){
					        	api.setMessageReaction("😢", event.messageID, (err) => {}, true)
					}
					
					else if (input.startsWith(prefix + "slap")) {
	api.setMessageReaction("👋", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                         api.sendMessage({
                                                body:"You got slapped by " + '@'+ data[event.senderID]['firstName'],
                                                attachment: fs.createReadStream(__dirname + '/slap.gif'),
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['firstName'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                        })
}


     
  else if (input.startsWith("test2")) {
	api.setMessageReaction("👋", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                            	
                         api.sendMessage({
                                                body:`You got slapped by @${data[event.senderID].firstName}`,
                                                attachment: fs.createReadStream(__dirname + '/slap.gif'),
                                                mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                        })
}

       /*==================================== GOOGLE TRANSLATE COMMAND ============================================*/
//Credits To: Javanny De Leon, John Roy Lapida       

else if (input.startsWith(prefix + "translate")) {
 
            let data = input.split(" ");
                        if (data.length < 2){
                            api.sendMessage("⚠️Invalid Command!\nUsage: !translate (word/phrase) to (language)",event.threadID);
                            return;
                        }
                       else {
                           try {
                               data.shift()
                               data = data.join(" ").split("to");
                               let from = data[0];
                               let to = data[1];
                                let response = await translate(from, to);
                                let translation = response.translation;
                                
                                console.log(response);

                                api.sendMessage(" 🔄Translating... \n\n"+ '"' +`${translation.source_text}`+'"\n' + "      ⇩⇩⇩ \n" + '"' +`${translation.target_language}` + '"\n',event.threadID)
                                
                                if(translation === undefined || Object.entries(translation).length === 0){
                                    throw new Error(`Failed to translate the phrase:\n '${from}'\n\n to: '${to}'.`, event.threadID, event.messageID)
                                }
                                let msg = `🔰Google Translate Result🔰\n\n`;
                                msg += `➮ From: ${translation.source_language.split(" ")[0]}:\n\n`;
                                msg += `"${translation.source_text}"\n\n`;
	                            msg += `➮ To: ${translation.target_language}:\n\n`;
	                            msg += `"${translation.target_text}"\n\n`;
	                            msg += `©: Google Translate API\n`;
                                msg += `©: @John Roy`;
                                api.getUserID("John Roy Lapida Calimlim", (err,data) =>{
                                let msgbody = {
                                    body: msg,
                                    mentions: [{
                                    tag: "@John Roy",
                                    id: data[0].userID
                                       }]
                                    };
                                api.sendMessage(msgbody, event.threadID,event.messageID)
                            })
                        }
                            catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }
                    }
                
                

        
     
     
     
                    else if (input.startsWith(prefix + "wiki")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !wiki word", event.threadID);
                        } else {
                            try {
                                data.shift()
                                var txtWiki = "";
                                let res = await getWiki(data.join(" "));
                                if(res === undefined){
                                    throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                if(res.title === undefined) {
                                  throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                txtWiki += `🔎You search the word ${res.title} \n\nTimeStamp: ${res.timestamp}\n\n💡Description: ${res.description}\n\n💡Info: ${res.extract}\n\nSource: https://en.wikipedia.org`
 
                                api.sendMessage(`${txtWiki}`, event.threadID, event.messageID);
                            }
                            catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }
                    }
                   

                    else if (input.startsWith(prefix + "play")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !play music_title", event.threadID);
                        } else {
                            if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                                }
                            }
                            api.sendMessage("🔎Searching...", event.threadID, event.messageID);
                            try {
                                data.shift();
                                await musicApi.initalize();
                                const musics = await musicApi.search(data.join(" ").replace(/[^\w\s]/gi, ''));
                                if (musics.content.length == 0) {
                                    throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} returned no result!`)
                                } else {
                                    if (musics.content[0].videoId === undefined) {
                                        throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} is not found on youtube music`)
                                    }
                                }
                                const url = `https://www.youtube.com/watch?v=${musics.content[0].videoId}`;
                                console.log(`connecting to yt`);
                                const strm = ytdl(url, {
                                    quality: "lowest"
                                });
                                const info = await ytdl.getInfo(url);
                                console.log(`converting`);
                                api.sendMessage('🔄Converting...', event.threadID,event.messageID)
                                ffmpegs(strm)
                                    .audioBitrate(96)
                                    .save(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                    .on("end", () => {
                                        console.log(`Playing ${data.join(" ").replace(/[^\w\s]/gi, '')}`);
                                        api.sendMessage({
                                            body: "😚Here's what ya ordered senpai!\n🎶Song Title: " + info.videoDetails.title + "\n🎉Made by: John Paul Caigas\n🔏Credits to: Salvador",
                                            attachment: fs.createReadStream(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                                .on("end", async () => {
                                                    if (fs.existsSync(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)) {
                                                        fs.unlink(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`, function (err) {
                                                            if (err) console.log(err);
                                                            console.log(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3 is deleted!`);
                                                        });
                                                    }
                                                })
                                        }, event.threadID, event.messageID);
                                    });

                            } catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }
          /*==================================== ANIMEQOUTE COMMAND ============================================*/
// CREDITS TO: SALVADOR, JOHN JEREMY ANTIGUO AND ROMEO



                    }
                    else if (input.startsWith(prefix + "animequote")) {
            axios.get('https://animechan.vercel.app/api/random')
              .then(response => {
                api.sendMessage("'" + response.data.quote + "'" + "\n\n~ " + response.data.character + " (" + response.data.anime + ")" + "\n\n💠 Made By: John Paul Caigas", event.threadID, event.messageID);
              })
              .catch(error => {
                api.sendMessage(error, event.threadID, event.messageID);
              });
          }
          /*==================================== BIBLE COMMAND ============================================*/
// credits to: Salvador, John Jeremy Antiguo and Romeo

          
                 else if (input.startsWith(prefix + "bible")) {
            axios.get("https://labs.bible.org/api/?passage=random&type=json")
              .then((response) => {
                //Get response data
                if (response.status == 200) {
                  api.sendMessage(response.data[0].bookname + " " + response.data[0].chapter + ":" + response.data[0].verse + "\n\n" + response.data[0].text + "\n\n💠 Made By: John Paul Caigas", event.threadID, event.messageID);
                  console.log(response.data[0].text);
                } else {
                  api.sendMessage("Error!", event.threadID, event.messageID);
                  console.log(error);
                }
              });
          }
          
          /*==================================== DICTIONARY COMMAND ============================================*/
// CREDITS TO: MASTER EARL

else if(input.startsWith(prefix + "define")){
                                    let data = input.split(" ");
                                    data.shift()
                                    let o = whatIs(data)
                                    let r = ""
                                    o.then((response) => {
                                        r = "You've searched the word \"" + response.word + "\"\n"
                                        if(response.phonetics[0].text != undefined){
                                            let p = response.phonetics
                                            r += p[0].text + "\n"
                                        }
                                        if(response.origin != undefined){
                                            r += response.origin + "\n"
                                        }
                                        if(response.meanings != undefined){
                                            let means = response.meanings
                                            for(let i = 0; i < means.length; i++){
                                                r += "Part of speech: " + means[i].partOfSpeech + "\n"
                                                for(let j = 0; j < means[i].definitions.length; j++){
                                                    let d = means[i].definitions[j]
                                                    if(d.definition != undefined){
                                                        r += "[" + (j + 1) + "] " + d.definition + "\n"
                                                        if(d.example != undefined){
                                                            r += "Example " + d.example + "\n\n"
                                                        }else{
                                                            r += "\n\n"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if(response.sourceUrls != undefined){
                                            r += "References:\n"
                                            let sauce = response.sourceUrls
                                            for(let i = 0; i < sauce.length; i++){
                                                r += sauce[i] + "\n"
                                            }
                                        }
                                        if(response.phonetics != undefined){
                                            let p = response.phonetics
                                            for(let i = 0; i < p.length; i++){
                                                if(p[i].audio.includes("https://")){//p[i].audio !== undefined || p[i].audio !== null || p[i].audio !== ""){
                                                    let f = fs.createWriteStream("whatis.mp3")
                                                    let g = http.get(p[i].audio, (rs) => {
                                                        rs.pipe(f)
                                                        f.on("finish", (err) => {
                                                            api.sendMessage({
                                                                    body: r,
                                                                attachment: fs.createReadStream(__dirname + "/whatis.mp3").on("end", async () => {
                                                                    if(fs.existsSync(__dirname + "/whatis.mp3")){
                                                                        fs.unlink(__dirname + "/whatis.mp3", (err) => {
                                                                            if(err){
                                                                                console.log(err)
                                                                            }else{
                                                                                console.log("Done")
                                                                            }
                                                                        })
                                                                        }
                                                                })
                                                                }, event.threadID, event.messageID)
                                                        })
                                                    })
                                                    break
                                                }else{
                                                    if(i >= p.length){
                                                        api.sendMessage(r, event.threadID, event.messageID)
                                                    }
                                                }
                                            }
                                        }else{
                                            api.sendMessage(r, event.threadID, event.messageID)
                                        }
                                    }).catch((err) => {
                                        api.sendMessage("Error! Code:404\nThe word you're trying to search was not found!", event.threadID, event.messageID)
                                        console.log("Error " + err)
                                    })
                                }

          
          
          
                    else if (input.startsWith(prefix + "motivation")) {
                        let rqt = qt();
                        rqt.then((response) => {
                            api.sendMessage(response.q + "\n- " + response.a, event.threadID, event.messageID);
                        })
                    }}}    
             }break;
            case "message_unsend":
            if(unsentOn && !unsentGC.includes(event.threadID)){
                if (!vips.includes(event.senderID)) {
                    let d = msgs[event.messageID];
                    if (typeof (d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                       else{ 
if (d[0] == "img") {
                                    var file = fs.createWriteStream("image.jpg");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading photo..')
                                            api.sendMessage({
                                                body:'@'+ data[event.senderID]['name'] + " unsent this Photo😶: \n",
                                                attachment: fs.createReadStream(__dirname + '/image.jpg'),
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID);
                                        });
                                    });
                                }
                                
                                
                                
                                                           // GIF unsent test
else if (d[0] == "gif") {
                                    var file = fs.createWriteStream("animated_image.gif");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading gif..')
                                            api.sendMessage({
                                                body:'@'+ data[event.senderID]['name'] + " unsent this GIF😶: \n",
                                                attachment: fs.createReadStream(__dirname + '/animated_image.gif'),
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID);
                                        });
                                    });
                                }
else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream("sticker.png");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading gif..')
                                            api.sendMessage({
                                                body:'@'+ data[event.senderID]['name'] + " unsent this Sticker😶: \n",
                                                attachment: fs.createReadStream(__dirname + '/sticker.png'),
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID);
                                        });
                                    });
                                }
                                else if (d[0] == "vid") {
                                    var file = fs.createWriteStream("video.mp4");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading video..')
                                            api.sendMessage({
                                                body:'@'+ data[event.senderID]['name'] + " unsent this Video😶: \n",
                                                attachment: fs.createReadStream(__dirname + '/video.mp4'),
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID);
                                        });
                                    });
                                }
     
                                
                                else if (d[0] == "vm") {
                                    var file = fs.createWriteStream("vm.mp3");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading audio..')
                                            api.sendMessage({
                                                body:'@'+ data[event.senderID]['name'] + " unsent this Audio😶: \n",
                                                attachment: fs.createReadStream(__dirname + '/vm.mp3'),
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID);
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                                api.sendMessage({
                                                body:'@'+ data[event.senderID]['name'] + " unsent this message😶: \n" + msgs[event.messageID] + "\n\nAnti Unsent By PaulBotX",
                                                mentions: [{
                                                    tag: '@'+data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID);
                            }
                            
                        });
                    }
                    }
                    
                    break;
                }
                }
                
    });
});

function f(p) {
	let g = [
		"tanga",
		"bobo",
		"ulol",
		"olol",
		"ulul",
		"olul",
		"taena",
		"tangina",
		"kwak",
		"gago",
		"gagu",
		"gaga",
		"pekora",
		"ungol",
		"lofi",
		"amogus",
		"hell",
		"devil",
		"demon",
		"iyot",
		"kreng",
		"wreng",
		"kulangot"
	
		
	]
	for(let i = 0; i < g.length; i++){
	   if(p.includes(g[i])){
			return true
			break
		}
    }
	return false
}

// This Bot was mad by John Paul Caigas and Our Bot Team, Please give some credits befor you use!
