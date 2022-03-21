import { shell } from 'electron';
import vmRequire from '../vm/vmRequire';
import ExposedApi from './ExposedApi';

export function executeScript(script, parameters) {
	ExposedApi.running = true;

	const abort = () => {
		ExposedApi.running = false;
	};

	ExposedApi.robot.setKeyboardDelay(10);

	const runnable = new Promise(async (resolve, reject) => {
		try {
			// eslint-disable-next-line import/no-dynamic-require, global-require
			const { script: scriptFunction } = vmRequire(script);

			shell.beep();

			await scriptFunction(ExposedApi, parameters);

			shell.beep();
			setTimeout(() => shell.beep(), 250);
			setTimeout(() => shell.beep(), 250 * 2);

			resolve('done');
		} catch (err) {
			reject(err);
		}
	});

	return [runnable, abort];
}

export default ExposedApi;
