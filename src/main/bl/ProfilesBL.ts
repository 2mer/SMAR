import { readSettings, saveSettings } from './SettingsBL';

export async function updateProfileScript(profile, script) {
	const settings = await readSettings();

	await saveSettings({
		...settings,
		profiles: settings.profiles.map((p) =>
			p.id === profile ? { ...p, script } : p
		),
	});

	return 'OK';
}
