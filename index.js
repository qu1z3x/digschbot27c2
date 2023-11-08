import TelegramBot from "node-telegram-bot-api";

const TOKENs = [
	"6654105779:AAEnCdIzKS_cgJUg4rMY8yNM3LPP5iZ-d_A",
	"6452076729:AAGds4jdMEUT-idcutZdLGVjKu5kyLs3Md4",
];
const qu1z3xId = "923690530";

const TOKEN = TOKENs[1]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

import { sendDataAboutText } from "./tgterminal.js";
import { sendDataAboutButton } from "./tgterminal.js";
import { sendDataAboutError } from "./tgterminal.js";
import { sendDataAboutAction } from "./tgterminal.js";

//? БАЗА ДАННЫХ

let reminder = []; // существующие заметки
let usersData = []; // информация о пользователях

const httpsRequests = ["https://t.me/digsch27_bot", "https://t.me/digschbot"];
const httpsRules = [
	"https://t.me/digsch27_bot/?start=rules",
	"https://t.me/digschbot/?start=rules",
];

// UserID

let userStatus = "Ученик 🧑‍🏫";

// Приветственные стикеры
const stickers = [
	"CAACAgIAAxkBAAIXI2U1QcFdX12aOkHp0zodw3LWDX5KAAKFAAPBnGAMi4wdH0hTXSIwBA",
	"CAACAgIAAxkBAAIXJGU1QclHfnHsU6z0isqU3v72p11mAAJ0AAPBnGAMtJfqrsmMmrQwBA",
	"CAACAgIAAxkBAAIXJWU1QdMJWNfIOh9odZH8Q25K98A-AAJvAAPBnGAMyw59i8DdTVYwBA",
	"CAACAgIAAxkBAAIXJmU1QdsTofm7uh7hi3mNYNE837HpAAJ6AAPBnGAM0GBdiVRCvP4wBA",
];
bot.setMyCommands([
	{
		command: "/restart",
		description: "Перезапуск 👾",
	},
]);

// Что нового? text
const newsText = [
	"",
	"Новостей нет 😔",
	"- Полностью обновлен раздел с настройками ✅\n\n- Отслеживай статистику сыгранных игр 👌\n\n- Объем всего функционала бота, упирается в +2500 строк кода 🫡\n\n- Я стал быстрее 🏎️, во всех смыслах😉\n\n- Максимальная нагрузка увеличилась до 50 запросов в СЕКУНДУ 🤯",
	'МБОУ СОШ №27 | Школа с 2023г, разделена на два корпуса, но и в первом, и во втором царит классная ученическая атмосфера! Здесь каждый день — новое приключение. Ученики и учителя здесь как одна большая семья, где дружба и знание всегда рядом. Также существует множество спортивных секций в обеих корпусах! \n\nСовсем недавно наша школа заняла 3-е место, в турнире "Кубок памяти А. З. Бакурова", сыграв со всеми школами в округе!',
];

// Классы

const weekDayNames = [
	"Воскресенье",
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота",
];

const monthNames = [
	"Января",
	"Февраля",
	"Марта",
	"Апреля",
	"Мая",
	"Июня",
	"Июля",
	"Августа",
	"Сентября",
	"Октября",
	"Ноября",
	"Декабря",
];

const classes11 = [
	"1. Информатика - 220\n2. Математика - 315\n3. Русский язык - 210\n4. Физика - 301\n5. История - 205\n6. Английский язык - 310\n7. Физкультура - Спортзал",
];
const classes10 = [
	"1. Информатика - 220\n2. Математика - 315\n3. Русский язык - 210\n4. Физика - 301\n5. История - 205\n6. Английский язык - 310\n7. Физкультура - Спортзал",
];
let messageId_user,
	botNum = 1,
	// Raspisanie
	className = "Не определен",
	weekday,
	month,
	day,
	dayW,
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
	textCallsNotifStatus = "❌🔕",
	// reminders
	textRem = "",
	timeRem,
	// adminMenu
	textMessageForAllUsers;

//?  ФУНКЦИИ

async function menuHome(chatId, exit = true) {
	const greetingsText = [
		"Чем я могу тебе пригодиться? 😉",
		"Чем я могу быть полезен? 🤓",
		"Чем я могу быть полезным? 🥸",
		"Чем я могу тебя облегчить? 🐵",
		"С чем я могу тебе помочь? 🤔",
		"Чем я могу помочь сегодня? 🤖",
		"Как я могу тебя удовлетворить? 🐤",
		"В чем я могу быть полезен? 👾",
	];
	rndNum = Math.floor(Math.random() * greetingsText.length);

	try {
		let adminMenuButtonText = "";
		if (chatId == qu1z3xId || chatId == "6815420098") {
			adminMenuButtonText = "💠 Управление 💠";
		}

		if (exit) {
			await bot.editMessageText(`*${greetingsText[rndNum]}*`, {
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
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
							{ text: "Напоминания🗓️", callback_data: "reminders" },
							{ text: "Настройки⚙️", callback_data: "options" },
						],
						[
							{
								text: `${adminMenuButtonText}`,
								callback_data: "adminMenu",
							},
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
							{ text: "Напоминания🗓️", callback_data: "reminders" },
							{ text: "Настройки⚙️", callback_data: "options" },
						],
						[
							{
								text: `${adminMenuButtonText}`,
								callback_data: "adminMenu",
							},
						],
					],
				},
			});
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова главного меню (menuHome)"
		);
	}
}

