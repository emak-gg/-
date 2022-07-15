const { token } = require('./config.json');
const {Client, Intents, MessageActionRow,
	MessageButton, MessageEmbed, MessageSelectMenu} = require('discord.js'),
	client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],ws: { properties: { $browser: "Discord iOS" } },});
client.on('ready', message => {
    console.log('Ready!'+require('discord.js').version);
	   console.table({
		 'Bot User:': client.user.tag,
		 'Guild(s):': client.guilds.cache.size + 'Servers',
		 'Watching:': client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) + 'Members',
		 'Discord.js:': 'v' + require('discord.js').version,
		 'Node.js:': process.version,
		 'Plattform:': process.platform + '|' + process.arch,
		 'Memory:': (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB |' + (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + 'MB'
	   });
  });
  
  const all_cooldown = {};
  client.on('messageCreate', async message => {
	if (message.content.startsWith("<zz>くぇb;usynrn b;ｒちゅいおｐ＠「")) {
		const ume = 
			  new MessageEmbed()
	  .setColor('#2f3136')
	  .setTitle('サーバールール・カテゴリー説明')
	  .setAuthor({ name: '💻【パソコミ】💻パソコンコミュニティ', iconURL: message.guild.iconURL() })
	  .setDescription('サーバーへの参加、ありがとうございます。\n任意ではありますが、<#933243712971104318> や<#933243864234459136> で自己紹介などをお願いしています。(>▂<)\n<#932989829300502588>では、ロールの色などを変更することができます。')
	  .addFields(
		  { name: 'ルール', value: '__**常識を守る**__\n[Discordの利用規約](https://discord.com/terms)、日本国の法律は守ってください。' },
		  { name: 'カテゴリー説明', value: '**運営対応**```運営対応のカテゴリーは サーバ内の質問や、ミュート解除の申請などを行っております。\n困ったことがあれば、お気軽に！```**メインチャンネル**```メインチャンネルのカテゴリーは 雑談や、Bot配布、Code配布、宣伝、募集などを行うことができます。\n特に使用のルールは設けていませんが、常識は守ってください。```**ボイスチャンネル**```ボイスチャンネルのカテゴリーは ボイスチャンネル系が集まっただけです。\n出入りは自由ですが、使用されたことが全くないです...```**しつもんんんんん**```しつもんんんんんのカテゴリーは 鯖民に色々質問することができます。\nご自由にお使いください。```<#948472983121436722>のチャンネルに質問内容を送信すると、スレッドができます。' }
	  );
		 message.channel.send({
	  embeds: [ume]
	   })
	   .catch(e=>message.reply(`エラー${e}`));
	}
	  if (message.content.startsWith("<zzf>くぇb;usynrn b;ｒちゅいk")) {
	  const button = new MessageButton()
		.setCustomId("taio")
		.setStyle("SUCCESS")
		.setLabel("運営対応");
		const aaa = new MessageEmbed()
			   .setColor('#0099ff')
			   .setAuthor({ name: '💻【パソコミ】💻パソコンコミュニティ', 
							iconURL:'https://cdn.discordapp.com/attachments/932989356585676820/946077328579104778/817bca99297faaa471b863458e88ae25.webp',
							url: 'https://discord.gg/uxENZNrk5n' })
	  .setDescription('下のボタンをクリックすると、運営対応チャンネルが作成されます');
		 message.channel.send({
	  embeds: [aaa],components: [new MessageActionRow().addComponents(button)]
		   })
	   .catch(e=>message.reply(`エラー${e}`));
	}
	  if (message.content.startsWith("<zzf>ｓLHIELFIふぃいごｓ")) {
	  const button = new MessageButton()
		.setCustomId("ch")
		.setStyle("SUCCESS")
		.setLabel("チャンネル作成");
		const aaa = new MessageEmbed()
			   .setColor('#0099ff')
	  .setDescription('下のボタンをクリックすると、チャンネルが作成されます');
		 message.channel.send({
	  embeds: [aaa],components: [new MessageActionRow().addComponents(button)]
		   })
	   .catch(e=>message.reply(`エラー${e}`));
	}
  });
  client.on("interactionCreate",async interaction =>{
	  if (interaction.customId === "ch") {
		   if (all_cooldown[interaction.member.user.id]) {
			if (Date.now() - all_cooldown[interaction.member.user.id] <= 900000) {
			  return interaction.reply({
				embeds: [
				  new MessageEmbed()
				  .setTitle("クールダウン中...")
				  .setDescription((900 - Math.floor((Date.now() - all_cooldown[interaction.member.user.id]) / 1000)) + "秒後に再度実行できます")
				  .setColor('RED')
				], ephemeral: true
			  });
			} else {
			  all_cooldown[interaction.member.user.id] = Date.now()
			}
		  } else {
			all_cooldown[interaction.member.user.id] = Date.now()
		  }
		 const anko = await interaction.guild.channels
		  .create(`┗🏠＞ふりぃちゃんねる`, {
			type: "text",
			parent: interaction.channel.parent,
			topic: `<@!${interaction.member.user.id}>のチャンネルです`
		  })
		  .then(async channel => {
			channel.permissionOverwrites.set([
			  {
				id: interaction.member.user.id,
				allow: ["MANAGE_CHANNELS"]
			  }
			]);
			channel.send({
			  content: "<@!" + interaction.member.user.id + ">",
			  embeds:[ new MessageEmbed()
				.setTitle("チャンネルを作成しました")
				.setDescription(
				  "このチャンネルの一部設定は変更できます。"
				)
				.setColor("0x2f3136")]
			});
		interaction.reply({
			   content: "チャンネルを作成しました\n<#"+channel.id+">",
			   ephemeral: true
		   });
		  }).catch(e =>{ 
			  console.log(`${e.message}`);
			 interaction.reply({content:"⚠",ephemeral: true});
		  });
  }
  if (interaction.customId === "taio") {
		   if (all_cooldown[interaction.member.user.id]) {
			if (Date.now() - all_cooldown[interaction.member.user.id] <= 900000) {
			  return interaction.reply({
				embeds: [
				  new MessageEmbed()
				  .setTitle("クールダウン中...")
				  .setDescription((900 - Math.floor((Date.now() - all_cooldown[interaction.member.user.id]) / 1000)) + "秒後に再度実行できます")
				  .setColor('RED')
				], ephemeral: true
			  });
			} else {
			  all_cooldown[interaction.member.user.id] = Date.now()
			}
		  } else {
			all_cooldown[interaction.member.user.id] = Date.now()
		  }
		   const  button2 = new MessageButton()
		.setCustomId("kesu")
		.setStyle("DANGER")
		.setLabel("削除");
		 const anko = await interaction.guild.channels
		  .create(`┗🎫＞運営対応（${interaction.member.user.id}）`, {
			type: "text",
			parent: interaction.channel.parent,
			topic: `<@!${interaction.member.user.id}>の運営対応チャンネルです`
		  })
		  .then(async channel => {
			channel.permissionOverwrites.set([
			  {
				id: interaction.member.user.id,
				allow: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
			  },
			  {
				id: "932529116400459786",
				deny: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
			  }
			]);
			channel.send({
			  content: "<@&932569531019329536><@!" + interaction.member.user.id + ">",
			  embeds:[ new MessageEmbed()
				.setTitle("運営対応チャンネルを作成しました")
				.setDescription(
				  "このチャンネルのメッセージは、あなたとサーバー運営にしか表示されません。\n問題等が解決したら下の『削除』ボタンをクリック！"
				)
				.setColor("0x2f3136")],
				components: [new MessageActionRow().addComponents(button2)]
			})
		interaction.reply({
			   content: "チャンネルを作成しました\n<#"+channel.id+">",
			   ephemeral: true
		   });
		  })
  }
	  if (interaction.customId === "kesu") {
		  const  button0 =[
		new MessageButton()
		.setCustomId("sakujo")
		.setStyle("SUCCESS")
		.setLabel("はい"),
		new MessageButton()
		.setCustomId("nokesu")
		.setStyle("DANGER")
		.setLabel("いいえ")
		  ]
		  await interaction.reply({
			   content: "チャンネルを削除しますか？",
			   components: [new MessageActionRow().addComponents(button0)]
		   });
	  }
	  if (interaction.customId === "sakujo") {
		   interaction.channel.delete();
	  }
		  if (interaction.customId === "nokesu") {
			 interaction.reply({
			   content: "削除をキャンセルしました",
			   ephemeral: true
		   });
		  }
  });
  client.on("messageCreate", async message => {
	  if (message.author.bot) return;
  if (message.channel.id === '948472983121436722'){
  const chName = message.content.split(/ |　/g).join("");
		if (chName.length < 4)
		  return message.react("⚠");
		  var text = message.content.replace(/\r?\n/g, ' ')
	  text = text.substr( 0 , 99 );
  const thread = await message.startThread({
			  name:text+"…",
			  autoArchiveDuration: 1440,
			  reason: 'test B',
		  })
		 .then(async(channel)=> {
		  const thread = message.channel.threads.cache.find(x => x.name === text);
			 await channel.send('<@&932571367424008243>');
			  })
		  .catch(e =>{ 
			  console.log(`${e.message}`);
			  message.react("⚠");
		  })
  }
  });
  
  client.on("ready",async message => {
	client.user.setActivity('お前ら', { type: 'WATCHING' });
	  console.log("うんてぃ");
  /*const guild = client.guilds.cache.get("932529116400459786");
  const member = await guild.members.fetch("690128204916195329");
	  const ao = "956213312239050792";
	  const ki = "956213322745786398";
  
	  const asyncOrderDrink = () => {
	  return new Promise(resolve => {
		  setTimeout(() => {
			   member.roles.remove(ao)
			.then(member.roles.add(ki))
			  resolve();
		  }, 5000)
	  });
  }
  
  const asyncPayBill = () => {
	  return new Promise(resolve => {
		  setTimeout(() => {
			   member.roles.remove(ki)
			.then(member.roles.add(ao))
			  resolve();
		  }, 5000)
	  });
  }
  
  function* makeLoopGenerator (fns) {
	  while(true) {
		  for (var fn of fns) {
			  yield fn();
		  }
	  }
  }
  
  function runLoop(generator) {
	  function loop() {
		  generator.next().value.then(loop);
	  }
	  loop();
  }
  
  runLoop(
	  makeLoopGenerator([asyncOrderDrink, asyncPayBill])
  );*/
  });
  client.on("messageCreate", async message => {
	if (!message.guild || message.author.bot) return;
	if (!message.guild.me.permissions.has("MANAGE_WEBHOOKS")) return;
	if (message.content.match(/https?:\/\/(canary\.|ptb\.)?discord(app)?\.com\/channels\/\d*\/\d*\/\d*(|\/)/)) {
		let url = message.content.match(/(http|https):\/\/(|canary\.|ptb\.)dis(cord|cordapp)\.com\/channels\/\d*\/\d*\/\d*(|\/)/)[0];
		console.log(url)
		url = url.replace(/(http|https):\/\/(|canary\.|ptb\.)dis(cord|cordapp)\.com\/channels\//, "");
		url = url.split("/", 3);
		console.log(url);
		 try {
		await client.guilds.fetch(url[0]);
		} catch(e) {
			  return console.log('はいってない')
			}
		const cacheWebhooks = new Map();
		  let msg = await client.guilds.fetch(url[0]); msg = await msg.channels.cache.get(url[1]).messages.fetch(url[2]);
			const nickname = message.member.nickname ?? message.author.username;
			const avatarURL = message.author.avatarURL({dynamic : true});
			const webhook = await getWebhookInChannel(message.channel);
			const aL = msg.author.avatarURL({dynamic : true});
			webhook.send({
			  content : msg.content,
			  username : msg.author.username,
			  avatarURL : aL
			}).catch(e => console.error(e));
		  
		
		  async function getWebhookInChannel(channel) {
			const webhook = cacheWebhooks.get(channel.id) ?? await getWebhook(channel)
			return webhook;
		  }
		  
		  async function getWebhook(channel) {
			const webhooks = await channel.fetchWebhooks();
			const webhook = webhooks?.find((v) => v.token) ?? await channel.createWebhook("༼ つ ◕_◕ ༽つ");
			if (webhook) cacheWebhooks.set(channel.id, webhook);
			return webhook;
		  }
		  
	  }
	});
  
  client.login(token)
  //BOTをログインさせる
  .then(console.log("LOGIN"))
  //成功した場合
  .catch(e => console.log(`TOKEN error${e.message}`));
  //失敗した場合 