import TelegramBot from "node-telegram-bot-api";

const TOKENs = [
	"6654105779:AAEnCdIzKS_cgJUg4rMY8yNM3LPP5iZ-d_A",
	"6452076729:AAGds4jdMEUT-idcutZdLGVjKu5kyLs3Md4",
];

const TOKEN = TOKENs[0]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

import { sendDataAboutText } from "./tgterminal.js";
import { sendDataAboutButton } from "./tgterminal.js";
import { sendDataAboutError } from "./tgterminal.js";

//? БАЗА ДАННЫХ

const httpsRequests = ["https://t.me/digsch27_bot", "https://t.me/digschbot"],
	httpsRules = [
		"https://t.me/digsch27_bot/?start=rules",
		"https://t.me/digschbot/?start=rules",
	];
let newsButtons = [
	{ text: "Новости 📖", callback_data: "allnews" },
	{ text: "О боте 🤖", callback_data: "botnews" },
	{ text: "О школе 🏫", callback_data: "schoolnews" },
];
let newsNowButtons = [
	{ text: "• Новости 📖 •", url: httpsRequests[0] },
	{ text: "• О боте 🤖 •", url: httpsRequests[0] },
	{ text: "• О школе 🏫 •", url: httpsRequests[0] },
];

// UserID

let firstName,
	userStatus = "Ученик 🧑‍🏫";

// Приветственные стикеры
const stickers = [
	"CAACAgIAAxkBAAIXI2U1QcFdX12aOkHp0zodw3LWDX5KAAKFAAPBnGAMi4wdH0hTXSIwBA",
	"CAACAgIAAxkBAAIXJGU1QclHfnHsU6z0isqU3v72p11mAAJ0AAPBnGAMtJfqrsmMmrQwBA",
	"CAACAgIAAxkBAAIXJWU1QdMJWNfIOh9odZH8Q25K98A-AAJvAAPBnGAMyw59i8DdTVYwBA",
	"CAACAgIAAxkBAAIXJmU1QdsTofm7uh7hi3mNYNE837HpAAJ6AAPBnGAM0GBdiVRCvP4wBA",
];
// Что нового? text
const newsText = [
	"Новостей нет 😔",
	"- Поддержка бота теперь ПОСТОЯННАЯ! 😆\n\n- Я стал быстрее 🏎️, во всех смыслах😉\n\n- Появилось множество новых и активных разделов🔥\n\n- Максимальная нагрузка увеличилась до 70 запросов в СЕКУНДУ 🤯",
	"МБОУ СОШ №27 | Школа с 2023г, разделена на два корпуса, но и в первом, и во втором царит классная ученическая атмосфера! Здесь каждый день — новое приключение. Ученики и учителя здесь как одна большая семья, где дружба и знание всегда рядом",
];

// Классы

const weekDayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const classes11 = [
	"Информатика. Кабинет 220. 8:30 - 9:15\nМатематика. Кабинет 315. 9:20 - 10:05\nРусский язык. Кабинет 210. 10:10 - 10:55\nФизика. Кабинет 301. 11:00 - 11:45\nИстория. Кабинет 205. 11:50 - 12:35\nАнглийский язык. Кабинет 310. 12:40 - 13:25\nФизкультура. Спортзал. 13:30 - 14:15",
];
const classes10 = [
	"Русский язык. Кабинет 210. 8:30 - 9:15\nХимия. Кабинет 303. 9:20 - 10:05\nАлгебра. Кабинет 315. 10:10 - 10:55\nИстория. Кабинет 205. 11:00 - 11:45\nФизкультура. Спортзал. 11:50 - 12:35\nЛитература. Кабинет 212. 12:40 - 13:25\nОбществознание. Кабинет 308. 13:30 - 14:15",
];
let messageId_user,
	botNum = 1,
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
	newsNum,
	newsName = "Новости 📖",
	editMode = false,
	// notification
	callsNotifStatusON = true;

//?  ФУНКЦИИ

