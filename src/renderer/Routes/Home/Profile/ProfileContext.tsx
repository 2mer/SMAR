import React from 'react';

const ProfileContext = React.createContext({} as any);

export function useProfileContext() {
	return React.useContext(ProfileContext);
}

export default ProfileContext;
