import { dialog, ipcMain } from 'electron';
import path from 'path';
import { createScript, openScript, readScript } from '../bl/ScriptsBL';
import { updateProfileScript } from '../bl/ProfilesBL';
import scriptTemplates from '../../common/scriptTemplates';

export function scriptsIPC() {
	ipcMain.handle('GET_SCRIPT', async (event, { script }) => {
		const { parameters } = (await readScript(script)) as any;

		return { parameters };
	});

	ipcMain.handle('CREATE_SCRIPT', async (event, { profile, template }) => {
		const foundTemplate = scriptTemplates.find((t) => t.id === template);

		if (!foundTemplate) {
			throw new Error(`Template "${template}" does not exists`);
		}

		const { filePath } = await dialog.showSaveDialog({
			buttonLabel: 'Save Script',
			defaultPath: 'scripts/script.js',
		});

		if (!filePath) {
			throw new Error('No files selected');
		}

		await createScript(filePath, foundTemplate.file);

		// const relativeFilePath = path.relative(path.resolve('.'), filePath);

		// await updateProfileScript(profile, relativeFilePath);
		await updateProfileScript(profile, filePath);

		return 'OK';
	});

	ipcMain.handle('LINK_SCRIPT', async (event, { profile }) => {
		const {
			filePaths: [filePath],
		} = await dialog.showOpenDialog({
			buttonLabel: 'Save Script',
			defaultPath: 'scripts/script.js',
			properties: ['openFile'],
		});

		const relativeFilePath = path.relative(path.resolve('.'), filePath);

		await updateProfileScript(profile, relativeFilePath);

		return 'OK';
	});

	ipcMain.handle('EDIT_SCRIPT', async (event, { script }) => {
		return openScript(script);
	});
}
