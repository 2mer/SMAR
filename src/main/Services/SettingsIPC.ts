import { ipcMain } from 'electron';
import { readSettings, saveSettings } from '../bl/SettingsBL';

export function settingsIPC() {
	ipcMain.handle('READ_SETTINGS', async (event) => {
		return readSettings();
	});

	ipcMain.handle('SAVE_SETTINGS', async (event, data) => {
		await saveSettings(data);
		return 'OK';
	});
}
