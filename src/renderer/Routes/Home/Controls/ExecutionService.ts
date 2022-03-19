import { ipcRenderer } from 'electron';

export async function startScript(script, config) {
	return ipcRenderer.invoke('START_SCRIPT', { script, parameters: config });
}

export async function abortScript() {
	return ipcRenderer.invoke('ABORT_SCRIPT');
}
