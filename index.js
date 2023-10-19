const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "6452076729:AAGds4jdMEUT-idcutZdLGVjKu5kyLs3Md4";
// 6452076729:AAGds4jdMEUT-idcutZdLGVjKu5kyLs3Md4 - оригинал
// 6654105779:AAEnCdIzKS_cgJUg4rMY8yNM3LPP5iZ-d_A - прототип

const bot = new TelegramBot(TOKEN, { polling: true });

//? БАЗА ДАННЫХ

// UserID
const qu1z3x = "923690530";

let firstName;

// Что нового? (text)
const newsText = [
	"- Я стал в 2 раза быстрее 🏎️, если иначе, то обратите внимание на свой интернет😉\n- У меня появилось множество новых и активных разделов🆕\n\nНо! все еще не 24/7 поддержка 🥺",
	"- 87687687687687687666 66 8976 877 6876 876\n\n987879879 87987\n9079798798\n98798798 7987",
];

// Классы

const weekDayNames = [
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота",
	"Воскресенье",
];

const r11g = [
	"Информатика. Кабинет 220. 8:30 - 9:15\nМатематика. Кабинет 315. 9:20 - 10:05\nРусский язык. Кабинет 210. 10:10 - 10:55\nФизика. Кабинет 301. 11:00 - 11:45\nИстория. Кабинет 205. 11:50 - 12:35\nАнглийский язык. Кабинет 310. 12:40 - 13:25\nФизкультура. Спортзал. 13:30 - 14:15",
];
const r11a = [
	"Русский язык. Кабинет 210. 8:30 - 9:15\nХимия. Кабинет 303. 9:20 - 10:05\nАлгебра. Кабинет 315. 10:10 - 10:55\nИстория. Кабинет 205. 11:00 - 11:45\nФизкультура. Спортзал. 11:50 - 12:35\nЛитература. Кабинет 212. 12:40 - 13:25\nОбществознание. Кабинет 308. 13:30 - 14:15",
];
let messageId_user,
	messageId_All,
	admin = false,
	// home
	messageId_sayHi0Home,
	messageId_sayHi1Home,
	messageId_sayHi2Home,
	messageId_sayHi3Home,
	messageId_menuHome,
	// Raspisanie
	className = "10Г",
	weekday,
	// game1
	rndNum = 0,
	// game2
	computerChoise,
	playerChoise,
	// news
	newsNum;

//?  ФУНКЦИИ

