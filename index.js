import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const TOKENs = [
	"6654105779:AAEnCdIzKS_cgJUg4rMY8yNM3LPP5iZ-d_A",
	"6452076729:AAGds4jdMEUT-idcutZdLGVjKu5kyLs3Md4",
];

const TOKEN = TOKENs[1]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

import { sendDataAboutText } from "./tgterminal.js";
import { sendDataAboutButton } from "./tgterminal.js";
import { sendDataAboutError } from "./tgterminal.js";
import { sendDataAboutAction } from "./tgterminal.js";

const qu1z3xId = "923690530";
const stepanovId = "5786876945";
let BotName = "digsch27_bot";

//? БАЗА ДАННЫХ

let remindersData = []; // существующие заметки
let usersData = []; // информация о пользователях
let conferenceData = [];

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
	"- Обновлен раздел с настройками ✅\n\n- Статистика сыгранных игр 👌\n\n- Объем всего функционала бота, упирается в +3000 строк кода 🫡\n\n- Я стал быстрее, во всех смыслах 🏎️\n\n- Максимальная нагрузка до 50 запросов в СЕКУНДУ 🤯",
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
	textDay = "",
	// Raspisanie
	className = "Не определен",
	weekday,
	month,
	day,
	dayW,
	gotonotif = true,
	gogreetingsedit = true,
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

//?  ФУНКЦИИ

