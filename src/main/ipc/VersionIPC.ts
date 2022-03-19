import { app, ipcMain } from 'electron';
import { checkForUpdates } from '../AppUpdater/AppUpdater';

export function versionIPC() {
	ipcMain.handle('GET_VERSION', async (event) => {
		return app.getVersion();
	});

	ipcMain.handle('CHECK_FOR_UPDATES', async (event) => {
		return new Promise((resolve) => {
			checkForUpdates(resolve);
		});
	});
}
