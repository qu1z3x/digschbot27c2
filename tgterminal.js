import TelegramBot from "node-telegram-bot-api";
const TOKEN = "6989513059:AAG5bGQJln05r9KEFkgu6frNB-IpDddrHlg";

const bot = new TelegramBot(TOKEN, { polling: false });
const qu1z3xId = "923690530";

async function sendDataAboutText(firstName, userName, chatId, text) {
	await bot.sendMessage(
		qu1z3xId,
		`<b> text | Текст\n\n${firstName} @${userName}</b><i>\nId: ${chatId}\n\n"${text}"</i>`,
		{ parse_mode: "html", disable_notification: true }
	);
}
async function sendDataAboutButton(firstName, userName, chatId, data) {
	await bot.sendMessage(
		qu1z3xId,
		`<b> button | Кнопка\n\n${firstName} @${userName}</b><i>\nId: ${chatId}</i>\n\n<b>[${data}]</b>`,
		{ parse_mode: "html", disable_notification: true }
	);
}
async function sendDataAboutError(chatId, textAboutError) {
	await bot.sendMessage(
		qu1z3xId,
		`<b>  ❌  ERROR  ⛔️  |  Ошибка </b>\n\n<i>Id чата: ${chatId}\n\n"${textAboutError}"\n\n</i>`,
		{ parse_mode: "html" }
	);
}

//? ЭКСПОРТ ФУНКЦИЙ В index.js

export { sendDataAboutText };
export { sendDataAboutButton };
export { sendDataAboutError };