async function menuHome(chatId, exit = true) {
	rndNum = Math.floor(Math.random() * greetingsText.length);

	try {
		let adminMenuButtonText = "";
		if (chatId == qu1z3xId || chatId == stepanovId) {
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
			bot.sendMessage(
				chatId,
				`*Сверху ты ничего не видел, удали 🙈⬆️\n\n${greetingsText[rndNum]}*`,
				{
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
				}
			);
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
		"*_🤖 Правила пользования 📃_\n\n❗ПОЖАЛУЙСТА, ПРОЧТИ ВСЕ🙏\n\n\\-  Пользоваться приложением строго в благих целях🌍\n\n\\-  Не совершать намеренные нарушения правил, или создание сбоев❌\n\n\\-  Бот не отвечает \\- команда \\/restart в твоем распоряжении\\!😉\n\n\\-  Нашёл ошибку? Бот по\\-прежнему не отвечает? Есть замечания по работе проекта? \\- пожалуйста, сообщи об этом автору @qu1z3x 👍 *";

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
				`*Сверху ты ничего не видел, удали 🙈⬆️*\n\n${rulesText}`,
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
				`*Сверху ты ничего не видел, удали 🙈⬆️*\n\n${rulesText}`,
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
				"*_✏️Изменение класса🔄️_\n\nПожалуйста, выбери свой класс 🙂🔎*",
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
				`*Будем ближе знакомиться\\! 😊\n\n[Правила пользования ресурсом](https://t.me/${BotName}/?start=rules)\n\nА теперь выбирай класс* 🙂🔎`,
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
				`*Будем ближе знакомиться\\! 😊\n\nПожалуйста, _ознакомься и СОГЛАСИСЬ_ с [правилами пользования ресурсом](https://t.me/${BotName}/?start=rules)❗\n\nИ выбери свой класс* 🙂🔎`,
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
									url: `https://t.me/${BotName}`,
								},
								{ text: "11A", url: `https://t.me/${BotName}` },
								{ text: "11В", url: `https://t.me/${BotName}` },
								{ text: "11Г", url: `https://t.me/${BotName}` },
								{
									text: "11Д",
									url: `https://t.me/${BotName}`,
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
			`*_⏰ Расписание 📚_*\n\nСегодня\\: *${weekDayNames[dayW]}, ${day} ${
				monthNames[month]
			}*\nКласс: *${
				usersData.find((obj) => obj.chatId === chatId).className
			}* \\- [изменить](https://t.me/${BotName}/?start=options) \n\n*На какой день показать расписание❓🤔*`,
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
				`*_⏰ Расписание 📚_\n\nУ тебя не выбран класс❗\n\nЕго можно изменить в настройках ⬇️😉*`,
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
				`<b><i>⏰ Расписание 📚\n\n</i></b>Класс: <b>${
					dataAboutUser.className
				} • ${weekDayNames[weekday]}\n\n${raspisText}\n\n${
					weekday == 0 || weekday == 6
						? ""
						: "Расписание всё еще не точное 😔"
				}</b>`,
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
	let textToCallReminder = "";
	const timesOnLesson = [
		"08:30",
		"09:25",
		"10:25",
		"11:25",
		"12:20",
		"13:15",
		"14:10",
	];
	const timesOnBreak = [
		"09:10",
		"10:05",
		"11:05",
		"12:05",
		"13:00",
		"13:55",
		"14:50",
	];
	try {
		if (gotonotif) {
			gotonotif = false;
			cron.schedule(`1 * * * * *`, function () {
				const time5Minutes = `${String(new Date().getHours()).padStart(
					2,
					"0"
				)}:${String(new Date().getMinutes() + 5).padStart(2, "0")}`;
				const time10Minutes = `${String(new Date().getHours()).padStart(
					2,
					"0"
				)}:${String(new Date().getMinutes() + 10).padStart(2, "0")}`;

				dayW = new Date().getDay();
				for (let j = 0; j < usersData.length; j++) {
					if (
						(usersData[j].callOnLessonIn5minutes ||
							usersData[j].callOnLessonIn10minutes ||
							usersData[j].callOnBreakIn5minutes ||
							usersData[j].callOnBreakIn10minutes) &&
						dayW != 6 &&
						dayW != 0
					) {
						for (let i = 0; i < timesOnLesson.length; i++) {
							if (
								(time5Minutes == timesOnLesson[i] &&
									usersData[j].callOnLessonIn5minutes) ||
								(time5Minutes == timesOnBreak[i] &&
									usersData[j].callOnBreakIn5minutes) ||
								(time10Minutes == timesOnLesson[i] &&
									usersData[j].callOnLessonIn10minutes) ||
								(time10Minutes == timesOnBreak[i] &&
									usersData[j].callOnBreakIn10minutes)
							) {
								textToCallReminder = "";

								if (
									time5Minutes == timesOnLesson[i] &&
									usersData[j].callOnLessonIn5minutes
								)
									textToCallReminder =
										"Будь готовым! 📚\nЧерез 5 минут тебя урок";
								if (
									time5Minutes == timesOnBreak[i] &&
									usersData[j].callOnBreakIn5minutes
								)
									textToCallReminder =
										"Скоро отдых! 😎\nРовно через 5 минут перемена";
								if (
									time10Minutes == timesOnLesson[i] &&
									usersData[j].callOnLessonIn10minutes
								)
									textToCallReminder =
										"Будь готовым! 📚\nЧерез 10 минут тебя урок";
								if (
									time10Minutes == timesOnBreak[i] &&
									usersData[j].callOnBreakIn10minutes
								)
									textToCallReminder =
										"Скоро отдых! ☺️\nРовно через 10 минут перемена";
								if (textToCallReminder != "") {
									bot.sendMessage(
										usersData[j].chatId,
										`<b>🔔 ${textToCallReminder}! 😉</b>`,
										{
											parse_mode: "HTML",
											reply_markup: {
												inline_keyboard: [
													[
														{
															text: "Спасибо 👍",
															callback_data: "deleteexcess",
														},
													],
												],
											},
										}
									);
								}
							}
						}
					}
				}
			});
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(
			chatId,
			"Не обработан момент проверки и отправки уведомления пользователю (Calls)"
		);
	}

	try {
		await bot.editMessageText(
			`*_❗ Звонки  ⏰  \\|  ${
				dayW == 6 || dayW == 0
					? "🔕 \\- выходной"
					: `${
							dataAboutUser &&
							(dataAboutUser.callOnLessonIn5minutes ||
								dataAboutUser.callOnLessonIn10minutes ||
								dataAboutUser.callOnBreakIn5minutes ||
								dataAboutUser.callOnBreakIn10minutes)
								? "🔔 \\- вкл"
								: "🔕 \\- выкл"
					  }`
			}_\n\n• Расписание звонков на сегодня:*\n\n*  \\- 1* урок *08:30 \\- 09:10 \\| 15мин*\n
*  \\- 2* урок *09:25 \\- 10:05 \\| 20мин*\n
*  \\- 3* урок *10:25 \\- 11:05 \\| 20мин*\n
*  \\- 4* урок *11:25 \\- 12:05 \\| 15мин*\n
*  \\- 5* урок *12:20 \\- 13:00 \\| 15мин*\n
*  \\- 6* урок *13:15 \\- 13:55 \\| 15мин*\n
*  \\- 7* урок *14:10 \\- 14:50 \\| Домой\n\n• Я могу напоминать о звонках 😉⬇️* `,

			{
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{
								text: "Уведомления 🔔",
								callback_data: "callsnotificationsmenu",
							},
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

async function NotificationsMenuCalls(
	chatId,
	callOnLessonIn5minutes = usersData.find((obj) => obj.chatId === chatId)
		.callOnLessonIn5minutes,
	callOnBreakIn5minutes = usersData.find((obj) => obj.chatId === chatId)
		.callOnBreakIn5minutes,
	callOnLessonIn10minutes = usersData.find((obj) => obj.chatId === chatId)
		.callOnLessonIn10minutes,
	callOnBreakIn10minutes = usersData.find((obj) => obj.chatId === chatId)
		.callOnBreakIn10minutes
) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	// Присваивание данных

	dataAboutUser.callOnLessonIn5minutes = callOnLessonIn5minutes;
	dataAboutUser.callOnBreakIn5minutes = callOnBreakIn5minutes;
	dataAboutUser.callOnLessonIn10minutes = callOnLessonIn10minutes;
	dataAboutUser.callOnBreakIn10minutes = callOnBreakIn10minutes;

	try {
		await bot.editMessageText(
			`*_🔕 Центр уведомлений 🔔_\n\nНапоминания:*\nНа урок: *${
				dataAboutUser.callOnLessonIn5minutes ? "за 5" : ""
			}${
				dataAboutUser.callOnLessonIn5minutes &&
				dataAboutUser.callOnLessonIn10minutes
					? ", "
					: ""
			}${dataAboutUser.callOnLessonIn10minutes ? "за 10" : ""}${
				!dataAboutUser.callOnLessonIn5minutes &&
				!dataAboutUser.callOnLessonIn10minutes
					? "не выбрано"
					: " минут"
			}*\nНа перемену: *${
				dataAboutUser.callOnBreakIn5minutes ? "за 5" : ""
			}${
				dataAboutUser.callOnBreakIn5minutes &&
				dataAboutUser.callOnBreakIn10minutes
					? ", "
					: ""
			}${dataAboutUser.callOnBreakIn10minutes ? "за 10" : ""}${
				!dataAboutUser.callOnBreakIn5minutes &&
				!dataAboutUser.callOnBreakIn10minutes
					? "не выбрано"
					: " минут"
			}\n\n_${
				dayW == 6 || dayW == 0
					? "❗Звонки не активны \\- выходной❗\n\n"
					: ""
			}_За сколько до звонка оповещать\\? 🤔*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `На урок: ${
									dataAboutUser.callOnLessonIn5minutes
										? `${
												dataAboutUser.callOnLessonIn10minutes
													? 2
													: 1
										  }`
										: `${
												dataAboutUser.callOnLessonIn10minutes
													? 1
													: 0
										  }`
								}`,
								callback_data: "-",
							},
							{
								text: `На перемену: ${
									dataAboutUser.callOnBreakIn5minutes
										? `${
												dataAboutUser.callOnBreakIn10minutes ? 2 : 1
										  }`
										: `${
												dataAboutUser.callOnBreakIn10minutes ? 1 : 0
										  }`
								}`,
								callback_data: "-",
							},
						],

						[
							{
								text: `За 5 мин ${
									dataAboutUser.callOnLessonIn5minutes ? "✅" : ""
								}`,
								callback_data: "toggleСallOnLessonIn5minutes",
							},
							{
								text: `За 5 мин ${
									dataAboutUser.callOnBreakIn5minutes ? "✅" : ""
								}`,
								callback_data: "toggleСallOnBreakIn5minutes",
							},
						],
						[
							{
								text: `За 10 мин ${
									dataAboutUser.callOnLessonIn10minutes ? "✅" : ""
								}`,
								callback_data: "toggleСallOnLessonIn10minutes",
							},
							{
								text: `За 10 мин ${
									dataAboutUser.callOnBreakIn10minutes ? "✅" : ""
								}`,
								callback_data: "toggleСallOnBreakIn10minutes",
							},
						],

						[{ text: "⬅️Назад", callback_data: "calls" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function Games(chatId) {
	try {
		await bot.editMessageText("*_😆 Развлечения 🕹️_\n\nВо что сыграем? 🤔*", {
			chat_id: chatId,
			message_id: usersData.find((obj) => obj.chatId === chatId).messageId,
			parse_mode: "MarkdownV2",
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Угадайка ❓", callback_data: "game1" },
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
		bot.editMessageText(
			`*_❓ Угадайка ❓_\n\nЯ загадал цифру\\! ${
				chatId == qu1z3xId ? rndNum : ""
			}\n\nОтгадывай 😉*`,
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
			"*_✋ Цуе\\-Фа ✌️_\n\nСоперник уже на подходе❗😥\n\nЧто выберешь❓*",
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
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n🤷‍♂️ Ничья\\! 🤷‍♀️\n\nРезультат\\:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕще партейку\\? 🤔*`,
				{
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
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
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n✅ Ты победил\\! 🥳\n\nРезультат:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕще партейку\\? 🤔*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					disable_web_page_preview: true,
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
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n❌ Ты проиграл\\! 😔\n\nРезультат:\n 👤${playerChoise}  vs  ${computerChoise}🤖\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕще партейку\\? 🤔*`,
				{
					parse_mode: "MarkdownV2",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					disable_web_page_preview: true,
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
		`<b><i>✏️ Редактирование: Новости 📖</i>\n\n📖 Текущий текст:</b>\n\n<code>${newsText[1]}</code>\n\n<b>Напиши измененный текст ниже ✍️</b>`,
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
	if (chatId == qu1z3xId || chatId == stepanovId) {
		userStatus = "Администратор 👑";
	} else {
		userStatus = "Ученик 🧑‍🏫";
	}

	const countRem = remindersData.filter((obj) => obj.chatId === chatId).length;
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	textCallsNotifStatus = "❌🔕";

	if (
		dataAboutUser.callOnBreakIn5minutes ||
		dataAboutUser.callOnLessonIn5minutes ||
		dataAboutUser.callOnBreakIn10minutes ||
		dataAboutUser.callOnLessonIn10minutes
	)
		textCallsNotifStatus = "✅🔔";
	try {
		await bot.editMessageText(
			`*_🛠️ Настройки ⚙️_\n\nДанные:*\nТвой логин: *${firstName}*\nРоль: *${userStatus}*\nID профиля: _*${chatId}*_\nКласс: *${
				dataAboutUser.className
			}\n\nУведомления:*\nЗвонки: *${textCallsNotifStatus}* \\- [${
				textCallsNotifStatus == "✅🔔" ? "изменить" : "включить"
			}](https://t.me/${BotName}/?start=notificationsmenucalls)\nНапоминания: *${"✅🔔"}*\nСоздано: *${countRem}* \\- ${
				countRem > 0
					? "[список](https://t.me/${BotName}/?start=remindersList)"
					: "[создать](https://t.me/${BotName}/?start=remindersAdd)"
			}*\n\nСтатистика в играх:*\nУгадайка: *${
				dataAboutUser.game1NiceResults
			}✅\\, ${dataAboutUser.game1BadResults}❌ ${
				dataAboutUser.game1NiceResults + dataAboutUser.game1BadResults > 0
					? `из ${
							dataAboutUser.game1NiceResults +
							dataAboutUser.game1BadResults
					  }`
					: ""
			}*\nЦуе\\-фа: *${dataAboutUser.game2NiceResults}✅\\, ${
				dataAboutUser.game2BadResults
			}❌\\, ${dataAboutUser.game2DrawResults}🤷‍♂️ ${
				dataAboutUser.game2NiceResults +
					dataAboutUser.game2BadResults +
					dataAboutUser.game2DrawResults >
				0
					? `из ${
							dataAboutUser.game2NiceResults +
							dataAboutUser.game2BadResults +
							dataAboutUser.game2DrawResults
					  }`
					: ""
			}*\n\n*[Правила пользования ресурсом](https://t.me/${BotName}/?start=rules2)*`,
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
	try {
		await bot.editMessageText(
			`*_💠Центр управления💠_\n\nЧем я могу быть полезен\\? 🤖*`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "Реестр 💾", callback_data: "usersdatalist" },
							{
								text: "Делегаты 🎓",
								callback_data: "conferencedatalist",
							},
						],
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
			"<b><i>📋 Объявление 📢 \n\n❗ВНИМАНИЕ❗</i>\n\nВсе пользователи получат уведомление!\n\n<i>Пример:</i>\n</b><code>=В школе родительское собрание❗😉</code><b>\n\nНапиши объявление ниже c `=` ✍️</b>",
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
			if (
				usersData[i].chatId != qu1z3xId &&
				usersData[i].chatId != stepanovId
			) {
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

async function RegistryUsersData(chatId, listNum) {
	try {
		let text = "";

		const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
		if (listNum == 1) {
			for (let i = 0; i < usersData.length; i++) {
				text += `[${i + 1}]  @${usersData[i].username}\n• ChatId: <code>${
					usersData[i].chatId
				}</code>\n• className: "${
					usersData[i].className
				}"\n• allGamesPlayed: ${
					usersData[i].game1BadResults +
					usersData[i].game1NiceResults +
					usersData[i].game2BadResults +
					usersData[i].game2NiceResults +
					usersData[i].game2DrawResults
				}\n• callsNotif: ${
					dataAboutUser.callOnLessonIn5minutes ||
					dataAboutUser.callOnLessonIn10minutes ||
					dataAboutUser.callOnBreakIn5minutes ||
					dataAboutUser.callOnBreakIn10minutes
						? true
						: false
				} \n\n`;
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
							[
								{ text: "⬅️Назад", callback_data: "adminMenu" },
								{ text: "Обновить🔄️", callback_data: "usersdatalist" },
							],
						],
					},
				}
			);
		} else if (listNum == 2) {
			let countConf = 0;
			for (let i = 0; i < conferenceData.length; i++) {
				if (conferenceData[i].registrationIsDone) {
					text += `[${i + 1}] <code>${conferenceData[i].lastName} ${
						conferenceData[i].firstName
					} ${conferenceData[i].middleName}</code>\n• Должность:  <code>${
						conferenceData[i].careerName
					}</code>\n• Регион:  <code>${
						conferenceData[i].region
					}</code>\n• Город:  <code>${
						conferenceData[i].city
					}</code>\n• Учреждение:  <code>${
						conferenceData[i].institution
					}</code>\n• Почта:  <code>${conferenceData[i].mail}</code>\n\n`;
					countConf++;
				}
			}

			bot.editMessageText(
				`<b><i>🎓 Участники конференции 🤠</i>\n\n${
					countConf > 0
						? `Кликом копируется инфа❗\n\n<i>Данные об участниках:\n\n${text}</i>Всего: ${countConf}`
						: "Пока что пусто 🏝️"
				}</b>`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "Регистрация 🪪",
									callback_data: "startofregistration",
								},
							],
							[
								{ text: "⬅️Назад", callback_data: "adminMenu" },
								{
									text: "Обновить🔄️",
									callback_data: "conferencedatalist",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
	}
}

async function Reminders(chatId) {
	const countRem = remindersData.filter((obj) => obj.chatId === chatId).length;

	try {
		bot.editMessageText(
			"*_🔔 Напоминания 🗓️_\n\nЯ могу тебе напомнить\\:\n• Когда сдать докла\\.\\.\\.\n• Да всё что угодно\\!🤯\n\\- и я не забуду, то что ты мне поручишь напомнить\\!😉\n\nНе засоряй телефон, пиши мне🤗*",
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
		const userReminders = remindersData.filter(
			(obj) => obj.chatId === chatId
		);
		if (userReminders.length > 0) {
			let i = 1;
			userReminders.forEach((obj) => {
				reminderText += `<b>${i}.</b> ${obj.text} - <b>${obj.time}</b>\n\n`;
				i++;
			});
		} else if (userReminders.length == 0) {
			reminderText = "У тебя <b>нет</b> активных напоминаний 😉\n\n";
		}

		let deleteallreminderButtonText;
		if (userReminders.length == 0) deleteallreminderButtonText = "";
		else if (userReminders.length > 0)
			deleteallreminderButtonText = "Удалить все ❌";

		bot.editMessageText(
			`<b><i>🔔 Текущие напоминания 🗓️</i>\n\nТвои напоминания:</b><i>\n\n${reminderText}</i><b>${
				userReminders.length != 0 ? `Всего: ${userReminders.length}` : ""
			}</b>`,
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
			`<b><i>🔔 Создание напоминания 📝\n\nПример:</i></b>\n<code>Сесть за уроки в <b>${dateNowHNN}</b></code>\n\n<b>Пиши прямо под сообщением 😉✍️</b>`,
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

async function start(chatId, firstName, quickStart = false) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
	let rndNum = Math.floor(Math.random() * stickers.length);

	const dateNowHHNN = `${String(new Date().getHours()).padStart(
		2,
		"0"
	)}:${String(new Date().getMinutes()).padStart(2, "0")}`;
	if (dateNowHHNN < "12:00" && dateNowHHNN >= "06:00") textDay = "Доброе утро";
	else if (dateNowHHNN < "17:00" && dateNowHHNN >= "12:00")
		textDay = "Добрый день";
	else if (dateNowHHNN < "22:00" && dateNowHHNN >= "17:00")
		textDay = "Добрый вечер";
	else if (dateNowHHNN >= "22:00" || dateNowHHNN < "6:00")
		textDay = "Доброй ночи";

	try {
		await bot.sendSticker(chatId, stickers[rndNum]).then((message) => {
			dataAboutUser.messageIdSayHi0 = message.message_id;
		});

		await bot
			.sendMessage(chatId, `*${textDay}, ${firstName}\\! ✌️*`, {
				parse_mode: "MarkdownV2",
			})
			.then((message) => {
				dataAboutUser.messageIdSayHi1 = message.message_id;
			});

		await bot
			.sendMessage(
				chatId,
				`*[Что умеет этот чат\\-бот\\?](https://t.me/${BotName}/?start=showhi2)*`,
				{
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
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

		if (gogreetingsedit) {
			gogreetingsedit = false;
			cron.schedule(`1 1 * * * *`, function () {
				for (let i = 0; i < usersData.length; i++) {
					if (usersData[i].messageIdSayHi1 != "") {
						bot.editMessageText(`*${textDay}, ${firstName}\\! ✌️*`, {
							parse_mode: "MarkdownV2",
							chat_id: usersData[i].chatId,
							message_id: usersData[i].messageIdSayHi1,
						});
					}
				}
			});
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
		sendDataAboutError(
			chatId,
			"Не обработан момент прощания, завершения перед новым диалогом (deleteAllMessages)"
		);
	}
}
//! ФУНКЦИОНАЛ ДЛЯ ЗАПИСИ НА КОНФЕРЕНЦИЮ

async function startConference(chatId, firstName) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);

	let rndNum = Math.floor(Math.random() * stickers.length);
	const dateNowHHNN = `${String(new Date().getHours()).padStart(
		2,
		"0"
	)}:${String(new Date().getMinutes()).padStart(2, "0")}`;
	if (dateNowHHNN < "12:00" && dateNowHHNN >= "06:00") textDay = "Доброе утро";
	else if (dateNowHHNN < "17:00" && dateNowHHNN >= "12:00")
		textDay = "Добрый день";
	else if (dateNowHHNN < "22:00" && dateNowHHNN >= "17:00")
		textDay = "Добрый вечер";
	else if (dateNowHHNN >= "22:00" || dateNowHHNN < "6:00")
		textDay = "Доброй ночи";

	try {
		await bot.sendSticker(chatId, stickers[rndNum]);

		await bot.sendMessage(chatId, `*${textDay}, ${firstName}\\! ✌️*`, {
			parse_mode: "MarkdownV2",
		});

		await bot.sendMessage(
			chatId,
			`*Я чат\\-помощник\\!👌 И я помогу вам записаться на конференцию в школу 27к2, города Мытищи\\, Московская Область\\!😉*`,
			{
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
			}
		);

		await bot.sendMessage(chatId, `ㅤ`).then((message) => {
			dataAboutConferenceUsers.messageId = message.message_id;
		});
		startOfRegistration(chatId);
	} catch (error) {
		console.log(error);
	}
}

async function menuConf(chatId, createMessage) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	let buttonNum = 0;

	try {
		dataAboutConferenceUsers.actionInBot = 1;
		if (!createMessage && dataAboutConferenceUsers.registrationIsDone) {
			bot.editMessageText(`<b>С чем я могу вам помочь? 🤔</b>`, {
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `🪪 Ваша анкета 🙍‍♂️`,
								callback_data: "startofregistration",
							},
						],
						[
							{
								text: `Программа ⏰`,
								callback_data: "-",
							},
							{
								text: `Ораторы 👥`,
								callback_data: "-",
							},
						],
						[
							{
								text: `Маршрут 🗺️`,
								callback_data: "-",
							},
							{
								text: `Отзыв 📩`,
								callback_data: "-",
							},
						],
						[
							{
								text: `${
									chatId == qu1z3xId || chatId == stepanovId
										? "Основной бот 🤖"
										: ""
								}`,
								callback_data: "exit",
							},
						],
					],
				},
			});
		} else if (
			!createMessage &&
			!dataAboutConferenceUsers.registrationIsDone
		) {
			bot.editMessageText(`<b>Завершите регистрацию 🙏❗</b>`, {
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `🪪 Регистрация 🙍‍♂️`,
								callback_data: "startofregistration",
							},
						],
						[
							{
								text: `Программа ⏰`,
								url: `https://t.me/${BotName}`,
							},
							{
								text: `Ораторы 👥`,
								url: `https://t.me/${BotName}`,
							},
						],
						[
							{
								text: `Маршрут📍`,
								url: `https://t.me/${BotName}`,
							},
							{
								text: `Отзыв 📩`,
								url: `https://t.me/${BotName}`,
							},
						],
						[
							{
								text: `${
									chatId == qu1z3xId || chatId == stepanovId
										? "Основной бот 🤖"
										: ""
								}`,
								callback_data: "exit",
							},
						],
					],
				},
			});
		} else if ((createMessage, dataAboutConferenceUsers.registrationIsDone)) {
			bot.sendMessage(chatId, `<b>С чем я могу вам помочь? 🤔</b>`, {
				parse_mode: "html",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `🪪 Ваша анкета 🙍‍♂️`,
								callback_data: "startofregistration",
							},
						],
						[
							{
								text: `Программа ⏰`,
								callback_data: "-",
							},
							{
								text: `Ораторы 👥`,
								callback_data: "-",
							},
						],
						[
							{
								text: `Маршрут📍`,
								callback_data: "-",
							},
							{
								text: `Отзыв 📩`,
								callback_data: "-",
							},
						],
						[
							{
								text: `${
									chatId == qu1z3xId || chatId == stepanovId
										? "Основной бот 🤖"
										: ""
								}`,
								callback_data: "exit",
							},
						],
					],
				},
			});
		} else if (
			(createMessage, !dataAboutConferenceUsers.registrationIsDone)
		) {
			bot.sendMessage(chatId, `<b>Завершите регистрацию 🙏❗</b>`, {
				parse_mode: "html",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `🪪 Регистрация 🙍‍♂️`,
								callback_data: "startofregistration",
							},
						],
						[
							{
								text: `Программа ⏰`,
								url: `https://t.me/${BotName}`,
							},
							{
								text: `Ораторы 👥`,
								url: `https://t.me/${BotName}`,
							},
						],
						[
							{
								text: `Маршрут📍`,
								url: `https://t.me/${BotName}`,
							},
							{
								text: `Отзыв 📩`,
								url: `https://t.me/${BotName}`,
							},
						],
						[
							{
								text: `${
									chatId == qu1z3xId || chatId == stepanovId
										? "Основной бот 🤖"
										: ""
								}`,
								callback_data: "exit",
							},
						],
					],
				},
			});
		}
	} catch (error) {
		console.log(error);
	}
}

