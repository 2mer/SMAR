import { clipboard, app } from 'electron';

const appData = app.getPath('appData');
const fs = require('fs');
const robot = require('robotjs');

export default class ExposedApi {
	public static robot = robot;

	public static appData = appData;

	public static running = false;

	/**
	 * Run js code from file on system
	 * @param path path to file, local paths are relative to the executable
	 * @returns whatever is evaluated at the end of the file;
	 */
	public static runFile(path) {
		const fileData = fs.readFileSync(path, 'utf8');
		return eval(fileData);
	}

	/**
	 * Sends the specified message
	 * @param msg the message to send to the
	 * @param options options on sending message
	 */
	public static sendMessage(msg = '', { doubleEnter = false } = {}) {
		clipboard.writeText(msg);

		if (doubleEnter) {
			robot.keyTap('enter');
		}

		ExposedApi.simulatePaste();

		robot.keyTap('enter');
	}

	/**
	 * Presses the key, with modifiers
	 */
	public static keyTap(key, modifiers = []) {
		robot.keyTap(key, modifiers);
	}

	/**
	 * Performs ctrl+v keystroke
	 */
	public static simulatePaste() {
		robot.keyTap('v', 'control');
	}

	/**
	 * performs a mouse click in the current mouse position
	 */
	public static click() {
		robot.mouseClick();
	}

	/**
	 * toggle key press state
	 * @param key the key to press
	 * @param status the status of the key
	 * @param modifier an array of modifier keys
	 */
	public static keyToggle(key, status: 'up' | 'down', modifier = []) {
		robot.keyToggle(key, status, modifier);
	}

	/**
	 * Awaitable function to sleep for specified ms
	 * @param ms amount to wait in miliseconds
	 * @returns promise to await
	 */
	public static async sleep(ms: number) {
		// create a simple timeout promise
		const promise = new Promise<void>((resolve) => {
			setTimeout(resolve, ms);
		});

		return promise;
	}
}
