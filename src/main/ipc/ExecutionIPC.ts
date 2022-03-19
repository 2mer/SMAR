import { ipcMain } from 'electron';
import { executeScript } from '../Execution/ExecutionApi';

export function executionIPC() {
	let currentScriptAbort = null as any;

	ipcMain.handle('START_SCRIPT', async (event, { script, parameters }) => {
		const [promise, abort] = executeScript(script, parameters);

		currentScriptAbort = abort;

		await promise;

		return 'DONE';
	});

	ipcMain.handle('ABORT_SCRIPT', async (event, data) => {
		if (currentScriptAbort) {
			currentScriptAbort();
		}

		return 'OK';
	});
}