async function menuHome(chatId, exit = true) {
	try {
		if (exit && admin) {
			await bot.editMessageText("*Чем я могу быть полезен? 🤓*", {
				chat_id: qu1z3x,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "🔥Расписание📚",
								callback_data: "raspisanie",
							},
							{
								text: "Звонки⏰",
								callback_data: "calls",
							},
						],
						[
							{ text: "Развлечения🕹️", callback_data: "games" },
							{ text: "Интересное❗", callback_data: "news" },
						],
						[
							{ text: "💠 Реестр 💠", callback_data: "adminMenu" },
							{ text: "Настройки ⚙️", callback_data: "options" },
						],
					],
				},
			});
		} else if (exit) {
			await bot.editMessageText("*Чем я могу быть полезен? 🤓*", {
				chat_id: chatId,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "🔥Расписание📚",
								callback_data: "raspisanie",
							},
							{
								text: "Звонки⏰",
								callback_data: "calls",
							},
						],
						[
							{ text: "Развлечения🕹️", callback_data: "games" },
							{ text: "Интересное❗", callback_data: "news" },
						],
						[{ text: "Настройки ⚙️", callback_data: "options" }],
					],
				},
			});
		} else if (!exit) {
			bot.sendMessage(chatId, "*Чем я могу быть полезен? 🤓*", {
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "🔥Расписание📚",
								callback_data: "raspisanie",
							},
							{
								text: "Звонки⏰",
								callback_data: "calls",
							},
						],
						[
							{ text: "Развлечения🕹️", callback_data: "games" },
							{ text: "Интересное❗", callback_data: "news" },
						],
						[{ text: "Настройки ⚙️", callback_data: "options" }],
					],
				},
			}).then((message) => {
				messageId_menuHome = message.message_id;
			});
		}
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function ChoosingClass(chatId, exit = false) {
	try {
		if (exit) {
			await bot.editMessageText("*Пожалуйста выбери свой класс 🙂🔎*", {
				chat_id: chatId,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "10Г", callback_data: "10g" },
							{ text: "11A", callback_data: "11a" },
							{ text: "11В", callback_data: "11v" },
							{ text: "11Г", callback_data: "11g" },
							{ text: "11Д", callback_data: "11d" },
						],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Нет моего😞", callback_data: "netclassa" },
						],
					],
				},
			});
		} else if (!exit) {
			bot.sendMessage(
				chatId,
				"*Будем ближе знакомиться\\!😊\n\nПожалуйста выбери свой класс 🙂🔎*",
				{
					parse_mode: "MarkdownV2",
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "10Г", callback_data: "10g" },
								{ text: "11A", callback_data: "11a" },
								{ text: "11В", callback_data: "11v" },
								{ text: "11Г", callback_data: "11g" },
								{ text: "11Д", callback_data: "11d" },
							],
						],
					},
				}
			).then((message) => {
				messageId_menuHome = message.message_id;
			});
		}
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function Raspisanie(chatId) {
	try {
		await bot.editMessageText(
			`*_⏰Расписание📚_*\n\nКласс: *${className}* \\- _можно сменить в *настройках*_\n\n*На какой день показать расписание❓🤔*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "На сегодня 🕚",
								callback_data: "today",
							},
							{
								text: "На завтра 🕰️",
								callback_data: "tomorrow",
							},
						],
						[
							{ text: "Пн 😩", callback_data: "mon" },
							{ text: "Вт 😞", callback_data: "tue" },
							{ text: "Ср 😟", callback_data: "wen" },
						],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Чт 🙂", callback_data: "thu" },
							{ text: "Пт 😆", callback_data: "fri" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function RaspisanieText(chatId) {
	await bot.editMessageText(
		`<b><i>⏰Расписание📚\n\n${className}  ${weekDayNames[weekday]}:</i>\n\n${r11g}</b>`,
		{
			parse_mode: "html",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "⬅️В меню", callback_data: "exit" },
						{ text: "Сменить🔁", callback_data: "raspisanie" },
					],
				],
			},
		}
	);
}

async function netClassaText(chatId) {
	try {
		await bot.editMessageText(
			`*Грустно это осознавать, но видимо именно твой класс не входит в список программы _"Цифровые классы"_ 🫤\n\nНо\\! Ты всегда можешь написать @qu1z3x, и уточнить все свои потребности\\! 😉*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️Назад", callback_data: "raspisanie" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function Calls(chatId) {
	try {
		await bot.editMessageText(
			`*_❗Звонки ⏰_\n\nРасписание звонков на сегодня:*\n\n* \\- 1* урок *08:30 \\- 09:10 \\| 15мин*\n
* \\- 2* урок *09:25 \\- 10:05 \\| 20мин*\n
* \\- 3* урок *10:25 \\- 11:05 \\| 20мин / Завтрак*\n
* \\- 4* урок *11:25 \\- 12:05 \\| 15мин*\n
* \\- 5* урок *12:20 \\- 13:00 \\| 15мин*\n
* \\- 6* урок *13:15 \\- 13:55 \\| 15мин / Обед*\n
* \\- 7* урок *14:10 \\- 14:50 \\| Домой*\n\n*Звонки работают иначе?\nСообщи @qu1z3x*`,
			{
				chat_id: chatId,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("Произошла ошибка(");
	}
}

async function Games(chatId) {
	try {
		await bot.editMessageText("*_😆Развлечения🕹️_\n\nВо что сыграем? 🤔*", {
			chat_id: chatId,
			message_id: messageId_menuHome,
			parse_mode: "MarkdownV2",
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Угадайка❓", callback_data: "game1" },
						{ text: "Цуе-Фа ✌️", callback_data: "game2" },
					],
					[{ text: "⬅️В меню", callback_data: "exit" }],
				],
			},
		});
	} catch (error) {
		await bot.sendMessage(
			chatId,
			"*_😆Развлечения🕹️_\n\nВо что сыграем? 🤔*",
			{
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "Угадайка❓", callback_data: "game1" },
							{ text: "КМН 🪨✂️🧻", callback_data: "game2" },
						],
						[{ text: "⬅️В меню", callback_data: "exit" }],
					],
				},
			}
		);
	}
}

