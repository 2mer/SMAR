import { clipboard } from 'electron';

const robot = require('robotjs');

class ExecutionApi {
	public static robot = robot;

	public static sendMessage(msg: string, { doubleEnter = false }) {
		clipboard.writeText(msg);

		if (doubleEnter) {
			robot.keyTap('Enter');
		}

		ExecutionApi.simulatePaste();

		robot.keyTap('Enter');
	}

	public static setKeyboardDelay(msg: string) {
		clipboard.writeText(msg);
	}

	public static simulatePaste() {
		robot.keyTap('c', 'control');
	}

	public static async sleep(ms: number) {
		// create a simple timeout promise
		const promise = new Promise<void>((resolve) => {
			setTimeout(resolve, ms);
		});

		return promise;
	}

	public static async executeScript({
		message,
		iterations = 0,
		initialDelay = 0,
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

			await ExecutionApi.sleep(initialDelay);

			if (iterations === -1) {
				while (running) {
					smg();
					iteration++;
					await ExecutionApi.sleep(messageDelay);
				}
			} else {
				for (let i = 0; i < iterations && running; i++) {
					smg();
					iteration++;
					await ExecutionApi.sleep(messageDelay);
				}
			}
		});

		return [runnable, abort];
	}

	public static constructMessage({ message, iteration }) {
		const msg = eval(`'use strict'; index=${iteration}; \`${message}\``);

		return msg;
	}
}

export default ExecutionApi;
