import { app, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import tempRequire, { clearTempRequireCache } from '../Execution/tempRequire';
import getAssetPath from '../getAssetPath';

const appData = app.getPath('appData');

export const SCRIPTS_DIR = path.join(appData, 'smar', 'scripts');

export async function readScript(script) {
	const scriptExists = fs.existsSync(script);

	if (!scriptExists) {
		throw new Error(`Script "${script}" does not exist`);
	}

	try {
		const ret = tempRequire('read-js', script);
		clearTempRequireCache('read-js');

		return ret;
	} catch (err) {
		clearTempRequireCache('read-js');
		throw err;
	}
}

export async function createScript(script, templateFile) {
	return fsPromises.copyFile(getAssetPath(templateFile), script);
}

export async function openScript(script) {
	return shell.openPath(script);
}
