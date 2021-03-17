const puppeteer = require('puppeteer')
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs');


const grabPage3 = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(website)
	const el = await page.$('.ThumbnailLayouts__ThumbnailGrid-sc-18xwycr-0')
	const buffer = await el.screenshot({ path: "./screenshot.png" })

	await browser.close()
	return buffer
}
const grabPage1 = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(website1)
	const buffer = await page.screenshot({ path: "./screenshot.png" })

	await browser.close()
	return buffer
}
const grabPage2 = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(website)
	const buffer = await page.screenshot({ path: "./screenshot.png" })

	await browser.close()
	return buffer
}
client.on('ready', () => {
	console.log('I am ready!')
	const activities_list = [
    "For Drops", 
    "NBA TOP SHOT", 
    "For !help",
    "People Win"
    ]; // creates an arraylist containing phrases you want your bot to switch through.
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.
    }, 5000); // Runs this every 10 seconds.
})
//Help Command
client.on('message', async message => {
	if (message.content.includes('!help')) {
		var help = '**Command: !p** \n Get The moments of a player. Player name all lower case. \n\n!p Ex: !p lebron james'+

'\n\n **Command: !s** \n Store a Specific Moment. Easiest is to just copy straight from the website. The moment name has to be seperated by a comma. \n\n !s EX: !s KYLE ANDERSON Dunk Base Set (Series 2), https://www.nbatopshot.com/listings/p2p/208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9+a3cd9d63-7ca6-41c6-b8ee-a10733d02a96'+

' \n\n **Command: !m** \n Recall the moment stored using !s command. \n\n !m EX: KYLE ANDERSON Dunk Base Set (Series 2)'+

'\n\n **Command: !add** \n Add an abbreviation for a moment, for personal use, and ease of access. comma comes after abbreviation. \n\n !add EX: !add KA, https://www.nbatopshot.com/listings/p2p/208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9+a3cd9d63-7ca6-41c6-b8ee-a10733d02a96'+

'\n\n **Command: !u**  \n Use The Added Abbreviation. \n\n !u EX: !u KA'+
'\n\n **Command: !list** \n Get The List Of Stored Abbreviations. \n\n !list Ex: !list'
		const embed = new Discord.RichEmbed()
			// Set the title of the field
			.setTitle('Help And Commands')
			// Set the color of the embed
			.setColor(0xff0000)
			// Set the main content of the embed
			.setDescription(help.toString())
		//console.log('message sent')
		// Send the embed to the same channel as the message
		message.channel.send(embed)
		}
	})
//Get List
client.on('message', async message => {
	if (message.content.includes('!list')) {
		var sender = message.author.username + '#'+ message.author.discriminator;
		const fs = require('fs')
		fs.readFile('./shortcuts.json', 'utf8', function (err,data1) {
		  if (err) {
		    return console.log(err);
		  }
		  var data1 = data1 + "}"
		  const data2 = JSON.parse(data1)

		  var listitems = data2[sender]
		  const textFormat = Object.entries(listitems)
			  .map(([key, value]) => key + ': ' + value)
			  .join('\n');
		  const embed = new Discord.RichEmbed()
			// Set the title of the field
			.setTitle('Here Is The Moments You Have Stored!')
			// Set the color of the embed
			.setColor(0xff0000)
			// Set the main content of the embed
			.setDescription(textFormat)
		  //console.log('message sent')
	     // Send the embed to the same channel as the message
		  message.channel.send(embed)
		})
	}
})

