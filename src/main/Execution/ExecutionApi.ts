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
		messageDelay = 1000,
	}) {
		let running = true;

		const abort = () => {
			running = false;
		};

		const runnable = new Promise(async () => {
			let iteration = 0;

			const smg = () => {
				this.sendMessage(
					ExecutionApi.constructMessage({ message, iteration }),
					{}
				);
			};

			await ExecutionApi.sleep(startDelay);

			if (amount === -1) {
				while (running) {
					smg();
					iteration++;
					await ExecutionApi.sleep(messageDelay);
				}
			} else {
				for (let i = 0; i < amount && running; i++) {
					smg();
					iteration++;
					await ExecutionApi.sleep(messageDelay);
				}
			}
		});

		return [runnable, abort];
	}

	public static constructMessage({ message, iteration }) {
		const msg = eval(
			`'use strict'; const index=${iteration}; \`${message}\``
		);

		return msg;
	}
}

export default ExecutionApi;