async function startOfRegistration(chatId, usersBlank = false) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		if (!usersBlank) {
			dataAboutConferenceUsers.actionInBot = 1;
			await bot.editMessageText(
				`<b>Добро пожаловать! 👋😁</b>\n\nВы попали на прямую <b>регистрацию на конференцию!</b> 🪪\n\n<i>❗Пожалуйста, <B>ВНИМАТЕЛЬНО</B> читайте требования на каждом этапе❗</i>\n\n- Если введены <b><i>неверные данные,</i></b> всегда можно вернуться на <b>предыдущий</b> этап или пройти регистрацию <b>вновь!</b> 😉`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: dataAboutConferenceUsers.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "⬅️В меню",
									callback_data: "menuConf",
								},
								{
									text: "Продолжить ✅",
									callback_data: "initials",
								},
							],
						],
					},
				}
			);
		} else if (usersBlank) {
			dataAboutConferenceUsers.actionInBot = 1;
			await bot.editMessageText(
				`<b>Вы уже зарегистрированы! 😉</b>\n\n<b>Ваша анкета:</b>\n<i>Проверьте коректность❗</i><b>\n\n<code>${dataAboutConferenceUsers.lastName} ${dataAboutConferenceUsers.firstName} ${dataAboutConferenceUsers.middleName}</code>\nДолжность: <code>${dataAboutConferenceUsers.careerName}</code>\nРегион: <code>${dataAboutConferenceUsers.region}</code>\nГород: <code>${dataAboutConferenceUsers.city}</code>\nУчреждение: <code>${dataAboutConferenceUsers.institution}</code>\nE-mail: <code>${dataAboutConferenceUsers.mail}</code>\n\nИзменить данные? 🧐</b>`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: dataAboutConferenceUsers.messageId,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "⬅️ В меню",
									callback_data: "menuConf",
								},
								{
									text: "Изменить 🔄️",
									callback_data: "initials",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
	}
}

