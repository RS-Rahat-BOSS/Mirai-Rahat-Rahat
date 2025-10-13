const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
  name: "info100",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Show Owner Info with Permanent GIF",
  commandCategory: "info",
  usages: "info",
  cooldowns: 2
};

module.exports.run = async function({ api, event }) {
  const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

  const callback = () => api.sendMessage({
    body: `
┏━━━━━━━━━━━━━━━┓
┃   🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟    
┣━━━━━━━━━━━━━━━┫
┃👤 𝗡𝗔𝗠𝗘      : 𝗔 𝗕 𝗜 𝗥
┃🚹 𝗚𝗘𝗡𝗗𝗘𝗥    : 𝗠𝗔𝗟𝗘
┃🎂 𝗔𝗚𝗘       : 18+
┃🕌 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡 : 𝗜𝗦𝗟𝗔𝗠
┃🏫 𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 : 𝗦𝗼𝗶𝘁𝗮𝗻 𝗲𝗿 𝘁𝗲𝗮𝗰𝗵𝗲𝗿 𝗹𝗮𝗴𝗶 
┃🏡 𝗔𝗗𝗗𝗥𝗘𝗦𝗦 : 𝗗𝗵𝗮𝗸𝗮, 𝗕𝗮𝗻𝗴𝗹𝗮𝗱𝗲𝘀𝗵
┣━━━━━━━━━━━━━━━┫
┃𝗧𝗜𝗞𝗧𝗢𝗞 : @𝗧𝗮𝗻𝗯𝗶𝗿_𝘅_001
┃📢 𝗧𝗘𝗟𝗘𝗚𝗥𝗔𝗠 : 𝗻𝗮𝗶 𝗯𝗲𝗱𝗮 𝗮𝗺𝗶 𝗻𝗶𝘀𝗽𝗮𝗽 🙂 𝘃𝗮𝗹𝗮 𝗺𝗮𝗻𝘂𝘀 𝗵𝗼𝗸 𝗺𝗼𝘄𝗹𝗮
┃🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 : https://www.facebook.com/profile.php?id=100083241262207
┣━━━━━━━━━━━━━━━┫
┃ 🕒 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𝗧𝗜𝗠𝗘: ${time}
┗━━━━━━━━━━━━━━━┛`,
    attachment: fs.createReadStream(__dirname + "/cache/owner.gif")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.gif"));

  // 🔹 Permanent GIF link from Catbox.moe
  return request("https://files.catbox.moe/qhajtf.gif")
    .pipe(fs.createWriteStream(__dirname + '/cache/owner.gif'))
    .on('close', () => callback());
};
