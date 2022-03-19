import { ipcRenderer } from 'electron';

export async function getVersion() {
	return ipcRenderer.invoke('GET_VERSION');
}

export async function checkForUpdates() {
	return ipcRenderer.invoke('CHECK_FOR_UPDATES');
}
