import { ipcMain } from 'electron';

export function windowIPC(mainWindow) {
	ipcMain.on('ALWAYS_ON_TOP_CHANGED', async (event, payload) => {
		mainWindow.setAlwaysOnTop(payload, 'pop-up-menu', 6);
	});
}
