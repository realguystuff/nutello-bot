const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const p = '!'
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('you in 4k', { type: 'WATCHING' });
});

client.on('messageCreate', msg => {
  if (msg.content === p+'ping') {
    const clientPing = Date.now() - msg.createdTimestamp;
    const apiPing = Math.round(client.ws.ping);
    if (clientPing < 90 && apiPing < 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!`);
    }
    if (clientPing > 90 && apiPing > 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!

Slow latency detected (more than 90ms) and slow API latency detected (more than 90ms).`);
    }
    if (clientPing > 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!

Slow latency detected (more than 90ms).`);
    }
    if (apiPing > 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!

API latency is slow (more than 90ms). Check out <https://discordstatus.com/> if there is an outage and scroll down to API response time to see if it's high.`);
    }
  }
  
    if (msg.content.startsWith("!kick")) {

    if(!msg.member.permissions.has("KICK_MEMBERS")) {
      msg.channel.send('Error: User does not contain the `KICK_MEMBERS` permission, cancelling command.')
    }
    var member = msg.mentions.members.first();
    // Kick
    member.kick().then((member) => {
        // Successmessage
        msg.channel.send(member.displayName + " has been successfully kicked!");
    }).catch((err) => {
        // Failmessage
        console.log(err);
        msg.channel.send("Access Denied.");
    });
  }


});

client.on("messageCreate", message => {
  let blacklisted = ['fuck', 'shit'];
  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  if (foundInText) {
    message.delete();
    Message.channel.send();
  }
})
const clean = async (client, text) => {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  text = text.replaceAll(client.token, "[REDACTED]");
  return text;
}

client.on("messageCreate", async (message) => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(`${p}eval`)) {
    if (message.author.id !== ownerID) {
      message.channel.send(`Eval command can't be used by users, since the command can do anything, even deleting the files of code from a bot.`)
    } else {
      try {
        const evaled = eval(args.join(" "));
        let cleaned = await clean(client, evaled);
        message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
      } catch (err) {
        const evaled = eval(args.join(" "));
        const cleaned = await clean(client, evaled);
        message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
      }
    }
  }

});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("!ban")) {

        if(!message.member.permissions.has("BAN_MEMBERS")) {
          msg.channel.send('Error: User does not contain the `BAN_MEMBERS` permission, cancelling command.')
        }
        var member = message.mentions.members.first();
        // ban
        member.ban().then((member) => {
            // Successmessage
            message.channel.send(member.displayName + " has been successfully banned!");
        }).catch((err) => {
            // Failmessage
            console.log(err);
            message.channel.send("Access Denied.");
        });
    }
  })

client.login(process.env.token);
// logins to the bot using the token
