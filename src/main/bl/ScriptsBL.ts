import { shell } from 'electron';
import fsPromises from 'fs/promises';
import getAssetPath from '../getAssetPath';

export async function createScript(script, templateFile) {
	return fsPromises.copyFile(getAssetPath(templateFile), script);
}

export async function openScript(script) {
	return shell.openPath(script);
}
