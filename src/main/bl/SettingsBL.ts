import { app } from 'electron';

const appData = app.getPath('appData');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

export const SAVES_DIR = path.join(appData, 'smar');

export async function readSettings() {
	const dirExists = fs.existsSync(SAVES_DIR);

	if (!dirExists) {
		await fsPromises.mkdir(SAVES_DIR);
	}

	const settingsPath = path.join(SAVES_DIR, 'settings.json');
	const settingsExist = fs.existsSync(settingsPath);

	let data = { profiles: [] } as any;

	if (settingsExist) {
		data = await fsPromises.readFile(settingsPath);

		data = JSON.parse(data as any);
	}

	return data;
}

export async function saveSettings(data) {
	const dirExists = fs.existsSync(SAVES_DIR);

	if (!dirExists) {
		await fsPromises.mkdir(SAVES_DIR);
	}

	const settingsPath = path.join(SAVES_DIR, 'settings.json');

	return fsPromises.writeFile(settingsPath, JSON.stringify(data, null, 4));
}