async function menuHome(chatId, exit = true) {
	try {
		if (exit && admin) {
			await bot.editMessageText("*Чем я могу быть полезен? 🤓*", {
				chat_id: chatId,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "Расписание📚",
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
							{ text: "Напоминания 🗓️", callback_data: "reminders" },
							{ text: "Настройки ⚙️", callback_data: "options" },
						],
						[{ text: "Управление 💠", callback_data: "adminMenu" }],
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
								text: "Расписание📚",
								callback_data: "raspisanie",
							},
							{
								text: "Звонки⏰",
								callback_data: "calls",
							},
						],
						[
							{ text: "Развлечения🕹️", callback_data: "games" },
							{ text: "Интересно❗", callback_data: "news" },
						],
						[
							{ text: "Напоминания 🗓️", callback_data: "reminders" },
							{ text: "Настройки ⚙️", callback_data: "options" },
						],
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
								text: "Расписание📚",
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
							{ text: "Напоминания 🗓️", callback_data: "reminders" },
							{ text: "Настройки ⚙️", callback_data: "options" },
						],
					],
				},
			}).then((message) => {
				messageId_menuHome = message.message_id;
			});
		}
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова главного меню (menuHome)"
		);
	}
}

async function rulesBot(chatId, RulesToStart = true) {
	try {
		if (RulesToStart) {
			await bot.editMessageText(
				"*_🤖 Правила пользования 📃_\n\n\\-  Пользоваться приложением строго в благоразумных целях🌍\n\n\\-  Не совершать намеренные нарушения правил, или создание сбоев❌\n\n\\-  Бот не отвечает \\- команда \\/restart в вашем распоряжении\\!😉\n\n\\-  Нашёл ошибку? Бот по\\-прежнему не отвечает? Все предыдущие пункты соблюдены? Есть замечания по работе проекта? \\- пожалуйста сообщи об этом автору @qu1z3x 👍 *",
				{
					chat_id: chatId,
					message_id: messageId_menuHome,
					parse_mode: "MarkdownV2",
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "chooseclass2" },
								{ text: "Принять✅", callback_data: "agreerules" },
							],
						],
					},
				}
			);
		} else if (!RulesToStart) {
			await bot.editMessageText(
				"*_🤖 Правила пользования 📃_\n\n\\-  Пользоваться приложением строго в благоразумных целях🌍\n\n\\-  Не совершать намеренные нарушения правил, или создание сбоев❌\n\n\\-  Бот не отвечает \\- команда \\/restart в вашем распоряжении\\!😉\n\n\\-  Нашёл ошибку? Бот\\-по прежнему не отвечает? Все предыдущие пункты соблюдены? Есть замечания по работе проекта? \\- пожалуйста сообщи об этом автору @qu1z3x 👍 *",
				{
					chat_id: chatId,
					message_id: messageId_menuHome,
					parse_mode: "MarkdownV2",
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "options" },
								{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
							],
						],
					},
				}
			);
		}
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова правил пользования ресурсом (rulesBot)"
		);
	}
}

async function ChoosingClass(chatId, start = 1) {
	try {
		if (start == 0) {
			await bot.editMessageText(
				"*_✏️Изменение класса🔄️_\n\nПожалуйста выбери свой класс 🙂🔎*",
				{
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
								{ text: "⬅️Назад", callback_data: "options" },
								{ text: "Нет моего😞", callback_data: "netclassa" },
							],
						],
					},
				}
			);
		} else if (start == 1) {
			bot.editMessageText(
				`*Будем ближе знакомиться\\! 😊\n\n[Правила пользования ресурсом](${httpsRules[botNum]})\n\nА теперь выбирай класс* 🙂🔎`,
				{
					chat_id: chatId,
					message_id: messageId_menuHome,
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
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
			);
		} else if (start === 2) {
			bot.editMessageText(
				`*Будем ближе знакомиться\\! 😊\n\nПожалуйста _ознакомься и СОГЛАСИСЬ_ с [правилами пользования ресурсом](${httpsRules[botNum]})\n\nИ выбери свой класс* 🙂🔎`,
				{
					chat_id: chatId,
					message_id: messageId_menuHome,
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "10Г",
									url: httpsRequests[botNum],
								},
								{ text: "11A", url: httpsRequests[botNum] },
								{ text: "11В", url: httpsRequests[botNum] },
								{ text: "11Г", url: httpsRequests[botNum] },
								{
									text: "11Д",
									url: httpsRequests[botNum],
								},
							],
							[{ text: "Нет моего😞", callback_data: "netclassa2" }],
						],
					},
				}
			);
		}
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова выбора класса (ChoosingClass)"
		);
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
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова выбора дня недели для расписания (Raspisanie)"
		);
	}
}

