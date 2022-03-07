import { ipcRenderer } from 'electron';

export async function readSettings() {
	return ipcRenderer.invoke('READ_SETTINGS');
}

export async function saveSettings(data) {
	return ipcRenderer.invoke('SAVE_SETTINGS', data);
}
