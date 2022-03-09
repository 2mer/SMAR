import React, { useEffect, useState } from 'react';
import SettingsContext from './SettingsContext';
import { readSettings } from './SettingsService';

export default function SettingsProvider({ children }) {
	const [settings, setSettings] = useState(undefined);

	useEffect(() => {
		readSettings()
			.then((s) => setSettings(s))
			.catch((err) => console.error(err));
	}, []);

	return (
		<SettingsContext.Provider value={settings}>
			{children}
		</SettingsContext.Provider>
	);
}