async function RaspisanieText(chatId) {
	let raspisText = classes10[weekday];
	if (weekday == 0 || weekday == 6) {
		raspisText = "В этот день уроков нет, отдыхай! 😆";
	}
	await bot.editMessageText(
		`<b><i>⏰Расписание📚\n\n${className}</i>  ${weekDayNames[weekday]}:\n\n${raspisText}</b>`,
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

async function netClassaText(chatId, exitMenu = true) {
	try {
		if (exitMenu) {
			await bot.editMessageText(
				`*Грустно это осознавать, но видимо именно твой класс не входит в список программы _"Цифровые классы"_ 🫤\n\nНо\\! Ты всегда можешь написать @qu1z3x, и уточнить все свои потребности\\! 😉*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "chooseclass0" },
								{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
							],
						],
					},
				}
			);
		} else if (!exitMenu) {
			await bot.editMessageText(
				`*Грустно это осознавать, но видимо именно твой класс не входит в список программы _"Цифровые классы"_ 🫤\n\nНо\\! Ты всегда можешь написать @qu1z3x, и уточнить все свои потребности\\! 😉*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️К выбору", callback_data: "chooseclass2" },
								{
									text: "Написать✍️",
									url: "https://t.me/qu1z3x/?start=rules",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова объяснения отсутсвия класса (netClassaText)"
		);
	}
}

async function Calls(chatId) {
	let buttonNum,
		textCallsNotifStatus = "✅🔔",
		notifStatusButton = [
			{
				text: "✅ Включить уведомления 🔔",
				callback_data: "callsnotifON",
			},
			{
				text: "❌ Выключить уведомления 🔕",
				callback_data: "callsnotifOFF",
			},
		];

	if (!callsNotifStatusON) {
		buttonNum = 0;
		textCallsNotifStatus = "❌🔕";
	} else if (callsNotifStatusON) {
		buttonNum = 1;
		textCallsNotifStatus = "✅🔔";
	}

	try {
		await bot.editMessageText(
			`*_❗Звонки ⏰_  \\|  ${textCallsNotifStatus}\n\nРасписание звонков на сегодня:*\n\n* \\- 1* урок *08:30 \\- 09:10 \\| 15мин*\n
* \\- 2* урок *09:25 \\- 10:05 \\| 20мин*\n
* \\- 3* урок *10:25 \\- 11:05 \\| 20мин / Завтрак*\n
* \\- 4* урок *11:25 \\- 12:05 \\| 15мин*\n
* \\- 5* урок *12:20 \\- 13:00 \\| 15мин*\n
* \\- 6* урок *13:15 \\- 13:55 \\| 15мин / Обед*\n
* \\- 7* урок *14:10 \\- 14:50 \\| Домой*\n\n*По любым вопросам к @qu1z3x*`,

			{
				chat_id: chatId,
				message_id: messageId_menuHome,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[notifStatusButton[buttonNum]],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова расписания звонков (Calls)"
		);
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
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова списка развлечений (Games)"
		);
	}
}

async function game1(chatId, startGame = true) {
	try {
		let res = "";
		if (startGame)
			//? загаданное число
			rndNum = Math.floor(Math.random() * 10);
		if (admin) res = rndNum;

		bot.editMessageText(
			`*_❓Угадайка❓_\n\nЯ загадал цифру\\! ${res}\n\nОтгадывай 😉*`,
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
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова игры Угадайка (game1)"
		);
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
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова игры Цуе-Фа (game2)"
		);
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
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова результата игры Цуе-Фа (game2_2)"
		);
	}
}

async function News(chatId) {
	let previousN, nextN;

	if (newsNum == 0) {
		previousN = 1;
		nextN = 2;
	} else if (newsNum == 1) {
		previousN = 0;
		nextN = 2;
	} else if (newsNum == 2) {
		previousN = 0;
		nextN = 1;
	}

	try {
		await bot.editMessageText(
			`<b><i>❗ Интересноеttt | ${newsName}</i>\n\n${newsText[newsNum]}\n\nПо любым вопросам к @qu1z3x</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: messageId_menuHome,
				reply_markup: {
					inline_keyboard: [
						[newsNowButtons[newsNum]],
						[newsButtons[previousN], newsButtons[nextN]],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Предложить✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова меню новостей Интересно (news)"
		);
	}
}

async function AllNewsTextEdit(chatId) {
	editMode = true;

	// bot.sendMessage(chatId, "kjkjhkjh", {
	// 	reply_markup: {
	// 		keyboard: [
	// 			["..."],
	// 			["..."],
	// 		],
	// 	},
	// });

	bot.editMessageText(
		`<b><i>✏️ Редактирование: Новости 📖</i>\n\n📖 Текущий текст:</b>\n\n<i>"${newsText[0]}"</i>\n\n<b>Напиши измененный текст ниже ⬇️</b>`,
		{
			parse_mode: "html",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "⬅️Назад", callback_data: "adminMenu" },
						{
							text: "Сбросить ❌",
							callback_data: "allnewstextRESETmenu",
						},
					],
				],
			},
		}
	);
}

async function AllNewsTextEdit_2(chatId) {
	editMode = false;
	bot.editMessageText(
		`<b><i>✏️ Редактирование: Новости 📖</i>\n\n🆕 Измененный текст:</b>\n\n<i>"${newsText[0]}"</i>\n\n<b>Применить изменения?🧐</b>`,
		{
			parse_mode: "html",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Сбросить ❌",
							callback_data: "allnewstextRESETmenu",
						},
						{ text: "Применить✅", callback_data: "adminMenu" },
					],
					// [{ text: "⬅️В меню", callback_data: "exit" }],
				],
			},
		}
	);
}

async function AllNewsTextReset(chatId) {
	await bot.editMessageText(
		`*_✏️ Редактирование: Новости 📖_\n\nCбросить раздел _"Новости 📖"_ ⁉️*`,
		{
			parse_mode: "MarkdownV2",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Оставить✅", callback_data: "adminMenu" },
						{
							text: "Сбросить ❌",
							callback_data: "allnewstextRESETend",
						},
					],
				],
			},
		}
	);
}

async function Options(chatId, firstName) {
	try {
		await bot.editMessageText(
			`*_🛠️ Настройки ⚙️_*\n\nТвой логин: *${firstName}*\nРоль: *${userStatus}*\nID профиля: _*${chatId}*_\n\nКласс: *${className}\n\n[Правила пользования ресурсом](https://t.me/digschbot/?start=rules2)*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[{ text: "Сменить класс 🔄", callback_data: "chooseclass0" }],

						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова меню настроек (Options)"
		);
	}
}

async function adminMenu(chatId) {
	await bot.editMessageText(
		"*_💠Центр управления💠_\n\nДобрый день\\, Давид\\!\n\nЧем я могу быть полезен\\? 🤖*",
		{
			parse_mode: "MarkdownV2",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Тест 📟", callback_data: "adminMenu1" },
						{ text: "Изменение ✏️", callback_data: "adminMenu2" },
					],
					[{ text: "⬅️Назад", callback_data: "exit" }],
				],
			},
		}
	);
}

