import { google } from "googleapis";

let class10a, class10b, class10g, class11a, class11v, class11g, class11d;
let foodmenu27c1 = [],
	foodmenu27c2 = [];

const sheetId = "18xSi-VnqkjKbY9se4Q4bYeVPZAVqfHZd97nkVtYTiwY";

function NodeGoogleSheets(file, sheetId, keyMass, fun) {
	const auth = new google.auth.GoogleAuth({
		keyFile: file,
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	try {
		//
		(async () => {
			const client = await auth.getClient();
			//
			const googleSheets = google.sheets({ version: "v4", auth: client });
			//
			const spreadsheetId = sheetId;
			//
			const metaData = await googleSheets.spreadsheets.get({
				auth,
				spreadsheetId,
			});
			//
			const data = {
				auth,
				spreadsheetId,
				valueInputOption: "USER_ENTERED",
				resource: {
					values: keyMass.change,
				},
			};
			//
			if (keyMass.append) {
				data["range"] = keyMass.append;
				//
				const append = await googleSheets.spreadsheets.values.append(data);
				//
				fun(append);
			} else if (keyMass.values) {
				data["range"] = keyMass.values;
				//
				delete data.valueInputOption;
				delete data.resource;
				//
				const values = await googleSheets.spreadsheets.values.get(data);
				//
				fun(values);
			} else if (keyMass.update) {
				data["range"] = keyMass.update;
				//
				const update = await googleSheets.spreadsheets.values.update(data);
				//
				fun(update);
			}
		})();
	} catch (error) {
		console.log(error);
	}
}

async function updateSheetsData() {
	try {
		console.log("sheets updated");

		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B2:J7" },
			(data) => {
				class10a = data.data.values;
			}
		);
		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B12:J17" },
			(data) => {
				class10b = data.data.values;
			}
		);
		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B22:J27" },
			(data) => {
				class10g = data.data.values;
			}
		);
		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B32:J37" },
			(data) => {
				class11a = data.data.values;
			}
		);
		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B42:J47" },
			(data) => {
				class11v = data.data.values;
			}
		);
		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B52:J57" },
			(data) => {
				class11g = data.data.values;
			}
		);
		NodeGoogleSheets(
			"google_file.json",
			sheetId,
			{ values: "B62:J67" },
			(data) => {
				class11d = data.data.values;
			}
		);
	} catch (error) {
		console.log(error);
	}
}

updateSheetsData();

export { updateSheetsData };
export { class10a, class10b, class10g, class11a, class11v, class11g, class11d };
export { foodmenu27c1, foodmenu27c2 };
