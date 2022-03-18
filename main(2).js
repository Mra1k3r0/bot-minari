
//////////////////////////////////////////////////////
//================== AUTO RESTART ==================//
/////////////////////////////////////////////////////

const timerestart = 120   //in minutes
const google = require('googlethis');
const sharp = require("sharp");
const request = require("node-superfetch");(async () => {
  //...
})()
//const DIG = require("discord-image-generation");
//const Discord = require('discord.js');
// const request = ("request");


const fs = require('fs-extra');
const { keep_alive } = require("./keep_alive.js");
const http = require('https'); // or 'https' for https:// URLs
//const login = require("fca-unofficial");
//const login = require("fca-fortesting-unofficial");
const login = require("helyt");
//const login = require("fca-horizon-remake");
const axios = require("axios");
const YoutubeMusicApi = require('youtube-music-api')
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const ffmpegs = require('fluent-ffmpeg');
ffmpegs.setFfmpegPath(ffmpeg.path);
const musicApi = new YoutubeMusicApi()
// GLOBAL MESSAGE STORAGE
let msgs = {};
let vips = ['100007909449910','100046351269353','100071918311154','100002833444192','100077642405600','100059562017368','100068762056618','100056442565207','100057685300979','100074826541004','100075857646105', '100077588247522'];
let vip = ['100046351269353', '100077588247522']
let bot = ['100078003790746', '100077808525745', '100078297275425', '100078525727498', '100078225894635', '100078591791882', '100078347222408', '100078444408815', '1548885638828933', '100078225576947', '100078444408815', '100011343529559', '100078347222408', '100079131647334', '100078025585414', '100078793935158', '100077457145389', '100078536035278', '100078536035278', '100078682536617']
let admin = ['']
let cd = {};
let cd01 = {};
let cd02 = {};
let cd03 = {};
let cd04 = {};
let threads = ""
let onBot = true 
let unsentOn = true
let unsentGC = ""
let users = ""
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


/*==================================== FACT FUNC ===========================================*/
async function addTextOnImage(t) {
	try {
		let img = await sharp("pic1.png").metadata();
		const width = img.width;
		const height = img.height;
		const text = t;

		const svgImage = `
		<svg width="${width}" height="${height}">
		<style>
		.title { fill: #000; font-size: 20px; font-family: Tahoma;}
		</style>
		<text x="30%" y="60%" text-anchor="middle" class="title" transform="translate(100,100) rotate(15)" text-align="justify" text-justify="inter-word">${text}</text>
		</svg>
		`;
		const svgBuffer = Buffer.from(svgImage);
		const image = await sharp(svgBuffer).toFile(`${t}_txt.png`);
		await sharp("pic1.png")
			.composite([{
				input: `${t}_txt.png`,
				top: 50,
				left: 50,
			}, ])
			.toFile(`${t}_output.png`);
		return true

	} catch (error) {
		console.log(error.message);
		return false
	}
}
/*==================================== FACT FUNC ===========================================*/
async function saikiiWrap(ctx, text, maxWidth) {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
} 



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

