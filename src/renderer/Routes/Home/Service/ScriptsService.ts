import { ipcRenderer } from 'electron';

export async function getScript(script) {
	return ipcRenderer.invoke('GET_SCRIPT', { script });
}

export async function createScript(profile, template) {
	return ipcRenderer.invoke('CREATE_SCRIPT', { profile, template });
}

export async function linkProfileToScript(profile) {
	return ipcRenderer.invoke('LINK_SCRIPT', { profile });
}

export async function editScript(script) {
	return ipcRenderer.invoke('EDIT_SCRIPT', { script });
}
