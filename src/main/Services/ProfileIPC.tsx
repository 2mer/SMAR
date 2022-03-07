import { ipcMain } from 'electron';
import { SAVES_DIR } from './SettingsIPC';

const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const PROFILES_DIR = path.join(SAVES_DIR, 'scripts');

export function profileIPC() {
	ipcMain.handle('READ_PROFILE', async (event, name) => {
		const dirExists = fs.existsSync(PROFILES_DIR);

		if (!dirExists) {
			return null;
		}
		const filePath = path.join(PROFILES_DIR, `${name}.js`);
		const fileExists = fs.existsSync(filePath);

		if (!fileExists) {
			return null;
		}
		const data = await fsPromises.readFile();

		return data;
	});

	ipcMain.handle('SAVE_PROFILE', async (event, { name, data }) => {
		const dirExists = fs.existsSync(PROFILES_DIR);

		if (!dirExists) {
			await fsPromises.mkdir(PROFILES_DIR, { recursive: true });
		}

		await fsPromises.writeFile(path.join(PROFILES_DIR, `${name}.js`), data);

		return 'OK';
	});
}