async function rulesBot(chatId, RulesToStart = true) {
	let rulesText =
		"*_🤖 Правила пользования 📃_\n\n\\-  Пользоваться приложением строго в благих целях🌍\n\n\\-  Не совершать намеренные нарушения правил, или создание сбоев❌\n\n\\-  Бот не отвечает \\- команда \\/restart в вашем распоряжении\\!😉\n\n\\-  Нашёл ошибку? Бот по\\-прежнему не отвечает? Есть замечания по работе проекта? \\- пожалуйста сообщи об этом автору @qu1z3x 👍 *";

	if (RulesToStart) {
		try {
			await bot.editMessageText(rulesText, {
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️Назад", callback_data: "chooseclass2" },
							{ text: "Принять✅", callback_data: "agreerules" },
						],
					],
				},
			});
		} catch (error) {
			console.log(error);
			bot.sendMessage(
				chatId,
				`*Сообщение сверху ты не видел, просто удали 🙈⬆️*\n\n${rulesText}`,
				{
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
			sendDataAboutError(
				chatId,
				"Не обработан момент вызова правил пользования ресурсом, создано новое сообщение (rulesBot)"
			);
		}
	} else if (!RulesToStart) {
		try {
			await bot.editMessageText(rulesText, {
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️Назад", callback_data: "options" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			});
		} catch (error) {
			console.log(error);
			bot.sendMessage(
				chatId,
				`*Сообщение сверху ты не видел, просто удали 🙈⬆️*\n\n${rulesText}`,
				{
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

			sendDataAboutError(
				chatId,
				"Не обработан момент вызова правил пользования ресурсом, создано новое сообщение (rulesBot)"
			);
		}
	}
}

async function ChoosingClass(chatId, start = 1) {
	try {
		if (start == 0) {
			await bot.editMessageText(
				"*_✏️Изменение класса🔄️_\n\nПожалуйста выбери свой класс 🙂🔎*",
				{
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
				`*Будем ближе знакомиться\\! 😊\n\nПожалуйста _ознакомься и СОГЛАСИСЬ_ с [правилами пользования ресурсом](${httpsRules[botNum]})❗\n\nИ выбери свой класс* 🙂🔎`,
				{
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова выбора класса (ChoosingClass)"
		);
	}
}

async function Raspisanie(chatId) {
	try {
		await bot.editMessageText(
			`*_⏰Расписание📚_*\n\nСегодня\\: *${weekDayNames[dayW]}, ${day} ${
				monthNames[month]
			}*\nКласс: *${
				usersData.find((obj) => obj.chatId === chatId).className
			}* \\- [изменить](https://t.me/digschbot/?start=options) \n\n*На какой день показать расписание❓🤔*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				disable_web_page_preview: true,
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
							{ text: "Пн 🐥", callback_data: "mon" },
							{ text: "Вт 🙈", callback_data: "tue" },
							{ text: "Ср 🎯", callback_data: "wen" },
						],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Чт ☀️", callback_data: "thu" },
							{ text: "Пт 🥇", callback_data: "fri" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова выбора дня недели для расписания (Raspisanie)"
		);
	}
}

async function RaspisanieText(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
	let raspisText = classes11[0];
	if (weekday == 0 || weekday == 6) {
		raspisText = "В этот день уроков нет, отдыхай! 😆";
	}

	try {
		if (dataAboutUser.className == "Не определен") {
			await bot.editMessageText(
				`*_⏰Расписание📚_\n\nУ тебя не выбран класс❗\n\nЕго можно изменить в настройках ⬇️😉*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					disable_web_page_preview: true,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️Назад", callback_data: "raspisanie" },
								{ text: "Настройки⚙️", callback_data: "options" },
							],
						],
					},
				}
			);
		} else {
			await bot.editMessageText(
				`<b><i>⏰Расписание📚\n\n</i></b>Класс: <b><i>${dataAboutUser.className} • ${weekDayNames[weekday]}</i>\n\n${raspisText}\n\nРасписание всё еще не точное 😔</b>`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "Создать напоминание 🗓️",
									callback_data: "remindersadd",
								},
							],
							[
								{ text: "⬅️В меню", callback_data: "exit" },
								{ text: "Сменить день🔁", callback_data: "raspisanie" },
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова расписания класса (RaspisanieText)"
		);
	}
}

async function netClassaText(chatId, exitMenu = true) {
	try {
		if (exitMenu) {
			await bot.editMessageText(
				`*Грустно это осознавать, но видимо именно твой класс не входит в список программы _"Цифровые классы"_ 🫤\n\nНо\\! Ты всегда можешь написать @qu1z3x, и уточнить все свои потребности\\! 😉*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "⬅️К выбору", callback_data: "chooseclass2" },
								{
									text: "Написать✍️",
									url: "https://t.me/qu1z3x",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова объяснения отсутсвия класса (netClassaText)"
		);
	}
}

async function Calls(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
	const timesOnLesson = [
		"08:30",
		"09:25",
		"10:25",
		"11:25",
		"12:20",
		"13:15",
		"14:10",
		"17:11",
	];

	let buttonNum = 0,
		notifStatusButton = [
			{
				text: "✅ Включить оповещения 🔔",
				callback_data: "callsnotiftoggle",
			},
			{
				text: "❌ Выключить оповещения 🔕",
				callback_data: "callsnotiftoggle",
			},
			{
				text: "❌ Оповещения отключены 🔕",
				callback_data: "-",
			},
		];

	if (dayW == 6 || dayW == 0) {
		buttonNum = 2;
		textCallsNotifStatus = "❌🔕 \\- выходные";
	}
	if (dataAboutUser && !dataAboutUser.notificationStatus) {
		buttonNum = 0;
		textCallsNotifStatus = "❌🔕";
	} else if (dataAboutUser && dataAboutUser.notificationStatus) {
		buttonNum = 1;
		textCallsNotifStatus = "✅🔔";
	}
	try {
		// setInterval(function () {
		// 	const dateWithout5Minutes = `${String(new Date().getHours()).padStart(
		// 		2,
		// 		"0"
		// 	)}:${String(new Date().getMinutes() + 5).padStart(2, "0")}`;
		// 	dayW = new Date().getDay();
		// 	let j = 0;
		// 	while (j < usersData.length) {
		// 		if (usersData[j].notificationStatus && dayW != 6 && dayW != 0) {
		// 			for (let i = 0; i < timesOnLesson.length; i++) {
		// 				if (
		// 					dateWithout5Minutes == timesOnLesson[i]
		// 				) {
		// 					bot.sendMessage(
		// 						usersData[j].chatId,
		// 						`🔔 Через 5 минут у тебя урок! 😉`,
		// 						{
		// 							reply_markup: {
		// 								inline_keyboard: [
		// 									[
		// 										{
		// 											text: "Спасибо 👍",
		// 											callback_data: "deleteexcess",
		// 										},
		// 									],
		// 								],
		// 							},
		// 						}
		// 					);
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}
		// }, 60000);
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент проверки и отправки уведомления пользователю (Calls)"
		);
	}

	try {
		await bot.editMessageText(
			`*_❗Звонки ⏰  \\|  ${textCallsNotifStatus}_\n\n• Расписание звонков на сегодня:*\n\n* \\- 1* урок *08:30 \\- 09:10 \\| 15мин*\n
* \\- 2* урок *09:25 \\- 10:05 \\| 20мин*\n
* \\- 3* урок *10:25 \\- 11:05 \\| 20мин / Завтрак*\n
* \\- 4* урок *11:25 \\- 12:05 \\| 15мин*\n
* \\- 5* урок *12:20 \\- 13:00 \\| 15мин*\n
* \\- 6* урок *13:15 \\- 13:55 \\| 15мин / Обед*\n
* \\- 7* урок *14:10 \\- 14:50 \\| Домой*\n\n*🚫 Функция не дорступна 😔* `, //! .................................... • Бета версия уведомлений ⬇️

			{
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
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
		console.log(error);
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
			message_id: usersData.find((obj) => obj.chatId === chatId).messageId,
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
		console.log(error);
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
		if (chatId == qu1z3xId) res = rndNum;

		bot.editMessageText(
			`*_❓Угадайка❓_\n\nЯ загадал цифру\\! ${res}\n\nОтгадывай 😉*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
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
		console.log(error);
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
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "✊", callback_data: "stone" },
							{ text: "✌️", callback_data: "scissors" },
							{ text: "🖐️", callback_data: "paper" },
						],
						[{ text: "⬅️Назад", callback_data: "games" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова игры Цуе-Фа (game2)"
		);
	}
}

async function game2_2(chatId, playerNum) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

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
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
			dataAboutUser.game2DrawResults += 1;
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
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
			dataAboutUser.game2NiceResults += 1;
		} else {
			bot.editMessageText(
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n❌ Ты проиграл\\! 😔\n\nРезультат:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\nЕще партейку\\? 🤔*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
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
			dataAboutUser.game2BadResults += 1;
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент вызова результата игры Цуе-Фа (game2_2)"
		);
	}
}

async function News(chatId) {
	let news1Button, news2Button, news3Button;

	let newsButtons = [
		{ text: "Новости 📖", callback_data: "allnews" },
		{ text: "• Новости 📖 •", callback_data: "-" },
		{ text: "О боте 🤖", callback_data: "botnews" },
		{ text: "• О боте 🤖 •", callback_data: "-" },
		{ text: "О школе 🏫", callback_data: "schoolnews" },
		{ text: "• О школе 🏫 •", callback_data: "-" },
	];

	if (newsNum == 1) {
		news1Button = 1;
		news2Button = 2;
		news3Button = 4;
	} else if (newsNum == 2) {
		news1Button = 0;
		news2Button = 3;
		news3Button = 4;
	} else if (newsNum == 3) {
		news1Button = 0;
		news2Button = 2;
		news3Button = 5;
	}

	try {
		await bot.editMessageText(
			`<b><i>❗ Интересное | ${newsName}</i>\n\n${newsText[newsNum]}\n\n• По любым вопросам к @qu1z3x</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[newsButtons[news1Button]],
						[newsButtons[news2Button], newsButtons[news3Button]],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Обновить🔄️", callback_data: "news" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function AllNewsTextEdit(chatId) {
	editMode = true;

	bot.editMessageText(
		`<b><i>✏️ Редактирование: Новости 📖</i>\n\n📖 Текущий текст:</b>\n\n<code>${newsText[1]}</code>\n\n<b>Напиши измененный текст ниже ⬇️</b>`,
		{
			parse_mode: "html",
			chat_id: chatId,
			message_id: usersData.find((obj) => obj.chatId === chatId).messageId,
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
	try {
		bot.editMessageText(
			`<b><i>✏️ Редактирование: Новости 📖</i>\n\n🆕 Измененный текст:</b>\n\n<i>"${newsText[0]}"</i>\n\n<b>Применить изменения?🧐</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "Сбросить ❌",
								callback_data: "allnewstextRESETmenu",
							},
							{ text: "Применить✅", callback_data: "allnewsadd" },
						],
						[{ text: "⬅️Назад", callback_data: "allnewsEDIT" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function AllNewsTextReset(chatId) {
	try {
		await bot.editMessageText(
			`*_✏️ Редактирование: Новости 📖_\n\nCбросить раздел _"Новости 📖"_ ⁉️*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️Назад", callback_data: "adminMenu" },
							{
								text: "Сбросить ✅",
								callback_data: "allnewstextRESETend",
							},
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function Options(chatId, firstName) {
	if (chatId == qu1z3xId || chatId == "231345534") {
		userStatus = "Администратор 👑";
	} else {
		userStatus = "Ученик 🧑‍🏫";
	}

	textCallsNotifStatus = "❌🔕";
	const countRem = reminder.filter(
		(reminderObj) => reminderObj.chatId === chatId
	).length;

	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	if (dataAboutUser && !dataAboutUser.notificationStatus)
		textCallsNotifStatus = "❌🔕";
	else if (dataAboutUser && dataAboutUser.notificationStatus)
		textCallsNotifStatus = "✅🔔";

	try {
		await bot.editMessageText(
			`*_🛠️ Настройки ⚙️_\n\nДанные:*\nТвой логин: *${firstName}*\nРоль: *${userStatus}*\nID профиля: _*${chatId}*_\nКласс: *${
				dataAboutUser.className
			}\n\nУведомления:*\nЗвонки на уроки: *${textCallsNotifStatus}*\nНапоминания: *${"✅🔔"}*\nСоздано: *${countRem}* \\- [список](https://t.me/digschbot/?start=remindersList)*\n\nСтатистика в играх:*\nУгадайка: *${
				dataAboutUser.game1NiceResults
			}✅\\, ${dataAboutUser.game1BadResults}❌ из ${
				dataAboutUser.game1NiceResults + dataAboutUser.game1BadResults
			} игр*\nЦуе\\-фа: *${dataAboutUser.game2NiceResults}✅\\, ${
				dataAboutUser.game2BadResults
			}❌\\, ${dataAboutUser.game2DrawResults}🤷‍♂️ из ${
				dataAboutUser.game2NiceResults +
				dataAboutUser.game2BadResults +
				dataAboutUser.game2DrawResults
			} игр*\n\n*[Правила пользования ресурсом](https://t.me/digschbot/?start=rules2)*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "Сменить класс 🔄",
								callback_data: "chooseclass0",
							},
						],

						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{
								text: "Прочие➡️",
								callback_data: "optionsother",
							},
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

async function Options_2(chatId) {
	try {
		await bot.editMessageText(
			`*_🛠️ Прочие настройки ⚙️_\n\n❗Раздел повышенной опасности❗\n*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "Новый диалог ♻️", callback_data: "start" },
							{ text: "Перезапуск 🔄️", callback_data: "restart1" },
						],
						[
							{
								text: "❌ Удалить Аккаунт❗",
								callback_data: "deleteaccount",
							},
						],
						[
							{ text: "⬅️Назад", callback_data: "options" },
							{ text: "Написать✍️", url: "https://t.me/qu1z3x" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function adminMenu(chatId, firstName) {
	let textDay = "";
	const dateNowHHNN = `${String(new Date().getHours()).padStart(
		2,
		"0"
	)}:${String(new Date().getMinutes() + 1).padStart(2, "0")}`;
	if (dateNowHHNN < "12:00" && dateNowHHNN >= "06:00") textDay = "Доброе утро";
	else if (dateNowHHNN < "17:00" && dateNowHHNN >= "12:00")
		textDay = "Добрый день";
	else if (dateNowHHNN < "22:00" && dateNowHHNN >= "17:00")
		textDay = "Добрый вечер";
	else if (dateNowHHNN >= "22:00") textDay = "Доброй ночи";
	try {
		await bot.editMessageText(
			`*_💠Центр управления💠_\n\n${textDay}\\, ${firstName}\\!\n\nЧем я могу быть полезен\\? 🤖*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[{ text: "💾 Реестр 📁", callback_data: "usersdatalist" }],
						[
							{
								text: "Объявление 📢",
								callback_data: "adminMenuSendMessage",
							},
							{
								text: "Изменение ✏️",
								callback_data: "adminMenuEdit",
							},
						],
						[{ text: "⬅️Назад", callback_data: "exit" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function adminMenuSendMessage(chatId) {
	try {
		await bot.editMessageText(
			"<b><i>📋 Объявление 📢 \n\n❗ВНИМАНИЕ❗</i>\n\nВсе пользователи получат уведомление!\n\n<i>Пример:</i>\n</b><code>=В школе родительское собрание❗😉</code><b>\n\nНапиши объявление ниже c `=` ⬇️</b>",
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[{ text: "⬅️Назад", callback_data: "adminMenu" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function adminMenuSendMessage_2(chatId, firstName) {
	try {
		await bot.editMessageText(
			`<b><i>📋 Создание объявления 📢</i>\n\nОбъявление опубликовано! 😉✅</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
			}
		);
		for (let i = 0; i < usersData.length; i++) {
			if (usersData[i].chatId != qu1z3xId) {
				bot.sendMessage(
					usersData[i].chatId,
					`<b><i>❗Уведомление❗</i>\n\n${textMessageForAllUsers}</b>`,
					{
						parse_mode: "html",
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: "Удалить ❌",
										callback_data: "deleteexcess",
									},
									{
										text: "Спасибо 👍",
										callback_data: "deleteexcess",
									},
								],
							],
						},
					}
				).then((message) => {
					bot.pinChatMessage(usersData[i].chatId, message.message_id);
					bot.s;
				});
			}
			setTimeout(() => {
				adminMenu(chatId, firstName);
			}, 2000);
			sendDataAboutAction(
				"Администратор",
				"",
				chatId,
				`❗Опубликовано объявление:\n\n${textMessageForAllUsers}`
			);
		}
	} catch (error) {
		console.log(error);
	}
}

async function adminMenuEdit(chatId) {
	try {
		await bot.editMessageText(
			"*_📖 Изменение ✏️_ \n\nКакие правки вы хотите внести\\?🤖*",
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
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
	} catch (error) {
		console.log(error);
	}
}

async function RegistryUsersData(chatId) {
	try {
		let text = "";
		for (let i = 0; i < usersData.length; i++) {
			text += `[${i + 1}]  @${usersData[i].username}\n• ChatId: <code>${
				usersData[i].chatId
			}</code>\n• className: "${
				usersData[i].className
			}"\n• callsNotifications: ${
				usersData[i].notificationStatus
			}\n• allGamesPlayed: ${
				usersData[i].game1BadResults +
				usersData[i].game1NiceResults +
				usersData[i].game2BadResults +
				usersData[i].game2NiceResults +
				usersData[i].game2DrawResults
			}\n\n`;
		}

		bot.editMessageText(
			`<b><i>💾 Реестр 📁\n\nДанные о пользователях:\n\n${text}</i>Всего: ${usersData.length}</b>`,
			{
				parse_mode: "HTML",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[{ text: "⬅️Назад", callback_data: "adminMenu" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function Reminders(chatId) {
	const countRem = reminder.filter(
		(reminderObj) => reminderObj.chatId === chatId
	).length;

	try {
		bot.editMessageText(
			"*_🔔Напоминания🗓️_\n\nЯ могу тебе напомнить\\:\n• Когда сдать докла\\.\\.\\.\n• Да всё что угодно\\!🤯\n\\- и я не забуду, то что ты мне поручишь напомнить\\!😉\n\nНе засоряй телефон, пиши мне🤗*",
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `Текущие ${countRem} 📃`,
								callback_data: "reminderslist",
							},
							{ text: "Создать📝", callback_data: "remindersadd" },
						],
						[{ text: "⬅️В меню", callback_data: "exit" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function RemindersList(chatId) {
	try {
		let reminderText = "";
		const userReminders = reminder.filter(
			(reminderObj) => reminderObj.chatId === chatId
		);
		if (userReminders.length > 0) {
			let i = 1;
			userReminders.forEach((reminderObj) => {
				reminderText += `•${i} ${reminderObj.text} - ${reminderObj.time}\n\n`;
				i++;
			});
		} else if (userReminders.length == 0) {
			reminderText = "У тебя нет активных напоминаний 😔\n\n";
		}

		let deleteallreminderButtonText;
		if (userReminders.length == 0) deleteallreminderButtonText = "";
		else if (userReminders.length > 0)
			deleteallreminderButtonText = "Удалить все ❌";

		bot.editMessageText(
			`<b><i>🔔Текущие напоминания🗓️</i>\n\nТвои напоминания:</b><i>\n\n${reminderText}</i><b>Количество: ${userReminders.length}</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `${deleteallreminderButtonText}`,
								callback_data: "deleteallreminder",
							},
						],
						[
							{ text: "⬅️Назад", callback_data: "reminders" },
							{ text: "Создать📝", callback_data: "remindersadd" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function RemindersAdd(chatId) {
	const dateNowHNN = `${String(new Date().getHours())}:${String(
		new Date().getMinutes() + 1
	).padStart(2, "0")}`;
	try {
		bot.editMessageText(
			`<b><i>🔔Создание напоминания📝\n\nПример:</i></b>\n<code>Сесть за уроки в <b>${dateNowHNN}</b></code>\n\n<b>Пиши прямо под сообщением 😉⬇️</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[{ text: "⬅️Назад", callback_data: "reminders" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function start(chatId, userName, quickStart = false) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	let rndNum = Math.floor(Math.random() * stickers.length);

	try {
		await bot.sendSticker(chatId, stickers[rndNum]).then((message) => {
			dataAboutUser.messageIdSayHi0 = message.message_id;
		});

		await bot
			.sendMessage(chatId, `*Салют ${userName} ✌️*`, {
				parse_mode: "MarkdownV2",
			})
			.then((message) => {
				dataAboutUser.messageIdSayHi1 = message.message_id;
			});

		await bot
			.sendMessage(
				chatId,
				"*Я чат\\-бот 🤖, поддерживаю _цифровое_ обучение🏫\\. Я буду твоим верным учебным помощником😉\\!\n • Нужно уточнить распиание?📚\n • Подсказать когда идти на урок?⏰\n • Напомнить о твоих планах?📝\n • Сыграть партейку в Цуе\\-Фа?✌️\n • Рассказать школьные новости?📖\nТогда я к твоим услугам, поехали\\!🚀*",
				{
					parse_mode: "MarkdownV2",
				}
			)
			.then((message) => {
				dataAboutUser.messageIdSayHi2 = message.message_id;
			});

		await bot.sendMessage(chatId, `ㅤ`, {}).then((message) => {
			dataAboutUser.messageId = message.message_id;
		});

		if (quickStart) {
			menuHome(chatId);
			className = "Не определен (10Г)";
		} else if (!quickStart) {
			ChoosingClass(chatId, 2);
		}
	} catch (error) {
		console.log(error);
	}
}

async function deleteAllMessages(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
	try {
		bot.deleteMessage(chatId, dataAboutUser.messageIdSayHi0);
		bot.deleteMessage(chatId, dataAboutUser.messageIdSayHi1);
		bot.deleteMessage(chatId, dataAboutUser.messageIdSayHi2);
		bot.deleteMessage(chatId, dataAboutUser.messageId);
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент прощания, завершения перед новым диалогом (deleteAllMessages)"
		);
	}
}

async function StartAll() {
	// bot.sendMessage(userChatId, ""); //?                                                         Принудительная отправка сообщений определенному лицу.

	if (TOKEN == TOKENs[0]) botNum = 0;
	else if (TOKEN == TOKENs[1]) botNum = 1;

	const timeFormat = /^\d{1,2}:\d{2}$/;

	bot.onText(/=(.+)/, async (message, match) => {
		let chatId = message.chat.id;
		if (chatId == qu1z3xId || chatId == "6815420098") {
			textMessageForAllUsers = match[1];
			try {
				await bot.editMessageText(
					`<b><i>📋 Создание объявления 📢\n\n</i>Объявление:\n</b>${textMessageForAllUsers}\n\n<b>Опубликовать объявление? 🧐❗</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId === chatId)
							.messageId,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: "⬅️Назад",
										callback_data: "adminMenuSendMessage",
									},
									{
										text: "Создать ✅",
										callback_data: "adminMenuSendMessage2",
									},
								],
							],
						},
					}
				);
			} catch (error) {
				console.log(error);
				console.log(error);
			}
		}
	});
	bot.onText(/^(.+?) в (.+)/, async (message, match) => {
		let formatIsNice = true,
			hours,
			minutes,
			chatId = message.chat.id;
		textRem = match[1];
		timeRem = match[2];
		try {
			[hours, minutes] = timeRem.split(":").map(Number);
			formatIsNice = true;
		} catch (error) {
			console.log(error);
			formatIsNice = false;
		}

		try {
			if (
				!timeFormat.test(timeRem) ||
				hours > 23 ||
				minutes > 59 ||
				!formatIsNice
			) {
				await bot.editMessageText(
					`<b>❗ Не верный формат времени 🚫\n\n<i>Пример:</i></b>\n<code>Выкинуть мусор в </code><b>H:MM\n\nПерепиши напоминание ниже 😉⬇️</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId)
							.messageId,
						reply_markup: {
							inline_keyboard: [
								[{ text: "⬅️Назад", callback_data: "reminders" }],
							],
						},
					}
				);
				return;
			}

			reminder.push({ chatId: chatId, text: textRem, time: timeRem });

			sendDataAboutAction(
				message.from.first_name,
				message.from.username,
				chatId,
				`🔔 Запросил напоминание <i>${textRem}</i> на ${timeRem}`
			);

			await bot.editMessageText(
				`<b>Поставил напоминание на ${timeRem}</b>😉\n\n<i>"${textRem}"</i>\n\n🚫 Функция не дорступна 😔`, //! ........................................................................................
				{
					parse_mode: "html",
					chat_id: message.chat.id,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: `Текущие ${
										reminder.filter(
											(reminderObj) => reminderObj.chatId === chatId
										).length
									} 📃`,
									callback_data: "reminderslist",
								},
								{
									text: "Создать еще ➕",
									callback_data: "remindersadd",
								},
							],
							[{ text: "⬅️Назад", callback_data: "reminders" }],
						],
					},
				}
			);

			// setInterval(function () {
			// 	const dateNowHNN = `${String(new Date().getHours())}:${String(
			// 		new Date().getMinutes()
			// 	).padStart(2, "0")}`;
			// 	const dateNowHHNN = `${String(new Date().getHours()).padStart(
			// 		2,
			// 		"0"
			// 	)}:${String(new Date().getMinutes()).padStart(2, "0")}`;
			// 	if (reminder.length > 0) {
			// 		for (let i = 0; i < reminder.length; i++) {
			// 			if (
			// 				reminder[i].time == dateNowHNN ||
			// 				reminder[i].time == dateNowHHNN
			// 			) {
			// 				bot.sendMessage(
			// 					reminder[i].chatId,
			// 					`<b>🔔 Напоминание на <i>${reminder[i].time}:\n\n "${reminder[i].text}"</i></b>`,
			// 					{
			// 						parse_mode: "html",
			// 						reply_markup: {
			// 							inline_keyboard: [
			// 								[
			// 									{
			// 										text: "Удалить ❌",
			// 										callback_data: "deleteexcess",
			// 									},
			// 									{
			// 										text: "Спасибо 👍",
			// 										callback_data: "deleteexcess",
			// 									},
			// 								],
			// 							],
			// 						},
			// 					}
			// 				).then((message) => {
			// 					usersData.filter(
			// 						(reminderObj) => reminderObj.chatId === chatId
			// 					).messageIdother = message.message_id;
			// 				});
			// 				sendDataAboutAction(
			// 					message.from.first_name,
			// 					message.from.username,
			// 					chatId,
			// 					`✅ Получил напоминание <i>${textRem}</i> на ${timeRem}`
			// 				);
			// 				reminder.splice(i, 1); // удаление напоминания которое уже объявилось
			// 			}
			// 		}
			// 	}
			// }, 60000);
		} catch (error) {
			console.log(error);
			sendDataAboutError(
				chatId,
				"Не обработан момент редактирования сообщения о созданном напоминании из за потери 'messageId' (deleteAllMessages)"
			);
		}
	});

	bot.on("message", async (message) => {
		const chatId = message.chat.id;
		const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

		if (!dataAboutUser) {
			usersData.push({
				chatId: chatId,
				username: message.from.username,
				className: "Не определен",
				messageId: "",
				messageIdSayHi0: "",
				messageIdSayHi1: "",
				messageIdSayHi2: "",
				notificationStatus: false,
				game1NiceResults: 0,
				game1BadResults: 0,
				game2NiceResults: 0,
				game2BadResults: 0,
				game2DrawResults: 0,
			});
		}
		try {
			messageId_user = message.message_id;
			const text = message.text;
			let firstName = message.from.first_name;

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
				`\n${day} ${weekDayNames[dayW]} | text | ${message.from.first_name} ${message.from.username} <${chatId}>  -  "${text}"`
			);
			console.log(usersData.find((obj) => obj.chatId === chatId));

			if (editMode) {
				editMode = false;
				newsText[0] = text;
				AllNewsTextEdit_2(chatId);
			}

			//? КОМАНДЫ

			switch (text) {
				case "S":
				case "s":
				case "/start":
					deleteAllMessages(chatId);
					bot.deleteMessage(chatId, messageId_user);
					start(chatId, message.from.first_name);
					break;
				case "st":
					deleteAllMessages(chatId);
					bot.deleteMessage(chatId, messageId_user);
					start(chatId, message.from.first_name, true);
					break;
				case "/restart":
					try {
						await bot.deleteMessage(
							chatId,
							usersData.find((obj) => obj.chatId === chatId).messageId
						);
					} catch (error) {
						console.log(error);
						sendDataAboutError(
							chatId,
							"Не найден message_id menuHome, создано новое сообщение (/restart)"
						);
					}
					bot.deleteMessage(chatId, messageId_user);
					menuHome(chatId, false);
					break;
				case "/restart2":
					try {
						ChoosingClass(chatId, 2);
						bot.deleteMessage(chatId, messageId_user);
					} catch (error) {
						console.log(error);
						sendDataAboutError(
							chatId,
							"Не найден message_id, создано новое сообщение (/restart2)"
						);
					}
					break;
				case "/start rules":
					bot.deleteMessage(chatId, messageId_user);
					rulesBot(chatId);
					break;
				case "/start rules2":
					bot.deleteMessage(chatId, messageId_user);
					rulesBot(chatId, false);
					break;
				case "/start options":
					bot.deleteMessage(chatId, messageId_user);
					Options(chatId, firstName);
					break;
				case "/start remindersList":
					bot.deleteMessage(chatId, messageId_user);
					RemindersList(chatId);
					break;
				default:
					try {
						bot.deleteMessage(chatId, messageId_user);
					} catch (error) {
						console.log(error);
						sendDataAboutError(
							chatId,
							"Не обработан момент удаления лишнего сообщения пользователя (default)"
						);
					}
					break;
			}
		} catch (error) {
			console.log(error);
		}
	});

	//? ОБРАБОТЧИК КЛАВИАТУРЫ ПОД СООБЩЕНИЯМИ

	bot.on("callback_query", (query) => {
		const chatId = query.message.chat.id;
		const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

		try {
			if (dataAboutUser) {
				dataAboutUser.messageId = query.message.message_id;
			} else if (!dataAboutUser) {
				usersData.push({
					chatId: chatId,
					username: query.from.username,
					className: "Не определен",
					messageId: query.message.message_id,
					messageIdother: "",
					notificationStatus: false,
					game1NiceResults: 0,
					game1BadResults: 0,
					game2NiceResults: 0,
					game2BadResults: 0,
					game2DrawResults: 0,
				});
			}

			let firstName = query.from.first_name;
			newsNum = 0;

			day = new Date().getDate();
			dayW = new Date().getDay();
			month = new Date().getMonth();

			const data = query.data;
			usersData.find((obj) => obj.chatId === chatId).messageId =
				query.message.message_id;

			// время отправки
			let hintText,
				date = new Date(),
				h = date.getHours(),
				m = date.getMinutes(),
				s = date.getSeconds(),
				time = `${String(h).padStart(2, "0")}:${String(m).padStart(
					2,
					"0"
				)}:${String(s).padStart(2, "0")}`;

			if (data == rndNum) {
				bot.editMessageText(
					`*_❓Угадайка❓_\n\n✅ Правильно ${rndNum}\\!🥳 \n\nПопробуем снова??*`,
					{
						parse_mode: "MarkdownV2",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId === chatId)
							.messageId,
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
				dataAboutUser.game1NiceResults += 1;
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
						message_id: usersData.find((obj) => obj.chatId === chatId)
							.messageId,
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
				dataAboutUser.game1BadResults += 1;
			}

			switch (data) {
				//? КЛАССЫ/РАСПИСАНИЕ

				case "10g":
					className = "10Г";
					dataAboutUser.className = className;
					menuHome(chatId);
					break;
				case "11d":
					className = "11Д";
					dataAboutUser.className = className;
					menuHome(chatId);
					break;
				case "11g":
					className = "11Г";
					dataAboutUser.className = className;
					menuHome(chatId);
					break;
				case "11a":
					className = "11А";
					dataAboutUser.className = className;
					menuHome(chatId);
					break;
				case "11v":
					className = "11В";
					dataAboutUser.className = className;
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
					weekday = dayW;
					RaspisanieText(chatId);
					break;
				case "tomorrow":
					if (dayW == 6) weekday = 0;
					else if (dayW != 6) weekday = ++dayW;
					RaspisanieText(chatId);
					break;

				//? ДЕЙСТВИЯ КНОПОК

				// НАЧАЛЬНЫЕ
				case "start":
					deleteAllMessages(chatId);
					start(chatId, firstName);
					break;
				case "exit":
					editMode = false;
					try {
						menuHome(chatId);
					} catch (error) {
						console.log(error);
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
				case "callsnotiftoggle":
					if (dataAboutUser) {
						usersData.find(
							(obj) => obj.chatId === chatId
						).notificationStatus = !usersData.find(
							(obj) => obj.chatId === chatId
						).notificationStatus;
					}

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
					try {
						if (rndNum <= 5) {
							hintText = `Число _меньше_ или равно 5\\! 📉😉`;
						} else if (rndNum >= 5) {
							hintText = `Число _больше_ или равно 5\\! 📈😉`;
						}
						bot.editMessageText(`*_❓Угадайка❓_\n\n${hintText}*`, {
							parse_mode: "MarkdownV2",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId === chatId)
								.messageId,
							reply_markup: {
								inline_keyboard: [
									[
										{ text: "⬅️Назад", callback_data: "game1_1" },
										{ text: "Ответ⁉️", callback_data: "game1res" },
									],
								],
							},
						});
					} catch (error) {
						console.log(error);
					}
					break;
				case "game1res":
					try {
						bot.editMessageText(
							`*_❓Угадайка❓_\n\nНу так не интересно\\! 😒\nОтвет: ${rndNum}\\!\n\nЕще партейку\\? 🤔*`,
							{
								parse_mode: "MarkdownV2",
								chat_id: chatId,
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
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
					} catch (error) {
						console.log(error);
					}
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
					newsNum = 1;
					News(chatId);
					break;
				case "allnews":
					newsName = "Новости 📖";
					newsNum = 1;
					News(chatId);
					break;
				case "botnews":
					newsName = "О боте 🤖";
					newsNum = 2;
					News(chatId);
					break;
				case "schoolnews":
					newsName = "О школе 🏫";
					newsNum = 3;
					News(chatId);
					break;

				// OPTIONS

				case "options":
					Options(chatId, firstName);
					break;
				case "optionsother":
					Options_2(chatId);
					break;
				case "deleteaccount":
					try {
						bot.editMessageText(
							"*_🛠️ Удаление аккаунта ❌\n\n❗ВНИМАНИЕ❗_\n\nДействительно _УДАЛИТЬ_ аккаунт\\?*",
							{
								parse_mode: "MarkdownV2",
								chat_id: chatId,
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
								reply_markup: {
									inline_keyboard: [
										[
											{
												text: "⬅️Назад",
												callback_data: "optionsother",
											},
											{
												text: "Удалить ✅",
												callback_data: "deleteaccount2",
											},
										],
									],
								},
							}
						);
					} catch (error) {
						console.log(error);
					}
					break;
				case "deleteaccount2":
					try {
						bot.editMessageText(
							"*Твой профиль успешно удален\\! ✅\n\nПожалуйста опиши причину \\- @qu1z3x\n\nЕсли соскучишься \\- /start, /restart2 😉*",
							{
								parse_mode: "MarkdownV2",
								chat_id: chatId,
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
							}
						);
					} catch (error) {
						console.log(error);
					}
					break;

				case "chooseclass0":
					ChoosingClass(chatId, 0);
					break;

				// ADMINMENU

				case "adminMenu":
					adminMenu(chatId, firstName);
					break;
				case "adminMenuSendMessage":
					adminMenuSendMessage(chatId);
					break;
				case "adminMenuSendMessage2":
					adminMenuSendMessage_2(chatId, firstName);
					break;
				case "adminMenuEdit":
					adminMenuEdit(chatId);
					break;
				case "allnewsEDIT":
					AllNewsTextEdit(chatId);
					break;
				case "allnewsadd":
					bot.editMessageText(
						"*_✏️ Редактирование: Новости 📖_\n\nВы успешно обновили Новости\\! 📖✅*",
						{
							parse_mode: "MarkdownV2",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId === chatId)
								.messageId,
						}
					);
					newsText[1] = newsText[0];
					setTimeout(() => {
						adminMenu(chatId, firstName);
					}, 2000);
					break;
				case "allnewstextRESETmenu":
					AllNewsTextReset(chatId);
					break;
				case "allnewstextRESET":
					AllNewsTextEdit(chatId);
					break;
				case "allnewstextRESETend":
					try {
						newsText[1] = "Новостей нет 😔";
						bot.editMessageText(
							`*_✏️ Редактирование: Новости 📖_\n\nРаздел _"Новости📖"_ \\- сброшен\\!✅*`,
							{
								parse_mode: "MarkdownV2",
								chat_id: chatId,
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
							}
						);
						setTimeout(() => {
							adminMenu(chatId, firstName);
						}, 2000);
					} catch (error) {
						console.log(error);
					}
					break;
				case "restart1":
					ChoosingClass(chatId, 2);
					break;
				case "agreerules":
					try {
						bot.editMessageText(`*Спасибо тебе ❤️ \\- команда @qu1z3x*`, {
							parse_mode: "MarkdownV2",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId === chatId)
								.messageId,
						});
						setTimeout(() => {
							ChoosingClass(chatId, 1);
						}, 1500);
					} catch (error) {
						console.log(error);
					}
					break;
				case "usersdatalist":
					RegistryUsersData(chatId, firstName);
					break;

				// REMINDERS

				case "reminders":
					Reminders(chatId);
					break;
				case "reminderslist":
					RemindersList(chatId);
					break;
				case "remindersadd":
					RemindersAdd(chatId);
					break;
				case "deleteallreminder":
					try {
						let warningText = "";
						if (
							reminder.filter(
								(reminderObj) => reminderObj.chatId === chatId
							).length == 1
						) {
							warningText = `Твой список из _1_ заметки будет удален\\!`;
						}
						if (
							reminder.filter(
								(reminderObj) => reminderObj.chatId === chatId
							).length > 1
						) {
							warningText = `Твой список из _${
								reminder.filter(
									(reminderObj) => reminderObj.chatId === chatId
								).length
							}_ заметок будет удален\\!`;
						}

						bot.editMessageText(
							`*_🔔 Удаление напоминаний ❌\n\n❗ВНИМАНИЕ❗_\n\nТвой список из _${
								reminder.filter(
									(reminderObj) => reminderObj.chatId === chatId
								).length
							}_ заметок будет удален\\!\n\nДействительно _УДАЛИТЬ_ список? 🧐❗*`,
							{
								parse_mode: "MarkdownV2",
								chat_id: chatId,
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
								reply_markup: {
									inline_keyboard: [
										[
											{
												text: "⬅️Назад",
												callback_data: "reminderslist",
											},
											{
												text: "Удалить ✅",
												callback_data: "deleteallreminder2",
											},
										],
									],
								},
							}
						);
					} catch (error) {
						console.log(error);
					}
					break;
				case "deleteallreminder2":
					try {
						reminder = reminder.filter(
							(reminderObj) => reminderObj.chatId !== chatId
						);
						sendDataAboutAction(
							query.from.first_name,
							query.from.username,
							chatId,
							`❌ Удалил весь свой список напоминаний`
						);
						if (
							reminder.filter(
								(reminderObj) => reminderObj.chatId === chatId
							).length == 0
						) {
							bot.editMessageText(
								"*_🔔 Удаление напоминаний ❌_\n\nВы успешно удалили все напоминания\\!✅*",
								{
									parse_mode: "MarkdownV2",
									chat_id: chatId,
									message_id: usersData.find(
										(obj) => obj.chatId === chatId
									).messageId,
								}
							);
							setTimeout(() => {
								RemindersList(chatId);
							}, 2000);
						}
					} catch (error) {
						console.log(error);
					}
					break;
				case "deleteexcess":
					textRem = "";
					try {
						bot.deleteMessage(
							chatId,
							usersData.find((obj) => obj.chatId === chatId).messageId
						);
					} catch (error) {
						console.log(error);
						sendDataAboutError(
							chatId,
							"Не обработан момент удаления сообщения с напоминанием (default)"
						);
					}
				default:
					break;
			}

			//* для удобства в терминале

			sendDataAboutButton(
				query.from.first_name,
				query.from.username,
				chatId,
				data
			);

			console.log(
				`\n${time} ${weekDayNames[dayW]} | button ${
					usersData.find((obj) => obj.chatId === chatId).messageId
				} | ${query.from.first_name} ${
					query.from.username
				} <${chatId}>  -  [${data}]`
			);
		} catch (error) {
			console.log(error);
		}
	});
}

StartAll();
