import ExposedApi from './ExposedApi';
import { unrequire } from './UncachedRequire';

export function executeScript(script, parameters) {
	ExposedApi.running = true;

	const abort = () => {
		ExposedApi.running = false;
	};

	ExposedApi.robot.setKeyboardDelay(10);

	const runnable = new Promise(async (resolve, reject) => {
		try {
			// eslint-disable-next-line import/no-dynamic-require, global-require
			const { script: scriptFunction } = require(script) as any;
			unrequire(script);

			await scriptFunction(ExposedApi, parameters);

			resolve('done');
		} catch (err) {
			reject(err);
		}
	});

	return [runnable, abort];
}

export default ExposedApi;
