const axios = require("axios");
const baseApiUrl = async () => "https://www.noobs-api.rf.gd/dipto";

module.exports.config = {
    name: "baby",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "dipto + ULLASH",
    description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion",
    commandCategory: "simsim",
    usages: "[message/query]",
    cooldowns: 0,
    prefix: false
};

module.exports.run = async function({ api, event, args, usersData }) {
    try {
        const uid = event.senderID;
        const senderName = (await usersData.get(uid)).name;
        const query = args.join(" ").toLowerCase();
        const link = `${await baseApiUrl()}/baby`;

        if (!query) {
            const ran = ["Bolo baby", "hum", "😚", "Yes 😀, I am here"];
            const r = ran[Math.floor(Math.random() * ran.length)];
            return api.sendMessage(r, event.threadID, (err, info) => {
                if (!err) {
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: module.exports.config.name,
                        type: "reply",
                        author: uid
                    });
                }
            });
        }

        if (args[0] === "remove") {
            const fina = query.replace("remove ", "");
            const res = await axios.get(`${link}?remove=${fina}&senderID=${uid}`);
            return api.sendMessage(res.data.message, event.threadID, event.messageID);
        }

        if (args[0] === "rm" && query.includes('-')) {
            const [fi, f] = query.replace("rm ", "").split(' - ');
            const res = await axios.get(`${link}?remove=${fi}&index=${f}`);
            return api.sendMessage(res.data.message, event.threadID, event.messageID);
        }

        if (args[0] === "list") {
            if (args[1] === "all") {
                const data = (await axios.get(`${link}?list=all`)).data;
                const teachers = await Promise.all(data.teacher.teacherList.map(async item => {
                    const number = Object.keys(item)[0];
                    const value = item[number];
                    const name = (await usersData.get(number)).name;
                    return { name, value };
                }));
                teachers.sort((a, b) => b.value - a.value);
                const output = teachers.map((t, i) => `${i + 1}/ ${t.name}: ${t.value}`).join('\n');
                return api.sendMessage(`Total Teach = ${data.length}\n👑 | List of Teachers of baby\n${output}`, event.threadID, event.messageID);
            } else {
                const d = (await axios.get(`${link}?list=all`)).data.length;
                return api.sendMessage(`Total Teach = ${d}`, event.threadID, event.messageID);
            }
        }

        if (args[0] === "edit") {
            const parts = query.replace("edit ", "").split(' - ');
            if (parts.length < 2) return api.sendMessage('❌ | Invalid format! Use edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
            const [ask, newReply] = parts;
            const res = await axios.get(`${link}?edit=${ask}&replace=${newReply}&senderID=${uid}`);
            return api.sendMessage(`✅ changed ${res.data.message}`, event.threadID, event.messageID);
        }

        if (args[0] === "teach") {
            const parts = query.replace("teach ", "").split(' - ');
            if (parts.length < 2) return api.sendMessage("❌ | Invalid format! Use teach [Question] - [Reply]", event.threadID, event.messageID);
            const [ask, ans] = parts;
            const res = await axios.get(`${link}?teach=${ask}&reply=${ans}&senderID=${uid}`);
            return api.sendMessage(`✅ Replies added: ${res.data.message}`, event.threadID, event.messageID);
        }

        // Check if user asks their name
        if (query.includes('amar name ki') || query.includes('amr nam ki') || query.includes('amar nam ki') || query.includes('amr name ki') || query.includes('whats my name')) {
            const data = (await axios.get(`${link}?text=amar name ki&senderID=${uid}&key=intro`)).data.reply;
            return api.sendMessage(data, event.threadID, event.messageID);
        }

        // Default chatbot response
        const res = (await axios.get(`${link}?text=${encodeURIComponent(query)}&senderID=${uid}&font=1`)).data.reply;
        return api.sendMessage(res, event.threadID, (err, info) => {
            if (!err) {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName: module.exports.config.name,
                    type: "reply",
                    author: uid,
                    apiUrl: link
                });
            }
        }, event.messageID);

    } catch (err) {
        console.error(err);
        return api.sendMessage(`| Error in baby command: ${err.message}`, event.threadID, event.messageID);
    }
};

module.exports.handleReply = async function({ api, event, usersData }) {
    try {
        const uid = event.senderID;
        const senderName = (await usersData.get(uid)).name;
        const replyText = event.body ? event.body.toLowerCase() : "";
        if (!replyText) return;
        const link = `${await baseApiUrl()}/baby`;
        const res = (await axios.get(`${link}?text=${encodeURIComponent(replyText)}&senderID=${uid}&font=1`)).data.reply;
        return api.sendMessage(res, event.threadID, (err, info) => {
            if (!err) {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName: module.exports.config.name,
                    type: "reply",
                    author: uid
                });
            }
        }, event.messageID);
    } catch (err) {
        return api.sendMessage(` | Error in handleReply: ${err.message}`, event.threadID, event.messageID);
    }
};

module.exports.handleEvent = async function({ api, event, usersData }) {
    try {
        const body = event.body ? event.body.toLowerCase().trim() : "";
        if (!body) return;
        const uid = event.senderID;
        const link = `${await baseApiUrl()}/baby`;

        if (["baby", "bby", "bot", "janu", "babu"].includes(body.split(" ")[0])) {
            const arr = body.replace(/^\S+\s*/, "");
            const randomReplies = ["😚", "Yes 😀, I am here", "What's up?", "Bolo jaan ki korte panmr jonno"];
            if (!arr) {
                const r = randomReplies[Math.floor(Math.random() * randomReplies.length)];
                return api.sendMessage(r, event.threadID, (err, info) => {
                    if (!err) {
                        global.GoatBot.onReply.set(info.messageID, {
                            commandName: module.exports.config.name,
                            type: "reply",
                            author: uid
                        });
                    }
                }, event.messageID);
            }
            const res = (await axios.get(`${link}?text=${encodeURIComponent(arr)}&senderID=${uid}&font=1`)).data.reply;
            return api.sendMessage(res, event.threadID, (err, info) => {
                if (!err) {
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: module.exports.config.name,
                        type: "reply",
                        author: uid
                    });
                }
            }, event.messageID);
        }

    } catch (err) {
        return api.sendMessage(` | Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
    }
};
