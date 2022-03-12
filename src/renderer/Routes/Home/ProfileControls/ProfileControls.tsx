import { Add } from '@mui/icons-material';
import { Box, Button, MenuItem, Paper, Select } from '@mui/material';
import useSettings from '../Settings/useSettings';
import useProfile from './useProfile';

export default function ProfileControls() {
	const { data: settings, isSuccess } = useSettings();
	const profiles = settings?.profiles || [];
	const selectedProfile = useProfile();

	if (!isSuccess) return null;

	return (
		<Paper sx={{ flex: 1 }}>
			<Box
				p="1rem"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Select size="small" value={selectedProfile?.id || ''}>
					{profiles.map((p) => (
						<MenuItem key={p.id} value={p.id}>
							{p.name}
						</MenuItem>
					))}
				</Select>
				<Button color="primary" variant="outlined" startIcon={<Add />}>
					NEW PROFILE
				</Button>
			</Box>
		</Paper>
	);
}
