import { useMemo, useState } from 'react';
import ProfileContext from './ProfileContext';

export default function ProfileProvider({ children }) {
	const [selectedProfile, setSelectedProfile] = useState(undefined);

	const contextMemo = useMemo(
		() => ({ selectedProfile, setSelectedProfile }),
		[selectedProfile, setSelectedProfile]
	);
	return (
		<ProfileContext.Provider value={contextMemo}>
			{children}
		</ProfileContext.Provider>
	);
}
