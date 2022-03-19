import { autoUpdater } from 'electron-updater';
import { dialog } from 'electron';

autoUpdater.autoDownload = false;

let resolve;
const showError = (error) => {
	dialog.showErrorBox(
		'Error: ',
		error == null ? 'unknown' : (error.stack || error).toString()
	);
};

autoUpdater.on('error', (error) => {
	dialog.showErrorBox(
		'Error: ',
		error == null ? 'unknown' : (error.stack || error).toString()
	);
});

autoUpdater.on('update-available', ({ info }) => {
	dialog
		.showMessageBox({
			type: 'info',
			title: 'Update available',
			message: `Do you want to update to version ${info?.version}`,
			buttons: ['Update', 'Close'],
		})
		.then(({ response }) => {
			if (response === 0) {
				autoUpdater.downloadUpdate();
			} else {
				resolve();
				resolve = null;
			}
		})
		.catch(showError);
});

autoUpdater.on('update-not-available', () => {
	dialog.showMessageBox({
		title: 'No newer versions',
		message: 'Your version is up-to-date!',
	});

	resolve();
	resolve = null;
});

autoUpdater.on('update-downloaded', () => {
	dialog
		.showMessageBox({
			title: 'Installing update',
			message:
				'Update downloaded, quitting application and installing...',
		})
		.then(() => {
			setImmediate(() => autoUpdater.quitAndInstall());
		})
		.catch(showError);
});

export function checkForUpdates(res) {
	resolve = res;
	autoUpdater.checkForUpdates().catch((err) => {
		resolve();
		resolve = null;
	});
}