async function adminMenuTest(chatId) {
	await bot.editMessageText(
		"*_♻️ Тестирование 📟_\n\nБыстрый доступ ко всем элементам\\:*",
		{
			parse_mode: "MarkdownV2",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[{ text: "🔥 Расписание 📚", callback_data: "raspisanie" }],
					[
						{ text: "На сегодня 🕚", callback_data: "today" },
						{ text: "Нет моего 😞", callback_data: "netclassa" },
					],
					[{ text: "Развлечения 🕹️", callback_data: "games" }],
					[
						{ text: "Угадайка❓", callback_data: "game1" },
						{ text: "Цуе-Фа ✌️", callback_data: "game2" },
					],
					[{ text: "Интересное❗", callback_data: "news" }],
					[
						{ text: "О боте 🤖", callback_data: "botnews" },
						{ text: "О школе 🏫", callback_data: "schoolnews" },
					],
					[{ text: "Новости 📖", callback_data: "allnews" }],
					[
						{ text: "Новый диалог ♻️", callback_data: "start" },
						{ text: "Перезапуск 🔄️", callback_data: "restart1" },
					],
					[{ text: "⬅️Назад", callback_data: "adminMenu" }],
				],
			},
		}
	);
}

async function adminMenuEdit(chatId) {
	await bot.editMessageText(
		"*_📖 Изменение ✏️_ \n\nКакие правки вы хотите внести\\?🤖*",
		{
			parse_mode: "MarkdownV2",
			chat_id: chatId,
			message_id: messageId_menuHome,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: `✏️Измененить "Новости📖"`,
							callback_data: "allnewsEDIT",
						},
					],
					[{ text: "⬅️Назад", callback_data: "adminMenu" }],
				],
			},
		}
	);
}

