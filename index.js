import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import fs from "fs";

const TOKENs = [
	"6654105779:AAEnCdIzKS_cgJUg4rMY8yNM3LPP5iZ-d_A",
	"6452076729:AAGds4jdMEUT-idcutZdLGVjKu5kyLs3Md4",
];

const TOKEN = TOKENs[1]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

import { sendDataAboutButton } from "./tgterminal.js";
import { sendDataAboutError } from "./tgterminal.js";
import { sendDataAboutAction } from "./tgterminal.js";

const qu1z3xId = "923690530";
const stepanovId = "5786876945";
let BotName = "digsch27_bot";

//? БАЗА ДАННЫХ

let remindersData = []; // существующие заметки
let usersData = []; // информация о пользователях

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
	`- Обновлен раздел с настройками ✅\n\n- Статистика сыгранных игр 👌\n\n- Объем всего функционала бота, упирается в +4000 строк кода <a href= "https://t.me/${BotName}/?start=minidetail5">🫡</a>\n\n- Я стал быстрее, во всех смыслах 🏎️\n\n- Максимальная нагрузка до 50 запросов в СЕКУНДУ 🤯`,
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
const weekDayNamesSHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

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
	"",
	"1. Информатика - 220\n2. Математика - 315\n3. Русский язык - 210\n4. Физика - 301\n5. История - 205\n6. Английский язык - 310\n7. Физкультура - Спортзал",
	"1. Физика - 301\n2. Русский язык - 210\n3. Информатика - 220\n4. Английский язык - 310\n5. История - 205\n6. Математика - 315",
	"1. Математика - 220\n2. История - 315\n3. Физкультура - Спортзал\n4. Английский язык - 310\n5. Информатика - 205\n6. Физика - 301\n7.Русский язык - 210 ",
	"1. Химия - 303\n2. Биология - 305\n3. География - 208\n4. Литература - 201\n5. Искусство - 307\n6. Технологии - 312\n7. Музыка - 304",
	"1. Информатика - 220\n2. Математика - 315\n3. Русский язык - 210\n4. Физика - 301\n5. История - 205\n6. Английский язык - 310\n7. Физкультура - Спортзал",
	"",
];
let textToSayHello = "",
	// Raspisanie
	month,
	day,
	dayW,
	userStatus,
	maxCountMiniDetails = 10,
	// games
	rndNum,
	// adminMenu
	numberArr = 0,
	paragrafs = [
		"❗ВНИМАНИЕ❗",
		"✉️ Уведомление 🗨️",
		"📢 Объявление 📢",
		"🆕 Новости 🌍",
	],
	textMessageForAllUsers;

const menuHomeText = [
	`Чем я могу тебе пригодиться? [😉](https://t.me/${BotName}/?start=minidetail0)`,
	`Чем я могу быть полезен? [🤓](https://t.me/${BotName}/?start=minidetail0)`,
	`Чем я могу быть полезным? [🥸](https://t.me/${BotName}/?start=minidetail0)`,
	`Чем я могу тебя облегчить? [🐵](https://t.me/${BotName}/?start=minidetail0)`,
	`Чем я могу помочь сегодня? [🤖](https://t.me/${BotName}/?start=minidetail0)`,
	`С чем я могу тебе помочь? [🤔](https://t.me/${BotName}/?start=minidetail0)`,
	`В чем я могу быть полезен? [👾](https://t.me/${BotName}/?start=minidetail0)`,
	`Как я могу тебя удовлетворить? [🐤](https://t.me/${BotName}/?start=minidetail0)`,
];

//?  ФУНКЦИИ

