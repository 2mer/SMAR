import ExposedApi from './ExposedApi';
import tempRequire, { clearTempRequireCache } from './tempRequire';

const SCRIPT_REQUIRE_PARTITION = 'script';
global.scriptRequire = (file) => tempRequire(SCRIPT_REQUIRE_PARTITION, file);
const scriptCleanup = () => clearTempRequireCache(SCRIPT_REQUIRE_PARTITION);

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

			scriptCleanup();
			resolve('done');
		} catch (err) {
			scriptCleanup();
			reject(err);
		}
	});

	return [runnable, abort];
}

export default ExposedApi;
