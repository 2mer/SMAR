import { globalShortcut } from 'electron';
import { readSettings } from './bl/SettingsBL';

export default function useGlobalShortcuts(win) {
	readSettings()
		.then((settings) => {
			settings?.profiles?.forEach((p) => {
				// register global hotkeys
				const ret = globalShortcut.register(p.hotkey, () => {
					win.webContents.send(
						'SCRIPT_TOGGLE_HOTKEY_PRESSED',
						p.hotkey
					);
				});

				console.log(p.hotkey, 'registerd');

				if (!ret) {
					console.log('Global hotkey registration failed');
				}
			});
		})
		.catch((err) => {
			globalShortcut.unregisterAll();
		});

	return () => {
		globalShortcut.unregisterAll();
	};
}
