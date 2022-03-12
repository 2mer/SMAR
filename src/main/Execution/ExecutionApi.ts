import { clipboard } from 'electron';

const robot = require('robotjs');

class ExecutionApi {
	public static robot = robot;

	public static sendMessage(msg: string, { doubleEnter = false }) {
		clipboard.writeText(msg);

		if (doubleEnter) {
			robot.keyTap('enter');
		}

		ExecutionApi.simulatePaste();

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

	public static executeScript({
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

		ExecutionApi.robot.setKeyboardDelay(10);

		const runnable = new Promise(async (resolve) => {
			let iteration = 0;

			const smg = () => {
				if (execMode) {
					ExecutionApi.execLine({ message, iteration });
				} else {
					this.sendMessage(
						ExecutionApi.constructMessage({ message, iteration }),
						{}
					);
				}
			};

			await ExecutionApi.sleep(startDelay);

			if (amount === -1) {
				while (running) {
					smg();
					iteration++;
					await ExecutionApi.sleep(messageInterval);
				}
			} else {
				for (let i = 0; i < amount && running; i++) {
					smg();
					iteration++;
					await ExecutionApi.sleep(messageInterval);
				}
			}

			resolve('done');
		});

		return [runnable, abort];
	}

	public static constructMessage({ message, iteration }) {
		const msg = eval(
			`'use strict'; const index=${iteration}; const api=${ExecutionApi}; \`${message}\``
		);

		return msg;
	}

	public static execLine({ message, iteration }) {
		const msg = eval(
			`'use strict'; const index=${iteration}; const api=${ExecutionApi}; ${message}`
		);

		return msg;
	}
}

export default ExecutionApi;