//Call Abbreviation
client.on('message', async message => {
	if (message.content.includes('!u')) {
		var messagec = message.content;
		var message1 = messagec.replace("!u ","");
		var sender = message.author.username + '#'+ message.author.discriminator;
		const fs = require('fs')
		fs.readFile('./shortcuts.json', 'utf8', function (err,data1) {
		  if (err) {
		    return console.log(err);
		  }
		  try {
			  	var data1 = data1 + "}"
			  	const data2 = JSON.parse(data1)
				//console.log(message2)
				var sendercheck = data2[sender];
				website = data2[sender][message1]
				//console.log(website)
				async function myfunction() {
				  const grabPage2 = async () => {
					const browser = await puppeteer.launch()
					const page = await browser.newPage()
					await page.goto(website)
					const buffer = await page.screenshot({ path: "./screenshot.png", })

					await browser.close()
					return buffer
				}
				};

				(async() => {
					const buffer = await grabPage2(website);

				// We can create embeds using the MessageEmbed constructor
				// Read more about all that you can do with the constructor
				// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed

					const embed = new Discord.RichEmbed()
						// Set the title of the field
						.setTitle('Here Is Your NBA Top Shot Stats For ' + message1 + '!')
						// Set the color of the embed
						.setColor(0xff0000)
						// Set the main content of the embed
						.setDescription('Brought To You By The NBA Top Shot Pros')
						.attachFile(buffer)
					//console.log('message sent')
					// Send the embed to the same channel as the message
					message.channel.send(embed)
					fs.unlink("./screenshot.png",(err => { 
  						if (err) console.log(err)}));
			})();
		}

			catch (err) {
				console.log(err)
			}
		})
	}
})
//ADD Abbreviation
client.on('message', async message => {
	if (message.content.includes('!add')&& message.content.includes(',')) {
		var messagec = message.content;
		//!add BB, JAMES HARDEN Layup Base Set (Series 2)
		// 1. write abbreviation to file under sender name
		//2. fetch the link from file
		//3. save abbreviation and link to new file

		var message1 = messagec.replace("!add ","");
		var messagev = message1.split(",")
		var sender = message.author.username + '#'+ message.author.discriminator;
		var abbrev = messagev[0]
		var alink = messagev[1]
		var slink1= alink.replace(/\s+/g, '');
		//console.log(mname,slink)
		const fs = require('fs')
		fs.readFile('./shortcuts.json', 'utf8', function (err,data1) {
		  if (err) {
		    return console.log(err);
		  }
			  try {
			  	var data1 = data1 + "}"
			  	const data2 = JSON.parse(data1)
				//console.log(message2)
				var sendercheck = data2[sender];
				//console.log(data2)
                data2[sender][abbrev] = alink
                var data3 = JSON.stringify(data2)
                var data3 = data3.replace(/\}([^}]*)$/,'')
                fs.writeFile("./shortcuts.json", data3, (err) => { 
				  if (err) 
				    console.log(err);})

				// We can create embeds using the MessageEmbed constructor
				// Read more about all that you can do with the constructor
				// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
				const embed = new Discord.RichEmbed()
					// Set the title of the field
					.setTitle("Abbreviation Has Been Stored, You Can Now Use It")
					// Set the color of the embed
					.setColor(0xff0000)
					// Set the main content of the embed
					.setDescription('Brought To You By The NBA Top Shot Pros')
				// Send the embed to the same channel as the message
				message.channel.send(embed);
				fs.unlink("./screenshot.png",(err => { 
  					if (err) console.log(err)}));
			}
			  catch(err) {
			  	console.log(err)
			  	const fs = require('fs');

				let moment =`
	"${sender}": {
		"${abbrev}": "${alink}"
	}`;
				const data5 = ","+"\n" +(moment);
				//console.log(data1)
				fs.appendFile('./shortcuts.json', data5, (err) => { 
				  if (err) { 
				    console.log(err); 
				  } 

				// We can create embeds using the MessageEmbed constructor
				// Read more about all that you can do with the constructor
				// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
				const embed = new Discord.RichEmbed()
					// Set the title of the field
					.setTitle("Abbreviation Has Been Stored, It Can Now Be Used!")
					// Set the color of the embed
					.setColor(0xff0000)
					// Set the main content of the embed
					.setDescription('Brought To You By The NBA Top Shot Pros')
				// Send the embed to the same channel as the message
				message.channel.send(embed);
				fs.unlink("./screenshot.png",(err => { 
  					if (err) console.log(err)}));
			});
			//console.log('hello1')
			}
		})
}
})
//Store Moments for !m
client.on('message', async message => {
	if (message.content.includes('!s')&& message.content.includes(',')) {
		var messagec = message.content;
		var message1 = messagec.replace("!s ","");
		var messagev = message1.split(",")
		var mname = messagev[0]
		var slink = messagev[1]
		var slink1= slink.replace(/\s+/g, '');
		//console.log(mname,slink)


		const fs = require('fs');

		let moment =`
"${mname}": {
	"website": "${slink}"
}`;
		const data1 = ","+"\n" +(moment);
		//console.log(data1)
		fs.appendFile('./moments.json', data1, (err) => { 
		  if (err) { 
		    console.log(err); 
		  } 

		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
		console.log('hello')
		const embed = new Discord.RichEmbed()
			// Set the title of the field
			.setTitle("Moment Has Been Stored, It Can Now Be Recalled Using The !m Function!")
			// Set the color of the embed
			.setColor(0xff0000)
			// Set the main content of the embed
			.setDescription('Brought To You By The NBA Top Shot Pros')
		// Send the embed to the same channel as the message
		message.channel.send(embed);
		fs.unlink("./screenshot.png",(err => { 
  			if (err) console.log(err)}));
	});
	//console.log('hello1')
	}
})
//GET Player Cards
client.on('message', async message => {
	if (message.content.includes('!p')) {
		var messagec = message.content;
		var message1 = messagec.replace("!p ","");
		var message3 = message1.replace(/\s+/g, '-');
		var message2 = message3.toLowerCase();
		var data = require("./playerlist.json")
		var website1 = data[`${message2}`].link;
		website = website1.replace(/\s+/g, '-');
		async function myfunction() {
		  const grabPage3 = async () => {
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			await page.goto(website)
			const buffer = await page.screenshot({ path: "./screenshot.png", })

			await browser.close()
			return buffer
		}
		};

		(async() => {
			const buffer = await grabPage3(website);

		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed

			const embed = new Discord.RichEmbed()
				// Set the title of the field
				.setTitle('Here Is Your NBA Top Shot Stats For ' + message1 + '!')
				// Set the color of the embed
				.setColor(0xff0000)
				// Set the main content of the embed
				.setDescription('Brought To You By The NBA Top Shot Pros')
				.attachFile(buffer)
			//console.log('message sent')
			// Send the embed to the same channel as the message
			message.channel.send(embed)
			fs.unlink("./screenshot.png",(err => { 
				if (err) console.log()}));
	})();
}
})
//GET SPECIFIC MOMENT
client.on('message', async message => {
	if (message.content.includes('!m')) {
		var messagec = message.content;
		var message1 = messagec.replace("!m ","");
		const fs = require('fs')
		fs.readFile('./moments.json', 'utf8', function (err,data1) {
		  if (err) {
		    return console.log(err);
		  }
		//console.log(data1);
		var data = data1 +"}"
		const message2 = JSON.parse(data)
		//console.log(message2)
		website1 = message2[message1].website;
		console.log(website1)
			async function myfunction() {
			  const grabPage1 = async () => {
				const browser = await puppeteer.launch()
				const page = await browser.newPage()
				await page.goto(website1)
				const buffer = await page.screenshot({ path: "./screenshot.png" })

				await browser.close()
				return buffer
			}
			};

		// Here we wait for the myfunction to finish
		// and then returns a promise that'll be waited for aswell
		// It's useless to wait the myfunction to finish before to return
		// we can simply returns a promise that will be resolved later

		// Call start
		(async() => {
			const buffer = await grabPage1(website1);

		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed

			const embed = new Discord.RichEmbed()
				// Set the title of the field
				.setTitle('Here Is Your NBA Top Shot Stats For ' + message1 + '!')
				// Set the color of the embed
				.setColor(0xff0000)
				// Set the main content of the embed
				.setDescription('Brought To You By The NBA Top Shot Pros')
				.attachFile(buffer)
			//console.log('message sent')
			// Send the embed to the same channel as the message
			message.channel.send(embed)
			fs.unlink("./screenshot.png",(err => { 
  		    	if (err) console.log(err)}));
	})();
	})
	}
});



client.login('ODE3NTI5NzkxNzcwMDAxNDU4.YEK18w._oWxDlYeZHFN582JVl8x_ru5RyI')