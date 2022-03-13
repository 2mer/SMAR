import { Box } from '@mui/material';
import { memo } from 'react';
import ProfileControls from './ProfileControls/ProfileControls';
import ProfileConfiguration from './ProfileConfiguration/ProfileConfiguration';
import Settings from './Settings/Settings';

function Home() {
	return (
		<Box display="flex" flexDirection="column" gap="2rem">
			<Box display="flex" gap="2rem">
				{/* Profile configuration */}
				<ProfileControls />

				{/* User preferences */}
				<Settings />
			</Box>

			{/* Message + execution controls */}
			<ProfileConfiguration />
		</Box>
	);
}

export default memo(Home);