async function menuHome(chatId, exit = true) {
	rndNum = Math.floor(Math.random() * menuHomeText.length);
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		let adminMenuButtonText = "";
		if (chatId == qu1z3xId || chatId == stepanovId) {
			adminMenuButtonText = "💠 Управление 💠";
		}

		if (exit) {
			await bot.editMessageText(`*${menuHomeText[rndNum]}*`, {
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
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
				`*Сверху ты ничего не видел 🙈\n\n${menuHomeText[rndNum]}*`,
				{
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
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
			).then((message) => {
				dataAboutUser.messageId = message.message_id;
			});
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function rulesBot(chatId, RulesToStart = true) {
	let rulesText = `*_🤖 Правила пользования 📃_\n\n❗ПОЖАЛУЙСТА, ПРОЧТИ ВСЕ[🙏](https://t.me/${BotName}/?start=minidetail6)\n\n\\-  Пользоваться приложением строго в благих целях🌍\n\n\\-  Не совершать намеренные нарушения правил, или создание сбоев❌\n\n\\-  Бот не отвечает \\- команда \\/restart в твоем распоряжении\\!😉\n\n\\-  Нашёл ошибку? Бот по\\-прежнему не отвечает? Есть замечания по работе проекта? \\- пожалуйста, сообщи об этом автору @qu1z3x 👍 *`;

	if (RulesToStart) {
		try {
			await bot.editMessageText(rulesText, {
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
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
				`*Сверху ты ничего не видел 🙈*\n\n${rulesText}`,
				{
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
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
			sendDataAboutError(chatId, `${String(error)}`);
		}
	} else if (!RulesToStart) {
		try {
			await bot.editMessageText(rulesText, {
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
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
				`*Сверху ты ничего не видел 🙈*\n\n${rulesText}`,
				{
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
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

			sendDataAboutError(chatId, `${String(error)}`);
		}
	}
}

async function ChoosingClass(chatId, start = 1) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

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
								{
									text: `${
										dataAboutUser.className == "10Г" ? "•10Г•" : "10Г"
									}`,
									callback_data: "10g",
								},
								{
									text: `${
										dataAboutUser.className == "11А" ? "•11A•" : "11A"
									}`,
									callback_data: "11a",
								},
								{
									text: `${
										dataAboutUser.className == "11В" ? "•11В•" : "11В"
									}`,
									callback_data: "11v",
								},
								{
									text: `${
										dataAboutUser.className == "11Г" ? "•11Г•" : "11Г"
									}`,
									callback_data: "11g",
								},
								{
									text: `${
										dataAboutUser.className == "11Д" ? "•11Д•" : "11Д"
									}`,
									callback_data: "11d",
								},
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
		sendDataAboutError(chatId, `${String(error)}`);
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
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function RaspisanieText(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		if (dataAboutUser.className == "Не определен") {
			await bot.editMessageText(
				`*_⏰ Расписание 📚\n\nУ тебя не выбран класс❗_*\n\nЕго можно изменить *в настройках ⬇️😉*`,
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
				`<b><i><a href="https://t.me/${BotName}/?start=minidetail8">⏰</a> Расписание 📚\n\n</i></b>Класс: <b>${
					dataAboutUser.className
				} • ${weekDayNames[dataAboutUser.weekday]}\n\n${
					dataAboutUser.weekday == 0 || dataAboutUser.weekday == 6
						? "В этот день уроков нет, отдыхай! 😆"
						: `${classes11[dataAboutUser.weekday]}`
				}\n\n${
					dataAboutUser.weekday == 0 || dataAboutUser.weekday == 6
						? ""
						: "Расписание всё еще не точное 😔"
				}</b>`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: `${dataAboutUser.weekday == 1 ? "⛔" : "⬅️"}`,
									callback_data: `${
										dataAboutUser.weekday == 1
											? "-"
											: "previousweekday"
									}`,
								},
								{
									text: `${
										dataAboutUser.weekday == dayW
											? `Сегодня`
											: `${
													dataAboutUser.weekday == dayW + 1
														? `Завтра`
														: `${
																dataAboutUser.weekday ==
																	dayW - 1 &&
																dataAboutUser.weekday != 0
																	? "Вчера"
																	: `${
																			weekDayNamesSHORT[
																				dataAboutUser
																					.weekday
																			]
																	  }`
														  }`
											  }`
									}`,
									callback_data: "today",
								},
								{
									text: `${dataAboutUser.weekday == 0 ? "⛔" : "➡️"}`,
									callback_data: `${
										dataAboutUser.weekday == 0 ? "-" : "nextweekday"
									}`,
								},
							],

							[
								{ text: "⬅️Назад", callback_data: "raspisanie" },
								{
									text: "Создать 🗓️",
									callback_data: "reminders",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, `${String(error)}`);
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
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function Calls(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		const dateNowHHMM = new Date().getHours() * 100 + new Date().getMinutes();
		let lessonNum = 0;

		if (dateNowHHMM >= 830 && dateNowHHMM < 910) {
			lessonNum = 1;
		} else if (dateNowHHMM >= 910 && dateNowHHMM < 925) {
			lessonNum = 11;
		} else if (dateNowHHMM >= 925 && dateNowHHMM < 1005) {
			lessonNum = 2;
		} else if (dateNowHHMM >= 1005 && dateNowHHMM < 1025) {
			lessonNum = 22;
		} else if (dateNowHHMM >= 1025 && dateNowHHMM < 1105) {
			lessonNum = 3;
		} else if (dateNowHHMM >= 1105 && dateNowHHMM < 1125) {
			lessonNum = 33;
		} else if (dateNowHHMM >= 1125 && dateNowHHMM < 1205) {
			lessonNum = 4;
		} else if (dateNowHHMM >= 1205 && dateNowHHMM < 1220) {
			lessonNum = 44;
		} else if (dateNowHHMM >= 1220 && dateNowHHMM < 1300) {
			lessonNum = 5;
		} else if (dateNowHHMM >= 1300 && dateNowHHMM < 1315) {
			lessonNum = 55;
		} else if (dateNowHHMM >= 1315 && dateNowHHMM < 1355) {
			lessonNum = 6;
		} else if (dateNowHHMM >= 1355 && dateNowHHMM < 1410) {
			lessonNum = 66;
		} else if (dateNowHHMM >= 1410 && dateNowHHMM < 1450) {
			lessonNum = 7;
		} else if (dateNowHHMM >= 1450 && dateNowHHMM < 1600) {
			lessonNum = 77;
		} else {
		}

		let countCalls = 0;
		if (dataAboutUser.callOnLesson) countCalls++;
		if (dataAboutUser.callOnBreak) countCalls++;
		if (dataAboutUser.callOnLessonIn5minutes) countCalls++;
		if (dataAboutUser.callOnLessonIn10minutes) countCalls++;
		if (dataAboutUser.callOnBreakIn5minutes) countCalls++;
		if (dataAboutUser.callOnBreakIn10minutes) countCalls++;

		await bot.editMessageText(
			`<b><i>❗ Звонки  ⏰  |  ${
				dayW == 6 || dayW == 0
					? "🔕 - выходной"
					: `${
							dataAboutUser &&
							(dataAboutUser.callOnBreak ||
								dataAboutUser.callOnLesson ||
								dataAboutUser.callOnBreakIn5minutes ||
								dataAboutUser.callOnLessonIn5minutes ||
								dataAboutUser.callOnBreakIn10minutes ||
								dataAboutUser.callOnLessonIn10minutes)
								? `🔔 - ${countCalls} вкл`
								: "🔕 - выкл"
					  }`
			}</i>\n\n• Расписание звонков\n\n- ${
				lessonNum == 1
					? "<u>1 урок 08:30 - 09:10</u>"
					: "1 урок 08:30 - 09:10"
			} | ${lessonNum == 11 ? "<u>15мин</u>" : "15мин"}\n\n- ${
				lessonNum == 2
					? "<u>2 урок 09:25 - 10:05</u>"
					: "2 урок 09:25 - 10:05"
			} | ${lessonNum == 22 ? "<u>20мин</u>" : "20мин"}\n\n- ${
				lessonNum == 3
					? "<u>3 урок 10:25 - 11:05</u>"
					: "3 урок 10:25 - 11:05"
			} | ${lessonNum == 33 ? "<u>20мин</u>" : "20мин"}\n\n- ${
				lessonNum == 4
					? "<u>4 урок 11:25 - 12:05</u>"
					: "4 урок 11:25 - 12:05"
			} | ${lessonNum == 44 ? "<u>15мин</u>" : "15мин"}\n\n- ${
				lessonNum == 5
					? "<u>5 урок 12:20 - 13:00</u>"
					: "5 урок 12:20 - 13:00"
			} | ${lessonNum == 55 ? "<u>15мин</u>" : "15мин"}\n\n- ${
				lessonNum == 6
					? "<u>6 урок 13:15 - 13:55</u>"
					: "6 урок 13:15 - 13:55"
			} | ${lessonNum == 66 ? "<u>15мин</u>" : "15мин"}\n\n- ${
				lessonNum == 7
					? "<u>7 урок 14:10 - 14:50</u>"
					: "7 урок 14:10 - 14:50"
			} | ${
				lessonNum == 77 ? "<u>Домой</u>" : "Домой"
			}\n\n• Я умею напоминать ⬇️</b> `,

			{
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "html",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "Напоминать мне 🔔",
								callback_data: "callsnotificationsmenu",
							},
						],
						[
							{ text: "⬅️В меню", callback_data: "exit" },
							{ text: "Обновить🔄️", callback_data: "calls" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function NotificationsMenuCalls(
	chatId,
	callOnLesson = usersData.find((obj) => obj.chatId === chatId).callOnLesson,
	callOnBreak = usersData.find((obj) => obj.chatId === chatId).callOnBreak,
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

	dataAboutUser.callOnLesson = callOnLesson;
	dataAboutUser.callOnBreak = callOnBreak;
	dataAboutUser.callOnLessonIn5minutes = callOnLessonIn5minutes;
	dataAboutUser.callOnBreakIn5minutes = callOnBreakIn5minutes;
	dataAboutUser.callOnLessonIn10minutes = callOnLessonIn10minutes;
	dataAboutUser.callOnBreakIn10minutes = callOnBreakIn10minutes;

	let countOnLesson = 0;
	let countOnBreak = 0;

	if (dataAboutUser.callOnLesson) countOnLesson++;
	if (dataAboutUser.callOnLessonIn5minutes) countOnLesson++;
	if (dataAboutUser.callOnLessonIn10minutes) countOnLesson++;
	if (dataAboutUser.callOnBreak) countOnBreak++;
	if (dataAboutUser.callOnBreakIn5minutes) countOnBreak++;
	if (dataAboutUser.callOnBreakIn10minutes) countOnBreak++;
	try {
		await bot.editMessageText(
			`*_${
				dataAboutUser.callOnBreak ||
				dataAboutUser.callOnLesson ||
				dataAboutUser.callOnBreakIn5minutes ||
				dataAboutUser.callOnLessonIn5minutes ||
				dataAboutUser.callOnBreakIn10minutes ||
				dataAboutUser.callOnLessonIn10minutes
					? "🔔 Центр уведомлений 🔔"
					: "🔕 Центр уведомлений 🔕"
			}\n\nНапоминания:_\n*На урок: *${
				dataAboutUser.callOnLesson ? "сразу" : ""
			}${
				dataAboutUser.callOnLesson && dataAboutUser.callOnLessonIn5minutes
					? ", "
					: `${
							dataAboutUser.callOnLesson &&
							dataAboutUser.callOnLessonIn10minutes
								? ", "
								: ""
					  }`
			}${dataAboutUser.callOnLessonIn5minutes ? "за 5" : ""}${
				dataAboutUser.callOnLessonIn5minutes &&
				dataAboutUser.callOnLessonIn10minutes
					? " и "
					: ""
			}${dataAboutUser.callOnLessonIn10minutes ? "за 10" : ""}${
				!dataAboutUser.callOnLesson &&
				!dataAboutUser.callOnLessonIn5minutes &&
				!dataAboutUser.callOnLessonIn10minutes
					? "не выбрано"
					: `${
							dataAboutUser.callOnLesson &&
							!dataAboutUser.callOnLessonIn5minutes &&
							!dataAboutUser.callOnLessonIn10minutes
								? ""
								: " минут"
					  }`
			}*\nНа перемену: *${dataAboutUser.callOnBreak ? "сразу" : ""}${
				dataAboutUser.callOnBreak && dataAboutUser.callOnBreakIn5minutes
					? ", "
					: `${
							dataAboutUser.callOnBreak &&
							dataAboutUser.callOnBreakIn10minutes
								? ", "
								: ""
					  }`
			}${dataAboutUser.callOnBreakIn5minutes ? "за 5" : ""}${
				dataAboutUser.callOnBreakIn5minutes &&
				dataAboutUser.callOnBreakIn10minutes
					? " и "
					: ""
			}${dataAboutUser.callOnBreakIn10minutes ? "за 10" : ""}${
				!dataAboutUser.callOnBreak &&
				!dataAboutUser.callOnBreakIn5minutes &&
				!dataAboutUser.callOnBreakIn10minutes
					? "не выбрано"
					: `${
							dataAboutUser.callOnBreak &&
							!dataAboutUser.callOnBreakIn5minutes &&
							!dataAboutUser.callOnBreakIn10minutes
								? ""
								: " минут"
					  }`
			}\n\n${
				dayW == 6 || dayW == 0
					? "_❗Звонки не активны \\- выходной❗_\n\n"
					: "_❗ПРОВЕРЬТЕ УВЕДОМЛЕНИЯ В ТЕЛЕГРАММЕ❗_\n\n"
			}За сколько до звонка оповещать\\?* 🤔`,
			{
				parse_mode: "MarkdownV2",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `На урок: ${countOnLesson}`,
								callback_data: "-",
							},
							{
								text: `На перемену: ${countOnBreak}`,
								callback_data: "-",
							},
						],
						[
							{
								text: `В момент ${
									dataAboutUser.callOnLesson ? "✅" : ""
								}`,
								callback_data: "toggleСallOnLesson",
							},
							{
								text: `В момент ${
									dataAboutUser.callOnBreak ? "✅" : ""
								}`,
								callback_data: "toggleСallOnBreak",
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
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		dataAboutUser.userAction = 0;
		await bot.editMessageText(
			`<b><i>😆 Развлечения 🕹️</i>${
				dataAboutUser.game1NiceResults + dataAboutUser.game1BadResults >
					dataAboutUser.game2NiceResults +
						dataAboutUser.game2BadResults +
						dataAboutUser.game2DrawResults &&
				dataAboutUser.game1NiceResults + dataAboutUser.game1BadResults >
					dataAboutUser.game3NiceResults +
						dataAboutUser.game3BadResults +
						dataAboutUser.game3DrawResults
					? "</b>\n\nЛюбимая:\n<b>Угадайка ❓"
					: `${
							dataAboutUser.game2NiceResults +
								dataAboutUser.game2BadResults +
								dataAboutUser.game2DrawResults >
								dataAboutUser.game1NiceResults +
									dataAboutUser.game1BadResults &&
							dataAboutUser.game2NiceResults +
								dataAboutUser.game2BadResults +
								dataAboutUser.game2DrawResultss >
								dataAboutUser.game3NiceResults +
									dataAboutUser.game3BadResults +
									dataAboutUser.game3DrawResults
								? "</b>\n\nЛюбимая:\n<b>Цуе-Фа ✌️"
								: `${
										dataAboutUser.game3NiceResults +
											dataAboutUser.game3BadResults +
											dataAboutUser.game3DrawResults >
											dataAboutUser.game1NiceResults +
												dataAboutUser.game1BadResults &&
										dataAboutUser.game3NiceResults +
											dataAboutUser.game3BadResults +
											dataAboutUser.game3DrawResults >
											dataAboutUser.game2NiceResults +
												dataAboutUser.game2BadResults +
												dataAboutUser.game2DrawResults
											? "</b>\n\nЛюбимая:\n<b>❌ Крестики-Нолики ⭕"
											: ""
								  }`
					  }`
			}\n\nВо что сыграем? 🤔</b>`,
			{
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "html",
				reply_markup: {
					inline_keyboard: [
						[{ text: "❌ Крестики-Нолики ⭕", callback_data: "game3" }],
						[
							{ text: "Угадайка ❓", callback_data: "game1" },
							{ text: "Цуе-Фа ✌️", callback_data: "game2" },
						],
						[{ text: "⬅️В меню", callback_data: "exit" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function game1(chatId, startGame = true) {
	try {
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
		sendDataAboutError(chatId, `${String(error)}`);
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
							{ text: "✊", callback_data: "stoneGame2" },
							{ text: "✌️", callback_data: "scissorsGame2" },
							{ text: "🖐️", callback_data: "paperGame2" },
						],
						[{ text: "⬅️Назад", callback_data: "games" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function game2_2(chatId, playerNum) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	const options = ["✊", "✌️", "🖐️"];
	rndNum = Math.floor(Math.random() * options.length);

	try {
		if (options[playerNum - 1] === options[rndNum]) {
			bot.editMessageText(
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n🤷‍♂️ Ничья\\! 🤷‍♀️\n\nРезультат\\:\n 👤${
					options[playerNum - 1]
				}  vs  [${
					options[rndNum]
				}](https://t.me/${BotName}/?start=minidetail3)🤖\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕще партейку\\? 🤔*`,
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
			(options[playerNum - 1] === "✊" && options[rndNum] === "✌️") ||
			(options[playerNum - 1] === "✌️" && options[rndNum] === "🖐️") ||
			(options[playerNum - 1] === "🖐️" && options[rndNum] === "✊")
		) {
			bot.editMessageText(
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n🥇 Выигрыш\\! 🥳\n\nРезультат:\n 👤${
					options[playerNum - 1]
				}  vs  [${
					options[rndNum]
				}](https://t.me/${BotName}/?start=minidetail3)🤖\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕще партейку\\? 🤔*`,
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
				`*_🪨 Камень\\-Ножницы\\-Бумага ✂️_\n\n🥈 Поражение\\! 😔\n\nРезультат:\n 👤${
					options[playerNum - 1]
				}  vs  [${
					options[rndNum]
				}](https://t.me/${BotName}/?start=minidetail3)🤖\n\n[Статистика](https://t.me/${BotName}/?start=options)\n\nЕще партейку\\? 🤔*`,
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
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function game3(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		dataAboutUser.userAction = 0;
		await bot.editMessageText(
			`<b><i>❌ Крестики-Нолики ⭕</i></b>\n\nТы ходишь за: <b>${
				dataAboutUser.game3PlayerSticker == "❌"
					? "❌"
					: `${
							dataAboutUser.game3PlayerSticker == "⭕"
								? "⭕"
								: "Не выбрано"
					  }`
			}</b>\nСложность: <b>${
				dataAboutUser.game3Difficulty == 0
					? "Легко"
					: `${
							dataAboutUser.game3Difficulty == 2
								? "Средняя"
								: `${
										dataAboutUser.game3Difficulty == 1
											? "Тяжело"
											: "Не выбрано"
								  }`
					  }`
			}\n\nПараметры игры ⚙️</b>`,
			{
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `${
									dataAboutUser.game3PlayerSticker == "❌"
										? "• ❌ •"
										: "❌"
								}`,
								callback_data: `${
									dataAboutUser.game3PlayerSticker == "❌"
										? "-"
										: "XGame3"
								}`,
							},
							{
								text: `${
									dataAboutUser.game3PlayerSticker == "⭕"
										? "• ⭕ •"
										: "⭕"
								}`,
								callback_data: `${
									dataAboutUser.game3PlayerSticker == "⭕"
										? "-"
										: "OGame3"
								}`,
							},
						],
						[
							{
								text: `${
									dataAboutUser.game3Difficulty == 0 ? "• 😪 •" : "😪"
								}`,
								callback_data: `${
									dataAboutUser.game3Difficulty == 0
										? "-"
										: "Dificulty0Game3"
								}`,
							},
							{
								text: `${
									dataAboutUser.game3Difficulty == 2 ? "• 🤨 •" : "🤨"
								}`,
								callback_data: `${
									dataAboutUser.game3Difficulty == 2
										? "-"
										: "Dificulty2Game3"
								}`,
							},
							{
								text: `${
									dataAboutUser.game3Difficulty == 1 ? "• 😡 •" : "😡"
								}`,
								callback_data: `${
									dataAboutUser.game3Difficulty == 1
										? "-"
										: "Dificulty1Game3"
								}`,
							},
						],
						[
							{ text: "⬅️Назад", callback_data: "games" },
							{ text: "Готово✅", callback_data: "game3_2" },
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function game3_2(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		dataAboutUser.userAction = 5;

		dataAboutUser.playerGame3Board = [
			[" ", " ", " "],
			[" ", " ", " "],
			[" ", " ", " "],
		];
		await bot.editMessageText(
			`<b><i>❌ Крестики-Нолики ⭕</i>\n\nУдачи! 😉\nНачинаешь ты ${dataAboutUser.game3PlayerSticker}</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							{ text: " ", callback_data: "0|0" },
							{ text: " ", callback_data: "0|1" },
							{ text: " ", callback_data: "0|2" },
						],
						[
							{ text: " ", callback_data: "1|0" },
							{ text: " ", callback_data: "1|1" },
							{ text: " ", callback_data: "1|2" },
						],
						[
							{ text: " ", callback_data: "2|0" },
							{ text: " ", callback_data: "2|1" },
							{ text: " ", callback_data: "2|2" },
						],
						[{ text: "⬅️Назад", callback_data: "game3" }],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

function game3Result(chatId, gameIsDraw = false) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		for (let i = 0; i < 3; i++) {
			// Горизонтали
			if (
				dataAboutUser.playerGame3Board[i][0] !== " " &&
				dataAboutUser.playerGame3Board[i][0] ===
					dataAboutUser.playerGame3Board[i][1] &&
				dataAboutUser.playerGame3Board[i][1] ===
					dataAboutUser.playerGame3Board[i][2]
			) {
				return `${dataAboutUser.playerGame3Board[i][0]}`;
			}
			// Вертикали
			else if (
				dataAboutUser.playerGame3Board[0][i] !== " " &&
				dataAboutUser.playerGame3Board[0][i] ===
					dataAboutUser.playerGame3Board[1][i] &&
				dataAboutUser.playerGame3Board[1][i] ===
					dataAboutUser.playerGame3Board[2][i]
			) {
				return `${dataAboutUser.playerGame3Board[0][i]}`;
				// Диогонали
			} else if (
				dataAboutUser.playerGame3Board[0][0] !== " " &&
				dataAboutUser.playerGame3Board[0][0] ===
					dataAboutUser.playerGame3Board[1][1] &&
				dataAboutUser.playerGame3Board[1][1] ===
					dataAboutUser.playerGame3Board[2][2]
			) {
				return `${dataAboutUser.playerGame3Board[0][0]}`;
			} else if (
				dataAboutUser.playerGame3Board[0][2] !== " " &&
				dataAboutUser.playerGame3Board[0][2] ===
					dataAboutUser.playerGame3Board[1][1] &&
				dataAboutUser.playerGame3Board[1][1] ===
					dataAboutUser.playerGame3Board[2][0]
			) {
				return `${dataAboutUser.playerGame3Board[0][2]}`;
			}
		}
		if (gameIsDraw) {
			return "Ничья!";
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

function game3InlineKeyboard(chatId, isPlayer = true) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
	let buttons = [];

	if (isPlayer) {
		buttons = dataAboutUser.playerGame3Board.map((row, rowIndex) => {
			return row.map((cell, colIndex) => {
				const text = cell === " " ? " " : cell;
				const callbackData = `${rowIndex}|${colIndex}`;
				return { text, callback_data: callbackData };
			});
		});
	} else if (!isPlayer) {
		buttons = dataAboutUser.playerGame3Board.map((row, rowIndex) => {
			return row.map((cell, colIndex) => {
				const text = cell === " " ? " " : cell;
				return { text, callback_data: "-" };
			});
		});
	}

	buttons.push([
		{ text: "⬅️Назад", callback_data: "game3" },
		{ text: "Заново🔄️", callback_data: "game3_2" },
	]);

	return { inline_keyboard: buttons };
}

async function News(chatId, newsNum, newsName) {
	let news1Button, news2Button, news3Button;

	let newsButtons = [
		{ text: "Новости 📖", callback_data: "news" },
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
				disable_web_page_preview: true,
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
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		dataAboutUser.userAction = 4;
		bot.editMessageText(
			`<b><i>✏️ Редактирование: Новости 📖</i>\n\n📖 Текущий текст:</b>\n\n<code>${newsText[1]}</code>\n\n<b>Напиши измененный текст ниже ✍️</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
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
	} catch (error) {}
}

async function AllNewsTextEdit_2(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		dataAboutUser.userAction = 0;
		bot.editMessageText(
			`<b><i>✏️ Редактирование: Новости 📖</i>\n\n🆕 Измененный текст:</b>\n\n<i>"${newsText[0]}"</i>\n\n<b>Применить изменения?🧐</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				disable_web_page_preview: true,
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

async function Options(chatId) {
	if (chatId == qu1z3xId || chatId == stepanovId) {
		userStatus = "Администратор 👑";
	} else {
		userStatus = "Ученик 🧑‍🏫";
	}
	const countRem = remindersData.filter((obj) => obj.chatId === chatId).length;
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	let countCalls = 0;
	if (dataAboutUser.callOnLesson) countCalls++;
	if (dataAboutUser.callOnBreak) countCalls++;
	if (dataAboutUser.callOnLessonIn5minutes) countCalls++;
	if (dataAboutUser.callOnLessonIn10minutes) countCalls++;
	if (dataAboutUser.callOnBreakIn5minutes) countCalls++;
	if (dataAboutUser.callOnBreakIn10minutes) countCalls++;

	try {
		await bot.editMessageText(
			`*_🛠️ Настройки ⚙️_\n\nДанные:*\nТвой логин: *${
				dataAboutUser.firstName
			}*\nРоль: *${userStatus}*\nID профиля: _*${chatId}*_\nКласс: *${
				dataAboutUser.className
			}\n\nУведомления:*\nЗвонки: *${
				dataAboutUser.callOnLesson ||
				dataAboutUser.callOnBreak ||
				dataAboutUser.callOnLessonIn5minutes ||
				dataAboutUser.callOnLessonIn10minutes ||
				dataAboutUser.callOnBreakIn5minutes ||
				dataAboutUser.callOnBreakIn10minutes
					? `✅ \\(${countCalls}\\)`
					: "❌"
			}* \\- [${
				dataAboutUser.callOnLesson ||
				dataAboutUser.callOnBreak ||
				dataAboutUser.callOnLessonIn5minutes ||
				dataAboutUser.callOnLessonIn10minutes ||
				dataAboutUser.callOnBreakIn5minutes ||
				dataAboutUser.callOnBreakIn10minutes
					? "изменить"
					: "включить"
			}](https://t.me/${BotName}/?start=notificationsmenucalls)\nНапоминания: *${"✅🔔"}*\nСоздано: *${countRem}* \\- [${
				countRem > 0 ? "список" : "создать"
			}](https://t.me/${BotName}/?start=remindersList)*\n\nСтатистика в играх:*\nУгадайка: *${
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
			}❌\\, ${
				dataAboutUser.game2DrawResults
			}[🤷‍♂️](https://t.me/${BotName}/?start=minidetail7) ${
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
			}*\nКрестики\\-нолики: *${dataAboutUser.game3NiceResults}✅\\, ${
				dataAboutUser.game3BadResults
			}❌\\, ${
				dataAboutUser.game3DrawResults
			}[🤷‍♂️](https://t.me/${BotName}/?start=minidetail7) ${
				dataAboutUser.game3NiceResults +
					dataAboutUser.game3BadResults +
					dataAboutUser.game3DrawResults >
				0
					? `из ${
							dataAboutUser.game3NiceResults +
							dataAboutUser.game3BadResults +
							dataAboutUser.game3DrawResults
					  }`
					: ""
			}*\nПасхалки: *${
				dataAboutUser.miniDetail666 +
				dataAboutUser.miniDetail0 +
				dataAboutUser.miniDetail1 +
				dataAboutUser.miniDetail2 +
				dataAboutUser.miniDetail3 +
				dataAboutUser.miniDetail4 +
				dataAboutUser.miniDetail5 +
				dataAboutUser.miniDetail6 +
				dataAboutUser.miniDetail7 +
				dataAboutUser.miniDetail8 +
				dataAboutUser.miniDetail9
			} / ${maxCountMiniDetails} ${
				dataAboutUser.miniDetail666 +
					dataAboutUser.miniDetail0 +
					dataAboutUser.miniDetail1 +
					dataAboutUser.miniDetail2 +
					dataAboutUser.miniDetail3 +
					dataAboutUser.miniDetail4 +
					dataAboutUser.miniDetail5 +
					dataAboutUser.miniDetail6 +
					dataAboutUser.miniDetail7 +
					dataAboutUser.miniDetail8 +
					dataAboutUser.miniDetail9 >=
				maxCountMiniDetails
					? "✅"
					: ""
			}* \\- [как это?](https://t.me/${BotName}/?start=detailsRules)\n\n*[Правила пользования ресурсом](https://t.me/${BotName}/?start=rules2)*`,
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
		sendDataAboutError(chatId, `${String(error)}`);
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

async function adminMenu(chatId) {
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
						[{ text: "Реестр 💾", callback_data: "usersdatalist" }],
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
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		dataAboutUser.userAction = 2;
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

async function adminMenuSendMessage_2(chatId) {
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
					`<b><i>${paragrafs[numberArr]}</i>\n\n${textMessageForAllUsers}</b>`,
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
				);
			}
			setTimeout(() => {
				adminMenu(chatId);
			}, 3000);
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

async function adminMenuSendMessageOptions(chatId) {
	try {
		await bot.editMessageText(
			`<b><i>📋 Создание объявления 📢\n\n</i></b>Объявление выглядит так:\n\n<b><i>${paragrafs[numberArr]}</i>\n\n${textMessageForAllUsers}\n\nВыберите заголовок объявления:</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `${
									numberArr == 0
										? `• ${paragrafs[0]} •`
										: `${paragrafs[0]}`
								}`,
								callback_data: "p0",
							},
						],
						[
							{
								text: `${
									numberArr == 1
										? `• ${paragrafs[1]} •`
										: `${paragrafs[1]}`
								}`,
								callback_data: "p1",
							},
						],
						[
							{
								text: `${
									numberArr == 2
										? `• ${paragrafs[2]} •`
										: `${paragrafs[2]}`
								}`,
								callback_data: "p2",
							},
						],
						[
							{
								text: `${
									numberArr == 3
										? `• ${paragrafs[3]} •`
										: `${paragrafs[3]}`
								}`,
								callback_data: "p3",
							},
						],
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
					usersData[i].game2DrawResults +
					usersData[i].game3BadResults +
					usersData[i].game3NiceResults +
					usersData[i].game3DrawResults
				}\n• callsNotif: ${
					dataAboutUser.callOnLesson ||
					dataAboutUser.callOnBreak ||
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
				reminderText += `<b><a href="https://t.me/${BotName}/?start=deleterem${i}">❌</a>  ${i}.</b> ${obj.text} - <b>${obj.time}</b>\n\n`;
				i++;
			});
		} else if (userReminders.length == 0) {
			reminderText = "У тебя <b>нет</b> активных напоминаний 😉\n\n";
		}

		bot.editMessageText(
			`<b><i>🔔 Текущие напоминания 🗓️</i>\n\nТвои напоминания:</b><i>\n\n${reminderText}</i><b>${
				userReminders.length != 0 ? `Всего: ${userReminders.length}` : ""
			}</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId === chatId)
					.messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `${
									userReminders.length > 1 ? "Удалить все ❌" : ""
								}`,
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
	let hours = new Date().getHours(),
		minutes = new Date().getMinutes();

	minutes++;
	if (minutes >= 60) {
		hours += 1;
		minutes -= 60;
	}
	if (hours >= 24) hours -= 24;

	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
	try {
		dataAboutUser.userAction = 1;
		bot.editMessageText(
			`<b><i>🔔 Создание напоминания 📝\n\nПример:</i></b>\n<code>Сесть за уроки в <b>${String(
				hours
			).padStart(2, "0")}:${String(minutes).padStart(
				2,
				"0"
			)}</b></code>\n\n<i>Используй <b>"В"</b>❗</i>\n\n<b>Пиши прямо под сообщением 😉✍️</b>`,
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

	const dateNowHHNN = new Date().getHours() * 100 + new Date().getMinutes();
	if (dateNowHHNN < 1200 && dateNowHHNN >= 600) {
		lessonNum = "Доброе утро";
	} else if (dateNowHHNN < 1700 && dateNowHHNN >= 1200) {
		textToSayHello = "Добрый день";
	} else if (dateNowHHNN < 2200 && dateNowHHNN >= 1700) {
		textToSayHello = "Добрый вечер";
	} else if (dateNowHHNN >= 2200 || dateNowHHNN < 600) {
		textToSayHello = "Доброй ночи";
	}

	try {
		await bot.sendSticker(chatId, stickers[rndNum]).then((message) => {
			dataAboutUser.messageIdSayHi0 = message.message_id;
		});

		await bot
			.sendMessage(
				chatId,
				`*${textToSayHello}, ${firstName}\\! [✌️](https://t.me/${BotName}/?start=minidetail1)*`,
				{
					parse_mode: "MarkdownV2",
					disable_web_page_preview: true,
				}
			)
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
		sendDataAboutError(chatId, `${String(error)}`);
	}
}

async function miniDetails(chatId, numberOfDetail) {
	const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

	try {
		let foundDetailsDoneText = [
			"Прекрасно!\nЕще одна пасхалка в кармане! 😆",
			"Так держать!\nИ еще одну! 🥳",
			"Нашлась ещё одна! 😀",
			"Ещё плюс одна в копилку! 👍",
		];
		rndNum = Math.floor(Math.random() * foundDetailsDoneText.length);

		let detailIsHonest = false;

		if (numberOfDetail == 666) {
			dataAboutUser.miniDetail666 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 0 && dataAboutUser.miniDetail0 != 1) {
			dataAboutUser.miniDetail0 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 1 && dataAboutUser.miniDetail1 != 1) {
			dataAboutUser.miniDetail1 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 2 && dataAboutUser.miniDetail2 != 1) {
			dataAboutUser.miniDetail2 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 3 && dataAboutUser.miniDetail3 != 1) {
			dataAboutUser.miniDetail3 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 4 && dataAboutUser.miniDetail4 != 1) {
			dataAboutUser.miniDetail4 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 5 && dataAboutUser.miniDetail5 != 1) {
			dataAboutUser.miniDetail5 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 6 && dataAboutUser.miniDetail6 != 1) {
			dataAboutUser.miniDetail6 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 7 && dataAboutUser.miniDetail7 != 1) {
			dataAboutUser.miniDetail7 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 8 && dataAboutUser.miniDetail8 != 1) {
			dataAboutUser.miniDetail8 = 1;
			detailIsHonest = true;
		} else if (numberOfDetail == 9 && dataAboutUser.miniDetail9 != 1) {
			dataAboutUser.miniDetail9 = 1;
			detailIsHonest = true;
		} else {
			await bot.editMessageText(
				`${
					dataAboutUser.miniDetail666 +
						dataAboutUser.miniDetail0 +
						dataAboutUser.miniDetail1 +
						dataAboutUser.miniDetail2 +
						dataAboutUser.miniDetail3 +
						dataAboutUser.miniDetail4 +
						dataAboutUser.miniDetail5 +
						dataAboutUser.miniDetail6 +
						dataAboutUser.miniDetail7 +
						dataAboutUser.miniDetail8 +
						dataAboutUser.miniDetail9 ==
					maxCountMiniDetails
						? `<b>Да ладно тебе!😆\n\nНа твоем счету и так ${maxCountMiniDetails} / ${maxCountMiniDetails}\n\nТолько не рассказывай никому о тайниках!🙏</b>`
						: `<b>Твои следы - тебя выдают..\n\nПо второму кругу нечестно! 😠</b>
			\nПока что <b>${
				dataAboutUser.miniDetail666 +
				dataAboutUser.miniDetail0 +
				dataAboutUser.miniDetail1 +
				dataAboutUser.miniDetail2 +
				dataAboutUser.miniDetail3 +
				dataAboutUser.miniDetail4 +
				dataAboutUser.miniDetail5 +
				dataAboutUser.miniDetail6 +
				dataAboutUser.miniDetail7 +
				dataAboutUser.miniDetail8 +
				dataAboutUser.miniDetail9
			} из ${maxCountMiniDetails}!</b>`
				}`,
				{
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					parse_mode: "html",
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "⬅️В меню",
									callback_data: "exit",
								},
							],
						],
					},
				}
			);
		}
		if (detailIsHonest) {
			await bot.editMessageText(
				`${
					dataAboutUser.miniDetail666 +
						dataAboutUser.miniDetail0 +
						dataAboutUser.miniDetail1 +
						dataAboutUser.miniDetail2 +
						dataAboutUser.miniDetail3 +
						dataAboutUser.miniDetail4 +
						dataAboutUser.miniDetail5 +
						dataAboutUser.miniDetail6 +
						dataAboutUser.miniDetail7 +
						dataAboutUser.miniDetail8 +
						dataAboutUser.miniDetail9 <=
					1
						? `<b>Стоп что⁉️\nЭто похоже <i>спрятанная</i> пасхалка!\n\nГоворят, они разбросаны по <i>всему</i> интерфейсу бота! 🤔\n\nCобрано ${
								dataAboutUser.miniDetail666 +
								dataAboutUser.miniDetail0 +
								dataAboutUser.miniDetail1 +
								dataAboutUser.miniDetail2 +
								dataAboutUser.miniDetail3 +
								dataAboutUser.miniDetail4 +
								dataAboutUser.miniDetail5 +
								dataAboutUser.miniDetail6 +
								dataAboutUser.miniDetail7 +
								dataAboutUser.miniDetail8 +
								dataAboutUser.miniDetail9
						  } из ${maxCountMiniDetails}!</b>`
						: `${
								dataAboutUser.miniDetail666 +
									dataAboutUser.miniDetail0 +
									dataAboutUser.miniDetail1 +
									dataAboutUser.miniDetail2 +
									dataAboutUser.miniDetail3 +
									dataAboutUser.miniDetail4 +
									dataAboutUser.miniDetail5 +
									dataAboutUser.miniDetail6 +
									dataAboutUser.miniDetail7 +
									dataAboutUser.miniDetail8 +
									dataAboutUser.miniDetail9 ==
								maxCountMiniDetails
									? `<b>Постой! Это разве ты собрал..\n\nВСЕ</b> пасхалки которые я <b>так долго</b> прятал⁉️🤯\n\nНа твоем счету <b>${maxCountMiniDetails} / ${maxCountMiniDetails}! ✅</b>`
									: `<b>${
											foundDetailsDoneText[rndNum]
									  }</b>\n\nCобрано <b>${
											dataAboutUser.miniDetail666 +
											dataAboutUser.miniDetail0 +
											dataAboutUser.miniDetail1 +
											dataAboutUser.miniDetail2 +
											dataAboutUser.miniDetail3 +
											dataAboutUser.miniDetail4 +
											dataAboutUser.miniDetail5 +
											dataAboutUser.miniDetail6 +
											dataAboutUser.miniDetail7 +
											dataAboutUser.miniDetail8 +
											dataAboutUser.miniDetail9
									  } из ${maxCountMiniDetails}!</b>`
						  }`
				}`,
				{
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId === chatId)
						.messageId,
					parse_mode: "html",
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "⬅️В меню",
									callback_data: "exit",
								},
								{
									text: "Что и как❓",
									callback_data: "detailsrules",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {}
}

async function detailsRules(chatId) {
	bot.editMessageText(
		`*Суть заключается в нахождении \\- запрятанных в ||смайлики|| пасхалочек\\! 🥚\n\n_Вот одна из них:_*\nНажми на *улыбающийся* стикер \\- [😆](https://t.me/${BotName}/?start=minidetail666)`,
		{
			parse_mode: "MarkdownV2",
			chat_id: chatId,
			message_id: usersData.find((obj) => obj.chatId === chatId).messageId,
			disable_web_page_preview: true,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "⬅️Назад",
							callback_data: "miniDetails",
						},
					],
				],
			},
		}
	);
}

async function StartAll() {
	// bot.sendMessage(userChatId, ""); //?                                                         Принудительная отправка сообщений определенному лицу
	try {
		if (TOKEN == TOKENs[0]) {
			BotName = "digsch27_bot";
		} else if (TOKEN == TOKENs[1]) {
			BotName = "digschbot";
		}

		if (
			fs.readFileSync("botDB.json") != "[]" &&
			fs.readFileSync("botDB.json") != ""
		) {
			let dataFromDB = JSON.parse(fs.readFileSync("botDB.json"));
			usersData = dataFromDB.usersData || [];
			remindersData = dataFromDB.remindersData || [];
		}

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

		const dateNowHHNN = new Date().getHours() * 100 + new Date().getMinutes();
		if (dateNowHHNN < 1200 && dateNowHHNN >= 600) {
			lessonNum = "Доброе утро";
		} else if (dateNowHHNN < 1700 && dateNowHHNN >= 1200) {
			textToSayHello = "Добрый день";
		} else if (dateNowHHNN < 2200 && dateNowHHNN >= 1700) {
			textToSayHello = "Добрый вечер";
		} else if (dateNowHHNN >= 2200 || dateNowHHNN < 600) {
			textToSayHello = "Доброй ночи";
		}

		for (let i = 0; i < usersData.length; i++) {
			if (
				usersData[i].messageIdSayHi1 &&
				usersData[i].messageIdSayHi1 != ""
			) {
				bot.editMessageText(
					`*${textToSayHello}, ${usersData[i].firstName}\\! [✌️](https://t.me/${BotName}/?start=minidetail1)*`,
					{
						parse_mode: "MarkdownV2",
						chat_id: usersData[i].chatId,
						message_id: usersData[i].messageIdSayHi1,
						disable_web_page_preview: true,
					}
				);
			}
		}
		cron.schedule(`1 * * * * *`, function () {
			const timeSimple = `${String(new Date().getHours()).padStart(
				2,
				"0"
			)}:${String(new Date().getMinutes()).padStart(2, "0")}`;
			const time5Minutes = `${String(new Date().getHours()).padStart(
				2,
				"0"
			)}:${String(new Date().getMinutes() + 5).padStart(2, "0")}`;
			const time10Minutes = `${String(new Date().getHours()).padStart(
				2,
				"0"
			)}:${String(new Date().getMinutes() + 10).padStart(2, "0")}`;

			const dateNowHNN = `${String(new Date().getHours())}:${String(
				new Date().getMinutes()
			).padStart(2, "0")}`;
			const dateNowHHNN = `${String(new Date().getHours()).padStart(
				2,
				"0"
			)}:${String(new Date().getMinutes()).padStart(2, "0")}`;

			//! CALLS NOTIFICATION

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
							(timeSimple == timesOnLesson[i] &&
								usersData[j].callOnLesson) ||
							(timeSimple == timesOnBreak[i] &&
								usersData[j].callOnBreak) ||
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
								timeSimple == timesOnLesson[i] &&
								usersData[j].callOnLesson
							)
								textToCallReminder =
									"Особое внимание! 🧐\nУ тебя начался урок! 😉";
							if (
								timeSimple == timesOnBreak[i] &&
								usersData[j].callOnBreak
							)
								textToCallReminder = `Можно выдохнуть! 😀\nУ тебя началась ${
									timeSimple == "11:05" || timeSimple == "10:05"
										? "БОЛЬШАЯ"
										: "маленькая"
								} перемена! 😉\n\n${
									timeSimple == "11:05"
										? "<i>Время завтрака! 😋</i>"
										: `${
												timeSimple == "13:55"
													? "<i>На этой перемене - Обед! 😀</i>"
													: ""
										  }`
								}`;
							if (
								time5Minutes == timesOnLesson[i] &&
								usersData[j].callOnLessonIn5minutes
							)
								textToCallReminder =
									"Готовься к уроку! 🧑‍🏫\nЧерез 5 минут у тебя урок! 😉";
							if (
								time5Minutes == timesOnBreak[i] &&
								usersData[j].callOnBreakIn5minutes
							)
								textToCallReminder = `Совсем скоро отдых! 😎\nРовно через 5 минут ${
									time5Minutes == "11:05" || time5Minutes == "10:05"
										? "БОЛЬШАЯ"
										: "маленькая"
								} перемена! 😉`;
							if (
								time10Minutes == timesOnLesson[i] &&
								usersData[j].callOnLessonIn10minutes
							)
								textToCallReminder =
									"Будь готовым! 📚\nЧерез 10 минут у тебя урок! 😉";
							if (
								time10Minutes == timesOnBreak[i] &&
								usersData[j].callOnBreakIn10minutes
							)
								textToCallReminder = `Скоро отдых! ☺️\nРовно через 10 минут ${
									time10Minutes == "11:05" || time10Minutes == "10:05"
										? "БОЛЬШАЯ"
										: "маленькая"
								} перемена! 😉`;
							if (textToCallReminder != "") {
								bot.sendMessage(
									usersData[j].chatId,
									`<b>🔔 ${textToCallReminder}</b>`,
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

			//! REMINDERS NOTIFICATION

			if (remindersData.length > 0) {
				for (let i = 0; i < remindersData.length; i++) {
					if (
						remindersData[i].time == dateNowHNN ||
						remindersData[i].time == dateNowHHNN
					) {
						bot.sendMessage(
							remindersData[i].chatId,
							`<b><a href="https://t.me/${BotName}/?start=minidetail9">🔔</a> Напоминание ❗\n<i>${remindersData[i].text}</i> на ${remindersData[i].time}</b>`,
							{
								parse_mode: "html",
								disable_web_page_preview: true,
								reply_markup: {
									inline_keyboard: [
										[
											{
												text: "Удалить ❌",
												callback_data: `deletereminder${remindersData[i].reminderId}`,
											},
											{
												text: "Перенести 🔄️",
												callback_data: `updatetimeforreminder${remindersData[i].reminderId}`,
											},
										],
									],
								},
							}
						);
					}
				}
			}
		});

		bot.onText(/(.+)/, async (message, match) => {
			const chatId = message.chat.id;
			const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
			try {
				const chatId = message.chat.id;
				if (
					(chatId == qu1z3xId || chatId == stepanovId) &&
					dataAboutUser &&
					dataAboutUser.userAction == 2
				) {
					textMessageForAllUsers = match[1];
					adminMenuSendMessageOptions(chatId);
				}
			} catch (error) {}
		});

		const timeFormat = /^\d{1,2}:\d{2}$/;

		bot.onText(/^(.+?) в (.+)/, async (message, match) => {
			const chatId = message.chat.id;
			const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);
			if (dataAboutUser && dataAboutUser.userAction == 1) {
				let formatIsNice = true,
					hours,
					minutes;

				try {
					[hours, minutes] = match[2].split(":").map(Number);
					formatIsNice = true;
				} catch (error) {
					console.log(error);
					formatIsNice = false;
				}

				try {
					if (
						!timeFormat.test(match[2]) ||
						hours > 23 ||
						minutes > 59 ||
						!formatIsNice
					) {
						await bot.editMessageText(
							`<b>❗ Не верный формат времени 🚫\n\n<i>Пример:</i></b>\n<code>Выкинуть мусор в </code><b>H:MM\n\nПерепиши напоминание ниже 😉✍️</b>`,
							{
								parse_mode: "html",
								chat_id: chatId,
								message_id: usersData.find(
									(obj) => obj.chatId == chatId
								).messageId,
								reply_markup: {
									inline_keyboard: [
										[
											{
												text: "⬅️Назад",
												callback_data: "reminders",
											},
										],
									],
								},
							}
						);
					} else {
						let rndId = 1; // присвоение уникального id
						do {
							rndId = Math.floor(Math.random() * 1000);
						} while (
							remindersData.some(
								(remindersData) => remindersData.reminderId === rndId
							) &&
							remindersData.length != 0
						);
						remindersData.push({
							chatId: chatId,
							text: match[1],
							time: match[2],
							reminderId: rndId, // присвоение уникального id
						});
						console.log(remindersData);

						sendDataAboutAction(
							message.from.first_name,
							message.from.username,
							chatId,
							`🔔 Запросил напоминание\n\n<i>${match[1]}</i> на ${match[2]}`
						);

						await bot.editMessageText(
							`<b>Поставил напоминание</b> 😉🔔\n\n<i>"${match[1]}" - <b>${match[2]}</b></i>`,
							{
								parse_mode: "html",
								chat_id: message.chat.id,
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
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
										[
											{
												text: "⬅️Назад",
												callback_data: "reminders",
											},
										],
									],
								},
							}
						);
					}
				} catch (error) {
					console.log(error);
					sendDataAboutError(chatId, `${String(error)}`);
				}
			}
		});

		bot.on("message", async (message) => {
			const chatId = message.chat.id;
			const text = message.text;

			let firstName = message.from.first_name;

			const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

			if (!dataAboutUser) {
				usersData.push({
					chatId: chatId,
					username: message.from.username,
					firstName: message.from.first_name,
					userAction: 0,
					className: "Не определен",
					messageId: "",
					messageIdSayHi0: "",
					messageIdSayHi1: "",
					messageIdSayHi2: "",
					weekday: "",
					// calls
					callOnLesson: false,
					callOnLessonIn5minutes: false,
					callOnLessonIn10minutes: false,
					callOnBreak: false,
					callOnBreakIn5minutes: false,
					callOnBreakIn10minutes: false,
					// game1
					game1NiceResults: 0,
					game1BadResults: 0,
					// game2
					game2NiceResults: 0,
					game2BadResults: 0,
					game2DrawResults: 0,
					// game3
					game3NiceResults: 0,
					game3BadResults: 0,
					game3DrawResults: 0,
					game3Difficulty: 3,
					game3PlayerSticker: "",
					playerGame3Board: [
						[" ", " ", " "],
						[" ", " ", " "],
						[" ", " ", " "],
					],
					// mini details
					miniDetail666: 0,
					miniDetail0: 0,
					miniDetail1: 0,
					miniDetail2: 0,
					miniDetail3: 0,
					miniDetail4: 0,
					miniDetail5: 0,
					miniDetail6: 0,
					miniDetail7: 0,
					miniDetail8: 0,
					miniDetail9: 0,
				});
			}
			try {
				if (dataAboutUser && dataAboutUser.userAction == 4) {
					dataAboutUser.userAction = 0;
					newsText[0] = text;
					AllNewsTextEdit_2(chatId);
				}

				//! reminders крестики

				if (text.includes("/start deleterem")) {
					let remNum = text.match(/^\/start deleterem(\d+)$/);
					remNum = parseInt(remNum[1]) - 1;
					const userReminders = remindersData.filter(
						(obj) => obj.chatId === chatId
					);
					if (userReminders.length != 0) {
						remindersData.splice(
							remindersData.indexOf(
								remindersData.find(
									(obj) =>
										obj.reminderId ===
										userReminders[remNum].reminderId
								)
							),
							1
						);
					}
					RemindersList(chatId);
				}

				//! Мини пасхалки

				if (text.includes("/start minidetail")) {
					let miniDetailNum = text.match(/^\/start minidetail(\d+)$/);
					miniDetailNum = parseInt(miniDetailNum[1]);
					miniDetails(chatId, miniDetailNum);
				}

				//? КОМАНДЫ

				switch (text) {
					case "/start":
						if (dataAboutUser) dataAboutUser.userAction = 0;
						deleteAllMessages(chatId);
						start(chatId, message.from.first_name);
						break;
					case "St":
					case "st":
						if (dataAboutUser) dataAboutUser.userAction = 0;
						deleteAllMessages(chatId);
						start(chatId, message.from.first_name, true);
						break;
					case "/restart":
						if (!dataAboutUser) {
							try {
								start(chatId, firstName, false);
							} catch (error) {}
						} else if (dataAboutUser && dataAboutUser.messageId != "") {
							menuHome(chatId);
						} else if (dataAboutUser && dataAboutUser.messageId == "") {
							try {
								await bot.deleteMessage(
									chatId,
									dataAboutUser.messageId
								);
							} catch (error) {
								console.log(error);
							}
							menuHome(chatId, false);
						}
						break;
					case "/restart2":
						try {
							ChoosingClass(chatId, 2);
						} catch (error) {}
						break;
					case "/start rules":
						rulesBot(chatId);
						break;
					case "/start rules2":
						rulesBot(chatId, false);
						break;
					case "/start options":
						Options(chatId, firstName);
						break;
					case "/start remindersList":
						RemindersList(chatId);
						break;
					case "/start remindersAdd":
						RemindersAdd(chatId);
						break;
					case "/start notificationsmenucalls":
						NotificationsMenuCalls(chatId);
						break;
					case "/start showhi2":
						bot.editMessageText(
							`*[Скрыть](https://t.me/${BotName}/?start=hidehi2)\n\nЯ чат\\-бот 🤖, поддерживаю _цифровое_ обучение🏫\\. Я буду твоим верным учебным помощником\\!😉\n • Нужно уточнить распиание?📚\n • Подсказать когда идти на урок?⏰\n • Напомнить о твоих планах?📝\n • Сыграть партейку в Цуе\\-Фа?✌️\n • Рассказать школьные новости?📖\nТогда я к твоим услугам\\! Поехали\\![🚀](https://t.me/${BotName}/?start=minidetail2)*`,
							{
								parse_mode: "MarkdownV2",
								chat_id: dataAboutUser.chatId,
								message_id: dataAboutUser.messageIdSayHi2,
								disable_web_page_preview: true,
							}
						);
						break;
					case "/start hidehi2":
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
					case "/start detailsRules":
						detailsRules(chatId);
						break;
					default:
						break;
				}
				try {
					bot.deleteMessage(chatId, message.message_id);
				} catch (error) {}
			} catch (error) {
				console.log(error);
			}
		});

		//? ОБРАБОТЧИК КЛАВИАТУРЫ ПОД СООБЩЕНИЯМИ

		bot.on("callback_query", (query) => {
			const chatId = query.message.chat.id;
			const data = query.data;
			const dataAboutUser = usersData.find((obj) => obj.chatId === chatId);

			try {
				day = new Date().getDate();
				dayW = new Date().getDay();
				month = new Date().getMonth();

				if (dataAboutUser) {
					dataAboutUser.messageId = query.message.message_id;
				}

				// game1

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

				// game3

				if (
					dataAboutUser &&
					dataAboutUser.userAction == 5 &&
					data != "game3" &&
					data != "games" &&
					data != "game3_2"
				) {
					const [row, col] = data.split("|").map(Number);
					if (dataAboutUser.playerGame3Board[row][col] == " ") {
						dataAboutUser.playerGame3Board[row][col] =
							dataAboutUser.game3PlayerSticker;

						let res = game3Result(chatId);
						if (!res) {
							bot.editMessageText(
								`<b><i>❌ Крестики-Нолики ⭕</i>\n\nТеперь хожу я ${
									dataAboutUser.game3PlayerSticker == "❌"
										? "⭕"
										: "❌"
								}</b>`,
								{
									chat_id: chatId,
									message_id: dataAboutUser.messageId,
									parse_mode: "HTML",
									reply_markup: game3InlineKeyboard(chatId, false),
								}
							);

							if (dataAboutUser && dataAboutUser.userAction == 5) {
								let botRow,
									botCol,
									count = 0,
									difficultyMiddleCount = 2;
								if (dataAboutUser.game3Difficulty == 2) {
									difficultyMiddleCount = Math.floor(
										Math.random() * 2
									);
								}
								if (
									dataAboutUser.game3Difficulty == 0 ||
									difficultyMiddleCount == 0
								) {
									do {
										botRow = Math.floor(Math.random() * 3);
										botCol = Math.floor(Math.random() * 3);
										count++;
										if (count == 40) {
											res = "Ничья!";
											break;
										}
									} while (
										dataAboutUser.playerGame3Board[botRow][botCol] !=
										" "
									);
								}
								if (
									dataAboutUser.game3Difficulty == 1 ||
									difficultyMiddleCount == 1
								) {
									let botMoveMade = false;
									// Проверка горизонтальных линий для блокировки/победы
									for (let i = 0; i < 3; i++) {
										if (
											dataAboutUser.playerGame3Board[i][0] ==
												dataAboutUser.playerGame3Board[i][1] &&
											dataAboutUser.playerGame3Board[i][0] != " " &&
											dataAboutUser.playerGame3Board[i][2] == " "
										) {
											botRow = i;
											botCol = 2;
											botMoveMade = true;
											break;
										} else if (
											dataAboutUser.playerGame3Board[i][1] ==
												dataAboutUser.playerGame3Board[i][2] &&
											dataAboutUser.playerGame3Board[i][1] != " " &&
											dataAboutUser.playerGame3Board[i][0] == " "
										) {
											botRow = i;
											botCol = 0;
											botMoveMade = true;
											break;
										} else if (
											dataAboutUser.playerGame3Board[i][0] ==
												dataAboutUser.playerGame3Board[i][2] &&
											dataAboutUser.playerGame3Board[i][0] != " " &&
											dataAboutUser.playerGame3Board[i][1] == " "
										) {
											botRow = i;
											botCol = 1;
											botMoveMade = true;
											break;
										}
									}
									// Проверка вертикальных линий для блокировки/победы
									for (let i = 0; i < 3; i++) {
										// Проверка победы в вертикальных линиях
										if (
											dataAboutUser.playerGame3Board[0][i] ==
												dataAboutUser.playerGame3Board[1][i] &&
											dataAboutUser.playerGame3Board[0][i] != " " &&
											dataAboutUser.playerGame3Board[2][i] == " "
										) {
											botRow = 2;
											botCol = i;
											botMoveMade = true;
											break;
										} else if (
											dataAboutUser.playerGame3Board[1][i] ==
												dataAboutUser.playerGame3Board[2][i] &&
											dataAboutUser.playerGame3Board[1][i] != " " &&
											dataAboutUser.playerGame3Board[0][i] == " "
										) {
											botRow = 0;
											botCol = i;
											botMoveMade = true;
											break;
										} else if (
											dataAboutUser.playerGame3Board[0][i] ==
												dataAboutUser.playerGame3Board[2][i] &&
											dataAboutUser.playerGame3Board[0][i] != " " &&
											dataAboutUser.playerGame3Board[1][i] == " "
										) {
											botRow = 1;
											botCol = i;
											botMoveMade = true;
											break;
										}
									}
									// Проверка диагоналей для блокировки/победы
									// Проверка победы в диагональной линии (слева направо)
									if (
										dataAboutUser.playerGame3Board[0][0] ==
											dataAboutUser.playerGame3Board[1][1] &&
										dataAboutUser.playerGame3Board[0][0] != " " &&
										dataAboutUser.playerGame3Board[2][2] == " "
									) {
										botRow = 2;
										botCol = 2;
										botMoveMade = true;
									} else if (
										dataAboutUser.playerGame3Board[1][1] ==
											dataAboutUser.playerGame3Board[2][2] &&
										dataAboutUser.playerGame3Board[1][1] != " " &&
										dataAboutUser.playerGame3Board[0][0] == " "
									) {
										botRow = 0;
										botCol = 0;
										botMoveMade = true;
									} else if (
										dataAboutUser.playerGame3Board[0][0] ==
											dataAboutUser.playerGame3Board[2][2] &&
										dataAboutUser.playerGame3Board[0][0] != " " &&
										dataAboutUser.playerGame3Board[1][1] == " "
									) {
										botRow = 1;
										botCol = 1;
										botMoveMade = true;
									}

									// Проверка победы в диагональной линии (справа налево)
									if (
										dataAboutUser.playerGame3Board[0][2] ==
											dataAboutUser.playerGame3Board[1][1] &&
										dataAboutUser.playerGame3Board[0][2] != " " &&
										dataAboutUser.playerGame3Board[2][0] == " "
									) {
										botRow = 2;
										botCol = 0;
										botMoveMade = true;
									} else if (
										dataAboutUser.playerGame3Board[1][1] ==
											dataAboutUser.playerGame3Board[2][0] &&
										dataAboutUser.playerGame3Board[1][1] != " " &&
										dataAboutUser.playerGame3Board[0][2] == " "
									) {
										botRow = 0;
										botCol = 2;
										botMoveMade = true;
									} else if (
										dataAboutUser.playerGame3Board[0][2] ==
											dataAboutUser.playerGame3Board[2][0] &&
										dataAboutUser.playerGame3Board[0][2] != " " &&
										dataAboutUser.playerGame3Board[1][1] == " "
									) {
										botRow = 1;
										botCol = 1;
										botMoveMade = true;
									}
									if (!botMoveMade) {
										do {
											botRow = Math.floor(Math.random() * 3);
											botCol = Math.floor(Math.random() * 3);
											count++;
											if (count == 40) {
												res = "Ничья!";
												break;
											}
										} while (
											dataAboutUser.playerGame3Board[botRow][
												botCol
											] != " "
										);
									}
								}
								if (!res) {
									dataAboutUser.playerGame3Board[botRow][botCol] = `${
										dataAboutUser.game3PlayerSticker == "❌"
											? "⭕"
											: "❌"
									}`;
									res = game3Result(chatId);
									if (res != "Ничья!" && res != "❌" && res != "⭕") {
										setTimeout(() => {
											bot.editMessageText(
												`<b><i>❌ Крестики-Нолики ⭕</i>\n\nТвоя очередь ${dataAboutUser.game3PlayerSticker}</b>`,
												{
													chat_id: chatId,
													message_id: dataAboutUser.messageId,
													parse_mode: "HTML",
													reply_markup:
														game3InlineKeyboard(chatId),
												}
											);
										}, 1000);
									}
								}
							}
						}
						setTimeout(() => {
							if (
								(res == "Ничья!" || res == "❌" || res == "⭕") &&
								dataAboutUser.userAction != 0
							) {
								dataAboutUser.userAction = 0;
								let boardString = "";
								for (
									let i = 0;
									i < dataAboutUser.playerGame3Board.length;
									i++
								) {
									for (
										let j = 0;
										j < dataAboutUser.playerGame3Board[i].length;
										j++
									) {
										const cell = dataAboutUser.playerGame3Board[i][j];
										boardString += cell !== " " ? ` ${cell} ` : "⠀⠀⠀";
										if (
											j <
											dataAboutUser.playerGame3Board[i].length - 1
										) {
											boardString += "|";
										}
									}
									if (i < dataAboutUser.playerGame3Board.length - 1) {
										boardString += "\n— — — — — —\n";
									}
								}
								bot.editMessageText(
									`<b><i>❌ Крестики-Нолики ⭕</i>\n\n${
										res != dataAboutUser.game3PlayerSticker
											? `${
													res == "Ничья!"
														? `🤷‍♂️ Ничья! 🤷`
														: `🥈 Поражение! 😔`
											  }`
											: `🥇 Выигрыш! 🥳`
									}\n\nРезультат:\n${boardString}\n\n</b>Сложность: <b>${
										dataAboutUser.game3Difficulty == 0
											? "Легко"
											: `${
													dataAboutUser.game3Difficulty == 2
														? "Средняя"
														: `${
																dataAboutUser.game3Difficulty ==
																1
																	? "Тяжело"
																	: "Не выбрано"
														  }`
											  }`
									}\n<a href="https://t.me/${BotName}/?start=options">Статистика</a>\n\nЕще партейку? 🤔</b>`,
									{
										parse_mode: "html",
										chat_id: chatId,
										message_id: dataAboutUser.messageId,
										disable_web_page_preview: true,
										reply_markup: {
											inline_keyboard: [
												[
													{
														text: "⬅️Назад",
														callback_data: "games",
													},
													{
														text: "Давай👌",
														callback_data: `game3_2`,
													},
												],
											],
										},
									}
								);
								// Статистика

								if (res && res != dataAboutUser.game3PlayerSticker) {
									if (res == "Ничья!")
										dataAboutUser.game3DrawResults += 1;
									else dataAboutUser.game3BadResults += 1;
								} else dataAboutUser.game3NiceResults += 1;
							}
						}, 300);
					}
				}

				if (data.includes("deletereminder")) {
					let remId = data.match(/^deletereminder(\d+)$/);
					remId = parseInt(remId[1]);

					try {
						bot.deleteMessage(
							chatId,
							usersData.find((obj) => obj.chatId === chatId).messageId
						);

						let index = remindersData.findIndex(
							(obj) => obj.reminderId == remId
						);
						remindersData.splice(index, 1); // удаление напоминания которое уже объявилось
					} catch (error) {
						console.log(error);
					}
				}

				if (data.includes("updatetimeforreminder")) {
					let remId = data.match(/^updatetimeforreminder(\d+)$/);
					remId = parseInt(remId[1]);
					let index = remindersData.findIndex(
						(obj) => obj.reminderId == remId
					);

					bot.editMessageText(
						`<b><i>🔔 Перенос напоминания 🔄️</i>\n\nНапоминание:</b>\n"${remindersData[index].text}"\n\n<b>На какое время перенести? 😉</b>`,
						{
							parse_mode: "html",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId == chatId)
								.messageId,
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: "1м",
											callback_data: `reschedulereminder${remId}on${1}`,
										},
										{
											text: "3м",
											callback_data: `reschedulereminder${remId}on${3}`,
										},
										{
											text: "5м",
											callback_data: `reschedulereminder${remId}on${5}`,
										},
										{
											text: "10м",
											callback_data: `reschedulereminder${remId}on${10}`,
										},
									],
									[
										{
											text: "15м",
											callback_data: `reschedulereminder${remId}on${15}`,
										},
										{
											text: "30м",
											callback_data: `reschedulereminder${remId}on${30}`,
										},
										{
											text: "1ч",
											callback_data: `reschedulereminder${remId}on${12}`,
										},
										{
											text: "2ч",
											callback_data: `reschedulereminder${remId}on${22}`,
										},
									],
									[
										{
											text: "Удалить ❌",
											callback_data: `deletereminder${remId}`,
										},
									],
								],
							},
						}
					);
				}

				if (data.includes("reschedulereminder")) {
					let remId = data.match(/^reschedulereminder(\d+)on(\d+)$/);
					let countTime = parseInt(remId[2]);
					remId = parseInt(remId[1]);

					let index = remindersData.findIndex(
						(obj) => obj.reminderId == remId
					);

					let [hours, minutes] = remindersData[index].time
						.split(":")
						.map(Number);

					switch (countTime) {
						case 1:
							minutes += 1;
							if (minutes >= 60) {
								hours += 1;
								minutes -= 60;
							}
							if (hours >= 24) hours -= 24;
							break;
						case 3:
							minutes += 3;
							if (minutes >= 60) {
								hours += 1;
								minutes -= 60;
							}
							if (hours >= 24) hours -= 24;
							break;
						case 5:
							minutes += 5;
							if (minutes >= 60) {
								hours += 1;
								minutes -= 60;
							}
							if (hours >= 24) hours -= 24;
							break;
						case 10:
							minutes += 10;
							if (minutes >= 60) {
								hours += 1;
								minutes -= 60;
							}
							if (hours >= 24) hours -= 24;
							break;
						case 15:
							minutes += 15;
							if (minutes >= 60) {
								hours += 1;
								minutes -= 60;
							}
							if (hours >= 24) hours -= 24;
							break;
						case 30:
							minutes += 30;
							if (minutes >= 60) {
								hours += 1;
								minutes -= 60;
							}
							if (hours >= 24) hours -= 24;
							break;
						case 12:
							hours += 1;
							if (hours >= 24) hours -= 24;

							break;
						case 22:
							hours += 2;
							if (hours >= 24) hours -= 24;
							break;
						default:
							console.log(0);
							break;
					}

					let newTime = `${String(hours).padStart(2, "0")}:${String(
						minutes
					).padStart(2, "0")}`;
					remindersData[index].time = newTime;

					bot.editMessageText(
						`<i><b>🔄️ Перенёс напоминание 😉🔔\n\nНовое:</b>\n"${remindersData[index].text}" - <b>${remindersData[index].time}</b></i>`,
						{
							parse_mode: "html",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId == chatId)
								.messageId,
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: "Спасибо👍",
											callback_data: `deleteexcess`,
										},
									],
								],
							},
						}
					);
				}

				//? КЛАССЫ/РАСПИСАНИЕ

				switch (data) {
					case "10g":
						dataAboutUser.className = "10Г";
						menuHome(chatId);
						break;
					case "11d":
						dataAboutUser.className = "11Д";
						menuHome(chatId);
						break;
					case "11g":
						dataAboutUser.className = "11Г";
						menuHome(chatId);
						break;
					case "11a":
						dataAboutUser.className = "11А";
						menuHome(chatId);
						break;
					case "11v":
						dataAboutUser.className = "11В";
						menuHome(chatId);
						break;

					//? ДЕНЬ НЕДЕЛИ

					case "mon":
						dataAboutUser.weekday = 1;
						RaspisanieText(chatId);
						break;
					case "tue":
						dataAboutUser.weekday = 2;
						RaspisanieText(chatId);
						break;
					case "wen":
						dataAboutUser.weekday = 3;
						RaspisanieText(chatId);
						break;
					case "thu":
						dataAboutUser.weekday = 4;
						RaspisanieText(chatId);
						break;
					case "fri":
						dataAboutUser.weekday = 5;
						RaspisanieText(chatId);
						break;
					case "today":
						dataAboutUser.weekday = dayW;
						RaspisanieText(chatId);
						break;
					case "tomorrow":
						if (dataAboutUser.weekday == 6) dataAboutUser.weekday = 0;
						else if (dataAboutUser.weekday != 6)
							dataAboutUser.weekday = dayW + 1;
						RaspisanieText(chatId);
						break;
					case "nextweekday":
						if (dataAboutUser.weekday == 6) dataAboutUser.weekday = 0;
						else if (dataAboutUser.weekday < 6)
							dataAboutUser.weekday = ++dataAboutUser.weekday;
						RaspisanieText(chatId);
						break;
					case "previousweekday":
						if (dataAboutUser.weekday == 0) dataAboutUser.weekday = 6;
						else if (dataAboutUser.weekday > 0)
							dataAboutUser.weekday = --dataAboutUser.weekday;
						RaspisanieText(chatId);
						break;

					//? ДЕЙСТВИЯ КНОПОК

					// НАЧАЛЬНЫЕ
					case "start":
						deleteAllMessages(chatId);
						start(chatId, dataAboutUser.firstName);
						break;
					case "exit":
						if (dataAboutUser) {
							dataAboutUser.weekday = dayW;
							dataAboutUser.userAction = 0;
						}
						try {
							menuHome(chatId);
						} catch (error) {
							menuHome(chatId, false);
						}
						break;
					case "miniDetails":
						miniDetails(chatId, 666);
						break;
					case "detailsrules":
						detailsRules(chatId);
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
					case "toggleСallOnLesson":
						NotificationsMenuCalls(
							chatId,
							!dataAboutUser.callOnLesson,
							dataAboutUser.callOnBreak,
							dataAboutUser.callOnLessonIn5minutes,
							dataAboutUser.callOnBreakIn5minutes,
							dataAboutUser.callOnLessonIn10minutes,
							dataAboutUser.callOnBreakIn10minutes
						);
						break;
					case "toggleСallOnBreak":
						NotificationsMenuCalls(
							chatId,
							dataAboutUser.callOnLesson,
							!dataAboutUser.callOnBreak,
							dataAboutUser.callOnLessonIn5minutes,
							dataAboutUser.callOnBreakIn5minutes,
							dataAboutUser.callOnLessonIn10minutes,
							dataAboutUser.callOnBreakIn10minutes
						);
						break;
					case "toggleСallOnLessonIn5minutes":
						NotificationsMenuCalls(
							chatId,
							dataAboutUser.callOnLesson,
							dataAboutUser.callOnBreak,
							!dataAboutUser.callOnLessonIn5minutes,
							dataAboutUser.callOnBreakIn5minutes,
							dataAboutUser.callOnLessonIn10minutes,
							dataAboutUser.callOnBreakIn10minutes
						);

						break;
					case "toggleСallOnBreakIn5minutes":
						NotificationsMenuCalls(
							chatId,
							dataAboutUser.callOnLesson,
							dataAboutUser.callOnBreak,
							dataAboutUser.callOnLessonIn5minutes,
							!dataAboutUser.callOnBreakIn5minutes,
							dataAboutUser.callOnLessonIn10minutes,
							dataAboutUser.callOnBreakIn10minutes
						);

						break;
					case "toggleСallOnLessonIn10minutes":
						NotificationsMenuCalls(
							chatId,
							dataAboutUser.callOnLesson,
							dataAboutUser.callOnBreak,
							dataAboutUser.callOnLessonIn5minutes,
							dataAboutUser.callOnBreakIn5minutes,
							!dataAboutUser.callOnLessonIn10minutes,
							dataAboutUser.callOnBreakIn10minutes
						);

						break;
					case "toggleСallOnBreakIn10minutes":
						NotificationsMenuCalls(
							chatId,
							dataAboutUser.callOnLesson,
							dataAboutUser.callOnBreak,
							dataAboutUser.callOnLessonIn5minutes,
							dataAboutUser.callOnBreakIn5minutes,
							dataAboutUser.callOnLessonIn10minutes,
							!dataAboutUser.callOnBreakIn10minutes
						);
						break;

					// GAMES

					case "games":
						Games(chatId);
						break;
					// game1
					case "game1":
						game1(chatId);
						break;
					case "game1_1":
						game1(chatId, false);
						break;
					case "hint":
						try {
							bot.editMessageText(
								`*_❓ Угадайка ❓_\n\n${
									rndNum <= 5
										? `Число _меньше_ или равно 5\\! [📉](https://t.me/${BotName}/?start=minidetail4)😉`
										: `${
												rndNum >= 5
													? `Число _больше_ или равно 5\\! [📈](https://t.me/${BotName}/?start=minidetail4)😉`
													: ""
										  }`
								}*`,
								{
									parse_mode: "MarkdownV2",
									chat_id: chatId,
									message_id: usersData.find(
										(obj) => obj.chatId === chatId
									).messageId,
									disable_web_page_preview: true,
									reply_markup: {
										inline_keyboard: [
											[
												{
													text: "⬅️Назад",
													callback_data: "game1_1",
												},
												{
													text: "Ответ⁉️",
													callback_data: "game1res",
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
												{
													text: "⬅️Назад",
													callback_data: "games",
												},
												{
													text: "Давай👌",
													callback_data: "game1",
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

					// game2
					case "game2":
						game2(chatId);
						break;
					case "stoneGame2":
						game2_2(chatId, 1);
						break;
					case "scissorsGame2":
						game2_2(chatId, 2);
						break;
					case "paperGame2":
						game2_2(chatId, 3);
						break;
					// game3
					case "game3":
						game3(chatId);
						break;
					case "game3_2":
						game3_2(chatId);
						break;
					case "XGame3":
						dataAboutUser.game3PlayerSticker = "❌";
						game3(chatId);
						break;
					case "OGame3":
						dataAboutUser.game3PlayerSticker = "⭕";
						game3(chatId);
						break;
					case "Dificulty0Game3":
						dataAboutUser.game3Difficulty = 0;
						game3(chatId);
						break;
					case "Dificulty1Game3":
						dataAboutUser.game3Difficulty = 1;
						game3(chatId);
						break;
					case "Dificulty2Game3":
						dataAboutUser.game3Difficulty = 2;
						game3(chatId);
						break;

					// NEWS

					case "news":
						News(chatId, 1, "Новости 📖");
						break;
					case "botnews":
						News(chatId, 2, "О боте 🤖");
						break;
					case "schoolnews":
						News(chatId, 3, "О школе 🏫");
						break;

					// OPTIONS

					case "options":
						Options(chatId, dataAboutUser.firstName);
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
								"*Твой профиль успешно удален\\! ✅\n\nПожалуйста, опиши причину \\- @qu1z3x\n\nЕсли соскучишься \\-  /restart2, /start, 😉*",
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
						adminMenu(chatId);
						break;
					case "adminMenuSendMessage":
						adminMenuSendMessage(chatId);
						break;
					case "adminMenuSendMessage2":
						adminMenuSendMessage_2(chatId, dataAboutUser.firstName);
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
								message_id: usersData.find(
									(obj) => obj.chatId === chatId
								).messageId,
							}
						);
						newsText[1] = newsText[0];
						setTimeout(() => {
							adminMenu(chatId);
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
								adminMenu(chatId);
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
							bot.editMessageText(
								`*Спасибо тебе ❤️ \\- команда @qu1z3x*`,
								{
									parse_mode: "MarkdownV2",
									chat_id: chatId,
									message_id: usersData.find(
										(obj) => obj.chatId === chatId
									).messageId,
								}
							);
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

					case "p0":
						numberArr = 0;
						adminMenuSendMessageOptions(chatId);
						break;
					case "p1":
						numberArr = 1;
						adminMenuSendMessageOptions(chatId);
						break;
					case "p2":
						numberArr = 2;
						adminMenuSendMessageOptions(chatId);
						break;
					case "p3":
						numberArr = 3;
						adminMenuSendMessageOptions(chatId);
						break;

					// REMINDERS

					case "reminders":
						if (dataAboutUser) dataAboutUser.userAction = 0;
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
							bot.editMessageText(
								`*_🔔 Удаление напоминаний ❌\n\n❗ВНИМАНИЕ❗_*\n\nТвой список из *_${
									remindersData.filter((obj) => obj.chatId === chatId)
										.length
								} ${
									remindersData.filter((obj) => obj.chatId === chatId)
										.length == 1
										? "заметки"
										: "заметок"
								}_* будет *удален*\\!\n\nДействительно *_УДАЛИТЬ_* список? 🧐❗`,
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
								`❌ Удалил весь список напоминаний`
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
						try {
							bot.deleteMessage(
								chatId,
								usersData.find((obj) => obj.chatId === chatId).messageId
							);
						} catch (error) {}
						break;
					default:
						break;
				}

				//* для удобства в терминале

				if (chatId != qu1z3xId && data != "-") {
					sendDataAboutButton(
						query.from.first_name,
						query.from.username,
						chatId,
						data
					);
				}
			} catch (error) {
				sendDataAboutError(chatId, `${String(error)}`);
				console.log(error);
			}
		});
		cron.schedule(`*/30 * * * *`, function () {
			// обновление DB
			console.log("DB updated");
			const newData = {
				usersData: usersData,
				remindersData: remindersData,
			};
			fs.writeFileSync("botDB.json", JSON.stringify(newData, null, 2));
		});
	} catch (error) {
		console.log(error);
	}
}

StartAll();
