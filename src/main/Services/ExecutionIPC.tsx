import { ipcMain } from 'electron';
import ExecutionApi from '../Execution/ExecutionApi';

export function executionIPC() {
	let currentScriptAbort = null as any;

	ipcMain.handle(
		'START_SCRIPT',
		async (
			event,
			{
				message = '',
				startDelay = 0,
				messageInterval = 0,
				amount = -1,
				execMode = false,
			}
		) => {
			const [promise, abort] = ExecutionApi.executeScript({
				message,
				startDelay,
				messageInterval,
				amount,
				execMode,
			});

			currentScriptAbort = abort;

			await promise;

			return 'DONE';
		}
	);

	ipcMain.handle('ABORT_SCRIPT', async (event, data) => {
		if (currentScriptAbort) {
			currentScriptAbort();
		}

		return 'OK';
	});
}