login({ appState: JSON.parse(process.env['FBSTATE'] )}, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true, selfListen: false });
    const listenEmitter = api.listenMqtt(async (err, event) => {
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

if (input.startsWith(prefix + "unsent")){
let datas = input.split(" ");
                 if(datas.length < 2){
                   
                      if (!vip.includes(event.senderID)){
                            api.sendMessage(`⚠️YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!`, event.threadID, event.messageID);
   }else{
                     //api.sendMessage(message.body, message.threadID, (err, messageInfo) => {
                if(err) return console.error(err);
                      
                api.unsendMessage(event.messageReply.messageID)
       //               })                               
                 }
}

}

          /*==================================== SIMSIMI COMMANDS & API ============================================*/
//Credits To: Javanny De Leon                 
       else if (input.startsWith("minari")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("⚠️Invalid Use Of  Command!\n💡Usage: minari<space>say_something", event.threadID);
            } else {
                try {
                    data.shift()
                    let txt = data.join(" ");
                axios.get('https://api-sv2.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=Minari')
                        .then(response => {
api.sendMessage(response.data['success'], event.threadID, event.messageID);
                        })
                } catch (err) {
                    api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                    }
                }
            }        


        
                

       
if(input.startsWith(prefix + "stalk")){
                        api.getUserInfo(parseInt(event.messageReply.senderID), (err, data) => {
                            if(err){
                                console.log(err)

                   }else{
let gender = ""
                switch(data[event.messageReply.senderID]['gender']){
                case 1:
                   gender = "Female"
                break
                case 2:
                   gender = "Male"
                break
                default:
                   gender = "Custom"
            }         
let type = ""
switch(data[event.messageReply.senderID]['type']){
}
    let vanity = ""
    switch(data[event.messageReply.senderID]['vanity']){
    }
        let alternativeName = ""
        switch(data[event.messageReply.senderID]['alternativeName']){
        }
            let userID = ""
            switch(data[event.messageReply.senderID]['userID']){
            }

                
                                let message = "Name: " + data[event.messageReply.senderID]['name'] + "\n"
                                message += "Gender: " + gender + "\n"

                                message += "Nickname: " + data[event.messageReply.senderID]['alternativeName'] + "\n"

                                message += "Type: " + data[event.messageReply.senderID]['type'] + "\n"

                                message += "Username: " + data[event.messageReply.senderID]['vanity'] + "\n"

                                message += "ID: " + data[event.messageReply.senderID]['userID'] + "\n"

                                message += "Profile Link: " + data[event.messageReply.senderID]['profileUrl']
                                let f = fs.createWriteStream("dp.png")
                                
                                //let g = http.get(data[event.messageReply.senderID]['thumbSrc'], (r) => {
                
   
                                   let gifRequest = http.get(data[event.messageReply.senderID]['thumbSrc'], function 
 (gifResponse){
                                                                        
                                                                //      (gifResponse) => {

      gifResponse.pipe(f);                                       
        f.on('finish', function () {
                           
                           console.log('GIF Downloading!')
  //  r.pipe(f
                                   // f.on("finish", () => {
                                        api.sendMessage({
                                            body: message,
                                            attachment: fs.createReadStream(__dirname + "/dp.png").on("end", async() => {
                                                if(fs.existsSync(__dirname + "/dp.png")){
                                                    fs.unlink(__dirname + "/dp.png", (err) => {console.log(err)})
                                                }
                                            })
                                        }, event.threadID, event.messageID)
                                    })
                                                            
                                })
                            }
                        
                        })
                    }

                
            
     
            
   if (input.startsWith(("hi") || input.startsWith("hello") || input.startsWith("yo!") || input.startsWith("hallo") || input.startsWith("hola") || input.startsWith("helo")) && !bot.includes(event.senderID)) {
	api.setMessageReaction("👋", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                            	
                         api.sendMessage({
                                                body:`Hi, @${data[event.senderID].firstName}. how are you?`,
                                                attachment: fs.createReadStream(__dirname + '/hi-hello.gif'),
                                                mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                        })
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
if (input.startsWith(prefix + "changephoto") && !bot.includes(event.senderID)){
    if (event.type !== "message_reply") return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`Please reply only 1 photo!`, event.threadID, event.messageID);
	var abc = event.messageReply.attachments[0].url
	let pathImg = __dirname + '/loz.png';
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(pathImg, Buffer.from(getdata, 'utf-8'));
    return api.changeGroupImage(fs.createReadStream(__dirname + '/loz.png'), event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
    }

                                
if((input2.includes("love") || 
input2.includes("mahal") || input2.includes("lab"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🤮", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Iww, yuck, kadirdir!! nainlove sa bot wala sigurong nagkakagusto sau🤢🤮", event.threadID, event.messageID);
                            }
                        })
}

if((input2.includes("kain") || 
input2.includes("eat") || input2.includes("kaim"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🍜", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Eatwell pi, @${data[event.senderID].firstName} pakabusog ka ha! usap pa tayo mamaya☺️🥰\n\n💠 Auto Reply by: PaulBotX`,
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
                                               if(input2.includes("haha") || input2.includes("lmao") || input2.includes("lol") || input2.includes("😂") || input2.includes("😹") || input2.includes("🤣") || input2.includes("😆") || input2.includes("😄") || input2.includes("😅") || input2.includes("xd")){
					        	api.setMessageReaction("😆", event.messageID, (err) => {}, true)
					}
					if(input2.includes("kawawa") || input2.includes("sad") || input2.includes("agoi") || input2.includes("sakit") ||input2.includes("skit")){
					        	api.setMessageReaction("😢", event.messageID, (err) => {}, true)
					}
					
					if((input2.includes("pagasa") || 
input2.includes("aasa"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🙁", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("mag move-on kana lods, wag kanang umasa na babalikan kapa niya. just accept the fact na wala na syang gusto sayo😕", event.threadID, event.messageID);
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
           
                        if (input.startsWith(prefix + "admin")) {                                                         
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
                     

                        else if ((input.startsWith(prefix + "help") || input.startsWith(prefix + "hslp")) && !bot.includes(event.senderID)){

                        let data = input.split(" ");             
        data.shift()
    
       // if (data.length < 2) {
 if (!data[0]) return    axios.get('https://www.quotepub.com/api/widget/?type=qotd_t') .then(response => {                
    var message = {
                              body: "🎉COMMANDS LIST🎉\n--------------------------------------\n\n🏷️" + prefix + "play<space>music_title\n~Play any music you want from YT using title\n\n🏷️" + prefix + "request<space> song_tittle\n~This command are for VIP user only!\n\n🏷️" + prefix +"leech<space>youtube_url\n~Download Music from YT using Link\n\n🏷️" + prefix + "tiktokdl<space>tiktok_url\n~Download any Video you like from Tiktok\n\n🏷️" + prefix + "motivation\n~This command uses for random motivation message\n\n🏷️" + prefix + "wiki<space> word\n~Information of the word you're looking for\n\n🏷️" + prefix + "define<space>(word)\n~Defination of the word you're looking for\n\n🏷️" + prefix + "fbid<space>user/id/link\n~Use for generating someone's facebook id\n\n??️" + prefix + "admin\n~This command are for Admin Only!\n\n🏷️" + prefix + "aniquote\n~Generates random quotes from your favorite anime\n\n🏷️"+ prefix + "bible\n~It will generates random bible verse\n\n🏷️" + prefix + "translate<space>word/phrase to<space>language\n~Transalate the word/phrase you've entered\n\n🏷️" + prefix + "fact<space>word/phrase\n~An Image that contain a text inside\n\n🏷️" + prefix + "say<space>language<space>word/text/phrase\n~Generates a TTS of your word\n\n🏷️" + prefix + "stalk\n~This command are for generating someones info from Facebook\n\n🏷️" + prefix + "meme\n~It will give you random memes from reddit\n\n🏷️" + prefix + "anime\n~This command are for anime gif's\n\n🏷️" + prefix + `holo<space>gura/rushia/pekora/coco/marine\n~Generates random Hololive Photos\n\n\nPage (1/2)\n\n💉Execute"` + prefix + `help page2" if you want to go to the next page! \n\nQuotes Of the Day:\n${response.data.quote_body}\n\nMade by: John Paul Caigas`, 
                              
    }
api.sendMessage(message, event.threadID, event.messageID);

        
        }) 
       else 
            if (data[0] == "page2") {
	//try {
	var page2 = data[1];
  if (!page2) return api.sendMessage("🎉COMMANDS LIST PAGE 2🎉\n-----------------------------------------------\n\n🏷️" + prefix + "ip<space>ip_adress\n~Find information of any IP address\n\n🏷️" + prefix + "lyric<space> song_tittle\n~This command generates the lyrics of the song\n\n🏷️" + prefix +"setname<space>nickname<tag/mention user>\n~Command for changing your nickname\n\n🏷️" + prefix + "setemoji<space>emoji\n~Command for changing emoji from your GC\n\n🏷️" + prefix + "changeimage\n~Command for changing GC profiles\n\n🏷️" + prefix + "groupname<space>name\n~Change groups name\n\n🏷️" + prefix + "kick<space>tag user\n~This command are for kicking members out of GC, it'll only work if the bot are admin\n\n🏷️" + prefix + "trump<space>text/word/phrase\n~Generates Image of trump on twitter post\n\n🏷️" + prefix + "drake<space>Text|Text\n~Generates Drake Meme with text\n\n🏷️" + prefix + "zuck<space>text/word/phrase\n~Generates Image Text with Mark Zuckerberg\n\n🏷️"+ prefix + "simpson<space>text/word/phrase\n~It well send simpson image with text \n\n🏷️" + prefix + "tif<space>text/word/phrase\n~Generates Image Text\n\n🏷️" + prefix + "ping\n~Pings Everyone on Your GC\n\n🏷️" + prefix + "setall<space>name\n~Set all group members nicknames\n\n🏷️" + prefix + "groups\n~Lists of group chats manage by this bot\n\n🏷️" + prefix + `others\n~This command are for others nothing special to it\n\nPage (2/2)\n\n💉Execute "` + prefix + `help" if you want to go back from the first page!\n\nMade by: John Paul Caigas`,event.threadID,event.messageID);
    
  //  }

    }

                        }       else if ((input.startsWith(prefix + "kick")) && !bot.includes(event.senderID)){          let data = input.split(" ");
 data.shift()
   // let name = data.join(" ");       
      var mention = Object.keys(event.mentions);
	return api.getThreadInfo(event.threadID, (err, info) => {
		if (err) return api.sendMessage("An error has occurred!",event.threadID);
		if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('Need group admin rights\nPlease add and try again!', event.threadID, event.messageID);
		if(!mention[0]) return api.sendMessage("You must tag the person to kick",event.threadID);
		if (info.adminIDs.some(item => item.id == event.senderID)) {
			for (let o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	})
                              }                  
                      
                            
    else if ((input.startsWith(prefix + "groups")) && !bot.includes(event.senderID)){
        const DateAndTime = new Date().toLocaleString('en-US', {

         timeZone: 'Asia/Manila'
 });        
var num = 0, box = `GROUPS MANAGE BY BOT\nAs of ${DateAndTime}\n\n`;
	api.getThreadList(100, null, ["INBOX"], (err, list) => {
		list.forEach(info => {
			if (info.isGroup && info.isSubscribed) {
		box += `${num+=1}. ${info.name} \nGroup ID: ${info.threadID}\n`;
			}			
		})
		return api.sendMessage(box, event.threadID, event.messageID);
	})
}
                        
else if ((input.startsWith(prefix + "setname")) && !bot.includes(event.senderID)){
    let data = input.split(" ");
 data.shift()
    let name = data.join(" ");   
	const mention = Object.keys(event.mentions)[0];
	if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
	if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
}

    else if ((input.startsWith(prefix + "setemoji")) && !bot.includes(event.senderID)){
    let data = input.split(" ");
 data.shift()
    let emoji = data.join(" ");
	if (!emoji) api.sendMessage("You have not entered Emoji 🙃", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`✅ The bot successfully changed Emoji to: ${emoji}`, event.threadID, event.messageID));
}
    else if ((input.startsWith(prefix + "groupname")) && !bot.includes(event.senderID)){
    let data = input.split(" ");
 data.shift()
    let name = data.join(" ");
   if (!name) api.sendMessage("❌ You have not entered the group name you want to change", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`✅ The bot changed the group name to: ${name}`, event.threadID, event.messageID));
            } 
    else if ((input.startsWith(prefix + "fbid")) && !bot.includes(event.senderID)){
    let data = input.split(" ");
 data.shift()
    var {mentions, senderID, threadID, messageID} = event;
if (Object.keys(mentions) == 0) return api.sendMessage(`Your ID Are:\n${senderID}`, threadID, messageID);
	else {
		for (var i = 0; i < Object.keys(mentions).length; i++) api.sendMessage(`${Object.values(mentions)[i].replace('@', '')}'s ID:\n${Object.keys(mentions)[i]}\n\nMade by: John Paul Caigas`, threadID);
		return;
	}
     }
        
    else if ((input.startsWith(prefix + "setall")) && !bot.includes(event.senderID)){
        let data = input.split(" ");
 data.shift()
var threadInfo = await api.getThreadInfo(event.threadID)
    var idtv = threadInfo.participantIDs
 console.log(threadInfo)
 let name = data.join(" ");
 function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    for(let setname of idtv) {
 await delay(3000)
 api.changeNickname(`${name}`, event.threadID, setname);
    }
        }
else if ((input.startsWith(prefix + "ping")) && !bot.includes(event.senderID)){
            let data = input.split(" ");
 data.shift()
    if (!(vip.includes(event.senderID))) {
                                if (!(event.senderID in cd01)) {
                                    cd01[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 2);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd01[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd01[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd01[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);       
api.setMessageReaction("🕦", event.messageID, (err) => {}, true);                             return
                                }                               else {
                                    cd01[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 2);
                                }
      
                                                             }
      
                                                       
	try {
		var all = (await api.getThreadInfo(event.threadID)).participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
	  all.splice(all.indexOf(event.senderID), 1);
		var body = (data.length != 0) ? data.join(" ") : "Admin mentioned you ", mentions = [], index = 0;
		
    for (let i = 0; i < all.length; i++) {
		    if (i == body.length) body += body.charAt(body.length - 1);
		    mentions.push({
		  	  tag: body[i],
		  	  id: all[i],
		  	  fromIndex: i - 1
		    });
	    }
		return api.sendMessage({ body: `‎${body}`, mentions }, event.threadID, event.messageID);
	}
	catch (e) { return console.log(e); }
        }
        
        else if ((input.startsWith(prefix + "trigger")) && !bot.includes(event.senderID)){
    
    let data = input.split(" ");
 data.shift()
  const DIG = require("discord-image-generation");
  const Discord = require('discord.js');
  const request = require('node-superfetch');
  const fs = require("fs-extra");
  var id = Object.keys(event.mentions)[0] || event.senderID;
  var avatar = (await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  let img = await new DIG.Triggered().getImage(avatar);
  let attach = new Discord.MessageAttachment(img);
  var path_trigger = __dirname + "/trigger.gif";
  fs.writeFileSync(path_trigger, attach.attachment);
  api.sendMessage({attachment: fs.createReadStream(path_trigger)}, event.threadID, () => fs.unlinkSync(path_trigger), event.messageID);
}
        
        
else if ((input.startsWith(prefix + "trump")) && !bot.includes(event.senderID)){
    
    let data = input.split(" ");
 data.shift()

let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
  let pathImg = __dirname + '/trump.png';
	let text = data.join(" ");
	if (!text) return api.sendMessage("Enter the content of the comment on the board", threadID, messageID);
	let getPorn = (await axios.get(`https://i.imgur.com/ZtWfHHx.png`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "400 45px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "start";
	let fontSize = 250;
	while (ctx.measureText(text).width > 2600) {
		fontSize--;
		ctx.font = `400 ${fontSize}px Arial, sans-serif`;
	}
	const lines = await saikiiWrap(ctx, text, 1160);
	ctx.fillText(lines.join('\n'), 60,165);//comment
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
        }                                                             else if ((input.startsWith(prefix + "zuck")) && !bot.includes(event.senderID)){
    
    let data = input.split(" ");
 data.shift()
    
let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
	//const fs = global.nodemodule["fs-extra"];
	//const axios = global.nodemodule["axios"];
	let pathImg = __dirname + '/zuck.png';
	let text = data.join(" ");
	if (!text) return api.sendMessage("Enter the content of the comment on the board", threadID, messageID);
	let getPorn = (await axios.get(`https://i.postimg.cc/gJCXgKv4/zucc.jpg`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "400 18px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "start";
	let fontSize = 50;
	while (ctx.measureText(text).width > 1200) {
		fontSize--;
		ctx.font = `400 ${fontSize}px Arial`;
	}
	const lines = await saikiiWrap(ctx, text, 470);
	ctx.fillText(lines.join('\n'), 15,75);//comment
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
    }
else if ((input.startsWith(prefix + "fbavt")) && !bot.includes(event.senderID)){
    const request = require("request");
const fs = require("fs")
const axios = require("axios")
    let data = input.split(" ");
 data.shift()
if (!data[0]) return api.sendMessage(`» » » FB-AVATAR « « «\n\n${prefix}fbavt id [id to get] <get photo by person uid>\n\n${prefix}fbavt link [link to get] <get by that person's link>\n\n${prefix}fbavt user <Leave it blank to get the user's own avatar>\n\n${prefix}fbavt user [@mentions] <get avatars of people tagged>`,event.threadID,event.messageID);
else if (data[0] == "id") {
	try {
	var id = data[1];
  if (!id) return api.sendMessage(`Please enter the uid to get avatar.`,event.threadID,event.messageID);
   var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/1.png"),event.messageID);   
   return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname +'/1.png')).on('close',() => callback());
 }
 catch (e) {
 	api.sendMessage(`Can't get user photo.`,event.threadID,event.messageID);
 }
}
else if (data[0] == "link") {
var link = data[1];
if (!link) return api.sendMessage(`Please enter the link to get avatar.`,event.threadID,event.messageID);
var tool = require("fb-tools");
try {
var id = await tool.findUid(data[1] || event.messageReply.body);
var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/1.png"),event.messageID);   
return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/1.png')).on('close',() => callback());
}
catch(e){
    api.sendMessage("User does not exist.",event.threadID,event.messageID)
}
}
else if(data[0] == "user") {
	if (!data[1]) {
		var id = event.senderID;
		var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/1.png"),event.messageID);   
    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/1.png')).on('close',() => callback());
	}
	else if (data.join().indexOf('@') !== -1) {
		var mentions = Object.keys(event.mentions)
		var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/1.png"),event.messageID);   
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/1.png')).on('close',() => callback());
	}
	else {
		api.sendMessage("Wrong order. Take note `!fbavt` to view module commands.",event.threadID,event.messageID);
	}
}
else {
	api.sendMessage("Wrong order. Take note `!fbbavt` to view module commands.",event.threadID,event.messageID);
}
}

else if ((input.startsWith(prefix + "drake")) && !bot.includes(event.senderID)){
    
    let data = input.split(" ");
 data.shift()
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const Canvas = require("canvas");
  const request = require('request');
 // const fs = global.nodemodule["fs-extra"];
//  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + `/drake.png`;
  const text = data.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
  let getImage = (
    await axios.get(encodeURI(`https://i.imgur.com/qmkwLUx.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getImage, "utf-8"));
if(!fs.existsSync(__dirname+'/SVN-Arial 2.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=11YxymRp0y3Jle5cFBmLzwU89XNqHIZux&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/SVN-Arial 2.ttf", Buffer.from(getfont, "utf-8"));
    };
  let baseImage = await loadImage(pathImg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  Canvas.registerFont(__dirname+`/SVN-Arial 2.ttf`, {
        family: "SVN-Arial 2"
    });
  ctx.font = "30px SVN-Arial 2";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  const line = await saikiiWrap(ctx, text[0], 464);
  const lines = await saikiiWrap(ctx, text[1], 464);
  ctx.fillText(line.join("\n"), 464, 129)
  ctx.fillText(lines.join("\n"), 464, 339)
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
}

else if ((input.startsWith(prefix + "simpson")) && !bot.includes(event.senderID)){
    
    let data = input.split(" ");
 data.shift()
  let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
	
	let pathImg = __dirname + '/simpson.png';
	var text = data.join(" ");
  if (event.type == "message_reply") {
        text = event.messageReply.body}
	if (!text) return api.sendMessage("Enter what you want to write !", threadID, messageID);
	let getPorn = (await axios.get(`https://i.postimg.cc/sxSkfXks/meme1.jpg`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "400 30px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "start";
	let fontSize = 20;
	while (ctx.measureText(text).width > 2000) {
		fontSize--;
		ctx.font = `400 ${fontSize}px Arial, Regular`;
	}
	const lines = await saikiiWrap(ctx, text, 450);
	ctx.fillText(lines.join('\n'), 120, 100);//comment
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
    }
           else if ((input.startsWith(prefix + "tif")) && !bot.includes(event.senderID)){
    
    let data = input.split(" ");
 data.shift()
    
let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
	//const fs = global.nodemodule["fs-extra"];
	//const axios = global.nodemodule["axios"];
	let pathImg = __dirname + `/ani.png`;
	let text = data.join(" ");
	if (!text) return api.sendMessage("Enter the content of the comment on the board", threadID, messageID);
	let getSaikii = (await axios.get(`https://i.imgur.com/oiGmEVV.jpeg`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(pathImg, Buffer.from(getSaikii, 'utf-8'));
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "680 30px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	let fontSize = 45;
	while (ctx.measureText(text).width > 1000) {
		fontSize--;
		ctx.font = `300 ${fontSize}px Arial, sans-serif`;
	}
	const lines = await saikiiWrap(ctx, text, 337);
	ctx.fillText(lines.join('\n'), 244,326);//comment
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
        }                          
     
                            
    if (input.startsWith(prefix + "lyric")) {
            let data = input.split(" ");
        //    if (data.length < 2) {
                //api.sendMessage("⚠️Invalid Use Of  Command!\n💡Usage: minari<space>say_something", event.threadID);
          //  } else {
         //       try {                                
data.shift()
    let title = data.join(" ");       axios.get('https://hermes-music.jersoncarin.dev/search?q=' + title)
                  .then(response => {
              //    	var mention =  bject.keys(event.mentions)[0];

                           var message = {
                              body: "" + response.data.lyrics + "", 
        
                              //attachment: fs.createReadStream(__dirname + '/memes.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        //});
             //        });
                  })
                  .catch(error => {
                     api.sendMessage("Can't find Lyrics!", event.threadID, event.messageID);
                      
                  })                      
                                
                        
                                }
                                
                                if (input.startsWith(prefix + "ip")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("⚠️Invalid Use Of  Command!\n💡Usage: !ip<space>ipaddress", event.threadID);
            } else {
                
                                    var timeStart = Date.now();                 if (!(vip.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
            }
data.shift()
    let text = data.join(" ");       axios.get('http://ip-api.com/json/' + text + '?fields=66846719')
                  .then(response => {

              //    	var mention =  bject.keys(event.mentions)[0];

                      
                           var message = { 
                               
                               body:`----------->${(Date.now()) - timeStart}ms<-----------
Continent: ${response.data.continent} 
Nation: ${response.data.country}
Country Code: ${response.data.countryCode}
Area: ${response.data.region}
Region/State: ${response.data.regionName}
City: ${response.data.city}
District: ${response.data.district}
ZIP code: ${response.data.zip}
Latitude: ${response.data.lat}
Longitude: ${response.data.lon}
Timezone: ${response.data.timezone}
Organization Name: ${response.data.org}
Currency unit: ${response.data.currency}`,
                               
     location: {
				latitude: response.data.lat,
				longitude: response.data.lon,
				current: true
			}   
                              //attachment: fs.createReadStream(__dirname + '/memes.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                        
api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        //});
             //        });
                  })
                  .catch(error => {
                     api.sendMessage(`Error! An error occurred. Please try again later: ${response.data.message}`, event.threadID, event.messageID);
                      
                  })                      
                                
                        
                                }
                                }    
                            

                            
                if (input.startsWith(prefix + "covid")) {
            let data = input.split(" ");
           if (data.length < 2) {
                api.sendMessage("⚠️Invalid Use Of  Command!\n💡Usage: !covid<space>country", event.threadID);
            } else {
       //         try {        
const DateAndTime = new Date().toLocaleString('en-US', {

         timeZone: 'Asia/Manila'
 });                            
         if (!(vip.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
}
data.shift()
    let location = data.join(" ");       axios.get('https://disease.sh/v3/covid-19/countries/' + location)
                  .then(response => {
      var cases = response.data.cases,
        death = response.data.deaths,
        recovered = response.data.recovered,
        tests = response.data.tests
        population = response.data.population,
        continent = response.data.continent,
        todayD = response.data.todayDeaths,
        todayR = response.data.todayRecovered,
        todayC = response.data.todayCases,
        critical = response.data.critical,
        active = response.data.active
                          var file = fs.createWriteStream("test.png");
                    var targetUrl = response.data.countryInfo.flag;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('Flag Downloading!')                     
                               var message = {
                              body:`COVID UPDATE\n\nCountry: ${response.data.country}\n` + `Cases: ${cases}\n` + `Died: ${death}\n` + `Recovered: ${recovered}\n` + `Critical: ${critical}\n` + `Tests: ${tests}\n` + `Active: ${active}\n` + `Today Deaths: ${todayD}\n` + `Today Recovered: ${todayR}\n` + `Today Cases: ${todayC}\n` + `Population: ${population}\n` + `Continents: ${continent}\n\n` + `${DateAndTime}\n`, 
                              attachment: fs.createReadStream(__dirname + '/test.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                    });
                  })
                  .catch(error => {
                     api.sendMessage("Country not found or doesn't have any cases", event.threadID, event.messageID);
                      
                  })                      
           }                       }            
                        
                                    if (input.startsWith(prefix + "holo")) {
       let data = input.split(" ");                                 if (data.length < 2) {
                api.sendMessage("⚠️Invalid Use Of  Command!\n💡Usage: !holo<space>gura/marine/rushia/pekora/coco", event.threadID);
            } else {

if (!(vip.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
}
        
data.shift()
    let name = data.join(" ");
    axios.get('https://img-hololive-api.up.railway.app/' + name)
                  .then(response => {
               //       var count = response.data.count;
                    //  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      //           	var mention =  bject.keys(event.mentions)[0];
var file = fs.createWriteStream(`${name}.png`);
                     var targetUrl = response.data.url;
                                             
  
                    
                   var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log(`${name}.png Downloading!`)
                           var message = {
                              body:`Name: ${name}\nAuthor: ` + response.data.author + ``, 
        
                              attachment: fs.createReadStream(__dirname + `/${name}.png`)
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                    });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate image", event.threadID, event.messageID);
                      
                  })                      
} 
                                    }
                        
        
             
                                                                                        
                            if (input.startsWith(prefix + "joke")) {
            let data = input.split(" ");                 
data.shift()
    let category = data.join(" ");
    axios.get('http://api.icndb.com/jokes/random?')
                  .then(response => {
           //       	var mention =  bject.keys(event.mentions)[0];
     //               var file = fs.createWriteStream("memes.png");
         //            var targetUrl = response.data.url;
       //              var gifRequest = http.get(targetUrl, function (gifResponse) {
                        //gifResponse.pipe(file);
                        //file.on('finish', function () {
                           //console.log('Memes Downloading!')
                           var message = {
                              body:  "" + response.data.value + "\n" + response.data.joke + "", 
        
                              //attachment: fs.createReadStream(__dirname + '/memes.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        //});
             //        });
                  })
                  .catch(error => {
                     api.sendMessage("\x46\x61\x69\x6c\x65\x64 \x74\x6f \x67\x65\x6e\x65\x72\x61\x74\x65 \x4d\x65\x6d\x65\x73\x21", event.threadID, event.messageID);
                      
                  })                      
                                
                        
        }
            
                            

           
            
                
                
                            else if ((input.startsWith(prefix  + "anime")) && !bot.includes(event.senderID)){
 
                        
   api.sendMessage("**Anime Cmds**\n\nhug, kiss, slap, pat, soon...", event.threadID, event.messageID);                           
                        
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
if((input2.includes("love") || 
input2.includes("mahal") || input2.includes("lab"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🤮", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Iww, yuck, kadirdir!! nainlove sa bot wala sigurong nagkakagusto sau🤢🤮", event.threadID, event.messageID);
                            }
                        })
}

if((input2.includes("kain") || 
input2.includes("eat") || input2.includes("kaim"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🍜", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage({
body: `Eatwell pi, @${data[event.senderID].firstName} pakabusog ka ha! usap pa tayo mamaya☺️🥰\n\n💠 Auto Reply by: PaulBotX`,
                            mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);
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
else if ((input.startsWith(prefix + "meme") || input.startsWith(prefix + "msme")) && !bot.includes(event.senderID)){
           
                            if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                            }
                          
          axios.get('https://meme-api.herokuapp.com/gimme/memes')
                  .then(response => {
                  	var mention = Object.keys(event.mentions)[0];
                     var file = fs.createWriteStream("memes.png");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('Memes Downloading!')
                           
                           
                            var message = {
                              body: response.data.title + "\n\nAuthor: " + response.data.author,
                              attachment: fs.createReadStream(__dirname + `/memes.png`)
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate Memes!", event.threadID, event.messageID);
                  })                      
                        }        
                        
                         if ((input.startsWith(prefix + "pat")) && !bot.includes(event.senderID)){
           
       if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd01)) {
                                    cd01[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd01[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd01[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd01[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd01[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                            }
                          
                     
          axios.get('https://RandomLinkAPI-1.ekekevan.repl.co/pat')
                  .then(response => {
                  	var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");
                     var file = fs.createWriteStream("pat.gif");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('GIF Downloading!')
                           var message = {
                              body: "Pats, " + tag + ". Goodgirl!!☺️",
                              
                              mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
                              attachment: fs.createReadStream(__dirname + '/pat.gif')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate gif, be sure that you've tag someone!", event.threadID, event.messageID);
                  })                      
                        }        
                        
                        else if ((input.startsWith(prefix + "slap")) && !bot.includes(event.senderID)){
                                if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd02)) {
                                    cd02[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd02[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd02[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd02[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd02[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                            }
                          
          
          axios.get('https://RandomLinkAPI-1.ekekevan.repl.co/slap')
                  .then(response => {
                  	var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");
                     var file = fs.createWriteStream("slap.gif");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('GIF Downloading!')
                           var message = {
                              body: "Slapped! " + tag + "\n\n*Sorry I thought there's a mosquito*",
                              
                              mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
                              attachment: fs.createReadStream(__dirname + '/slap.gif')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate gif, be sure that you've tag someone!", event.threadID, event.messageID);
                  })                      
                        }      

else if ((input.startsWith(prefix + "hug")) && !bot.includes(event.senderID)){
         if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd03)) {
                                    cd03[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd03[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd03[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd03[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd03[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                            }
                          
                                 
          axios.get('https://RandomLinkAPI-1.ekekevan.repl.co/hug')
                  .then(response => {
                  	var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");
                     var file = fs.createWriteStream("hug.gif");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('GIF Downloading!')
                           var message = {
                              body: "hugs you tight " + tag + "☺️\n\nsometimes all you need is a hug~",
                              
                              mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
                              attachment: fs.createReadStream(__dirname + '/hug.gif')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                         });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate gif, be sure that you've tag someone!", event.threadID, event.messageID);
                  })                      
                        }     
else if ((input.startsWith(prefix + "kiss")) && !bot.includes(event.senderID)){
           if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd04)) {
                                    cd04[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd04[event.senderID]) {
                                    api.sendMessage("⚠️Opps you're going to fast! Wait for " + Math.floor((cd04[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd04[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd04[event.senderID] = Math.floor(Date.now() / 1000) + (15 * 1);
                                }
                            }
                          
                               
          axios.get('https://RandomLinkAPI-1.ekekevan.repl.co/getlink5')
                  .then(response => {
                  	var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");
                     var file = fs.createWriteStream("kiss.gif");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('GIF Downloading!')
                           var message = {
                              body:  tag + ", I love you very much!❤️",
                              
                              mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
                              attachment: fs.createReadStream(__dirname + '/kiss.gif')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate gif, be sure that you've tag someone!", event.threadID, event.messageID);
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
                            else if ((input.startsWith(prefix + "about"))&& !bot.includes(event.senderID)){
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️ About:\n\n*This Bot are made from FCA-UNOFFICIAL and for educational purpose only!\n\n*If your request is still on processing, plaese wait until it is finished before requesting a new one!\n\n*Please do not spam, be responsible when using this command to avoid getting blocked!\n\n*One request at a time only, let the Bot do its job!\n\nChat me if you incounter a problem here:\nhttps://m.me/johnpaul.caigas001\n\nThank you for your understanding, have a good day🥰!\n\n\n💠 Made by: John Paul Caigas\n\n💡Credits to:\nSalvador\nJohn Jeremy Antiguo\nEarl Shine Sawir \nRheign Kimmy\nJovanny De Leon\nJerson Carin\nRomeo\nAll of us are bot", event.threadID, event.messageID);
                            
                            }
                            }
                            else if ((input.startsWith(prefix + "others"))&& !bot.includes(event.senderID)){
 
                        let data = input.split(" ");
         //               if (data.length < 2) {
                            api.sendMessage("🎉Auto Greet and Auto Reply🎉\n\ngoodmorning\ngoodafternoon\ngoodnight\nganda\npogi\ngwapo\n\n⚠️ This commands is for entertainment purposes only. If you easier got offended please don't use this commands cuz it's not for you!\n\n⚠️ We removed *Hi* and *Hello* commands from this bot.", event.threadID, event.messageID);
                            
           //                 }
                            }
                                                 if(input2.includes("haha") || input2.includes("lmao") || input2.includes("lol") || input2.includes("😂") || input2.includes("😹") || input2.includes("🤣") || input2.includes("😆") || input2.includes("😄") || input2.includes("😅") || input2.includes("xd")){
					        	api.setMessageReaction("😆", event.messageID, (err) => {}, true)
					}
					if(input2.includes("kawawa") || input2.includes("sad") || input2.includes("agoi") || input2.includes("sakit") ||input2.includes("skit")){
					        	api.setMessageReaction("😢", event.messageID, (err) => {}, true)
					}
					
					if((input2.includes("pagasa") || 
input2.includes("aasa"))&& !bot.includes(event.senderID)){
	api.setMessageReaction("🙁", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("mag move-on kana lods, wag kanang umasa na babalikan kapa niya. just accept the fact na wala na syang gusto sayo😕", event.threadID, event.messageID);
                            }
                        })
}
					
					

       if(input2.includes("yamete") && !bot.includes(event.senderID)) {
	
                       api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                 console.log(err)
                            }
//   if (!vip.includes(event.senderID)){
                        //    api.sendMessage(`⚠️YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!`, event.threadID, event.messageID);
//   }else{
    api.setMessageReaction("😣", event.messageID, (err) => {}, true)
      api.sendMessage({
                                                body:">_<",
                                                attachment: fs.createReadStream(__dirname + '/yamate.mp3')

        
                                            }, event.threadID, event.messageID);


                          //  }  
                            
                             
                            
                        })
            
                   
}
         if(input2.includes("ara ara") && !bot.includes(event.senderID)) {
	
                       api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }
//   if (!vip.includes(event.senderID)){
                        //    api.sendMessage(`⚠️YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!`, event.threadID, event.messageID);
//   }else{
    api.setMessageReaction("🥰", event.messageID, (err) => {}, true)
      api.sendMessage({
                                                body:"Ara ara~",
                                                attachment: fs.createReadStream(__dirname + '/ara.mp3')

        
                                            }, event.threadID, event.messageID);


                          //  }  
                            
                             
                            
                        })            
                   
                            }
           if(input2.includes("amogus") || input2.includes("sus") || input2.includes("vent") && !bot.includes(event.senderID)) {
	
                       api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }
//   if (!vip.includes(event.senderID)){
                        //    api.sendMessage(`⚠️YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!`, event.threadID, event.messageID);
//   }else{
    api.setMessageReaction("😱", event.messageID, (err) => {}, true)
      api.sendMessage({
                                                body:"ඞ",
                                                attachment: fs.createReadStream(__dirname + '/amogus.mp3')

        
                                            }, event.threadID, event.messageID);


                          //  }  
                            
                             
                            
                        })
            
                   
           }
             if(input2.includes("vineboom") || input2.includes("darock") || input2.includes("therock") && !bot.includes(event.senderID)) {
	
                       api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }
//   if (!vip.includes(event.senderID)){
                        //    api.sendMessage(`⚠️YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!`, event.threadID, event.messageID);
//   }else{
    api.setMessageReaction("🤨", event.messageID, (err) => {}, true)
      api.sendMessage({
                                                body:"...",
                                                attachment: fs.createReadStream(__dirname + '/vineboom.gif')

        
                                            }, event.threadID, event.messageID);


                          //  }  
                            
                             
                            
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

else if (input.startsWith("hi") || input.startsWith("hello") || input.startsWith("yo!") || input.startsWith("hallo") || input.startsWith("hola") || input.startsWith("helo") && !bot.includes(event.senderID)) {
	api.setMessageReaction("👋", event.messageID, (err) => {}, true)
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                            	
                         api.sendMessage({
                                                body:`Hi, @${data[event.senderID].firstName}. how are you?`,
                                                attachment: fs.createReadStream(__dirname + '/hi-hello.gif'),
                                                mentions: [{
                                                    tag: `@${data[event.senderID].firstName}`,
                                                    id: event.senderID,
                                                    fromIndex: 0,                                                  
                                                }]
                                            }, event.threadID, event.messageID);


                            }
                        })
}

       /*==================================== STALK COMMAND ============================================*/
//Credits To: Salvador
else if(input.startsWith(prefix + "test")){
                 let datas = input.split(" ");
                 if(datas.length < 2){
                    api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !stalk fbusername", event.threadID);
                 } else {
                    api.getUserID(datas[1], (err, data) => {
                         if(err){
                             api.sendMessage("⚠️ERROR: " + err, event.threadID);
                        }
                         let msg = "👤"+datas[1]+"'s DETAILS\n💳Name: "+data[0].name+ "\n🆔UserID: "+data[0].userID+"\n🔗Profile Link: "+data[0].profileUrl+"\n\n👨🏻‍💻Made by : John Paul Caigas\n⚙️Credits to: Salvador";
                     api.sendMessage(msg, event.threadID, event.messageID)
                    });
                     api.sendMessage("🔃Stalking...("+datas[1]+")", event.threadID, event.messageID);
                }
            }
       /*==================================== TEXT TO SPEACH COMMAND ============================================*/
//Credits To: Salvador, John Jeremy Antiguo, Romeo    
         if(input2.includes(prefix + "say")) {
            let userLanguage = input.split(" ");
            let toSpeech = input2.replace("!say " + userLanguage[1] + " ", "");

            function sayCommand(convertSpeech, decideLanguage) {
              let file = fs.createWriteStream("say.mp3");
              let targetUrl = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=" + convertSpeech + "+&tl=" + decideLanguage + "&client=tw-ob";
              let gifRequest = http.get(targetUrl, function(gifResponse) {
                gifResponse.pipe(file);
                file.on('finish', function() {
                   console.log('Finishing Downloading Text to MP3!')
                  let message = {
                    body: `Successfully Converted \n\n**${convertSpeech} in ${decideLanguage}** \n\n👨‍💻Made By: John Paul Caigas\n⚙️Credits to: Salvador and John Jeremy`,
                    attachment: fs.createReadStream(__dirname + '/say.mp3')
                  }
                  api.sendMessage(message, event.threadID, event.messageID);
                  api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                });
              });
            }
            switch (userLanguage[1]) {
              case "kor":
              case "korea":
              case "korean":
                sayCommand(toSpeech, "ko")
                break;
              case "fil":
              case "filipino":
              case "tag":
              case "tagalog":
                sayCommand(toSpeech, "tl")
                break;
              case "spanish":
              case "spa":
                sayCommand(toSpeech, "es-ES")
                break;
              case "hindi":
              case "hin":
                sayCommand(toSpeech, "hi-IN")
                break;
              case "indo":
              case "indonesian":
              case "indonesia":
                sayCommand(toSpeech, "in")
                break;
              case "arab":
              case "arabic":
                sayCommand(toSpeech, "ar")
                break;
              case "eng":
              case "english":
                sayCommand(toSpeech, "en")
                break;
              case "jap":
              case "japanese":
              case "japan":
                sayCommand(toSpeech, "ja")
                break;
              case "latin":
              case "lat":
                sayCommand(toSpeech, "la")
                break;
                case "chinese":
              case "chi":
                sayCommand(toSpeech, "zh-cn")
                break;
                case "french":
              case "fren":
                sayCommand(toSpeech, "fr")
                break;
              default:
                api.sendMessage("no language injected or invalid format\nUsage: !say <eng,tag,jap,indo,hindi,arab,chi,fren> <text>\n\n👨‍💻Made By: John Paul Caigas\n⚙️Credits to: Salvador and John Jeremy", event.threadID, event.messageID);
            }
          }
       else if (input.startsWith(prefix + "request")) {
       	var name = input;
                    name = name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()).substring(5);
                    
                        
                        let data = input.split(" ");
             
           //              if (data.length < 2) {
                                                             
                            if (!(vip.includes(event.senderID))) {
                                             api.sendMessage(`⚠️YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!`, event.threadID, event.messageID);
                            
 
                                  
     
                            }else if (data.length < 2){
                                                           api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !request music_title", event.threadID);                 
                                  //  cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                               
                            }
                                else {
                        //    }
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
                                api.sendMessage(`🔄Converting “${info.videoDetails.title}”`, event.threadID,event.messageID)
                                axios.get('https://hermes-music.jersoncarin.dev/search?q=' + name)
                                    .then(response => {
                       
                                ffmpegs(strm)
                                    .audioBitrate(256)
                                    .save(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                    .on("end", () => {
                                        console.log(`Playing ${data.join(" ").replace(/[^\w\s]/gi, '')}`);
                                        api.sendMessage({
                                            body: "😚Here's what ya ordered senpai!\n🎶Song Title: " + info.videoDetails.title + "" + "\n\n" + response.data.lyrics + "\n\n🎉Made by: John Paul Caigas\n🔏Credits to: Salvador",
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
                                        })
                                    });

                            } catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
       }
                            

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
          /*==================================== SIMSIMI COMMANDS & API ============================================*/
//Credits To: Javanny De Leon                 
        if (input.startsWith("minari")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("⚠️Invalid Use Of  Command!\n💡Usage: minari<space>say_something", event.threadID);
            } else {
            api.sendTypingIndicator(event.threadID, event.messageID);
                try {
                    data.shift()
                    let txt = data.join(" ");
                axios.get('https://api-sv2.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=Minari')
                        .then(response => {                    	
api.sendMessage(response.data['success'], event.threadID, event.messageID);


                        })
                } catch (err) {
                    api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                    }
                }
            }        

       
     
                    else if (input.startsWith(prefix + "wiki")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !wiki word", event.threadID, );
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
                    	
                    var name = input;
                    name = name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()).substring(5);
                    
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
                            
                    
                            api.sendMessage(`🔎Searching...`, event.threadID, event.messageID);
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
                                api.sendMessage(`🔄Converting “${info.videoDetails.title}”`, event.threadID,event.messageID)
                                
    axios.get('https://hermes-music.jersoncarin.dev/search?q=' + name)
                  .then(response => {
                                ffmpegs(strm)
                                    .audioBitrate(96)
                                    .save(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                    .on("end", () => {
                                        console.log(`Playing ${data.join(" ").replace(/[^\w\s]/gi, '')}`);
                                        api.sendMessage({
                                            body: "😚Here's what ya ordered senpai!\n🎶Song Title: " + info.videoDetails.title + "\n\n" + response.data.lyrics + "\n\n🎉Made by: John Paul Caigas\n🔏Credits to: Salvador",
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
                    })  
                                    });

                            } catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }
                        
                      
                        

          /*==================================== ANIMEQOUTE COMMAND ============================================*/
// CREDITS TO: SALVADOR, JOHN JEREMY ANTIGUO AND ROMEO



                    }
                    else if (input.startsWith(prefix + "aniquote")) {
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
/*==================================== FACT COMMAND ===========================================*/
          
 else if (input.startsWith(prefix + "fact")) {
							let data = input.split(" ");
							if (data.length < 2) {
								api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !fact say_something", event.threadID);
							} else {
								try {
									data.shift()
									let txt = data.join(" ").replace("\\", "");
									let img = await addTextOnImage(txt);
									if (!img) {
										throw new Error("Failed to Generate Image!")
									} else {
										api.sendMessage({
											body: "",
											attachment: fs.createReadStream(`${__dirname}/${txt}_output.png`)
												.on("end", async () => {
													if (fs.existsSync(`${__dirname}/${txt}_output.png`)) {
														fs.unlink(`${__dirname}/${txt}_output.png`, function (err) {
															if (err) console.log(err);
															console.log(`${__dirname}/${txt}_output.png is deleted!`);
														});
													}
													if (fs.existsSync(`${__dirname}/${txt}_txt.png`)) {
														fs.unlink(`${__dirname}/${txt}_txt.png`, function (err) {
															if (err) console.log(err);
															console.log(`${__dirname}/${txt}_txt.png is deleted!`);
														});
													}
												})
										}, event.threadID, event.messageID);
									}
								} catch (err) {
									api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
								}
							}
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

// This Bot was made by John Paul Caigas and Our Bot Team, Please give some credits befor you use!