async function game1(chatId, startGame = true) {
	//? загаданное число
	try {
		if (startGame) {
			rndNum = Math.floor(Math.random() * 10);
		}
		bot.editMessageText(
			"*_❓Угадайка❓_\n\nЯ загадал число \\(0 \\- 9\\)\n\nОтгадывай 😉*",
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "1", callback_data: "1" },
							{ text: "2", callback_data: "2" },
							{ text: "3", callback_data: "3" },
						],
						[
							{ text: "4", callback_data: "4" },
							{ text: "5", callback_data: "5" },
							{ text: "6", callback_data: "6" },
						],
						[
							{ text: "7", callback_data: "7" },
							{ text: "8", callback_data: "8" },
							{ text: "9", callback_data: "9" },
						],
						[
							{ text: "⬅️", callback_data: "games" },
							{ text: "0", callback_data: "0" },
							{ text: "💡", callback_data: "hint" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function game2(chatId) {
	try {
		await bot.editMessageText(
			"*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\nЧто выберешь❓\nСоперник уже на подходе❗ 😥*",
			{
				chat_id: chatId,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "✊", callback_data: "stone" },
							{ text: "✌️", callback_data: "scissors" },
							{ text: "🖐️", callback_data: "paper" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function game2_2(chatId, playerNum) {
	const options = ["✊", "✌️", "🖐️"];
	rndNum = Math.floor(Math.random() * options.length);
	playerChoise = options[playerNum - 1];
	computerChoise = options[rndNum];

	try {
		if (playerChoise === computerChoise) {
			bot.editMessageText(
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n🤷‍♂️ Ничья\\! 🤷‍♀️\n\nРезультат\\:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\nЕще партейку\\? 🤔*`,
				{
					chat_id: chatId,
					message_id: messageId_menuHome,
					parse_mode: "MarkdownV2",
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️В меню", callback_data: "games" },
								{ text: "Давай👌", callback_data: "game2" },
							],
						],
					},
				}
			);
		} else if (
			(playerChoise === "✊" && computerChoise === "✌️") ||
			(playerChoise === "✌️" && computerChoise === "🖐️") ||
			(playerChoise === "🖐️" && computerChoise === "✊")
		) {
			bot.editMessageText(
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n✅ Ты победил\\! 🥳\n\nРезультат:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\nЕще партейку\\? 🤔*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "games" },
								{ text: "Давай👌", callback_data: "game2" },
							],
						],
					},
				}
			);
		} else {
			bot.editMessageText(
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n❌ Ты проиграл\\! 😔\n\nРезультат:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\nЕще партейку\\? 🤔*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "games" },
								{ text: "Давай👌", callback_data: "game2" },
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function News(chatId) {
	try {
		newsNum = 0;
		await bot.editMessageText(
			`<b><i>❗ Интересное ❗</i>\n\n${newsText[newsNum]}\n\nПо любым вопросам к @qu1z3x</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: messageId_menuHome,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "О боте 🤖", callback_data: "botnews" },
							{ text: "О школе 🏫", callback_data: "schoolnews" },
						],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}
async function Options(chatId, firstName, userName) {
	try {
		await bot.editMessageText(
			`*_🛠️ Настройки ⚙️_*\n\nТвой логин: *${firstName}*\nID профиля: _*${chatId}*_\nКласс: *${className}*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
				reply_markup: {
					inline_keyboard: [
						[{ text: "Сменить класс 🔄", callback_data: "chooseclass" }],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
}

async function adminMenu(chatId) {
	await bot.editMessageText(
		"*_💠Центр управления💠_\n\nДобрый день\\, Давид\\!\n\nЧто вы желаете _изменить_ во мне\\? 🧑‍💻*",
		{
			parse_mode: "MarkdownV2",
			chat_id: qu1z3x,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[{ text: "Что нового❓", callback_data: "newsEDIT" }],
					[{ text: "⬅️Назад", callback_data: "exit" }],
				],
			},
		}
	);
}

async function start(chatId, userName, quickStart = false) {
	try {
		bot.deleteMessage(chatId, messageId_user);
	} catch (error) {
		console.log("\nПроизошла ошибка(");
	}
	await bot
		.sendSticker(
			chatId,
			"CAACAgIAAxkBAAIPoGURnYZUL89bmAaLJgNI0kU7v-xXAAKAAAPBnGAMNSI9fXm2854wBA"
		)
		.then((message) => {
			messageId_sayHi0Home = message.message_id;
		});

	await bot
		.sendMessage(chatId, `*Салют ${userName} ✌️*`, {
			parse_mode: "MarkdownV2",
		})
		.then((message) => {
			messageId_sayHi1Home = message.message_id;
		});

	await bot
		.sendMessage(
			chatId,
			"*Я чат\\-бот 🤖, созданный для поддержки _цифровых_ классов в школе 🏫\\. Я буду помогать ученикам на уроках 📈, предоставлять полезную информацию📖,|| развлекать🤩||, и запрещать вам скучать😁\\. Давайте же начнем наше увлекательное путешествие в мир _цифровых классов_\\!*🚀",
			{
				parse_mode: "MarkdownV2",
			}
		)
		.then((message) => {
			messageId_sayHi2Home = message.message_id;
		});

	await bot.sendMessage(chatId, "ㅤ").then((message) => {
		messageId_sayHi3Home = message.message_id;
	});
	if (quickStart) {
		menuHome(chatId, false);
		className = "Не определен";
	} else if (!quickStart) {
		ChoosingClass(chatId);
	}
}

async function StartAll() {
	// bot.sendMessage(userId, "..."); //?                                                         Принудительная отправка сообщений определенному лицу.

	bot.on("message", async (message) => {
		const chatId = message.chat.id;

		if (chatId == qu1z3x) {
			admin = true;
		} else {
			admin = false;
		}

		messageId_user = message.message_id;
		const text = message.text;
		firstName = message.from.first_name;

		// время отправки
		let date = new Date(message.date * 1000),
			d = date.getDay() - 1,
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			time = `${String(h).padStart(2, "0")}:${String(m).padStart(
				2,
				"0"
			)}:${String(s).padStart(2, "0")}`;

		//* для удобства в терминале
		console.log(
			`\n${time} ${weekDayNames[d]} | text | ${message.from.first_name} ${message.from.username} <${chatId}>  -  "${text}"`
		);

		//? КОМАНДЫ

		switch (text) {
			case "/start":
				start(chatId, message.from.first_name);
				break;
			case "st":
				start(chatId, message.from.first_name, true);
				break;

			case "/restart":
				try {
					await bot.deleteMessage(chatId, messageId_menuHome);
				} catch (error) {}
				bot.deleteMessage(chatId, messageId_user);
				menuHome(chatId, false);
				break;
			default:
				try {
					await bot.deleteMessage(chatId, messageId_user);
				} catch (error) {
					console.log("\nПроизошла ошибка(");
				}
				break;
		}
	});

	//? ОБРАБОТЧИК КЛАВИАТУРЫ ПОД СООБЩЕНИЯМИ

	bot.on("callback_query", (query) => {
		const chatId = query.message.chat.id;
		firstName = query.from.first_name;

		if (chatId == "923690530") {
			admin = true;
		} else {
			admin = false;
		}

		const data = query.data;
		messageId_menuHome = query.message.message_id;

		// время отправки
		let hintText,
			date = new Date(),
			d = date.getDay() - 1,
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			time = `${String(h).padStart(2, "0")}:${String(m).padStart(
				2,
				"0"
			)}:${String(s).padStart(2, "0")}`;

		//* для удобства в терминале
		console.log(
			`\n${time} ${weekDayNames[d]} | button | ${query.from.first_name} ${query.from.username} <${chatId}>  -  [${data}]`
		);

		if (data == rndNum) {
			bot.editMessageText(
				`*_❓Угадайка❓_\n\n✅ Правильно ${rndNum}\\!🥳 \n\nПопробуем снова??*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "games" },
								{ text: "Давай👌", callback_data: "game1" },
							],
						],
					},
				}
			);
		} else if (
			data == "0" ||
			data == "1" ||
			data == "2" ||
			data == "3" ||
			data == "4" ||
			data == "5" ||
			data == "6" ||
			data == "7" ||
			data == "8" ||
			data == "9"
		) {
			bot.editMessageText(
				`*_❓Угадайка❓_\n\n❌ Не правильно 😔\nОтвет: ${rndNum}\\! \n\nПопробуем снова??*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "games" },
								{ text: "Давай👌", callback_data: "game1" },
							],
						],
					},
				}
			);
		} else if (data == "hint") {
			if (rndNum <= 5) {
				hintText = `Число _меньше_ или равно 5\\! 📉😉`;
			} else if (rndNum >= 5) {
				hintText = `Число _больше_ или равно 5\\! 📈😉`;
			}
			bot.editMessageText(`*_❓Угадайка❓_\n\n${hintText}*`, {
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
			});
			setTimeout(() => {
				game1(chatId, false);
			}, 1500);
		}

		switch (data) {
			//? КЛАССЫ/РАСПИСАНИЕ

			case "10g":
				className = "10Г";
				menuHome(chatId);
				break;
			case "11d":
				className = "11Д";
				menuHome(chatId);
				break;
			case "11g":
				className = "11Г";
				menuHome(chatId);
				break;
			case "11a":
				className = "11А";
				menuHome(chatId);
				break;
			case "11v":
				className = "11В";
				menuHome(chatId);
				break;

			//? ДЕНЬ НЕДЕЛИ

			case "mon":
				weekday = 0;
				RaspisanieText(chatId);
				break;
			case "tue":
				weekday = 1;
				RaspisanieText(chatId);
				break;
			case "wen":
				weekday = 2;
				RaspisanieText(chatId);
				break;
			case "thu":
				weekday = 3;
				RaspisanieText(chatId);
				break;
			case "fri":
				weekday = 4;
				RaspisanieText(chatId);
				break;
			case "today":
				weekday = d;
				RaspisanieText(chatId);
				break;
			case "tomorrow":
				weekday = d + 1;
				RaspisanieText(chatId);
				break;

			//? ДЕЙСТВИЯ КНОПОК

			case "exit":
				try {
					menuHome(chatId);
				} catch (error) {
					menuHome(chatId, false);
				}
				break;
			// RASPISANIE
			case "chooseclass":
				ChoosingClass(chatId, true);
				break;
			case "raspisanie":
				Raspisanie(chatId);
				break;
			case "netclassa":
				netClassaText(chatId);
				break;

			// CALLS
			case "calls":
				Calls(chatId);
				break;

			// GAMES
			case "games":
				Games(chatId);
				break;
			// game1
			case "game1":
				game1(chatId);
				break;
			// game2
			case "game2":
				game2(chatId);
				break;
			case "stone":
				game2_2(chatId, 1);
				break;
			case "scissors":
				game2_2(chatId, 2);
				break;
			case "paper":
				game2_2(chatId, 3);
				break;

			// NEWS (What's new)
			case "news":
				News(chatId);
				break;
			case "botnews":
				if (newsNum != 0) {
					newsNum = 0;
					News(chatId);
				}

				break;
			case "schoolnews":
				if (newsNum != 1) {
					newsNum = 1;
					News(chatId);
				}
				break;
			// OPTIONS
			case "options":
				Options(chatId, firstName);
				break;
			// ADMINMENU
			case "adminMenu":
				adminMenu(chatId);
				break;
			default:
				break;
		}
	});
}
StartAll();
