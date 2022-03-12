import { app, ipcMain } from 'electron';

const appData = app.getPath('appData');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

export const SAVES_DIR = path.join(appData, 'smar');

export function settingsIPC() {
	ipcMain.handle('READ_SETTINGS', async (event) => {
		const dirExists = fs.existsSync(SAVES_DIR);

		if (!dirExists) {
			await fsPromises.mkdir(SAVES_DIR);
		}

		const settingsPath = path.join(SAVES_DIR, 'settings.json');
		const settingsExist = fs.existsSync(settingsPath);

		let data = { profiles: [] };

		if (settingsExist) {
			data = await fsPromises.readFile(settingsPath);

			data = JSON.parse(data as any);
		}

		return data;
	});

	ipcMain.handle('SAVE_SETTINGS', async (event, data) => {
		const dirExists = fs.existsSync(SAVES_DIR);

		if (!dirExists) {
			await fsPromises.mkdir(SAVES_DIR);
		}

		const settingsPath = path.join(SAVES_DIR, 'settings.json');

		await fsPromises.writeFile(settingsPath, JSON.stringify(data));
		return 'OK';
	});
}