async function start(chatId, userName, quickStart = false) {
	let rndNum = Math.floor(Math.random() * stickers.length);

	await bot.sendSticker(chatId, stickers[rndNum]).then((message) => {
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
			"*Я чат\\-бот 🤖, поддерживаю _цифровое_ обучение🏫\\. Я буду твоим верным учебным помошником😉\\!\n • Нужно уточнить распиание?📚\n • Подсказать когда идти на урок?⏰\n • Напомнить о твоих планах?📝\n • Сыграть партейку в Цуе\\-Фа?✌️\n • Рассказать школьные новости?📖\n\\- то я к твоим услугам, поехали\\!🚀*",
			{
				parse_mode: "MarkdownV2",
			}
		)
		.then((message) => {
			messageId_sayHi2Home = message.message_id;
		});

	await bot.sendMessage(chatId, `ㅤ`, {}).then((message) => {
		messageId_menuHome = message.message_id;
	});

	if (quickStart) {
		menuHome(chatId);
		className = "Не выбран";
	} else if (!quickStart) {
		ChoosingClass(chatId, 2);
	}
}

async function endMessage(chatId) {
	try {
		await bot.editMessageText(
			`*С тобой было _классно_\\!😁\nВстретимся тут ⬇️😉*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: messageId_menuHome,
			}
		);
	} catch (error) {
		sendDataAboutError(
			chatId,
			"Не обработан момент прощания, завершения перед новым диалогом (endMessage)"
		);
	}
}

async function StartAll() {
	// bot.sendMessage(userId, ""); //?                                                         Принудительная отправка сообщений определенному лицу.

	if (TOKEN == TOKENs[0]) botNum = 0;
	else if (TOKEN == TOKENs[1]) botNum = 1;

	bot.on("message", async (message) => {
		const chatId = message.chat.id;

		if (chatId == "923690530") {
			admin = true;
			userStatus = "Администратор 👑";
		} else {
			admin = false;
			userStatus = "Ученик 🧑‍🏫";
		}

		messageId_user = message.message_id;
		const text = message.text;
		firstName = message.from.first_name;

		// время отправки
		let date = new Date(message.date * 1000),
			d = date.getDay(),
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			time = `${String(h).padStart(2, "0")}:${String(m).padStart(
				2,
				"0"
			)}:${String(s).padStart(2, "0")}`;

		//* для удобства в терминале

		sendDataAboutText(
			message.from.first_name,
			message.from.username,
			chatId,
			text
		);
		// ${JSON.stringify(message)}
		console.log(
			`\n${time} ${weekDayNames[d]} | text | ${message.from.first_name} ${message.from.username} <${chatId}>  -  "${text}" `
		);

		if (editMode) {
			editMode = false;
			newsText[0] = text;
			AllNewsTextEdit_2(chatId);
		}

		//? КОМАНДЫ

		switch (text) {
			case "s":
			case "/start":
				endMessage(chatId);
				bot.deleteMessage(chatId, messageId_user);
				start(chatId, message.from.first_name);
				break;
			case "st":
				endMessage(chatId);
				bot.deleteMessage(chatId, messageId_user);
				start(chatId, message.from.first_name, true);
				break;
			case "/restart":
				try {
					await bot.deleteMessage(chatId, messageId_menuHome);
				} catch (error) {
					sendDataAboutError(
						chatId,
						"Не найден message_id menuHome, создано новое сообщение (/restart)"
					);
				}
				bot.deleteMessage(chatId, messageId_user);
				menuHome(chatId, false);
				break;
			case "/start rules":
				bot.deleteMessage(chatId, messageId_user);
				rulesBot(chatId);
				break;
			case "/start rules2":
				bot.deleteMessage(chatId, messageId_user);
				rulesBot(chatId, false);
				break;
			default:
				try {
					await bot.deleteMessage(chatId, messageId_user);
				} catch (error) {
					sendDataAboutError(
						chatId,
						"Не обработан момент удаления лишнего сообщения пользователя (default)"
					);
				}
				break;
		}
	});

	//? ОБРАБОТЧИК КЛАВИАТУРЫ ПОД СООБЩЕНИЯМИ

	bot.on("callback_query", (query) => {
		const chatId = query.message.chat.id;
		firstName = query.from.first_name;
		newsNum = 0;

		if (chatId == "923690530") {
			admin = true;
			userStatus = "Администратор 👑";
		} else {
			admin = false;
			userStatus = "Ученик 🧑‍🏫";
		}

		const data = query.data;
		messageId_menuHome = query.message.message_id;

		// время отправки
		let hintText,
			date = new Date(),
			d = date.getDay(),
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			time = `${String(h).padStart(2, "0")}:${String(m).padStart(
				2,
				"0"
			)}:${String(s).padStart(2, "0")}`;

		//* для удобства в терминале

		sendDataAboutButton(
			query.from.first_name,
			query.from.username,
			chatId,
			data
		);

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
				weekday = 1;
				RaspisanieText(chatId);
				break;
			case "tue":
				weekday = 2;
				RaspisanieText(chatId);
				break;
			case "wen":
				weekday = 3;
				RaspisanieText(chatId);
				break;
			case "thu":
				weekday = 4;
				RaspisanieText(chatId);
				break;
			case "fri":
				weekday = 5;
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

			// Начальные
			case "start":
				endMessage(chatId);
				start(chatId, firstName);
				break;
			case "exit":
				editMode = false;
				try {
					menuHome(chatId);
				} catch (error) {
					sendDataAboutError(
						"Не обработан момент выхода в меню, создано новое сообщение (exit)"
					);
					menuHome(chatId, false);
				}
				break;
			case "chooseclass1":
				ChoosingClass(chatId, 1);
				break;
			case "chooseclass2":
				ChoosingClass(chatId, 2);
				break;

			// RASPISANIE

			case "raspisanie":
				Raspisanie(chatId);
				break;
			case "netclassa":
				netClassaText(chatId);
				break;
			case "netclassa2":
				netClassaText(chatId, false);
				break;

			// CALLS

			case "calls":
				Calls(chatId);
				break;
			case "callsnotifON":
				callsNotifStatusON = true;
				Calls(chatId);
				break;
			case "callsnotifOFF":
				callsNotifStatusON = false;
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
			case "hint":
				if (rndNum <= 5) {
					hintText = `Число _меньше_ или равно 5\\! 📉😉`;
				} else if (rndNum >= 5) {
					hintText = `Число _больше_ или равно 5\\! 📈😉`;
				}
				bot.editMessageText(`*_❓Угадайка❓_\n\n${hintText}*`, {
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "game1_1" },
								{ text: "Ответ⁉️", callback_data: "game1res" },
							],
						],
					},
				});
				break;
			case "game1res":
				bot.editMessageText(
					`*_❓Угадайка❓_\n\nНу так не интересно\\! 😒\nОтвет: ${rndNum}\\!\n\nЕще партейку\\? 🤔*`,
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
				break;
			case "game1_1":
				game1(chatId, false);
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
				newsName = "Новости 📖";
				newsNum = 0;
				News(chatId);
				break;
			case "allnews":
				newsName = "Новости 📖";
				newsNum = 0;
				News(chatId);
				break;
			case "botnews":
				newsName = "О боте 🤖";
				newsNum = 1;
				News(chatId);
				break;
			case "schoolnews":
				newsName = "О школе 🏫";
				newsNum = 2;
				News(chatId);
				break;

			// OPTIONS

			case "options":
				Options(chatId, firstName);
				break;
			case "chooseclass0":
				ChoosingClass(chatId, 0);
				break;

			// ADMINMENU

			case "adminMenu":
				adminMenu(chatId);
				break;
			case "adminMenu1":
				adminMenuTest(chatId);
				break;
			case "adminMenu2":
				adminMenuEdit(chatId);
				break;
			case "allnewsEDIT":
				AllNewsTextEdit(chatId);
				break;
			case "allnewstextRESETmenu":
				AllNewsTextReset(chatId);
				break;
			case "allnewstextRESET":
				AllNewsTextEdit(chatId);
				break;
			case "allnewstextRESETend":
				newsText[0] = "Новостей нет 😔";
				bot.editMessageText(
					`*_✏️ Редактирование: Новости 📖_\n\nРаздел _"Новости📖"_ \\- сброшен\\!✅*`,
					{
						parse_mode: "MarkdownV2",
						chat_id: chatId,
						message_id: messageId_menuHome,
					}
				);
				setTimeout(() => {
					adminMenu(chatId);
				}, 2000);
				break;
			case "restart1":
				ChoosingClass(chatId, 2);
				break;
			case "agreerules":
				bot.editMessageText(`*Спасибо тебе ❤️ \\- команда @qu1z3x*`, {
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: messageId_menuHome,
				});
				setTimeout(() => {
					ChoosingClass(chatId, 1);
				}, 2000);
			default:
				break;
		}
	});
}

StartAll();
