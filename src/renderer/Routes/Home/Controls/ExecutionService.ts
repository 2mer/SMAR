import { ipcRenderer } from 'electron';

export async function startScript(config) {
	return ipcRenderer.invoke('START_SCRIPT', config);
}

export async function abortScript() {
	return ipcRenderer.invoke('ABORT_SCRIPT');
}
