import { clipboard } from 'electron';

const fs = require('fs');

const robot = require('robotjs');

class ExposedApi {
	public static robot = robot;

	public static runFile(path) {
		const fileData = fs.readFileSync(path, 'utf8');
		return eval(fileData);
	}

	public static sendMessage(msg: string, { doubleEnter = false }) {
		clipboard.writeText(msg);

		if (doubleEnter) {
			robot.keyTap('enter');
		}

		ExposedApi.simulatePaste();

		robot.keyTap('enter');
	}

	public static setKeyboardDelay(msg: string) {
		clipboard.writeText(msg);
	}

	public static simulatePaste() {
		robot.keyTap('v', 'control');
	}

	public static click() {
		robot.mouseClick();
	}

	public static keyToggle(key, status, modifier = []) {
		robot.keyToggle(key, status, modifier);
	}

	public static async sleep(ms: number) {
		// create a simple timeout promise
		const promise = new Promise<void>((resolve) => {
			setTimeout(resolve, ms);
		});

		return promise;
	}
}

export function constructMessage({ message, iteration }) {
	const msg = eval(
		`'use strict'; const index=${iteration}; const api=${ExposedApi}; \`${message}\``
	);

	return msg;
}

export function execLine({ message, iteration }) {
	const msg = eval(
		`'use strict'; const index=${iteration}; const api=${ExposedApi}; ${message}`
	);

	return msg;
}

export function executeScript({
	message,
	amount = 0,
	startDelay = 0,
	messageInterval = 0,
	execMode = true,
}) {
	let running = true;

	const abort = () => {
		running = false;
	};

	ExposedApi.robot.setKeyboardDelay(10);

	const runnable = new Promise(async (resolve, reject) => {
		try {
			let iteration = 0;

			const smg = () => {
				if (execMode) {
					execLine({ message, iteration });
				} else {
					ExposedApi.sendMessage(
						constructMessage({ message, iteration }),
						{}
					);
				}
			};

			await ExposedApi.sleep(startDelay);

			if (amount === -1) {
				while (running) {
					smg();
					iteration++;
					await ExposedApi.sleep(messageInterval);
				}
			} else {
				for (let i = 0; i < amount && running; i++) {
					smg();
					iteration++;
					await ExposedApi.sleep(messageInterval);
				}
			}

			resolve('done');
		} catch (err) {
			reject(err);
		}
	});

	return [runnable, abort];
}

export default ExposedApi;