async function getInitialsConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);

	try {
		dataAboutConferenceUsers.actionInBot = 1;
		bot.editMessageText(
			`<b><i>Этап 1/6  •  Инициалы</i></b> ${
				dataAboutConferenceUsers.middleName == "" ? "" : "✅"
			}\n\nИтак, приступим к <b>знакомству!</b> 👋😉\n\n${
				dataAboutConferenceUsers.middleName == ""
					? "<b>Пример (ФИО)</b>:\n<code>Петров Пётр Петрович</code>\n\nНапишите ниже <b>свои инициалы</b> 😀"
					: `<b>Указаное ФИО:</b>\n<code>${dataAboutConferenceUsers.lastName} ${dataAboutConferenceUsers.firstName} ${dataAboutConferenceUsers.middleName}</code>\n\nНапишите <b>изменённые</b> данные 🤔`
			}✍️`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "⬅️ Назад",
								callback_data: "startofregistration",
							},
							{
								text: `${
									dataAboutConferenceUsers.middleName != ""
										? "Вперед ➡️ "
										: ""
								}`,
								callback_data: "careername",
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

async function getCareerNameConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		dataAboutConferenceUsers.actionInBot = 2;

		bot.editMessageText(
			`<b><i>Этап 2/6  •  Должность</i></b> ${
				dataAboutConferenceUsers.careerName == "" ? "" : "✅"
			}\n\n<b>Отлично!</b>👌\nТеперь мы не <b><i>чужие люди</i></b> 😁\n\n<b>Таблица постепенно заполняется:</b>\n<code>${
				dataAboutConferenceUsers.firstName
			} ${dataAboutConferenceUsers.middleName}</code>\n\n${
				dataAboutConferenceUsers.careerName == ""
					? "Сейчас укажите вашу <b>должность</b> 🤔"
					: `<b>Выбранная должность:</b>\n<code>${dataAboutConferenceUsers.careerName}</code>\n\nВпишите <b>измененную</b> должность 🧐`
			}✍️`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️ Назад", callback_data: "initials" },
							{
								text: `${
									dataAboutConferenceUsers.careerName != ""
										? "Вперед ➡️ "
										: ""
								}`,
								callback_data: "region",
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

async function getRegionConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		dataAboutConferenceUsers.actionInBot = 3;

		bot.editMessageText(
			`<b><i>Этап 3/6  •  Регион</i></b> ${
				dataAboutConferenceUsers.region == "" ? "" : "✅"
			}\n\n<b><code>${dataAboutConferenceUsers.firstName} ${
				dataAboutConferenceUsers.middleName
			}</code>\nДолжность: <code>${
				dataAboutConferenceUsers.careerName
			}</code></b>\n\nСупер, <b>продолжаем!</b>👍\n${
				dataAboutConferenceUsers.region == ""
					? "А теперь ваш <b>регион</b> 😁"
					: `\n<b>Текущий регион:</b>\n<code>${dataAboutConferenceUsers.region}</code>\n\nИзмените и напишите <b>регион</b> 😊`
			}✍️`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️ Назад", callback_data: "careername" },
							{
								text: `${
									dataAboutConferenceUsers.region != ""
										? "Вперед ➡️"
										: ""
								}`,
								callback_data: "city",
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

async function getCityConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		dataAboutConferenceUsers.actionInBot = 4;

		bot.editMessageText(
			` <b><i>Этап 4/6  •  Город</i></b> ${
				dataAboutConferenceUsers.city == "" ? "" : "✅"
			}\n\n<b><code>${dataAboutConferenceUsers.firstName} ${
				dataAboutConferenceUsers.middleName
			}</code>\nДолжность: <code>${
				dataAboutConferenceUsers.careerName
			}</code>\nРегион: <code>${
				dataAboutConferenceUsers.region
			}</code></b>\n\n<b>Прекрасно</b>, просто <b>замечательно!</b> 🤩\n\n${
				dataAboutConferenceUsers.city == ""
					? "Какой регион без <b>города?</b> 😅\nПожалуйста, напишите <b>его</b> 🙏"
					: `<b>Выбранный город:</b>\n<code>${dataAboutConferenceUsers.city}</code>\n\nНапишите свой <b>город снова</b> 👌`
			}✍️`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️ Назад", callback_data: "region" },
							{
								text: `${
									dataAboutConferenceUsers.city != ""
										? "Вперед ➡️"
										: ""
								}`,
								callback_data: "institution",
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

async function getInstitutionConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		dataAboutConferenceUsers.actionInBot = 5;

		bot.editMessageText(
			`<b><i>Этап 5/6  •  Учреждение</i></b> ${
				dataAboutConferenceUsers.institution == "" ? "" : "✅"
			}\n\n<b><code>${dataAboutConferenceUsers.firstName} ${
				dataAboutConferenceUsers.middleName
			}</code>\nДолжность: <code>${
				dataAboutConferenceUsers.careerName
			}</code>\nРегион: <code>${
				dataAboutConferenceUsers.region
			}</code>\nГород: <code>${
				dataAboutConferenceUsers.city
			}</code></b>\n\nОсталось совсем <b>немного!</b> 🤏\n\n${
				dataAboutConferenceUsers.institution == ""
					? "А как же <b>учебное заведение?</b> 🤔"
					: `<b>Текущее учреждение:</b>\n<code>${dataAboutConferenceUsers.institution}</code>\n\nВпишите <b>изменое</b> учебное заведение 😉`
			}✍️`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️ Назад", callback_data: "city" },
							{
								text: `${
									dataAboutConferenceUsers.institution != ""
										? "Вперед ➡️"
										: ""
								}`,
								callback_data: "mail",
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

async function getEMailConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		dataAboutConferenceUsers.actionInBot = 6;

		bot.editMessageText(
			`<b><i>Этап 6/6  •  E-mail</i></b> ${
				dataAboutConferenceUsers.mail == "" ? "" : "✅"
			}\n\n<b><code>${dataAboutConferenceUsers.firstName} ${
				dataAboutConferenceUsers.middleName
			}</code>\nДолжность: <code>${
				dataAboutConferenceUsers.careerName
			}</code>\nРегион: <code>${
				dataAboutConferenceUsers.region
			}</code>\nГород: <code>${
				dataAboutConferenceUsers.city
			}</code>\nУчреждение: <code>${
				dataAboutConferenceUsers.institution
			}</code></b>\n\nИии.. <b>Главный</b> вопрос!🧐 \n\n${
				dataAboutConferenceUsers.mail == ""
					? "<b>Пример:</b>\n<code>originalno@yandex.ru</code>\n\nПотребуется ваш <b>E-mail</b> 🙏"
					: `<b>Указанный E-mail:</b>\n<code>${dataAboutConferenceUsers.mail}</code>\n\nНапишите <b>новую</b> Эл. почту 😀`
			}✍️`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️ Назад", callback_data: "institution" },
							{
								text: `${
									dataAboutConferenceUsers.mail != "" ? "Итог ➡️" : ""
								}`,
								callback_data: "endоfкegistration",
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

async function endOfRegistrationConf(chatId) {
	const dataAboutConferenceUsers = conferenceData.find(
		(obj) => obj.chatId === chatId
	);
	try {
		dataAboutConferenceUsers.actionInBot = 7;

		dataAboutConferenceUsers.registrationIsDone = `${
			dataAboutConferenceUsers.middleName != "" &&
			dataAboutConferenceUsers.careerName != "" &&
			dataAboutConferenceUsers.region != "" &&
			dataAboutConferenceUsers.city != "" &&
			dataAboutConferenceUsers.institution != "" &&
			dataAboutConferenceUsers.mail != ""
				? true
				: false
		}`;
		bot.editMessageText(
			`<b>❗Проверьте ВСЕ пункты❗\n\n<code>${dataAboutConferenceUsers.lastName} ${dataAboutConferenceUsers.firstName} ${dataAboutConferenceUsers.middleName}</code>\nДолжность: <code>${dataAboutConferenceUsers.careerName}</code>\nРегион: <code>${dataAboutConferenceUsers.region}</code>\nГород: <code>${dataAboutConferenceUsers.city}</code>\nУчреждение: <code>${dataAboutConferenceUsers.institution}</code>\nE-mail: <code>${dataAboutConferenceUsers.mail}</code></b>\n\n<b>Поздравляю вас!</b> 🥳👏\n\nРегистрация на проект - <b>пройдена!</b> ✅😉\n\n<b>- Есть ошибки? ❌\nВернитесь</b> и <b>измените</b> данные!👌
			`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutConferenceUsers.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "⬅️ Изменить", callback_data: "mail" },
							{
								text: `Отправить ✅`,
								callback_data: "senduserblank",
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

async function StartAll() {
	// bot.sendMessage(userChatId, ""); //?                                                         Принудительная отправка сообщений определенному лицу.

	if (TOKEN == TOKENs[0]) BotName = "digsch27_bot";
	else if (TOKEN == TOKENs[1]) BotName = "digschbot";

	const timeFormat = /^\d{1,2}:\d{2}$/;

	bot.onText(/=(.+)/, async (message, match) => {
		let chatId = message.chat.id;
		if (chatId == qu1z3xId || chatId == stepanovId) {
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
					`<b>❗ Не верный формат времени 🚫\n\n<i>Пример:</i></b>\n<code>Выкинуть мусор в </code><b>H:MM\n\nПерепиши напоминание ниже 😉✍️</b>`,
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
			}

			remindersData.push({ chatId: chatId, text: textRem, time: timeRem });

			sendDataAboutAction(
				message.from.first_name,
				message.from.username,
				chatId,
				`🔔 Запросил напоминание <i>${textRem}</i> на ${timeRem}`
			);

			await bot.editMessageText(
				`<b>Поставил напоминание на ${timeRem}</b>😉\n\n<i>"${textRem}"</i>`,
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
										remindersData.filter(
											(obj) => obj.chatId === chatId
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

			cron.schedule(`1 ${minutes} ${hours} * * *`, function () {
				const dateNowHNN = `${String(new Date().getHours())}:${String(
					new Date().getMinutes()
				).padStart(2, "0")}`;
				const dateNowHHNN = `${String(new Date().getHours()).padStart(
					2,
					"0"
				)}:${String(new Date().getMinutes()).padStart(2, "0")}`;
				if (remindersData.length > 0) {
					for (let i = 0; i < remindersData.length; i++) {
						if (
							remindersData[i].time == dateNowHNN ||
							remindersData[i].time == dateNowHHNN
						) {
							bot.sendMessage(
								remindersData[i].chatId,
								`<b>🔔 Напоминание ❗\n<i>${remindersData[i].text}</i> на ${remindersData[i].time}</b>`,
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
								bot.pinChatMessage(chatId, message.message_id);
							});

							sendDataAboutAction(
								message.from.first_name,
								message.from.username,
								chatId,
								`✅ Получил напоминание <i>${textRem}</i> на ${timeRem}`
							);
							remindersData.splice(i, 1); // удаление напоминания которое уже объявилось
						}
					}
				}
			});
		} catch (error) {
			console.log(error);
			sendDataAboutError(
				chatId,
				"Не обработан момент редактирования сообщения о созданном напоминании из за потери 'messageId' (deleteAllMessages)"
			);
		}
	});

	//? конференция
	bot.onText(/(.+) (.+) (.+)/, async (message, match) => {
		const chatId = message.chat.id;
		const dataAboutConferenceUsers = conferenceData.find(
			(obj) => obj.chatId === chatId
		);

		if (
			dataAboutConferenceUsers &&
			dataAboutConferenceUsers.actionInBot == 1
		) {
			try {
				dataAboutConferenceUsers.lastName = match[1];
				dataAboutConferenceUsers.firstName = match[2];
				dataAboutConferenceUsers.middleName = match[3];

				getCareerNameConf(chatId);
			} catch (error) {
				console.log(error);
			}
		}
	});

	bot.on("message", async (message) => {
		const text = message.text;
		const chatId = message.chat.id;
		messageId_user = message.message_id;
		let firstName = message.from.first_name;

		const dataAboutConferenceUsers = conferenceData.find(
			(obj) => obj.chatId === chatId
		);
		const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

		if (
			((text == "/start conference" || text == "Cc") &&
				!dataAboutUser &&
				!dataAboutConferenceUsers) ||
			((chatId == qu1z3xId || chatId == stepanovId) &&
				!dataAboutUser &&
				(text == "/start conference" || text == "Cc") &&
				!dataAboutConferenceUsers)
		) {
			conferenceData.push({
				chatId: chatId,
				actionInBot: "",
				messageId: "",
				lastName: "", // фамилия
				firstName: "", // имя
				middleName: "", // отчество
				careerName: "",
				region: "",
				city: "",
				institution: "",
				mail: "",
				registrationIsDone: false,
			});
		} else if (
			(!dataAboutUser && !dataAboutConferenceUsers) ||
			((chatId == qu1z3xId || chatId == stepanovId) &&
				!dataAboutUser &&
				!dataAboutConferenceUsers)
		) {
			usersData.push({
				chatId: chatId,
				username: message.from.username,
				className: "Не определен",
				messageId: "",
				messageIdSayHi0: "",
				messageIdSayHi1: "",
				messageIdSayHi2: "",
				callOnLessonIn5minutes: false,
				callOnLessonIn10minutes: false,
				callOnBreakIn5minutes: false,
				callOnBreakIn10minutes: false,
				game1NiceResults: 0,
				game1BadResults: 0,
				game2NiceResults: 0,
				game2BadResults: 0,
				game2DrawResults: 0,
			});
		}
		try {
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

			// КОНФЕРЕНЦИЯ

			if (
				dataAboutConferenceUsers &&
				dataAboutConferenceUsers.actionInBot == 2
			) {
				dataAboutConferenceUsers.careerName = text;
				getRegionConf(chatId);
			} else if (
				dataAboutConferenceUsers &&
				dataAboutConferenceUsers.actionInBot == 3
			) {
				dataAboutConferenceUsers.region = text;
				getCityConf(chatId);
			} else if (
				dataAboutConferenceUsers &&
				dataAboutConferenceUsers.actionInBot == 4
			) {
				dataAboutConferenceUsers.city = text;
				getInstitutionConf(chatId);
			} else if (
				dataAboutConferenceUsers &&
				dataAboutConferenceUsers.actionInBot == 5
			) {
				dataAboutConferenceUsers.institution = text;
				getEMailConf(chatId);
			} else if (
				dataAboutConferenceUsers &&
				dataAboutConferenceUsers.actionInBot == 6
			) {
				dataAboutConferenceUsers.mail = text;
				endOfRegistrationConf(chatId);
			}

			//? КОМАНДЫ

			switch (text) {
				case "/start":
					bot.deleteMessage(chatId, messageId_user);
					deleteAllMessages(chatId);
					start(chatId, message.from.first_name);
					break;
				case "St":
				case "st":
					bot.deleteMessage(chatId, messageId_user);
					deleteAllMessages(chatId);
					start(chatId, message.from.first_name, true);
					break;
				case "/restart":
					bot.deleteMessage(chatId, messageId_user);
					if (!dataAboutUser && dataAboutConferenceUsers) {
						try {
							await bot.deleteMessage(
								chatId,
								dataAboutConferenceUsers.messageId
							);
						} catch (error) {
							console.log(error);
						}
						menuConf(chatId, true);
					} else if (dataAboutUser && !dataAboutConferenceUsers) {
						try {
							await bot.deleteMessage(chatId, dataAboutUser.messageId);
						} catch (error) {
							console.log(error);
						}
						menuHome(chatId, false);
					}
					break;
				case "/restart2":
					try {
						bot.deleteMessage(chatId, messageId_user);
						ChoosingClass(chatId, 2);
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

				case "/start remindersAdd":
					bot.deleteMessage(chatId, messageId_user);
					RemindersAdd(chatId);
					break;
				case "/start notificationsmenucalls":
					bot.deleteMessage(chatId, messageId_user);
					NotificationsMenuCalls(chatId);
					break;
				case "/start showhi2":
					bot.deleteMessage(chatId, messageId_user);
					bot.editMessageText(
						`*[Скрыть](https://t.me/${BotName}/?start=hidehi2)\n\nЯ чат\\-бот 🤖, поддерживаю _цифровое_ обучение🏫\\. Я буду твоим верным учебным помощником😉\\!\n • Нужно уточнить распиание?📚\n • Подсказать когда идти на урок?⏰\n • Напомнить о твоих планах?📝\n • Сыграть партейку в Цуе\\-Фа?✌️\n • Рассказать школьные новости?📖\nТогда я к твоим услугам\\! Поехали\\!🚀*`,
						{
							parse_mode: "MarkdownV2",
							chat_id: dataAboutUser.chatId,
							message_id: dataAboutUser.messageIdSayHi2,
							disable_web_page_preview: true,
						}
					);
					break;
				case "/start hidehi2":
					bot.deleteMessage(chatId, messageId_user);
					bot.editMessageText(
						`*[Что умеет этот чат\\-бот\\?](https://t.me/${BotName}/?start=showhi2)*`,
						{
							parse_mode: "MarkdownV2",
							chat_id: dataAboutUser.chatId,
							message_id: dataAboutUser.messageIdSayHi2,
							disable_web_page_preview: true,
						}
					);
					break;

				//?  приветствие и запись на конференцию

				case "Cc":
				case "/start conference":
					bot.deleteMessage(chatId, messageId_user);
					startConference(chatId, firstName);
					break;
				default:
					setTimeout(() => {
						if (
							dataAboutConferenceUsers &&
							dataAboutConferenceUsers.actionInBot == 1 &&
							dataAboutConferenceUsers.middleName == ""
						) {
							bot.deleteMessage(chatId, messageId_user);
							bot.editMessageText(
								"*❗Неверный формат\\! 🚫\n\n_Пример \\(ФИО\\):\n`Иванов Иван Иванович`_\n\nПожалуйста, перепишите, следуя примеру ✍️*",
								{
									parse_mode: "MarkdownV2",
									chat_id: chatId,
									message_id: dataAboutConferenceUsers.messageId,
								}
							);
							dataAboutConferenceUsers.actionInBot = 1;
						} else
							try {
								bot.deleteMessage(chatId, messageId_user);
							} catch (error) {
								console.log(error);
								sendDataAboutError(
									chatId,
									"Не обработан момент удаления сообщения пользователя (default)"
								);
							}
					}, 1000);
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
		const dataAboutConferenceUsers = conferenceData.find(
			(obj) => obj.chatId === chatId
		);

		try {
			if (
				(!dataAboutUser && !dataAboutConferenceUsers) ||
				((chatId == qu1z3xId || chatId == stepanovId) && !dataAboutUser)
			) {
				usersData.push({
					chatId: chatId,
					username: query.from.username,
					className: "Не определен",
					messageId: query.message.message_id,
					messageIdother: "",
					callOnLessonIn5minutes: false,
					callOnLessonIn10minutes: false,
					callOnBreakIn5minutes: false,
					callOnBreakIn10minutes: false,
					game1NiceResults: 0,
					game1BadResults: 0,
					game2NiceResults: 0,
					game2BadResults: 0,
					game2DrawResults: 0,
				});
			} else if (
				(!dataAboutUser && !dataAboutConferenceUsers) ||
				((chatId == qu1z3xId || chatId == stepanovId) &&
					!dataAboutConferenceUsers)
			) {
				conferenceData.push({
					chatId: chatId,
					actionInBot: "",
					messageId: "",
					lastName: "", // фамилия
					firstName: "", // имя
					middleName: "", // отчество
					careerName: "",
					region: "",
					city: "",
					institution: "",
					mail: "",
					registrationIsDone: false,
				});
			}

			if (dataAboutUser) {
				dataAboutUser.messageId = query.message.message_id;
			}
			if (dataAboutConferenceUsers) {
				dataAboutConferenceUsers.messageId = query.message.message_id;
			}

			let firstName = query.from.first_name;
			const dateNowHHNN = `${String(new Date().getHours()).padStart(
				2,
				"0"
			)}:${String(new Date().getMinutes() + 1).padStart(2, "0")}`;
			if (dateNowHHNN < "12:00" && dateNowHHNN >= "06:00")
				textDay = "Доброе утро";
			else if (dateNowHHNN < "17:00" && dateNowHHNN >= "12:00")
				textDay = "Добрый день";
			else if (dateNowHHNN < "22:00" && dateNowHHNN >= "17:00")
				textDay = "Добрый вечер";
			else if (dateNowHHNN >= "22:00" || dateNowHHNN < "6:00")
				textDay = "Доброй ночи";

			day = new Date().getDate();
			dayW = new Date().getDay();
			month = new Date().getMonth();

			const data = query.data;

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

			if (
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
					`*_❓ Угадайка ❓_\n\n${
						data == rndNum
							? `✅ Правильно ${rndNum}\\!🥳`
							: `${
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
										? `❌ Не правильно 😔\nОтвет: ${rndNum}\\!`
										: ``
							  }`
					}\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕщё партейку\\? 🤔*`,
					{
						parse_mode: "MarkdownV2",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId === chatId)
							.messageId,
						disable_web_page_preview: true,
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
			if (data == rndNum) dataAboutUser.game1NiceResults += 1;
			else if (
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
			)
				dataAboutUser.game1BadResults += 1;

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
					if (dataAboutConferenceUsers) {
						dataAboutConferenceUsers.actionInBot = 7;
					}
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
				case "callsnotificationsmenu":
					NotificationsMenuCalls(chatId);
					break;
				case "toggleСallOnLessonIn5minutes":
					NotificationsMenuCalls(
						chatId,

						!dataAboutUser.callOnLessonIn5minutes,
						dataAboutUser.callOnBreakIn5minutes,
						dataAboutUser.callOnLessonIn10minutes,
						dataAboutUser.callOnBreakIn10minutes
					);

					break;
				case "toggleСallOnBreakIn5minutes":
					NotificationsMenuCalls(
						chatId,

						dataAboutUser.callOnLessonIn5minutes,
						!dataAboutUser.callOnBreakIn5minutes,
						dataAboutUser.callOnLessonIn10minutes,
						dataAboutUser.callOnBreakIn10minutes
					);

					break;
				case "toggleСallOnLessonIn10minutes":
					NotificationsMenuCalls(
						chatId,
						dataAboutUser.callOnLessonIn5minutes,
						dataAboutUser.callOnBreakIn5minutes,
						!dataAboutUser.callOnLessonIn10minutes,
						dataAboutUser.callOnBreakIn10minutes
					);

					break;
				case "toggleСallOnBreakIn10minutes":
					NotificationsMenuCalls(
						chatId,

						dataAboutUser.callOnLessonIn5minutes,
						dataAboutUser.callOnBreakIn5minutes,
						dataAboutUser.callOnLessonIn10minutes,
						!dataAboutUser.callOnBreakIn10minutes
					);

					break;
				case "callsnotiftoggle":
					if (dataAboutUser) {
						usersData.find(
							(obj) => obj.chatId === chatId
						).callsNotification = !usersData.find(
							(obj) => obj.chatId === chatId
						).callsNotification;
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
						bot.editMessageText(`*_❓ Угадайка ❓_\n\n${hintText}*`, {
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
							`*_❓ Угадайка ❓_\n\nНу так не интересно\\! 😒\nОтвет: ${rndNum}\\!\n\nЕще партейку\\? 🤔*`,
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
							"*Твой профиль успешно удален\\! ✅\n\nПожалуйста, опиши причину \\- @qu1z3x\n\nЕсли соскучишься \\- /start, /restart2 😉*",
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
					RegistryUsersData(chatId, 1);
					break;
				case "conferencedatalist":
					RegistryUsersData(chatId, 2);
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
							remindersData.filter((obj) => obj.chatId === chatId)
								.length == 1
						) {
							warningText = `Твой список из _1_ заметки будет удален\\!`;
						} else if (
							remindersData.filter((obj) => obj.chatId === chatId)
								.length > 1
						) {
							warningText = `Твой список из _${
								remindersData.filter((obj) => obj.chatId === chatId)
									.length
							}_ заметок будет удален\\!`;
						}

						bot.editMessageText(
							`*_🔔 Удаление напоминаний ❌\n\n❗ВНИМАНИЕ❗_\n\nТвой список из _${
								remindersData.filter((obj) => obj.chatId === chatId)
									.length
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
						remindersData = remindersData.filter(
							(obj) => obj.chatId !== chatId
						);
						sendDataAboutAction(
							query.from.first_name,
							query.from.username,
							chatId,
							`❌ Удалил весь свой список напоминаний`
						);
						if (
							remindersData.filter((obj) => obj.chatId === chatId)
								.length == 0
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
							usersData.find((obj) => obj.chatId === chatId).messageIdcas
						);
					} catch (error) {
						console.log(error);
						sendDataAboutError(
							chatId,
							"Не обработан момент удаления сообщения с напоминанием (default)"
						);
					}
					break;

				// КОНФЕРЕНЦИЯ

				case "startofregistration":
					if (dataAboutConferenceUsers.registrationIsDone) {
						startOfRegistration(chatId, true);
					} else if (!dataAboutConferenceUsers.registrationIsDone) {
						startOfRegistration(chatId);
					}
					break;
				case "initials":
					getInitialsConf(chatId);
					break;
				case "careername":
					getCareerNameConf(chatId);
					break;
				case "region":
					getRegionConf(chatId);
					break;
				case "city":
					getCityConf(chatId);
					break;
				case "institution":
					getInstitutionConf(chatId);
					break;
				case "mail":
					getEMailConf(chatId);
					break;
				case "endоfкegistration":
					endOfRegistrationConf(chatId);
					break;
				case "senduserblank":
					try {
						bot.editMessageText(
							`Ваша анкета <b>успешно</b> отпралена! ✅\n\nCпасибо вам за <b>уделённое</b> время!🙏\n<b>Встретимся на конференции!</b>😄 `,
							{
								parse_mode: "html",
								chat_id: chatId,
								message_id: conferenceData.find(
									(obj) => obj.chatId === chatId
								).messageId,
							}
						);
						setTimeout(() => {
							menuConf(chatId, false);
						}, 5000);
					} catch (error) {
						console.log(error);
					}
					break;
				case "menuConf":
					menuConf(chatId);
					break;
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
		} catch (error) {
			console.log(error);
		}
	});
}

StartAll();
