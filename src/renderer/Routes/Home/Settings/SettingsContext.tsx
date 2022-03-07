import React from 'react';

const SettingsContext = React.createContext({} as any);

export function useSettingsContext() {
	return React.useContext(SettingsContext);
}

export default SettingsContext;
