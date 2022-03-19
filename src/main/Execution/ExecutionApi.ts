import ExposedApi from './ExposedApi';

export function executeScript(script, parameters) {
	ExposedApi.running = true;

	const abort = () => {
		ExposedApi.running = false;
	};

	ExposedApi.robot.setKeyboardDelay(10);

	const runnable = new Promise(async (resolve, reject) => {
		try {
			const { script: scriptFunction } = global.scriptRequire(script);

			await scriptFunction(ExposedApi, parameters);

			resolve('done');
		} catch (err) {
			reject(err);
		}
	});

	return [runnable, abort];
}

export default ExposedApi;
