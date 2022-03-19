import { app, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { unrequire } from '../Execution/UncachedRequire';
import getAssetPath from '../getAssetPath';

const appData = app.getPath('appData');

export const SCRIPTS_DIR = path.join(appData, 'smar', 'scripts');

export async function readScript(script) {
	const scriptExists = fs.existsSync(script);

	if (!scriptExists) {
		throw new Error(`Script "${script}" does not exist`);
	}

	try {
		// eslint-disable-next-line import/no-dynamic-require, global-require
		const ret = require(script);
		unrequire(script);

		return ret;
	} catch (err) {
		unrequire(script);
		throw err;
	}
}

export async function createScript(script, templateFile) {
	return fsPromises.copyFile(getAssetPath(templateFile), script);
}

export async function openScript(script) {
	return shell.openPath(script);
}
