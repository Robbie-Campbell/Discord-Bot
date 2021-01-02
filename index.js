/*
   Author: Robbie Campbell
   Date: 28/04/2020
   Description:
   This is my first attempt at a discord bot that i began creating out of frustration with the lack of bots who teach a word a day.
   This current version does not feature the "learn a word a day" function, but that is the end goal alongside some more indepth javascript
   experience and learning. For those of you who are testing this bot i hope you enjoy, and stay tuned for updates!
*/

// Basic info for bot set up

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();
const puppeteer = require("puppeteer")
const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const words = require("./words");
// Sets up the bot for the apps
const token = process.env.BOT_VAR;
const prefix = "B!"


// Overwrite the flat function not available to discord current version
Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {
        return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);
    }
});


// Tells me the bot is running
bot.on('ready', () => {
    console.log("This bot is online");

});

// Version can be updated when neccessary
const version = "1.1.2";

// For the rock game
let rock = "null";

// Sets an amount of messages to be deleted which is then confirmed by using the B!yes function
function setDelete(value) {
    deleter = value;
}
function getDelete() {
    return parseInt(deleter);
}

function setRock(value) {
    rock = value;
}
function getRock() {
    return rock;
}
// Gets a random number
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

bot.on('message', msg => {

    // This function gets data using a dictionary api and relays it into an embed, using this function both word a day and define can be called.
    const asyncApiCall = async (word, title) => {
        try {
            const app_key = "75e25137-2b57-4012-8690-b7d8aec765f3";
            const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${app_key}`;
            const response = await fetch(url);
            const json = await response.json();
            const values = json[0].meta;
            return msg.channel.send(Embeds.addField(name = title, value = values.id + "\n" + json[0].hwi.prs[0].mw + "\n" + json[0].shortdef[0]));
        } catch {
            msg.reply("Yeah, sorry couldn't find that one :(");
        }
    };


    // Creates an embed option, abitlity to change aspects will be added later
    const Embeds = new Discord.MessageEmbed()
        .setColor('#DD4444')
        .setTitle('WordADay bot')
        .setURL('https://www.youtube.com/channel/UCH_bkDYstaTtrHmDN-8Hb3w')
        .setAuthor('Robbie C', 'https://i.pinimg.com/736x/3c/88/c8/3c88c8510028f627cf58792795629ed1.jpg', 'https://www.youtube.com/channel/UCH_bkDYstaTtrHmDN-8Hb3w')
        .setDescription("The bot that'll read you a word a day!")
        .setThumbnail('https://i.pinimg.com/736x/3c/88/c8/3c88c8510028f627cf58792795629ed1.jpg')
        .setImage('https://cdn.discordapp.com/attachments/571058265404997657/707298692843176077/Bilbo_Rabbins.jpg')
        .setFooter('Have fun with it!', 'https://i.pinimg.com/736x/3c/88/c8/3c88c8510028f627cf58792795629ed1.jpg');

    // Refers to the user requesting the response.
    let selfUser = msg.member.user.username;

    // Determines how many arguments have been taken in
    let args = msg.content.slice(prefix.length).split(" ");

    // Works as a reference to establish ping later
    let present = new Date();
    let time = present.getMilliseconds();

    // Allows for a ping to be send and be fed back to the bot.
    const Http = new XMLHttpRequest();
    const url = 'https://jsonplaceholder.typicode.com/posts';
    Http.open("GET", url);
    Http.send();

    switch (args[0].toLowerCase()) {
        // This is the current version number
        case "info":
            if (args[1] === "version") {
                msg.channel.send("Version " + version);
            }

            // Author info
            else if (args[1] === "author") {
                let description = "This is my first attempt at a discord bot that i began creating out of frustration with the lack of bots who teach a word a day. \n" +
                    "This current version does now features the 'word a day' function! Hooray! Soon it will be timestamped to produce one word a day, but not yet! As ever have fun and thanks " +
                    "for using WordADay!"
                wordAday;
                msg.channel.send(Embeds.addField(name = "About this bot", value = description))
            }

            // Error handling
            else {
                msg.channel.send("Enter a second argument: author or version.");
            }
            break;
        case "ping":

            // Tests the ping of the user asking for it
            function pinger() {
                let reply = 0;
                Http.addEventListener('readystatechange', () => {
                    if (Http.readyState == 4 && Http.status == 200) {
                        let pong = new Date();
                        const response = pong.getMilliseconds();
                        const result = (response - time) - 80;
                        reply = msg.reply("It took " + result + "ms to Pong!");
                    }
                });
                return reply;
            }
            pinger();
            break;

        // Links to a silly youtube video
        case "simp":
            if (args[1]) {
                let name = new String(args[1]);
                msg.channel.send(name.valueOf() + ", You are a " + 'https://www.youtube.com/watch?v=7435xZZOzsY');
            }
            else {
                msg.channel.send("Please enter the simps username.")
            }
            break;

        //Sends a GIF from jojo's bizarre adventure
        case "jojo":
            gifs = [
                "https://thumbs.gfycat.com/NiftySnarlingBluetickcoonhound-size_restricted.gif",
                "https://media2.giphy.com/media/Nn17cPRa7dZ28/giphy.gif",
                "https://i.kym-cdn.com/photos/images/original/001/204/072/6d2.gif",
                "https://media1.giphy.com/media/bC0caT4xYU8qQ/source.gif",
                "https://media1.tenor.com/images/71242474d0c209cfe775269ee2b9449b/tenor.gif?itemid=15487465",
                "https://media.giphy.com/media/IzfJSTepKi5vW/giphy.gif"
            ];
            msg.channel.send(gifs[getRandomInt(6)]);
            break;

        // Send a One Punch Man gif
        case "opm":
            gifs = [
                "https://media3.giphy.com/media/4j1nGRNRIa3e0/source.gif",
                "https://i.gifer.com/JRW1.gif",
                "https://i.gifer.com/C5bV.gif",
                "https://pa1.narvii.com/6540/1671ee0151848ebce1408c7219305c070e5ee8ac_00.gif",
                "https://i.gifer.com/FODF.gif",
                "https://33.media.tumblr.com/07abdaa5439a9b4fb5532cd203238274/tumblr_nxiji1jyr21uzkymgo1_500.gif"
            ];
            msg.channel.send(gifs[getRandomInt(6)]);
            break;

        // Responds a hello to the person who said it
        case "hello":
            msg.channel.send('Hey ' + selfUser + ", What's up!");
            break;

        // Deletes a user specified number of messages
        case "clear":
            if (!args[1]) return msg.reply("Error, please enter define a second arg");
            else {
                if (args[1] < 20) {
                    setDelete(parseInt(args[1]));
                    msg.channel.send("Type B!yes to delete.");
                    break;
                }
                else if (args[1] > 100) {
                    msg.reply("Come on guys, really? more than 100?");
                    break;
                }
                else {
                    msg.reply("You're trying to delete too many")
                    break;
                }
            }

        // Tells the user all of the commands
        case "help":
            msg.channel.send(Embeds.addFields(
                { name: "Command List", value: 'All commands start with B!' },
                { name: "Memes", value: "simp, jojo, opm, sucks" },
                { name: "Numerical functions", value: "bin, oct, hex" },
                { name: "Functionality", value: "info, help, hello, clear, ping, code, define, insult" },
                { name: "Turn on wordaday!", value: "word" },
                { name: "Play a game!", value: "rock" },
                { name: "Other Cool Stuff!!", value: "inspire, insult, fact" },
                { name: "Dice Rolls", value: "20, 12, 10, 8, 6, 4"}
            ));
            break;

        // Allows the user to be given a programming language for the day
        case "code":
            const language = ["Java", "Python", "JS", "C++", "PHP", "HTML/ CSS"]
            msg.channel.send("Today you should write code in: " + language[getRandomInt(6)]);
            break;
        case "thanks":
            msg.channel.send("You're welcome chief!");
            break;
        // Delete messages confirmation
        case "yes":
            try {
                msg.channel.bulkDelete(getDelete() + 3);
                deleter = 0;
                break;
            } catch {
                msg.reply("Please enter a number of messages to be deleted.")
                break;
            }

        // Defines a word the user inputs
        case "define":
            if (args[1]) {
                asyncApiCall(args[1], "The definition of " + args[1] + " is:")
                break;
            }
            else {
                msg.channel.send("Please enter a word to be defined")
                break;
            }

        // Converts a decimal value into a binary number
        case "bin":
            function reverse(s) {
                return s.split("").reverse().join("");
            }
            let bin = ""
            if (args[1]) {
                for (decimal = parseInt(args[1]); decimal >= 0; Math.floor(decimal -= decimal / 2)) {
                    if (decimal < 1) {
                        break;
                    }
                    else if (Math.floor(decimal) % 2 == 0) {
                        bin = bin + "0"
                    }
                    else {
                        bin = bin + "1"
                    }
                }
                msg.channel.send("The binary value of your number is " + reverse(bin))
                break;
            }
        case "oct":
            let oct = "";
            if (args[1]) {
                oct = parseInt(args[1]).toString(8);
                msg.channel.send("The octal value of your number is " + oct);
                break;
            }
            else {
                msg.channel.send("Please enter a second argument.")
                break;
            }
        case "hex":
            let hexer = "";
            if (args[1]) {
                hexer = parseInt(args[1]).toString(16).toUpperCase();
                msg.channel.send("The hexadecimal value of your number is " + hexer)
                break;
            }
            else {
                msg.channel.send("Please input a number to convert.")
                break;
            }
        case "dec":
            if (args[1]) {
                let digit = parseInt(args[1], 2)
                msg.channel.send("Your decimal number is " + String(digit));
                break;
            }
            else {
                msg.channel.send("Please input a number to convert.");
                break;
            }

        // The illustrious wordaday function!
        case "word":
            asyncApiCall(words[getRandomInt(568)], "Your word today is:")
            break;

        // Sends a random shakespearian insult to the user, can specify an end user.
        case "insult":
            async function scrapeProduct(url) {
                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
                const page = await browser.newPage();
                await page.goto(url);
                const txt = await page.evaluate(() => Array.from(document.getElementsByTagName("font"), element => element.textContent));
                if (args[1]) {
                    msg.channel.send(args[1] + ", " + txt[1]);
                }
                else {
                    msg.channel.send(txt[1]);
                }
                browser.close();
            }
            scrapeProduct("http://www.literarygenius.info/a2-shakespeare-insult-generator.htm")
            break;

        // Sends a random motivational quote to the end user
        case "inspire":
            async function motivateMe(url) {
                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
                const page = await browser.newPage();
                await page.goto(url);
                const txt = await page.evaluate(() => Array.from(document.getElementsByTagName("strong"), element => element.textContent));
                let x = getRandomInt(txt.length);
                msg.channel.send(Embeds.setImage("https://hofholistichealingcenters.files.wordpress.com/2012/10/inspired-life-1.jpg").addFields(
                    { name: "Let's get inspired", value: txt[x] }
                ));
                browser.close();
            }
            motivateMe("https://personaldevelopfit.com/motivational-quotes/")
            break;

        // If people are mean to wordaday :(
        case "sucks":
            msg.channel.send("I'm trying my best");
            msg.channel.send("<:struggle:778610140935880734>");
            break;

        // The most fun rock based guessing game you can think of
        case "rock":
            async function newProduct(url) {
                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
                const page = await browser.newPage();
                await page.goto(url);
                const text = await page.evaluate(() => Array.from(document.querySelectorAll('.col3s'), element => element.textContent));
                const image = await page.evaluate(() => Array.from(document.querySelectorAll('.col3s'), element => element.getElementsByTagName("img")[0].src));
                let x = getRandomInt(text.length);
                let newImageSize = image[x];

                msg.channel.send(Embeds.setImage(newImageSize).addFields(
                    { name: "Guess the rock!!!", value: "WHAT COULD IT BE?! (Type your guess after the B!guess keyword!)" }
                ));
                setRock(text[x]);
                console.log(getRock())
                browser.close();
            }
            newProduct("https://geology.com/rocks/");
            break;

        // User can take a guess at the rock
        case "guess":
            if (getRock() == "null") {
                msg.channel.send("Please ask for a Rock First...")
                break;
            }
            else if (args.length == 3 && args[1].toLowerCase() + " " + args[2].toLowerCase() == getRock().toLowerCase()) {
                msg.channel.send("Congratulations! The rock is " + getRock());
                setRock("null");
                break;
            }
            else if (args[1].toLowerCase() == getRock().toLowerCase()) {
                msg.channel.send("Congratulations! The rock is " + getRock());
                setRock("null");
                break;
            }
            else {
                msg.channel.send("OOOOF Close but no cigar! The rock was " + getRock());
                setRock("null");
                break;
            }

        // Get a random fact
        case "fact":
            async function teachMe(url) {
                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
                const page = await browser.newPage();
                await page.goto(url);
                const txt = await page.evaluate(() => Array.from(document.querySelectorAll(".list"), element => element.textContent));
                let x = getRandomInt(txt.length);
                msg.channel.send(Embeds.setImage("https://i.imgflip.com/2wakz3.png").addFields(
                    { name: "To learn is to grow.", value: txt[x] }
                ));
                setTimeout( function() {msg.channel.send("<:thinking:778611853856997396>");}, 2000);
                browser.close();
            }
            let page = getRandomInt(6);
            teachMe(`https://www.thefactsite.com/1000-interesting-facts/${page}`)
            break;

        // A selection of dice rolls for different numbers
        case "20":
            let x = getRandomInt(20) + 1;
            if (x == 20) {
                msg.channel.send(x);
                msg.channel.send("<:nice:783687286650830919>");
                break;
            }
            else {
                msg.channel.send(x);
                break;
            }

        case "12":
            msg.channel.send(getRandomInt(12) + 1);
            break;

        case "10":
            msg.channel.send(getRandomInt(10) + 1);
            break;

        case "8":
            msg.channel.send(getRandomInt(8) + 1);
            break;

        case "6":
            msg.channel.send(getRandomInt(6) + 1);
            break;

        case "4":
            msg.channel.send(getRandomInt(4) + 1);
            break;
    }

});

// Allows the bot to be usable on Discord
bot.login(token);
